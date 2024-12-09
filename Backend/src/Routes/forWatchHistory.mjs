import { response, Router } from "express";
import { pool } from "../index.mjs";


const router = Router();

router.get("/api/users/watchHistory/:id",async (request, response)=>{
  const {params:{id}} = request;
  const parsedId = parseInt(id);
  try{
    const [result] = await pool.query('select wh.watch_id, wh.watched_at,m.movie_title, m.director_name from watch_history as wh join movies as m  where (wh.profile_id = ?) and (wh.movie_id=m.movie_id) order by wh.watch_id desc',parsedId);
    return response.status(200).send(result);
  }catch(err){
    console.error("something worng while fetching movie details from the table : ",err);
    return response.status(500).send({msg : "something wrong while fetching movie details from database"});
  }
});

router.post("/api/users/watchHistory/:profileId/:movieId",async (request, response)=>{
  const {params:{profileId,movieId}} = request;
  const parsedProfileId = parseInt(profileId);
  const parsedMovieId = parseInt(movieId);
  try{
    console.log("in try block");
    const [result] = await pool.query('insert into watch_history(profile_id,movie_id) values(?,?)',[parsedProfileId, parsedMovieId]);
    return response.status(200).send({watch_id: result.insertId});
  }catch(err){
    console.error("error occured while inserting  into watch_history table",err);
    return response.status(500).send({msg : err});
  }
});

export default router