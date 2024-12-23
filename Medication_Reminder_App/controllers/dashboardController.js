exports.getAddMedicine = (req, res, next) => {
  res.render("user/add_Medicine", {
    pageTitle: "Add Medicine",
    currentPage: "add_Medicine",
  });
}