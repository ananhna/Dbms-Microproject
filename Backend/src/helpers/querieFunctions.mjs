import { pool } from "../index.mjs";

export const getUserByEmailPassword = async (arg)=>{
  try{
    const [results]=await pool.query('select * from users where email=? or username=?',[arg,arg]);
    return results[0];
  }catch(err){
    console.error("error while fetching user object for verification: ",err);
    return response.status(500).send({msg : "error while fetching user object for verification"});
  }
}

export const getUserById = async (arg)=>{
  try{
    const [results]=await pool.query('select * from users where user_id=?',arg);
    return results[0];
  }catch(err){
    console.error("error while fetching user object for deserializing verification: ",err);
    return response.status(500).send({msg : "error while fetching user object for deserializing verification"});
  }
}