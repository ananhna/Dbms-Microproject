import React from 'react';
import './SignUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUp(){
  const navigate = useNavigate();
  const [data,setData] = useState({
    email:"",
    username:"",
    password:"",
    subscription_id:""
  });
  const [confirm,setConfirm] = useState("");
  function handleChange(e){
    const {name,value} = e.target;
    setData({...data,[name]:value});
  }

  function handleChangeConfirm(e){
    setConfirm(e.target.value);
  }

  async function insertUser(e){
    e.preventDefault();
    let result;
    if(confirm !== data.password){
      setConfirm("please confirm the password");
      return;
    }
    try{
      const responseRegister = await fetch(`http://localhost:3033/api/users/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data),
      });
      if(!responseRegister.ok) throw new Error("post request was unsuccessful");
    }catch(err){
      console.error("something went wrong while inserting user payments details :",err);
    }
    data.name=data.email;
    try{
      const responseLogin = await fetch("http://localhost:3033/api/users/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data),
      });
      if(!responseLogin.ok) throw new Error("post request was unsuccessful");
      result = await responseLogin.json();
    }catch(err){
      console.error("something went wrong while logging in :",err);
    }
    navigate(`/profiles/${result.user_id}`);
  }
  return (
    <>
      <div className="form-container" >
        <form onSubmit={(e)=>insertUser(e)} >
          <div>
            <label htmlFor="email" >Email</label>
            <input id="email" name="email" type="text" placeholder="Enter Email" onChange={(e)=>handleChange(e)}/>
          </div>
          <div>
            <label htmlFor="username" >Username</label>
            <input id="username" name="username" type="text" placeholder="Enter Username" onChange={(e)=>handleChange(e)} />
          </div>
          <div>
            <label htmlFor="password" >Password</label>
            <input id="password" name="password" type="password" placeholder="Enter Password" onChange={(e)=>handleChange(e)} />
          </div>
          <div>
            <label htmlFor="confirmpassword" >confirm Password</label>
            <input id="confirmpassword" name="confirmpassword" type="password" value={confirm}  placeholder="Enter Password" onChange={(e)=>handleChangeConfirm(e)} />
          </div>
          <div>
            <label htmlFor="subscription_id" >Subscription</label>
            <select id="subscription_id" name="subscription_id" onChange={(e) => handleChange(e)}>
              <option value="">Select Subscription</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignUp