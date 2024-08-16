const mongoose=require("mongoose");
const data1=require("./data.js");

const Listing=require("../models/listing.js");

main().then(()=>{
    console.log("connection to database was sucessfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const iniData=async ()=>{
    await Listing.deleteMany({});
   let w= await data1.data.map((obj)=>({...obj,owner:"6676fbaaec7fefe3233fa67b"}));
    await Listing.insertMany(w);
    
    console.log("Data was deleted and inserted sucessfully");
}

iniData();