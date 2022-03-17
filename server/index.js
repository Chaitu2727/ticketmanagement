require("dotenv").config();
const mongodb=require('mongodb')
const mongoose=require('mongoose')
const MongoClient=mongodb.MongoClient
const express = require("express");
const app = express();
const cors = require("cors");
//const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const {User}=require("./models/user")
const Ticket=require("./models/Tickets")



// database connection
//connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/newticket", newRoutes);

// const client = new MongoClient(process.env.DB);
// client.connect();
// const db = client.db();
// const tickets = db.collection('users');
 
mongoose.connect(process.env.DB, {useNewUrlParser: true,useUnifiedTopology: true});
console.log("Connected to database successfully");


app.post('/newticket', (req, res) => {
const client = new MongoClient(process.env.DB);
 client.connect((err) => {
  const db = client.db();
  const tickets = db.collection('tickets');
  console.log(req.body);
  const newBody = {
   time: new Date(),
    "status":"assigned",
    ...req.body
  }  
const data=tickets.insertOne(newBody)
// const data=tickets.findOneAndUpdate({name:req.body.name},{ $set:{type:req.body.type, assignee:req.body.assignee,description:req.body.description,satus:"assigned"}})
res.json(data)
});
});

app.get('/newticket',async (req, res) => {
 
 const result= await User.find()
    res.json(result)

  });
  app.get('/mytickets/:id',async (req, res) => {
 
    const person= await User.find({_id:req.params.id})
    const result=await Ticket.find({name:person[0].name})
       res.json(result)
   
     });
        
   app.get("/:id",async(req,res)=>{
     const result=await User.find({_id:req.params.id})
     res.json(result)
   })       
  
   app.get('/myassignee/:id',async (req, res) => {
 
    const person= await User.find({_id:req.params.id})
    const result=await Ticket.find({assignee:person[0].name})
       res.json(result)
   
     });
 
     app.patch('/myassignee/:id', async (req, res)=> {
      var updateObject = req.body; 
      console.log(updateObject);
      var id = req.params.id;
      const result =await Ticket.findOneAndUpdate({_id  : id}, {$set: {status:updateObject.status}});
      res.json(result)
  });
 // });

app.get("/name/:id",async(req,res)=>{
  const result=await User.findOne({_id:req.params.id})
  res.send(result)
})

// app.get("/newticket", async(req,res)=>{
//   try{
//  const ticket=await tickets.find({})
//     res.send(ticket)
//   }
//     catch(error){
//       return console.log(error)
//     }
// })

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
