import express from 'express';
import mysql from "mysql2/promise";
import MySQLStore from 'express-mysql-session';
import userRouter from './Routes/forLogin.mjs';
import movieRouter from './Routes/forMovie.mjs';
import profileRouter from './Routes/forProfile.mjs'
import watchRouter from './Routes/forWatchHistory.mjs'
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import "./Strategies/local_strategy.mjs"


const pool = mysql.createPool({
  host: 'localhost',    // your DB host
  user: 'root',         // your MySQL username
  password: 'sumithaanandra6238', // your MySQL password
  database: 'dbmsmicroproject', // your database name
});

const sessionStore = new MySQLStore({}, pool);

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'yourSecretKey',  
  resave: false,            
  saveUninitialized: false, 
  store:  sessionStore,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
  },
}));



const PORT = process.env.PORT || 3033;

app.use(passport.initialize());
app.use(passport.session());


app.use(userRouter);
app.use(movieRouter);
app.use(profileRouter);
app.use(watchRouter);

app.get("/",(request,response) =>{
  request.session.visited=true;
  return response.send({msg:"Hello Bitch"});
});

app.get('/data', async (request, response) => {
  try{
    const [results]=await pool.query('select * from genres');
    return response.status(200).send(results);
  }catch(err){
    console.error("error while fetching user object for deserializing verification: ",err);
    return response.status(500).send({msg : "error while fetching user object for deserializing verification"});
  }
});

app.listen(PORT,() =>{
  console.log(`running on port ${PORT}`);
});

export {pool};