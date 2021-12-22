const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyparser = require("body-parser");



//middleware
app.set("view engine", "hbs");
const encoder = bodyparser.urlencoded({ extended: false });


//checking database connected is not
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blogpost"
});

conn.connect((err, res) => {
    if (err) {
        throw err;
    }
    else {
        //  console.log(res);
        console.log("database connected..");
    }
})

//###################
//app.use(auth);


//#####################




app.get("/", (req, res) => {
    res.render("login");
})



app.post("/", encoder, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sql = "INSERT INTO `login` (`id`, `email`, `password`) VALUES ('null',' " + req.body.username + " ',' " + req.body.password + " ')";

    conn.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("home");
            console.log("log in added");
        }
    })
})


app.get("/home", (req, res) => {
    const nw = ("select * from blog");
    conn.query(nw, (err, show) => {
        if (err) {
            throw err;
        }
        else {
            res.render("home", { show });
            console.log("data is presenting on home from blog")
        }
    })

})

//#########################blog creating################

app.get("/blogus",(req,res)=>{
    res.render("blogus1");
})



app.post("/blogus",encoder,(req,res)=>{
    const head=req.body.he;
    const tail=req.body.tail;
    console.log("cretaed blog heading is:="+head);
    console.log("creted blog contetnt is:="+tail);

   const de="INSERT INTO `blog` (`id`, `title`, `blog`) VALUES ('null',' " + req.body.he + " ',' " + req.body.tail + " ')";
   conn.query(de,(err,row,sh)=>{
        if(err){
            console.log(err);
        }
      
       else{
        res.redirect("/home");
        //   res.status(200);
       }
       
   })
})





//###############################################
app.get("/seefull/:id",(req,res)=>{
   const sanam= req.params.id;
   const er=" select * from blog where id='" + req.params.id + "'   ";
    conn.query(er, (err, show) => {
        if (err) {
            throw err;
        }
        else {
            res.render("seefull",{show,sanam});
            console.log("full data is showing on seefull page");
        }
    })
})
//###################







app.post("/seefull",encoder,(req, res) => {
 //   var y=req.body.id;
//  var q = url.parse(req.url, true).href;
// console.log (req.originalUrl);
// var y=JSON.parse(JSON.stringify(url.parse(req.url, true)));
//  
  const bg=req.body.eid;
  console.log(req.body.feedback) ;
  console.log(bg) ;
const sl = "INSERT INTO `comment` (`id`, `blogid`) VALUES ('null','"+req.body.eid+"')";
conn.query(sl, (err, data) => {
    if (err) {
        throw err;
    }
    else {
        console.log("added...")
        res.redirect("/home");
    }
 })

//res.redirect("home");
})

















//##########comment box#########//

app.get("/feedback/:id", (req, res) => {
    //  const vq="select * from sss where id='"+req.params.id+"'";
    
    res.render("feedback");
    //    console.log(vq);
})







//#############server ############//
app.listen(1000, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("server connected...")
    }
})