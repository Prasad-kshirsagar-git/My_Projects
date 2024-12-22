// const { registeredHomes } = require("../../dynamic_UI/routes/hostRouter");
const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    res.render('store/index', {
      registeredHomes: registeredHomes, 
      pageTitle:'airbnb Home', 
      currentPage: 'index'
    })
  });
}

exports.getHome = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    res.render('store/home_list', {
      registeredHomes: registeredHomes, 
      pageTitle:'Home List', 
      currentPage: 'Home'
    })
  });
}

exports.getBookings = (req, res, next) => {
  res.render('store/booking', {
    pageTitle:'My Bookings', 
    currentPage: 'bookings'
  }) 
}

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites()
  .then(favourites => {
    favourites = favourites.map(fav => fav.houseId);
    Home.fetchAll().then(registeredHomes => {

      console.log(favourites, registeredHomes);
      
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home._id.toString()));
      res.render('store/favourite_list', {
        favouriteHomes: favouriteHomes, 
        pageTitle:'My Favourite', 
        currentPage: 'favourite_list'
      })
    });
  })
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details page", homeId);

  Home.findById(homeId).then(home => {   
    if(!home) {
      console.log("Home Not found")
      res.redirect("/homes");
    } else {
      res.render('store/home_details', {
        home:home,
        pageTitle:'Home Details', 
        currentPage: 'Home'
      });
    }
  })
}

exports.postAddToFavourite = (req, res, next) => {
  
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  
  fav.save()
  .then(result => {
    console.log("home Added to Favourite: ", result);
  }).catch(error => {
    console.log("Error while marking favourite", error);
  }).finally(() => {
    res.redirect("/favourites");
  })
};

exports.postRemoveFromFavourite = (req, res, next) => {

  const homeId = req.params.homeId;
  
  Favourite.deleteById(homeId).then(result => {
    console.log("home Remove From Favourite: ", result);
  }).catch(error => {
    console.log("Error while Removing home favourite", error);
  }).finally(() => {
    res.redirect("/favourites");
  })
}