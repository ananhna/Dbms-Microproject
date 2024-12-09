import { response, Router } from "express";
import { pool } from "../index.mjs";
const router = Router();

router.get("/api/users/profile/:id",async (request,response)=>{
  const {params:{id}}=request;
  const parsedId = parseInt(id);
  try{
    const [results] = await pool.query('select * from profiles where user_id = ?',parsedId);
    if(!results) return response.status(404).send({msg :"not found"});
    return response.status(200).send(results);
  }catch(err){
    console.error("error :",err);
  } 
});

router.post("/api/users/profile/:id",async (request,response)=>{
  const {params:{id},body:{name,age}}=request;
  const parsedId = parseInt(id);
  try{
    const [results] = await pool.query('insert into profiles(user_id,profile_name,age) values(?,?,?)',[parsedId,name,age]);
    return response.status(200).send(results[0]);
  }catch(err){
    console.error("error :",err);
  } 
});

router.delete("/api/users/profile/:id",async (request,response)=>{
  const {params:{id}}=request;
  try{
    const [result]=await pool.query('delete from profiles where profile_id = ?',id);
    return response.status(200).send({msg : result});
  }catch(err){
    return response.status(500).send({msg : err});
  }
});

export default router;