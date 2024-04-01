const express = require('express');
const app =express();
const cors = require('cors');
const middleware=require('./middleware/middleware');
const {logsDataCalls,checkStatusCall,authMiddleware,adminOnly}=require('./middleware/middleware');
const  bodyParser= require('body-parser');
const proudects=require('./controllers/proudects.controller');
const catrgories=require('./controllers/catrgories.controllers');
const users=require('./controllers/users.controller');
const PORT = 8000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(middleware,proudects);
app.use(proudects);
app.use(catrgories);

app.use(logsDataCalls,proudects);
app.use(checkStatusCall,proudects);
app.use(logsDataCalls,catrgories);
app.use(checkStatusCall,catrgories);
//app.use(catrgories);
app.use(users);
app.use(authMiddleware,users);
app.use(adminOnly,users);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://zeldanechama:<6xDt2ZKX9MD0pNvx>@cluster0.w02o9aw.mongodb.net/local_libarty?retryWrites=true&w=majority&appName=Cluster0";

main().catch((err) => console.log(err));
async function main() {
 try {
  await mongoose.connect(mongoDB);
 } catch (error) {
  console.log(error);
  
 }
}

