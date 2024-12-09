import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Login(){
  const navigate = useNavigate();
  const [data,setData] = useState({
    name:"",
    password:""
  });
  function handleChange(e){
    const {name,value} = e.target;
    setData({...data,[name]:value});
  }

  async function loginUser(e){
    e.preventDefault();
    let result;
    try{
      const response = await fetch("http://localhost:3033/api/users/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data),
      });
      if(!response.ok) throw new Error("post request was unsuccessful");
      result = await response.json();
    }catch(err){
      console.error("something went wrong while inserting logging in :",err);
    }
    navigate(`/profiles/${result.user_id}`);
  }
  function goToSignUp(){
    navigate("/sign-up");
  }
  return (
    <>
      <div className="signup" onClick={goToSignUp} >sign up</div>
      <div className="form-containerr"  >
        <form onSubmit={(e)=>loginUser(e)} >
          <div>
            <label htmlFor="name" >Email or Username</label>
            <input id="name" name="name" type="text" placeholder="Enter Email or Username" onChange={(e)=>handleChange(e)}/>
          </div>
          <div>
            <label htmlFor="password" >Password</label>
            <input id="password" name="password" type="password" placeholder="Enter Password" onChange={(e)=>handleChange(e)} />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
          {/* <div className="close-form" onClick={toggleVisible} >x</div> */}
        </form>
      </div>
      
    </>
  )
}

export default Login