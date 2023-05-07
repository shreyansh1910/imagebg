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
  };

  return (
    <div>
      <button  className="selectfile positions" style={{top:'40%'}} onClick={toggleCamera}>
        {cameraOn ? 'Turn off camera' : 'Turn on camera'}
      </button>
      {cameraOn && (
        <div >
          <Webcam audio={false} ref={webcamRef}  style={{width:"400px", height:"400px" }} />
          <button className="selectfile positions" style={{top:'50%'}} onClick={captureFrame}>Capture</button>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
