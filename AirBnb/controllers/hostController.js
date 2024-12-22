// const { registeredHomes } = require("../../dynamic_UI/routes/hostRouter");
const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views','addHome.html'));
  res.render('host/edit_Home',{
    pageTitle: 'Add home to Airbnb', currentPage:'addHome' ,
    editing: false,  
  });
};
// exports.getAddHome = getAddHome;

exports.getEditHome = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views','addHome.html'));
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then(home => {
    if(!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host_home_list");
    }

    console.log(homeId, editing, home)
    res.render('host/edit_Home',{
      home: home,
      pageTitle: 'Edit your home', 
      currentPage:'host-homes',
      editing: editing,
    });
  })
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    res.render('host/host_home_list', {
      registeredHomes: registeredHomes, 
      pageTitle:'host Home List', 
      currentPage:'host_homes'
    })
  });
}

exports.postAddHome = (req, res, next) => {
  console.log('home registration successful for: ', req.body);

  const {houseName, price, location, rating, photoUrl, description} = req.body;

  const home = new Home(houseName, price, location, rating, photoUrl, description);

  
  // const home = new Home(req.body.houseName,req.body.price,req.body.location,req.body.rating, req.body.photoUrl);
  home.save().then(() =>{
    console.log("Home save Successfully:-> \n");
  });

  // res.sendFile(path.join(rootDir, 'views','homeAdded.html'));
  // res.render('host/home_Added', {pageTitle: 'Home Added Successfully', currentPage: 'homeAdded' });

  res.redirect('/host/host-home-list');
};

exports.postEditHome = (req, res, next) => {
  console.log('home registration successful for: ', req.body);

  const {id, houseName, price, location, rating, photoUrl, description} = req.body;

  const home = new Home(houseName, price, location, rating, photoUrl, description, id);

  // const home = new Home(req.body.houseName,req.body.price,req.body.location,req.body.rating, req.body.photoUrl);

  home.save().then(result => {
    console.log("Home Updated:->\n", result);
  });

  // res.sendFile(path.join(rootDir, 'views','homeAdded.html'));
  res.redirect('/host/host-home-list');
};


exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  console.log("Came to Delete ", homeId);
  Home.deleteById(homeId).then(() => {
    res.redirect('/host/host-home-list');
  }).catch(error => {
    console.log("Error Occure While Deleting Home", error);
  })
};