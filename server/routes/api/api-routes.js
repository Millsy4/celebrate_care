const router = require("express").Router();
const util = require("util");
var db = require("../../models");
const eventsController = require("../../controllers/eventsController");

router
  .route("/")
  .get(eventsController.findAll())
  .post(eventsController.create());

// Event List Get Route
// router.route("/api/eventtable").get(function(req, res) {
//   db.Eventtable.findAll({}).then(function(dbEventtable) {
//     res.json(dbEventtable);
//   });
// });

// // Event List Post Route
// router.route("/api/eventtable").post(function(req, res) {
//   db.Eventtable
//     .create({
//       eventIdea: req.body.eventIdea,
//       startDate: req.body.startDate,
//       endDate: req.body.endDate,
//     })
//     .then(function(dbEventtable) {
//       res.json(dbEventtable);
//     });
// });

// // Family Code Get Route
// router.route("/api/familycode").get(function(req, res) {
//   db.Familycode.findAll({}).then(function(dbFamilycode) {
//     res.json(dbFamilycode);
//   });
// });

// // Family Code Post Route
// router.route("/api/familycode").post(function(req, res) {
//   db.Familycode.create().then(function(dbFamilycode) {
//     res.json(dbFamilycode);
//   });
// });

// // User Table Get Route
// router.route("/api/usertable").get(function(req, res) {
//   db.Usertable.findAll({}).then(function(dbUsertable) {
//     res.json(dbUsertable);
//   });
// });

// // User Table Post Route
// router.route("/api/usertable").post(function(req, res) {
//   db.Usertable.create().then(function(dbUsertable) {
//     res.json(dbUsertable);
//   });
// });

// Sign Up Post Route
// router.route("/api/signup").post(function (req, res) {
//   db.Usertable.create().then(function (dbUserTable) {
//     db.Familycode.findAll({}).then(function (dbFamilycode) {
//       if 
//      })
//     //find by familycode, if exists, continue, if not then create family code....add to familyties table
//     db.FamilyCode.create()
//   })
//   //return json with user email and family code 
// })

module.exports = router;
