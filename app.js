//jshint esversion:6



const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
const mongoose = require('mongoose');
const url = "mongodb+srv://root:1122@cluster0-0zqgn.mongodb.net/newdb";
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});


 app.set("view engine","ejs");
 app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const articleSchema = new mongoose.Schema({
  ttitle: String,
  tauthor : String,
  tbody: String,
  timage: String
});

const Article = module.export = mongoose.model('Article', articleSchema);

const articlebSchema = new mongoose.Schema({
  btitle: String,
  bauthor : String,
  bbody: String,
bimage: String
});

const Articleb = module.export = mongoose.model('Articleb', articlebSchema);

const articlepSchema = new mongoose.Schema({
  ptitle: String,
  pauthor : String,
  pbody: String,
  pimage: String
});

const Articlep = module.export = mongoose.model('Articlep', articlepSchema);

const articlehSchema = new mongoose.Schema({
  htitle: String,
  hauthor : String,
  hbody: String,
  himage: String
});

const Articleh = module.export = mongoose.model('Articleh', articlehSchema);

//homepage
const itemsSchema = new mongoose.Schema({
  articletitle: String,
  article : String,
  autor: String
});

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
  articletitle: "Subject",
  article : "Comments",
  autor : "Author"
});

const defaultitems = [item1];


app.get("/", function(req, res){
Item.find({}, function(err, foundItems){

  if(foundItems.length === 0){
    Item.insertMany(defaultitems, function(err){
      if(err){
        console.log(err);
      }
      else {
        console.log("Successfully written default values");
      }
    });
    res.redirect('/');
  }
  else{
    var t = "Todays Breaking News";
  res.render('news', {newsTitle: t, newArticleItems : foundItems});
  }

});


});

app.post('/delete', function(req, res){
  var checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, function(err){
    if (!err) {
      console.log("Successfully delete the item");
      res.redirect('/');
    }
  });
});

app.post('/', function(req, res){
  const itemName = req.body.newItem;
  const itemTitle = req.body.newTitle;
  const itemAutor = req.body.newAutor;


const item = new Item({
  article : itemName,
  articletitle: itemTitle,
  autor: itemAutor
});
item.save();
res.redirect('/');
});

//end of home page


//business
app.get("/business", function(req, res){
  Articleb.find({}, function(err, barticles){
    if(err){
      console.log(err);
    } else {
      res.render("business",{
        barticles: barticles
      });
    }

});
});
//select
app.get('/barticle/:id', function(req,res){
  Articleb.findById(req.params.id, function(err, barticle){
    res.render('barticle', {
      barticle:barticle
    });
  });
});
//add
app.get("/barticles/add", function(req, res){
    res.render("addbarticle",{
      addbarticle: 'addbarticle'
    });
});

app.post('/barticles/add', function(req, res){
  var barticle = new Articleb();
  barticle.btitle = req.body.btitle;
  barticle.bbody = req.body.bbody;
  barticle.bauthor = req.body.bauthor;
  barticle.bimage = req.body.bimage;

  barticle.save(function(err){
    if (err){
      console.log(err);
      return;
    } else{
      res.redirect('/business');
    }
  });
});
//Edit
app.get('/barticle/edit/:id', function(req,res){
  Articleb.findById(req.params.id, function(err, barticle){
    res.render('bedit', {
      barticle:barticle
    });
  });
});

// update
app.post('/barticles/edit/:id', function(req, res){
var barticle = {};
  barticle.btitle = req.body.btitle;
  barticle.bbody = req.body.bbody;
  barticle.bauthor = req.body.bauthor;
  barticle.bimage = req.body.bimage;

var bquery = {_id:req.params.id};

  Articleb.update(bquery, barticle, function(err){
    if (err){
      console.log(err);
      return;
    } else{
      res.redirect('/business');
    }
  });
});

//delete
app.post('/bdelete', function(req, res){
  var bartickeCheckedId = req.body.checkbox;
  Articleb.findByIdAndRemove(bartickeCheckedId, function(err){
    if (!err) {
      console.log("Successfully delete the item");
      res.redirect('/business');
    }
  });
});
// end business

//Sport
app.get("/sport", function(req, res){
  Articlep.find({}, function(err, particles){
    if(err){
      console.log(err);
    } else {
      res.render("sport",{
        particles: particles
      });
    }

});
});
//select
app.get('/particle/:id', function(req,res){
  Articlep.findById(req.params.id, function(err, particle){
    res.render('particle', {
      particle:particle
    });
  });
});
//add
app.get("/particles/add", function(req, res){
    res.render("addtarticle",{
      addparticle: 'addparticle'
    });
});

app.post('/particles/add', function(req, res){
  var particle = new Articlep();
  particle.ptitle = req.body.ptitle;
  particle.pbody = req.body.pbody;
  particle.pauthor = req.body.pauthor;
  particle.pimage = req.body.pimage;

  particle.save(function(err){
    if (err){
      console.log(err);
      return;
    } else{
      res.redirect('/sport');
    }
  });
});
//Edit
app.get('/particle/edit/:id', function(req,res){
  Articlep.findById(req.params.id, function(err, particle){
    res.render('pedit', {
      particle:particle
    });
  });
});

