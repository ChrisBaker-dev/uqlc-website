import React from 'react';
import Alert from 'react-bootstrap/Alert'
import {context} from '../appReducer'
import env from 'react-dotenv'

export default function Signup({openModal}) {

  const [creds,setCreds] = React.useState({email: "",password: "", confirm: ""})
  const [error,setError] = React.useState('')
  const {dispatch} = React.useContext(context)

  function formStateUpdate(event) {
    setCreds({...creds, [event.target.id]: event.target.value})
  }

  async function formSubmit(event) {
    console.log(env)
    event.preventDefault()
    if (creds.password !== creds.confirm){
      setError('Passwords do not match')
    }
    
    let response = await fetch(`${env.API_URL}/api/v1/users/register`,{
      method: 'POST',
      body: JSON.stringify({email: creds.email, password: creds.password}),
      headers: {
        'Content-type': 'application/json'
      }
    }).catch(()=>setError('Sign up failed: server unreachable'))

    if (!response) return
    
    let data = await response.json()

    if (response.status === 201){
      // successful sign up
      
      let playerRes = await fetch(`${env.API_URL}/api/v1/players`,{
        headers: { // 
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
          user_id: data.user_id,
          name: '',
          number: 0,
          position: '',
          description: '',
          seasons: 0,
        })
      })
      if (playerRes.status === 201){
        
        let response = await fetch(`${env.API_URL}/api/v1/users/login`, {
          method: 'POST',
          body: JSON.stringify(creds),
          headers: {
            'Content-type': 'application/json'
          }
        }).catch(() => setError('Login failed: server unreachable'))
        if (response){
    
          let data = await response.json()
    
          if (response.status === 200){
            // successful login
            setError(`Successfully signed up as ${creds.email}`)
            dispatch({
              type: "setToken",
              data
            })
            dispatch({
              type: "setLogin",
              user: creds.email
            })
            openModal({show: false})
          }
          else{
            // failed login
            setError(`Failed to sign up - ${data.error}`)
            setCreds({email: "",password: ""})
            console.log(data.error) // contains error
          }
        }
      else{
        setError(`Failed to sign up - server unreachable`)
      }
    }
    else{
      // failed sign up
      console.log(data) // contains error
      setError(`${response.status} - ${data.error}`)
    }
  }
}

  return (
    <>
      <h2>Sign up</h2>
      {(error !== '') ?
      <Alert variant={error.match(/^Success/) ? 'success' : 'danger'}>{error}</Alert>
      :
        null}
      <form onSubmit={formSubmit} onChange={formStateUpdate}>
        <input id='email' type='email' placeholder='Email'></input><br/><br/>
        <input id='password' type='password' placeholder='Password'></input><br/><br/>
        <input id='confirm' type='password' placeholder='Confirm Password'></input><br/><br/>
        <input type='submit' value='Register' />
      </form>
    </>
  );
}
