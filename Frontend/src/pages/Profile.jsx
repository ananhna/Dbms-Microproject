import React from 'react';
import { User ,X} from 'lucide-react';
import './Profile.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [data, setData] = useState({
    name: "",
    age: "",
    newName:""
  });
  const [profileData, setProfileData] = useState([]);
  const [clickTimeOut, setClickTimeOut] = useState(null);  // Declare clickTimeOut using useState

  const toggleVisible = () => {
    setVisible(!visible);
  }

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  }

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function getProfiles() {
    try {
      const response = await fetch(`http://localhost:3033/api/users/profile/${id}`);
      if (!response.ok) {
        throw new Error('HTTP request was unsuccessful');
      }
      const result = await response.json();
      setProfileData(result);
    } catch (err) {
      console.error("Something went wrong:", err);
    }
  }

  useEffect(() => {
    getProfiles();
  }, [profileData]);

  async function createProfile(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3033/api/users/profile/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("post request was unsuccessful");
    } catch (err) {
      console.error("something went wrong while inserting profile details:", err);
    }
    setVisible(!visible);
    getProfiles();
  }

  async function changePassword(e) {
    e.preventDefault();
    if(data.name!==data.newName){
      return;
    }
    try {
      const response = await fetch(`http://localhost:3033/api/users/changePassword/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("post request was unsuccessful");
    } catch (err) {
      console.error("something went wrong while changing password details:", err);
    }
    setPasswordVisible(!passwordVisible);

  }

  function goToMovies(profileid,age) {
    navigate(`/moviegrid/${profileid}/${age}/${id}`);
  }

  async function deleteProfile(id) {
    try {
      const response = await fetch(`http://localhost:3033/api/users/profile/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("something wrong with delete request");
    } catch (err) {
      console.error("something happened not quite correct while deleting:", err);
    }
    getProfiles();
  }

  function handleClick(data) {
    if (clickTimeOut) {
      clearTimeout(clickTimeOut);  
      deleteProfile(data.profile_id); 
      setClickTimeOut(null);  
    } else {
      setClickTimeOut(setTimeout(() => {
        goToMovies(data.profile_id,data.age);  
        setClickTimeOut(null); 
      }, 250));  
    }
  }

  return (
    <div className="profile-container">
      <div className="change-password" onClick={togglePasswordVisible} >change password</div>
      <h1 className="profile-title">User Profiles</h1>
      <div className="profile-create" onClick={toggleVisible} >+</div>
      <div className="profile-grid">
        {profileData.map((data) => (
          <div key={data.profile_id} className="profile-box" onClick={() => handleClick(data)} >
            <div className="profile-image-container">
              <User className="profile-image" size={32} />
            </div>
            <div className="profile-name">
              <h2>{data.profile_name}</h2>
            </div>
          </div>
        ))}
      </div>
      {visible && (
        <div className="fform-container">
          <form onSubmit={(e) => createProfile(e)}>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Enter Name" onChange={(e) => handleChange(e)} />
            </div>
            <div>
              <label htmlFor="age">Age</label>
              <input id="age" name="age" type="text" placeholder="Enter Age" onChange={(e) => handleChange(e)} />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
            <X size={21} className="close-form" onClick={toggleVisible} />
          </form>
        </div>
      )}
      {passwordVisible && (
        <div className="fform-container">
          <form onSubmit={(e) => changePassword(e)}>
            <div>
              <label htmlFor="name">New password</label>
              <input id="name" name="name" type="password" placeholder="Enter new password" onChange={(e) => handleChange(e)} />
            </div>
            <div>
              <label htmlFor="newName">Confirm Password</label>
              <input id="newName" name="newName" type="password" placeholder="Confirm password" onChange={(e) => handleChange(e)} />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
            <X size={21} className="close-form" onClick={togglePasswordVisible} />
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
