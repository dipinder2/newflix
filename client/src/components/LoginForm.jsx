import React,{useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router'

const LoginForm = ({setPermission}) => {

  const [credentials,setCredentials] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  });

  const [error,setError] = useState()
  const [logincredentials,setLoginCredentials] = useState({

    email:"",
    password:"",

  });

  const [validState,setValidState] = useState({
    firstName:false,
    lastName:false,
    email:false,
    password:false,
    confirmPassword:false,
  })
  const [loginValidState,setLoginValidState] = useState({
    email:false,
    password:false,
  })
  
  const handleChange = (e) => {
      setCredentials({
        ...credentials,
        [e.target.name]:e.target.value
      });
  }
    const handleChangeLogin = (e) => {
      setLoginCredentials({
        ...logincredentials,
        [e.target.name]:e.target.value
      });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(credentials.firstName.length<3){
      var firstName = true;
    }
    if(credentials.lastName.length<3){
      var lastName = true;
    } 
    if(credentials.email.length<3){
      var email = true;
    }
    if(credentials.password.length<8){
      var password = true;
    }
    if(credentials.confirmPassword !== credentials.password ){
      var confirmPassword = true;
    }

    setValidState({
        ...validState,firstName,lastName,email,password,confirmPassword
    });
    if(firstName||lastName||email||password||confirmPassword) return
    axios.post("http://localhost:8000/api/register",credentials,{withCredentials:true})
    .then(res=>{
        setCredentials({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
      })
        navigate("/home/movies")
    })
    .catch(err=>console.log(err.response))

  }

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if(logincredentials.email.length<3){
      var email = true;
    }
    if(logincredentials.password.length<8){
      var password = true;
    }

    setLoginValidState({
        ...loginValidState,email,password
    });
    if(email||password) return
    axios.post("http://localhost:8000/api/login",logincredentials,{withCredentials:true})
    .then(res=>{
      setError(null)
      navigate("/home/movies")
    })
    .catch(err=>{
      if(err.response.data){
        setError("Check Email and password")
      }
    })
  }

  return (
    
    <div style={{display: "flex",alignItems:"center",justifyContent: "space-evenly"}}>

      <form className="form-group" onSubmit={handleSubmit}>
       <h2 style={{color:"red"}}>Register Yourself</h2>
         <br/>
        <label>First name </label>
          <input className="form-control" value={credentials.firstName} onChange={handleChange} name="firstName" type="text"/>
          <br/>
        {validState.firstName ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
        
        <label>Last name</label>
          <input className="form-control" value={credentials.lastName} onChange={handleChange} name="lastName" type="text"/>
          <br/>
        {validState.lastName ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
  
        <label>Email</label>
        <input className="form-control" value={credentials.email} onChange={handleChange} name="email" type="email"/>
        <br/>
        {validState.email ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
        
        <label>Password</label>
        <input className="form-control" value={credentials.password} onChange={handleChange} name="password" type="password"/>
        <br/>
        {validState.password ? <p style={{color:"red"}}>it has to be more than 8 chars.</p>:null}
        
        <label>Confirm Password</label>
        <input className="form-control" value={credentials.confirmPassword} onChange={handleChange} name="confirmPassword" type="password"/>
        {validState.confirmPassword ? <p style={{color:"red"}}>passwords has to match.</p>:null}
        <br/>

        <input type="submit" class="btn btn-danger" onSubmit={handleChange} value="Register"/>
      
      </form>
      <div style={{borderRight:"2px solid red",height:"700px"}}></div>
  <form className="form-group" onSubmit={handleSubmitLogin}>
          <h2 style={{color:"red"}}>Log On to the Page</h2>
         <br/>
          <label>Email</label>
          <input className="form-control" onChange={handleChangeLogin} name="email" type="email"/>
          <br/>
          {loginValidState.email ? <p style={{color:"red"}}>it has to be more than 3 chars.</p>:null}
          
          <label>Password</label>
          <input className="form-control" onChange={handleChangeLogin} name="password" type="password"/>
          <br/>
          
          {loginValidState.password ? <p style={{color:"red"}}>it has to be more than 8 chars.</p>:null}
          
          {error ?<h6 style={{color:"red"}}>{error}</h6>:null}
          <input type="submit" class="btn btn-danger" onSubmit={handleChange} value="Log In"/>
        </form>
    </div>
  )
}

export default LoginForm;