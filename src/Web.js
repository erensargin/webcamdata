import React, { useState } from "react";
import Webcam from "react-webcam";
import ReactPlayer from "react-player/youtube";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";

// upload will be change
import { storage, db } from "./firebase";
import firebase from "firebase";
import Sur from "./Sur";

//

function Web() {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [playing, setPlaying] = React.useState(false);
  const [{ gender, age, counter }, dispatch] = useStateValue();
  const history = useHistory();
  const [played, setPlayed] = useState(0);
  const [happy, setHappy] = useState([]);
  const [emotional, setEmotional] = useState([]);
  const [disgusting, setDisgusting] = useState([]);
  const [scary, setScary] = useState([]);
  const [interesting, setInteresting] = useState([]);
  const [notr, setNotr] = useState([]);
  const [soru1, setSoru1] = useState("");
  const [soru2, setSoru2] = useState("");

  const [urlrek, setUrl] = React.useState([
    {
      name: "kesktra",
      url:
        "https://youtu.be/p_vYOK-Zb8Y?list=PLVqariV8Ds4Gsl81FKYVsXN8bSq_0dgLf",
    },
    {
      name: "ulker_gofret",
      url:
        "https://youtu.be/_COqz11UiLg?list=PLVqariV8Ds4Gsl81FKYVsXN8bSq_0dgLf",
    },
    {
      name: "canga",
      url:
        "https://youtu.be/BrqY4EQfTIY?list=PLVqariV8Ds4Gsl81FKYVsXN8bSq_0dgLf",
    },
    {
      name: "snickers",
      url:
        "https://youtu.be/SGnY_2cqcTE?list=PLVqariV8Ds4Gsl81FKYVsXN8bSq_0dgLf",
    },
    {
      name: "algida_boom",
      url:
        "https://youtu.be/tNCZQJ9pRvA?list=PLVqariV8Ds4Gsl81FKYVsXN8bSq_0dgLf",
    },
    {
      name: "sahibinden",
      url: "https://youtu.be/g28_PP8svgU",
    },
    {
      name: "letgo",
      url: "https://youtu.be/3sNN6E56nBw",
    },
    {
      name: "paradontax",
      url: "https://youtu.be/OE1BSrMldsM",
    },
    {
      name: "little_ice",
      url: "https://www.youtube.com/watch?v=erh2ngRZxs0",
    },
    {
      name: "audi",
      url: "https://www.youtube.com/watch?v=02eJUk7Mbsg",
    },
    {
      name: "sony",
      url: "https://www.youtube.com/watch?v=lQKr2mFrJws",
    },
    {
      name: "joker",
      url: "https://www.youtube.com/watch?v=Fi4n1elVgT4",
    },
    {
      name: "vodafone",
      url: "https://youtu.be/IEFwyOJkg0M",
    },
  ]);

  const handleStartCaptureClick = React.useCallback(() => {
    setPlaying(true);
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    setPlaying(false);
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = (e) => {
    e.preventDefault();
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      //a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      dispatch({
        type: "SET_URL_VIDEONAME",
        url: a.href,
        videoname: urlrek[counter].name,
      });

      var storageRef = firebase.storage().ref();
      var currentdate = new Date();
      var datetime =
        currentdate.getDate() +
        "." +
        (currentdate.getMonth() + 1) +
        "." +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes();
      var uploadTask = storageRef
        .child("videos/" + age + " " + gender + " " + datetime)
        .put(blob);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          console.log(error);
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            db.collection("datas").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              age: age,
              gender: gender,
              videoname: urlrek[counter].name,
              videoUrl: downloadURL,
              happy: happy,
              emotional: emotional,
              disgusting: disgusting,
              scary: scary,
              interesting: interesting,
              notr: notr,
              soru1: soru1,
              soru2: soru2,
            });
          });
        }
      );
      //a.click();
      //window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
      dispatch({
        type: "SET_COUNTER",
        counter: counter + 1,
      });
      history.push("/survey");
    }
  };

  const handlePlayedtime = (e) => {
    setPlayed(e.playedSeconds | 0);
    console.log(played);
  };

  const handleHappy = (e) => {
    setHappy(happy.concat(played));
  };
  const handleEmotional = (e) => {
    setEmotional(emotional.concat(played));
  };
  const handleDisgusting = (e) => {
    setDisgusting(disgusting.concat(played));
  };
  const handleScary = (e) => {
    setScary(scary.concat(played));
  };
  const handleInteresting = (e) => {
    setInteresting(interesting.concat(played));
  };
  const handleNotr = (e) => {
    setNotr(notr.concat(played));
  };

  const handleChange = (event) => {
    setSoru1(event.target.value);
  };
  const handleChange2 = (event) => {
    setSoru2(event.target.value);
  };

  return (
    <div>
      <div style={{ float: "right", margin: "50px" }}>
        {!age ? history.replace("/") : <p></p>}
        {counter == 12 ? history.push("/end") : <div></div>}
        <Webcam audio={true} ref={webcamRef} width={300} />
        <div style={{ marginTop: "20px" }}>
          {capturing ? (
            <p></p>
          ) : (
            <button onClick={handleStartCaptureClick}>Kayda Başla</button>
          )}
          {recordedChunks.length > 0 && (
            <button onClick={handleDownload}>Yükle</button>
          )}
        </div>
        <div style={{ marginTop: "250px" }}>
          {recordedChunks.length > 0 && (
            <Sur
              soru1={soru1}
              soru2={soru2}
              handleChange={handleChange}
              handleChange2={handleChange2}
            />
          )}
        </div>
      </div>
      <div style={{ float: "left", margin: "150px" }}>
        <ReactPlayer
          url={urlrek[counter].url}
          playing={playing}
          width="600px" //150
          height="300px" //120
          onReady={() => console.log("onReady")}
          onProgress={handlePlayedtime}
          onEnded={handleStopCaptureClick}
        />
        <div
          style={{ display: "flex", marginTop: "50px", marginLeft: "250px" }}
        >
          <div style={{ marginRight: "30px" }}>
            <button onClick={handleHappy}>Mutluluk</button>
          </div>
          <div style={{ marginRight: "30px" }}>
            <button onClick={handleEmotional}>Duygusal</button>
          </div>
          <div style={{ marginRight: "30px" }}>
            <button onClick={handleDisgusting}>Tiksindirici</button>
          </div>
          <div style={{ marginRight: "30px" }}>
            <button onClick={handleInteresting}>Merak Uyandırıcı</button>
          </div>
          <div style={{ marginRight: "30px" }}>
            <button onClick={handleScary}>Korkutucu</button>
          </div>
          <div style={{ marginRight: "30px" }}>
            <button onClick={handleNotr}>Nötr</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Web;
