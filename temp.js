const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const express = require('express');

const app = express();

const omdbSearch = require('omdb-api-search')

const omdb = omdbSearch.createClient('98f9bf5')

app.use(express.static("public"))

app.get('/',(req,res) => {
    res.sendFile(__dirname+'/index.html')
})
  
  app.get('/login', (req, res) => {
    res.sendFile(__dirname+"/login.html");
  });
  
  app.get('/signup', (req, res) => {
    res.sendFile(__dirname+"/signup.html");
  });
  
  app.get('/signupsubmit', (req, res) => {
    db.collection('database').add({
        user: req.query.upuser,
        pass: req.query.uppass
    }).then(()=>{
        res.send("Sign up succesfull"+'<!DOCTYPE html> <html> <head> <title>Log In</title> <style> div { border: 5px solid green; border-radius: 10cm; width: 10cm; } h1{ color: green; } label{ color: white; background-color: green; border-radius: 4px; } button{ border: 2px solid green; border-radius: 5px; color: green; background-color: white; } button:hover { color: white; background-color: green; } </style> </head> <body> <center> <div> <center> <h1>LOG IN</h1> <form action="/loginsubmit" method="GET"> <label>Username :</label> <input type="text" name="inuser"> <br><br> <label>Password :</label> <input type="password" name="inpass"> <br><br> <button type="submit">Log In</button> <br><br> </form> </center> </div> </center> </body> </html>');
    });
  });

  app.get('/loginsubmit', (req,res) => {
    db.collection('database')
    .where("user","==",req.query.inuser)
    .get().then((docs)=>{
        docs.forEach((doc) => {
        if(doc.data().pass==req.query.inpass)
        {
            res.send('<!DOCTYPE html> <html lang="en"> <head> <title>Movie Information</title> <style> body { color: green; } #in { display: none; } button{ border: 2px solid green; border-radius: 5px; color: green; background-color: white; } button:hover { color: white; background-color: green; } ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; border: 5px solid green; background-color: #f3f3f3; border-radius: 50px; } li { float: left; font-size: 50px; } li a { display: block; color: #666; text-align: center; padding: 14px 16px; text-decoration: none; } li a:hover:not(.active) { background-color: #ddd; } li a.active { color: white; background-color: #04AA6D; } #lo { margin-left: 70px; } #hd { margin-left: 330px; font-size: 40px; } </style> <script src="server.js"></script> </head> <body> <ul> <li id="hd">Movie Information</li> <form action="/history"> <input type="text" id="in" name="inuser" value='+req.query.inuser+'> <li id="lo"><button type="submit">History</button></li> </form> <form action="/logout"> <li id="lo"><button type="submit">log out</button></li> </form> </ul> <br> <center> <form action="/search" method="GET"> <input type="text" id="in" name="inuser" value='+req.query.inuser+'> <br> <input type="text" name="movieName" placeholder="Enter movie name" required> <button type="submit">Search</button> </form> <br> </center> </body> </html> ')
        }
        else{
            res.send("Invalid credentials");
        }
    })
    })
  })

  app.get('/search', async (req, res) => {
    var movien = req.query.movieName;
    try {
        omdb.findOneByTitle(movien, (err, movie) => {
          if(movie!=null)
          {
          res.send('<!DOCTYPE html> <html lang="en"> <head> <title>Movie Information</title> <style> table { border-spacing: 30px; } th { font-size: 35px; } td { font-size: 35px; } body { color: green; } button{ border: 2px solid green; border-radius: 5px; color: green; background-color: white; } button:hover { color: white; background-color: green; } ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; border: 5px solid green; background-color: #f3f3f3; border-radius: 50px; } li { float: left; } li a { display: block; color: #666; text-align: center; padding: 14px 16px; text-decoration: none; } li a:hover:not(.active) { background-color: #ddd; } li a.active { color: white; background-color: #04AA6D; } #lo { margin-left: 100px; } #hd { margin-left: 330px; font-size: 40px; } div { border: 5px solid green; border-radius: 50px; } #in { display: none; } </style> <script src="server.js"></script> </head> <body> <ul> <li id="hd">Movie Information</li> <form action="/history"> <input type="text" id="in" name="inuser" value='+req.query.inuser+'> <li id="lo"><button type="submit">History</button></li> </form> <form action="/logout"> <li id="lo"><a><button type="submit">log out</button></a></li> </form> </ul> <br> <center> <form action="/search" method="GET"> <input type="text" id="in" name="inuser" value='+req.query.inuser+'> <br> <input type="text" name="movieName" placeholder="Enter movie name" required> <button type="submit">Search</button> </form> <br> <div> <table> <tr> <th>Title</th> <td>'+movie.Title+'</td> <td><img src='+movie.Poster+' alt="No poster"></td> </tr> <tr> <th>Year</th> <td>'+movie.Released+'</td> </tr> <tr> <th>Genre</th> <td>'+movie.Genre+'</td> </tr> <tr> <th>Plot</th> <td>'+movie.Plot+'</td> </tr> </table> </div> </center> </body> </html> ');
          db.collection('history').add({
            user: req.query.inuser,
            his: movien
        });
        }
          else
          {
            res.send('<!DOCTYPE html> <html lang="en"> <head> <title>Movie Information</title> <style> table { border-spacing: 30px; } th { font-size: 35px; } td { font-size: 35px; } body { color: green; } button{ border: 2px solid green; border-radius: 5px; color: green; background-color: white; } button:hover { color: white; background-color: green; } ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; border: 5px solid green; background-color: #f3f3f3; border-radius: 50px; } li { float: left; } li a { display: block; color: #666; text-align: center; padding: 14px 16px; text-decoration: none; } li a:hover:not(.active) { background-color: #ddd; } li a.active { color: white; background-color: #04AA6D; } #lo { margin-left: 100px; } #hd { margin-left: 330px; font-size: 40px; } div { border: 5px solid green; border-radius: 50px; } #in { display: none; } </style> <script src="server.js"></script> </head> <body> <ul> <li id="hd">Movie Information</li> <form action="/history"> <input type="text" id="in" name="inuser" value='+req.query.inuser+'> <li id="lo"><button type="submit">History</button></li> </form> <form action="/logout"> <li id="lo"><a><button type="submit">log out</button></a></li> </form> </ul> <br> <center> <form action="/search" method="GET"> <input type="text" id="in" name="inuser" value='+req.query.inuser+'> <br> <input type="text" name="movieName" placeholder="Enter movie name" required> <button type="submit">Search</button> </form> <br> <div> <table> <tr> <th>Movie Not Found</th> </tr> </table> </div> </center> </body> </html> ')
          }
        })
    } catch (error) {
        res.send('<!DOCTYPE html> <html lang="en"> <head> <title>Movie Information</title> <style> table { border-spacing: 30px; } th { font-size: 35px; } td { font-size: 35px; } body { color: green; } button{ border: 2px solid green; border-radius: 5px; color: green; background-color: white; } button:hover { color: white; background-color: green; } ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; border: 5px solid green; background-color: #f3f3f3; border-radius: 50px; } li { float: left; } li a { display: block; color: #666; text-align: center; padding: 14px 16px; text-decoration: none; } li a:hover:not(.active) { background-color: #ddd; } li a.active { color: white; background-color: #04AA6D; } #lo { margin-left: 100px; } #hd { margin-left: 330px; font-size: 40px; } div { border: 5px solid green; border-radius: 50px; } #in { display: none; } </style> <script src="server.js"></script> </head> <body> <ul> <li id="hd">Movie Information</li> <form action="/history"> <input type="text" id="in" name="inuser" value='+req.query.inuser+'> <li id="lo"><button type="submit">History</button></li> </form> <form action="/logout"> <li id="lo"><a><button type="submit">log out</button></a></li> </form> </ul> <br> <center> <form action="/search" method="GET"> <input type="text" id="in" name="inuser" value='+req.query.inuser+'> <br> <input type="text" name="movieName" placeholder="Enter movie name" required> <button type="submit">Search</button> </form> <br> <div> <table> <tr> <th>Movie Not Found</th> </tr> </table> </div> </center> </body> </html> ')
    }
});

