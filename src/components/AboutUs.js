import React from 'react';
import {context} from '../appReducer'

export default function AboutUs() {

  
  const {about} = React.useContext(context)

  /*const [text,setText] = React.useState(about)
  const [edit,setEdit] = React.useState(false)
  const {dispatch} = React.useContext(context)

  function editAbout(event){
    if (edit){
      dispatch({
        type: 'setAbout',
        newAbout: text
      })
    }
      setEdit(!edit)
  }*/                         // Disabled feature - editable about us 

  return (
    <>
      <h2 style={{color: 'aliceblue', background: 'maroon'}}>About Us</h2>
        {/* edit ? 
            <textarea onChange={(e)=>setText(e.target.value)}style={{margin: '20px 25%'}} rows="10" cols="70" placeholder='Write a new post...' id='body'>{about}</textarea>
          : 
            <p style={{margin: '20px 25%'}}>{about}</p>
            
            =Disabled feature= - editable about us page

        */}

          <p style={{margin: '20px 25%', border: '1px solid gold'}}>{about}</p> {/* About Us */}
          
          <br/>
          {/*<button onClick={editAbout}>{!edit ? 'Edit' : 'Save' }</button>  =Disabled feature= - editable about us page */ }
          <br/><br/>
      
      <img alt='placeholder' src="https://via.placeholder.com/250" />
    </>
  );
}
