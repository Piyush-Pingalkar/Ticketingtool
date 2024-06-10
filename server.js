// const express=require('express')
// const mongoose=require('mongoose')
// const path=require('path')
// const port=3019

// const app=express();
// app.use(express.static(__dirname))
// app.use(express.urlencoded({extended:true}))

// mongoose.connect('mongodb://127.0.0.1:27017/ticket')

// const db=mongoose.connection
// db.once('open',()=>{
//     console.log("Mongodb connection sucessful")
// })

// const clientschema=new mongoose.Schema({
//     name:String,
//     mobile:String,
//     seat:String,
//     date:Number,
//     query:String
// })

// const clients=mongoose.model("data",clientschema)

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'index.html'))
// })

// app.post('/post',async(req,res)=>{
//     console.log(req.body)
//     const {name,mobile,seat,date,query} = req.body;
//         const client = new clients({
//            name,
//            mobile,
//            seat,
//            date,
//            query
//      })
//      await client.save()
//      console.log(client);
//     // res.redirect('/'); // Redirect to the same page after submission
//     res.send(`
//         <script>
//           alert('Your form has been submitted successfully.');
//           window.location.href = '/';
//         </script>
//       `);
// })

// app.listen(port,()=>{
//     console.log("server started");
// })

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/ticket', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
  console.log("Mongodb connection successful");
});

const clientschema = new mongoose.Schema({
  ticketId: String,
  ClientCode: String,
  mobile: String,
  department: String,
  date: String,
  query: String
});

const clients = mongoose.model("data", clientschema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
  console.log(req.body);
  const { ClientCode, mobile, department, date, query } = req.body;

  // Generate a random ticket ID
  const ticketId = 'T' + Math.floor(Math.random() * 10000);

  const client = new clients({
    ticketId,
    ClientCode,
    mobile,
    department,
    date,
    query
  });

  await client.save();
  console.log(client);
  
  // Sending a response that includes a JavaScript alert and a redirect
  res.send(`
    <script>
      alert('Your form has been submitted successfully. Ticket ID: ${ticketId}');
      window.location.href = '/';
    </script>
  `);
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
