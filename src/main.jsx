import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ParticlesBg from 'particles-bg'  
import "tachyons"
import "./Main.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ParticlesBg color='grey' num={150} type='cobweb' bg={true}/>
  </React.StrictMode>,
)
