import { useState } from 'react'
import Tilt from 'react-parallax-tilt'




function App() {


  return (
    <>
      <Tilt>
        <div style={{height: '300px', backgroundColor:'darkgreen'}}>
          <h1>Testing the tilt box</h1>
        </div>
      </Tilt>
    </>
  )
}

export default App
