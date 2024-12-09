import { Router } from "express";
import { validationResult,matchedData, checkSchema } from "express-validator";
import { UserValidationSchema } from "../helpers/validationSchemas.mjs";
import {pool} from "../index.mjs";
import { comparePassword, HashPassword } from "../helpers/HashPassword.mjs";
import passport from "passport";
import "../Strategies/local_strategy.mjs"
const router = Router();


router.get("/api/users/auth/status",(request,response)=>{
  console.log(request.session);
  console.log(request.session.id);
  console.log(request.user);
  return response.sendStatus(200);
})
router.post("/api/users/register",
  checkSchema(UserValidationSchema),
  async (request, response)=>{
    const result = validationResult(request);
    if(!result.isEmpty()) return response.status(200).send({msg : "errors are present"});
    const {body} = request;
    body.subscription_id==="basic" ? body.subscription_id=1 : body.subscription_id=2 ; 
    let amount,user_id,paymentid;
    try{
      const [results]=await pool.query('select monthly_price from subscriptions where subscription_id = ?',[body.subscription_id]);
      if (results.length===0) return response.status(404).send({msg : "there's no such subscription_id"});
      amount = results[0].monthly_price;
      console.log("amount initialised successfully");
    }catch(err){
      console.error("fetching monthly_price from subscriptions failed due to",err);
      return response.status(500).send({msg : "subscription table fetching failed"});
    }
    try{
      const sql1='insert into users set ?'; 
      const [result]=await pool.query(sql1, body);
      user_id=result.insertId;
      console.log("insertion to users successful, userid : ",user_id);
    }catch(err){
      console.error("error while inserting user details",err);
      return response.status(500).send({msg : "error while inserting to users"});
    }    
    try{
      const [result1] =await pool.query('insert into payments(user_id,subscription_id,amount) values(?,?,?)',[user_id, body.subscription_id, amount]);
      paymentid=result1.insertId;
      console.log("insertion to payments successful");
      return response.status(200).send({idpayment : paymentid});
    }catch(err){
      console.error("error while inserting payments details",err);
      return response.status(500).send({msg : "error while inserting to payments"});
    }
});



router.post("/api/users/login", async (request,response)=>{
  const {body :{name,password}}=request;
  try{
    const [results] = await pool.query('select user_id from users where (email=? or username=?) and password = ?',[name,name,password]);
    if(!results) return response.status(404).send({msg :"not found"});
    return response.status(200).send(results[0]);
  }catch(err){
    console.error("error :",err);
  } 
});


router.post("/api/users/changePassword/:id", async (request, response)=>{
  const {params:{id},body:{name}} = request;
  const parsedId =  parseInt(id);
  try{
    const [result] = await pool.query('update users set password = ? where user_id = ?',[name,parsedId]);
    return response.status(200).send({msg : "updated"});
  }catch(err){
    console.error("error :",err);
    return response.status(200).send({msg : "error while updating "});
  }

});


export default router;