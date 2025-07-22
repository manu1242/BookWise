// const User = require("../models/User");

// const User = require("../models/User");
// const approveAdmin = async (req, res) => {
//   try {
//     const { data } = req.query;
//     if (!data) return res.status(400).send("Invalid approval link");

//     const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
//     const { email } = decoded;

//     const user = await User.findOne({ email });

//     if (!user || user.role !== "pending-admin") {
//       return res.status(404).send("No pending admin found");
//     }

//     user.role = "admin";
//     user.isAdminApproved = true;
//     await user.save();

//     return res.send(`<h2>✅ Admin Approved!</h2><p>You can now log in as admin.</p>`);
//   } catch (error) {
//     console.error("Admin Approval Error:", error);
//     res.status(500).send("Error approving admin.");
//   }
// };




// module.exports = approveAdmin;

