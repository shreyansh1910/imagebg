import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetectionComponent = ({ image }) => {
  const canvasRef = useRef(null);
   console.log(image);
   console.log("i am here");
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.loadSsdMobilenetv1Model('/models');
      await faceapi.loadFaceLandmarkModel('/models');
      await faceapi.loadFaceRecognitionModel('/models');

      // Detect faces in the image
      const detections = await faceapi.detectAllFaces(canvasRef.current).withFaceLandmarks();

      if (detections.length > 0) {
        console.log('Image contains a face');
      } else {
        console.log('Image does not contain a face');
      }
    };

    const handleImageLoad = () => {
      faceapi.matchDimensions(canvasRef.current, { width: image.width, height: image.height });

      // Perform face detection when the image is loaded
      loadModels();
    };

    const imageElement = document.createElement('img');
    imageElement.src = image;

    imageElement.onload = handleImageLoad;
  }, [image]);

  return <canvas ref={canvasRef} />;
};

export default FaceDetectionComponent;
