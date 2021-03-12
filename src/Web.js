import React, { useState } from "react";
import Webcam from "react-webcam";
import ReactPlayer from "react-player/youtube";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";

// upload will be change
import { storage, db } from "./firebase";
import firebase from "firebase";

//

function Web() {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [playing, setPlaying] = React.useState(false);
  const [{ gender, age }, dispatch] = useStateValue();
  const history = useHistory();
  const [played, setPlayed] = useState(0);

  const [urlrek, setUrl] = React.useState([
    {
      name: "reklam1",
      url: "https://www.youtube.com/watch?v=7NxPI3iTQQQ&ab_channel=luinunun",
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

  const handleDownload = React.useCallback(() => {
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
        videoname: urlrek[0].name,
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
              videoUrl: downloadURL,
            });
          });
        }
      );
      //a.click();
      //window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const handlePlayedtime = (e) => {
    setPlayed(e.playedSeconds | 0);
    console.log(played);
  };

  return (
    <div style={{ display: "flex", margin: "50px" }}>
      {!age ? history.replace("/") : <p></p>}
      <div style={{ flex: 0.5, marginRight: "50px" }}>
        <Webcam audio={false} ref={webcamRef} width={500} />
      </div>
      <div style={{ flex: 1 }}>
        <ReactPlayer
          url={urlrek[0].url}
          playing={playing}
          width="100%"
          height="100%"
          onReady={() => console.log("onReady")}
          onProgress={handlePlayedtime}
        />
        {capturing ? (
          <button onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <button onClick={handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedChunks.length > 0 && (
          <button onClick={handleDownload}>Upload</button>
        )}
      </div>
      <h1>
        Age:{age} Gender:{gender}
      </h1>
    </div>
  );
}

export default Web;
