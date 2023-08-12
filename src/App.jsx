import { Component } from 'react'
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import './App.css'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'


const returnClarifaiRequestOptions = (imageURL) =>{
  const PAT = 'f74cfa233fe046859640c19a25ce1159';
  const USER_ID = 'burmanbed';       
  const APP_ID = 'Smart-Brain-App'; 
  const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
            }
          }
        }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw,
};
return requestOptions
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {}
    }
    }

  calculateFaceLocation = (data) => {
    const clarifiaFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
    console.log(clarifiaFace)
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifiaFace.left_col * width,
      topRow: clarifiaFace.top_row * height,
      rightCol: width - (clarifiaFace.right_col * width),
      bottomRow: height - (clarifiaFace.bottom_row * height)
    }
  }

  displayFaceBox = ( box ) => {
    this.setState({box: box})
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

onButtonSubmit = () => {
  this.setState({imageURL: this.state.input});
  fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/versions/" + "6dc7e46bc9124c5c8824be4822abe105" + "/outputs", returnClarifaiRequestOptions(this.state.input))
  .then(response => response.json())
  .then(result => this.displayFaceBox( this.calculateFaceLocation(result) ))
  .then(data=> console.log(data))
  .catch(error => console.log('error', error));
}


render() {

  return (
    <>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange = { this.onInputChange } 
        onButtonSubmit = { this.onButtonSubmit }
        />
      <FaceRecognition 
      imageURL = {this.state.imageURL}
      box = {this.state.box}
      /> 
    </>
  )
}
}

export default App
