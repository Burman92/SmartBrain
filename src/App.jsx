import { Component } from 'react'
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import './App.css'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'

const returnClarifaiRequestOptions= (imageURL) =>{
  const PAT = 'f74cfa233fe046859640c19a25ce1159';

  const USER_ID = 'burmanbed';       
  const APP_ID = 'Smart-Brain-App';

  const MODEL_ID = 'face-detection';  
  const IMAGE_URL = imageURL;

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
  body: raw
};

return requestOptions
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: ''
    }
    }
onInputChange = (event) => {
  this.setState({input: event.target.value})
}

onButtonSubmit = () => {
  this.setState({imageURL: this.state.input})
  fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
  .then(response => response.json())
  // app.models.predict('ac547022a07a4d7bb1e35f661554bd04', 'https://etcanada.com/wp-content/uploads/2023/04/GettyImages-1485003120.jpg?quality=80&strip=all&w=720&h=480&crop=1').then(
  //   function(response){
  //     console.log(response)
  //   },
  //   function(err){

  //   }
  // )
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
      /> 
    </>
  )
}
}

export default App
