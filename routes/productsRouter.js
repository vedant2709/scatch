const express=require("express");
const router=express.Router();

router.get("/",function(req,res){
    res.send("hey it's working from products route");
})

module.exports=router;