import Tilt from 'react-parallax-tilt'
import './Logo.css'
import brain from './brain.png'

const Logo = () =>{
    return(
        <div className="ma4 mt0">
            <Tilt className='Tilt br3 shadow-8 ' style={{height: '7%',width: '4%' , backgroundColor: 'white'}} >
                <div className='Tilt-inner center'>
                        <img src={brain} alt="eye" />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo