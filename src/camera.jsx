import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './App.css';

const CameraComponent = ({ onCapture }) => {
  const [cameraOn, setCameraOn] = useState(false);
  const webcamRef = useRef(null);

  const toggleCamera = () => {
     setCameraOn((prevCameraOn) => !prevCameraOn);
  };

  const captureFrame = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    await onCapture(imageSrc);
    setCameraOn(false);
  };

  return (
    <div>
      <button  className="selectfile positions" style={{top:'40%' ,left:'5%'}} onClick={toggleCamera}>
        {cameraOn ? 'Turn off camera' : 'Turn on camera'}
      </button>
      {cameraOn && (
        <div >
          <Webcam audio={false} ref={webcamRef}  style={{width:"30%", height:"30%" ,position:'relative',left:'35%',top:'20%'}} />
          <button className="selectfile positions" style={{bottom:'10%',left:'45%' ,position:'fixed'}} onClick={captureFrame}>Capture</button>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
