const mongoose = require("mongoose");
const app = require("./index");

const database_connect = async()=>{
    try{
        mongoose.connect(
            "mongodb://127.0.0.1/csrf_database" , {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Database connected successfully!");
    }catch(err){
        console.log("cannot connect to the database");
    }
}
database_connect();

app.listen(4000,()=>{
   console.log("serving @ port 4000");
});