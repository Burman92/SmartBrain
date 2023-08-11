import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ParticlesBg from 'particles-bg'  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ParticlesBg color='grey' num={400} type='cobweb' bg={true}/>
  </React.StrictMode>,
)
