
import './App.css';
import { useState } from 'react';
import CameraComponent from './camera';




function App() {
  const [image, setImage] = useState(null);
  const [bgremove, setBgremove] = useState(null);
  // Function to convert WebP base64 to JPEG base64
  function convertWebPToJPEG(webpBase64) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      // Set the source of the image to the WebP base64 data
      image.src = webpBase64;

      // Event handler when the image has finished loading
      image.onload = function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set the canvas dimensions to match the image
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the image onto the canvas
        context.drawImage(image, 0, 0, image.width, image.height);

        // Convert the canvas image to JPEG base64
        const jpegBase64 = canvas.toDataURL('image/jpeg', 0.8);

        // Resolve the promise with the JPEG base64 data
        resolve(jpegBase64);
      };

      // Event handler if there is an error loading the image
      image.onerror = function (error) {
        // Reject the promise with the error message
        reject(error);
      };
    });
  }

  const handleImageCapture = (imageSrc) => {
    console.log(imageSrc);

    convertWebPToJPEG(imageSrc)
      .then(jpegBase64 => {
        // Use the converted JPEG base64 data as needed (e.g., send it to the Remove.bg API)
        setImage(jpegBase64);
        const apikey = 'PxE8nyMKGjvDuBjJeWXcJMqm'
        fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': apikey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image_file_b64: jpegBase64,
            size: 'auto'
          })
        })
          .then((response) => response.blob())
          .then((blob) => {
            console.log(blob);
            const reader = new FileReader();
            reader.onloadend = () => {
              setBgremove(reader.result)
              console.log(reader.result);
            }
            reader.readAsDataURL(blob);

          })
          .catch((error) => {
            // Handle any errors

            // Handle any errors
            console.error(error);

          });
      }).catch(error => {
        // Handle errors
        console.error(error);
      });
  }




  const handleupload = () => {
    const apikey = 'PxE8nyMKGjvDuBjJeWXcJMqm'
    const url = 'https://api.remove.bg/v1.0/removebg'

    const selectedFile = image;
    const reader = new FileReader();
    const fileData = reader.result;
    const fileType = selectedFile.type;
    if (fileType.includes('image/')) {
      // Process the selected image file
      console.log('Image file selected:', fileType);
      const formData = new FormData();
      formData.append('image_file', image, image.name);
      formData.append('size', 'auto');
      fetch(url, {
        method: 'POST', headers: { 'X-Api-Key': apikey }, body: formData
      }
      ).then(res => res.blob()).then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => { setBgremove(reader.result) }
        reader.readAsDataURL(blob);


      }).catch(err => console.log(err));
    } else {

      alert('Invalid file type:', fileType);
    }

    reader.readAsDataURL(selectedFile);

  }
  <input style={{ width: '100px', height: '40px', position: 'absolute', top: '20%', left: '30%' }} type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>
  return (
    <div >
      <h1 style={{ textAlign: 'center' }}>
        Background remover
      </h1>
      <div>

        <button className="selectfile positions" style={{top:'30%'}} onClick={handleupload}>Show photo</button>
        <CameraComponent onCapture={handleImageCapture} />
        <input id="file"  style={{opacity:'0'}}  type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>
        <label  className="selectfile positions"  for="file">
          Select file
          
        </label>



        <div style={{ position: 'fixed', top: '10%', left: '30%' }}>{bgremove && <img width="500px" height="500px" src={bgremove} alt="bgremove" />}</div>

      </div>
    </div>

  );
}

export default App;
