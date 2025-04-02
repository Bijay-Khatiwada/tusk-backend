// const express = require("express");
// const router = express.Router();
// const teamController = require("../controllers/team-controller");
// const upload = require("../multer");
// const { isAdmin } = require("../middleware/middleware");

// router.post('/create', upload.single('image'), teamController.createTeam);

// router.put('/update/:id', upload.single('image'), teamController.updateTeam);

// router.delete('/delete/:id', teamController.deleteTeam);
// router.get('/list', teamController.listTeams);
// router.get('/list/:id', teamController.getTeamById);

// //admin team routes
// router.delete("/admin/delete-team/:id", isAdmin, teamController.deleteTeam); //  Delete team
// router.put("/admin/update-team/:id", isAdmin, upload.single('image'), teamController.updateTeam); // 

// module.exports = router;