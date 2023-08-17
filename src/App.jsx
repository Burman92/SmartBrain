import { Component } from 'react'
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import './App.css'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'


const returnClarifaiRequestOptions = (imageURL) =>{
  const PAT = 'f74cfa233fe046859640c19a25ce1159';
  const USER_ID = 'burmanbed';       
  const APP_ID = 'Smart-Brain-App'; 
  const IMAGE_URL = imageURL

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

const initialState = {
    input: '',
    imageURL: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user:{
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }


class App extends Component {
  constructor(){
    super();
    this.state = initialState
    }

    loadUser = (data) =>{
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
    }

  calculateFaceLocation = (data) => {
    const clarifiaFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
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
  .then(result => {
    if(result){
      fetch('http://localhost:3000/image',{
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
      .catch(console.log)
    }
    this.displayFaceBox( this.calculateFaceLocation(result) )
  })
  .catch(error => console.log('error', error));
}

onRouteChange = (route) => {
  if(route === 'signout'){
    this.setState(initialState)
  } else if(route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}


render() {
  const {isSignedIn, imageURL, route, box} = this.state
  return (
    <>
      <Navigation isSignedIn={isSignedIn} onRouteChange ={this.onRouteChange}/>
      { route === 'home'
        ? 
        <div>
        <Logo />
        <Rank 
        name = {this.state.user.name} 
        entries = {this.state.user.entries}
        />
        <ImageLinkForm
        onInputChange = { this.onInputChange } 
        onButtonSubmit = { this.onButtonSubmit }
        />
        <FaceRecognition 
        imageURL = {imageURL}
        box = {box}
        /> 
      </div>
      :(
        route === 'signin' ?
        <SignIn onRouteChange = {this.onRouteChange} loadUser ={this.loadUser}/>
        :<Register onRouteChange ={this.onRouteChange} loadUser = {this.loadUser}/>
      )
        } 
    </>
  )
}
}

export default App
