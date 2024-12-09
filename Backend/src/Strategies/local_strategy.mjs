import passport from "passport";
import { comparePassword } from "../helpers/HashPassword.mjs";
import { Strategy } from "passport-local";
import { getUserByEmailPassword, getUserById} from "../helpers/querieFunctions.mjs";


passport.serializeUser((user,done)=>{
  console.log("Inside serialize User");
  done(null,user.user_id);
});

passport.deserializeUser(async (id,done)=>{
  console.log("Inside deserializing function");
  try{
    const findUser = await getUserById(id);
    done(null,findUser);
  }catch(err){
    done(err,null);
  }
});

export default passport.use(
  new Strategy(async (username,password,done)=>{
    console.log(username);
    try{
      const findUser = await getUserByEmailPassword(username);
      if(!findUser) return response.status(404).send({msg : "User not found"});
      if(!comparePassword(password, findUser.password)) return response.status(400).send({msg : "Invalid Credentials"});
      done(null, findUser);
    }
    catch(err){
      done(err,null);
    }
  })
)