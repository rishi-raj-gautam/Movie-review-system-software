import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app= express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"movies"
});

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json("hello this is backend");
});

app.get("/movies",(req,res)=>{
    const q= "SELECT * FROM reviews";
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data);
    });
});

app.post("/movies",(req,res)=>{
    const q= "INSERT INTO reviews(movieTitle,movieReview) VALUES (?)";
    const VALUES= [
        req.body.movieTitle,
        req.body.movieReview
    ];

    db.query(q,[VALUES],(err,data)=>{
        if (err) return res.json(err)
        return res.json(data);
    });
});

app.delete("/movies/:id", (req, res) => {
    const moviesId = req.params.id;
    // console.log(moviesId);
    const q = " DELETE FROM reviews WHERE movieID = ? ";
  
    db.query(q, [moviesId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.put("/movies/:id", (req, res) => {
    const moviesId = req.params.id;
    const q = "UPDATE reviews SET movieReview=? WHERE movieID = ?";
  
    const values = [
        req.body.movieReview
    ];
  
    db.query(q, [...values,moviesId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8000, ()=>{
    console.log("Connected to backend");
});