// update
app.post('/particles/edit/:id', function(req, res){
var particle = {};
  particle.ptitle = req.body.ptitle;
  particle.pbody = req.body.pbody;
  particle.pauthor = req.body.pauthor;
  particle.pimage = req.body.pimage;

var pquery = {_id:req.params.id};

  Articlep.update(pquery, particle, function(err){
    if (err){
      console.log(err);
      return;
    } else{
      res.redirect('/sport');
    }
  });
});

//delete
app.post('/pdelete', function(req, res){
  var partickeCheckedId = req.body.checkbox;
  Articlep.findByIdAndRemove(partickeCheckedId, function(err){
    if (!err) {
      console.log("Successfully delete the item");
      res.redirect('/sport');
    }
  });
});
//end sport

//health
app.get("/health", function(req, res){
  Articleh.find({}, function(err, harticles){
    if(err){
      console.log(err);
    } else {
      res.render("health",{
        harticles: harticles
      });
    }

});
});
//select
app.get('/harticle/:id', function(req,res){
  Articleh.findById(req.params.id, function(err, harticle){
    res.render('harticle', {
      harticle:harticle
    });
  });
});
//add
app.get("/harticles/add", function(req, res){
    res.render("addharticle",{
      addharticle: 'addharticle'
    });
});

app.post('/harticles/add', function(req, res){
  var harticle = new Articleh();
  harticle.htitle = req.body.htitle;
  harticle.hbody = req.body.hbody;
  harticle.hauthor = req.body.hauthor;
  harticle.himage = req.body.himage;

  harticle.save(function(err){
    if (err){
      console.log(err);
      return;
    } else{
      res.redirect('/health');
    }
  });
});
//Edit
app.get('/harticle/edit/:id', function(req,res){
  Articleh.findById(req.params.id, function(err, harticle){
    res.render('hedit', {
      harticle:harticle
    });
  });
});

// update
app.post('/harticles/edit/:id', function(req, res){
var harticle = {};
  harticle.htitle = req.body.htitle;
  harticle.hbody = req.body.hbody;
  harticle.hauthor = req.body.hauthor;
  harticle.himage = req.body.himage;

var hquery = {_id:req.params.id};

  Articleh.update(hquery, harticle, function(err){
    if (err){
      console.log(err);
      return;
    } else{
      res.redirect('/health');
    }
  });
});

//delete
app.post('/hdelete', function(req, res){
  var hartickeCheckedId = req.body.checkbox;
  Articleh.findByIdAndRemove(hartickeCheckedId, function(err){
    if (!err) {
      console.log("Successfully delete the item");
      res.redirect('/health');
    }
  });
});
//end health


//travel
app.get("/travel", function(req, res){
  Article.find({}, function(err, tarticles){
    if(err){
      console.log(err);
    } else {
      res.render("travel",{
        tarticles: tarticles
      });
    }

});
});
//select
app.get('/tarticle/:id', function(req,res){
  Article.findById(req.params.id, function(err, tarticle){
    res.render('tarticle', {
      tarticle:tarticle
    });
  });
});
//add
app.get("/tarticles/add", function(req, res){
    res.render("addtarticle",{
      addarticle: 'addarticle'
    });
});

app.post('/tarticles/add', function(req, res){
  var tarticle = new Article();
  tarticle.ttitle = req.body.ttitle;
  tarticle.tbody = req.body.tbody;
  tarticle.tauthor = req.body.tauthor;
  tarticle.timage = req.body.timage;

  tarticle.save(function(err){
    if (err){
      console.log(err);
      return;
    } else{
      res.redirect('/travel');
    }
  });
});
//Edit
app.get('/tarticle/edit/:id', function(req,res){
  Article.findById(req.params.id, function(err, tarticle){
    res.render('tedit', {
      tarticle:tarticle
    });
  });
});

// update
app.post('/tarticles/edit/:id', function(req, res){
var tarticle = {};
  tarticle.ttitle = req.body.ttitle;
  tarticle.tbody = req.body.tbody;
  tarticle.tauthor = req.body.tauthor;
  tarticle.timage = req.body.timage;

var query = {_id:req.params.id};

  Article.update(query, tarticle, function(err){
    if (err){
      console.log(err);
      return;
    } else{
      res.redirect('/travel');
    }
  });
});

//delete
app.post('/tdelete', function(req, res){
  var tartickeCheckedId = req.body.checkbox;
  Article.findByIdAndRemove(tartickeCheckedId, function(err){
    if (!err) {
      console.log("Successfully delete the item");
      res.redirect('/travel');
    }
  });
});

//end ttravel
app.listen(3000, function(){

  console.log("Server started on port 3000.");

});
