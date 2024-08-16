const Listing = require("../models/listing");
const ExpressError = require("../util/ExpressError");



const index = (req, res) => {
  Listing.find().then((res1) => {

    let data = res1;

    res.render("listings/listings.ejs", { data });
  }).catch((err) => {
    res.send(err.message);
  });
}



const newListing = (req, res) => {
  res.render("listings/new.ejs");
};


const showListing = (req, res) => {
  let { id } = req.params;
  Listing.find({ _id: id }).populate("reviews").populate("owner").then((res1) => {

    let data = res1[0];

    if (res1.length != 0) {
      res.render("listings/read.ejs", { data, req });
    }
    else {
      req.flash("error", "Listing does not exist");
      res.redirect("/listings");

    }

  }).catch((err) => {
    console.log("error");
  });
};

const createNewListing = async (req, res, next) => {



  let { title, description, url, price, location, country } = req.body;
  url = req.file.path;
  let obj = new Listing({
    title: title,
    description: description,

    image: {
      url: url
    },
    price: price || 0,
    location: location,
    country: country,
    owner: req.user._id
  });

  await obj.save();
  req.flash("super", "New listing is created!");
  res.redirect("/listings");


};

const editListing = async (req, res) => {
  let { id } = req.params;
  let data = await Listing.find({ _id: id });
  if (data.length != 0) {
    data = data[0];
    res.render("listings/edit.ejs", { data });
  }
};

const udpateListing = async (req, res) => {
  let { id } = req.params;

  let data = req.body;
  if (!req.body) {
    throw new ExpressError(404, "bad request");
  }

  let Listing1 = await Listing.findById(id);
  // if(req.user._id.equals(Listing.))

  await Listing.findOneAndUpdate({ _id: id }, { title: data.title, description: data.description, image: { url: data.url }, price: data.price, location: data.location, country: data.country });

  req.flash("super", "Listing was updated sucessfully ");
  res.redirect(`/listings/${id}`);

}

const deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);

  req.flash("super", "Listing was deleted sucessfully");
  res.redirect("/listings");
}

module.exports = { index, newListing, showListing, createNewListing, editListing, udpateListing, deleteListing };
