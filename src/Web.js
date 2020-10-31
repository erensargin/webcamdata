import React from "react";
import Webcam from "react-webcam";
import ReactPlayer from "react-player/youtube";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";

function Web() {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [playing, setPlaying] = React.useState(false);
  const [{ gender, age }, dispatch] = useStateValue();
  const history = useHistory();

  const [urlrek, setUrl] = React.useState([
    { name: "reklam1", url: "https://www.youtube.com/watch?v=ysz5S6PUM-U" },
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
      //a.click();
      //window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

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
        />
        {capturing ? (
          <button onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <button onClick={handleStartCaptureClick}>Start Capture</button>
        )}
        {recordedChunks.length > 0 && (
          <button onClick={handleDownload}>Download</button>
        )}
      </div>
      <h1>
        Age:{age} Gender:{gender}
      </h1>
    </div>
  );
}

export default Web;
