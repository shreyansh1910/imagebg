
import './App.css';
import { useState } from 'react';

//import CameraComponent from './camera';
function App(){
const [image, setImage] = useState(null);
const [bgremove, setBgremove] = useState(null);


const handleupload = () => {
  const apikey = '1bNtgP9RRgGMg8EeQmdHBo7L'
  const url = 'https://api.remove.bg/v1.0/removebg'
  const formData = new FormData();
  formData.append('image_file', image, image.name);
  formData.append('size', 'auto');
  fetch(url, {
    method: 'POST', headers: { 'X-Api-Key': apikey }, body: formData
  }
  ).then(res => res.blob()).then(blob => {
    const reader=new FileReader();
    reader.onloadend=()=>{setBgremove(reader.result)}
    reader.readAsDataURL(blob);


}).catch(err => console.log(err));
}

  return (
    <div >
      <h1 style={{textAlign:'center'}}>
         Background remover
      </h1>
      <div style={{float:'left', justifyContent:'center', alignItems:'center'}}>
      <input  style={{width:'100px', height:'40px' ,position:'absolute', top:'20%', left:'30%'} } type="file" onChange={ (e) => setImage(e.target.files[0])}></input>
      <button style={{width:'100px', height:'20px', position:'absolute', top:'20%', left:'60%'} } onClick={handleupload}>upload image</button>
      <div style={{ position:'absolute', top:'10%', left:'30%'}}>{bgremove && <img width="500px" height="500px"  src={bgremove} alt="bgremove" />}</div>
      </div>
    </div>
    
  );
}

export default App;
