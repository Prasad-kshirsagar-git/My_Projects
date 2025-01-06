const userModel = require("../models/user");
const logModel = require("../models/logs");

exports.getAllUsers = async (req, res) => {
  let Users = [];

  const user = req.session.user;
  const securityKey = user.securityKey;

  try {
    const allUsers = await userModel.AllUsers(securityKey);
    if (allUsers && allUsers.length > 0) {
      allUsers.forEach((user) => {
        if (user.role === "Patient") {
          Users.push(user);
        }
      });
    }
  } catch (err) {
    console.error("Error fetching medicines:", err);
  }

  res.render("admin/all_User", {
    pageTitle: "all_User Page",
    currentPage: "all_User",
    Users,
  });
};

exports.getAdminDashboard = async (req, res) => {
  const user = req.session.user;

  res.render("admin/admin_dashboard", {
    pageTitle: "admin_dashboard Page",
    currentPage: "admin_dashboard",
    user,
  });
};

exports.getLogs = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const securityKey = req.session.securityKey;
    const log = new logModel();
    const userLog = await log.userLogs(userId, securityKey); // Fetch logs for the user

    const user = await userModel.findUserById(userId);
    const userStr = JSON.stringify(user);
    const obj = JSON.parse(userStr);
    const userName = obj?.userName || "Unknown User";

    // Render the user_Log.ejs view and pass the data
    res.render("admin/user_Log", {
      pageTitle: "User Log Page",
      currentPage: "user_Log",
      userLog,
      userId,
      userName: userName,
    });
  } catch (error) {
    console.error("Error fetching user logs:", error);

    res.status(500).send("An error occurred while fetching user logs.");
  }
};
