import './ImageLinkForm.css'


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) =>{
    return(
        <div>
            <p className='f3 center'>
                {'The Brain knows all faces. It will detect any face that you show it. Give it a try.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                <input className='f5 pa2 w-75 center' type='text' onChange = {onInputChange}/>
                <button 
                className='w-25 grow f5 ph3 pv2 dib white bg-light-purple'
                onClick={ onButtonSubmit }
                >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm