//  jshint esversion:6

const express=require("express");
const bosyParser=require("body-parser");
const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:27017/todolistDB");
const date =require(__dirname + "/date.js")
//let items=["Buy food","Bath"];
let workItems=[];
const app=express();
app.use(bosyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

const ItemsSchema={
    name:String
};
const Item =mongoose.model("Item",ItemsSchema);
  const item1=new Item({
    name:"Buy food"
  })
  const item2=new Item({
    name:"Cook food"
  })
  const ItemsArray=[item1,item2];
  //Item.insertMany(ItemsArray);

app.get("/",function(req,res){
const data=  Item.find({});
console.log(data)
    if(data.length==0){
        Item.insertMany(ItemsArray);
        res.redirect("/")
    }
    else{
      let day=date();
      res.render("list",{
        listTitle:day,
        newListItems:ItemsArray
      })
    }
})
app.post("/",function(req,res){
  let re=req.body.newItem;

  const item=new Item({
    name:re
})
  item.save();
  res.redirect("/");

})
app.get("/work",function(req,res){

  res.render("list",{listTitle:"Work List",newListItems:workItems});
})


app.listen(3000,function(){

})
