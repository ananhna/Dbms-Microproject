import { Router } from "express";
import { pool } from "../index.mjs";
const router = Router();

router.get("/api/users/moviegrid/:id/:age",async (request,response) => {
    const {query :{filter},params:{id,age}} =request;
    const parsedId = parseInt(id);
    const parsedAge = parseInt(age);
    let resultsss;
    try{
      [resultsss] = await pool.query('select subscription_id from users where user_id in (select user_id from profiles where profile_id=?)',parsedId);
    }catch(err){
      console.error("error while fetching subscription_id :",err);
    }
    if(resultsss[0].subscription_id===2){
      if(parsedAge>18){
        try{
          const [results] = await pool.query("select * from movies where movie_title like ? order by movie_title", [`%${filter}%`]);
          return response.status(200).send(results);
        }catch(err){
          console.error("error while fetching movies");
          return response.status(500).send({msg : err});
        }
      }
      try{
        const [resultss] = await pool.query("select * from movies where (movie_title like ?) and (age_rating = 'forallage') order by movie_title", [`%${filter}%`]);
        return response.status(200).send(resultss);
      }catch(err){
        console.error("error while fetching movies which are for kids too");
        return response.status(500).send({msg : err});
      }

    }
    if(parsedAge>18){
      try{
        const [results] = await pool.query("select * from movies where (movie_title like ?) and (rating<8.5) order by movie_title", [`%${filter}%`]);
        return response.status(200).send(results);
      }catch(err){
        console.error("error while fetching movies");
        return response.status(500).send({msg : err});
      }
    }
    try{
      const [resultss] = await pool.query("select * from movies where (movie_title like ?) and (age_rating = 'forallage') and (rating<8.5) order by movie_title", [`%${filter}%`]);
      return response.status(200).send(resultss);
    }catch(err){
      console.error("error while fetching movies which are for kids too");
      return response.status(500).send({msg : err});
    }

});

router.get("/api/users/movies/:id", async (request,response)=>{
  const {params:{id}}=request;
  const parsedId=parseInt(id);
  let resultsC;
  try{
    const [results] = await pool.query('select * from movies as m join languages as l where (m.language_id=l.language_id) and (m.movie_id=?)',[parsedId]);
    console.log(results[0]);
    resultsC=results[0];
    // return response.status(200).send(results[0]);
  }catch(err){
    console.error("error while fetching the specific movie",err);
    return response.status(500).send({msg : err});
  }

  try{
    const [resultss] = await pool.query('select g.genre_name from movies as m join languages as l join movie_genre_junction as mgj join genres as g where (m.language_id=l.language_id) and (m.movie_id=mgj.movie_id) and (g.genre_id=mgj.genre_id) and (m.movie_id=?) order by m.movie_id',[parsedId]);
    console.log(resultss);
    return response.status(200).send({resultss,resultsC});
  }catch(err){
    console.error("error while fetching the specific movie",err);
    return response.status(500).send({msg : err});
  }
  
});
export default router;