const mongoose=require("mongoose");
const DataSchema=new mongoose.Schema({
    id:{
      type:String,
      require:true
    },
    name:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true

    },
    desg:{
        type:String,
        require:true
    },
    salary:{
        type:String,
        require:true
    },
    image:{
        type:Object,
        
    }
})

module.exports=mongoose.model("employee",DataSchema);