app.get('/history', async (req, res) => {
    const snapshot = await db.collection('history')
      .where("user", "==", req.query.inuser)
      .get();

    let temp = "";
    snapshot.forEach((doc) => {
      temp = temp + "<p>" + doc.data().his + "</p>";
    });
    res.send('<!DOCTYPE html> <html lang="en"> <head> <title>Movie Information</title> <style> table { border-spacing: 30px; } th { font-size: 35px; } td { font-size: 35px; } body { color: green; } button{ border: 2px solid green; border-radius: 5px; color: green; background-color: white; } button:hover { color: white; background-color: green; } ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; border: 5px solid green; background-color: #f3f3f3; border-radius: 50px; } li { float: left; } li a { display: block; color: #666; text-align: center; padding: 14px 16px; text-decoration: none; } li a:hover:not(.active) { background-color: #ddd; } li a.active { color: white; background-color: #04AA6D; } #lo { margin-left: 100px; } #hd { margin-left: 330px; font-size: 40px; } div { border: 5px solid green; border-radius: 50px; } #in { display: none; } </style> <script src="server.js"></script> </head> <body> <ul> <li id="hd">Movie Information</li> <form action="/history"> <input type="text" id="in" name="inuser" value='+req.query.inuser+'> <li id="lo"><button type="submit">History</button></li> </form> <form action="/logout"> <li id="lo"><a><button type="submit">log out</button></a></li> </form> </ul> <br> <center> <form action="/search" method="GET"> <input type="text" id="in" name="inuser" value='+req.query.inuser+'> <br> <input type="text" name="movieName" placeholder="Enter movie name" required> <button type="submit">Search</button> </form> <br> <div> '+temp+' </div> </center> </body> </html> ')
});

app.get('/logout', (req, res) => {
  res.sendFile(__dirname+"/index.html");
});
  app.listen(3000)