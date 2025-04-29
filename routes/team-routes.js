const express = require("express");
const router = express.Router();
const teamController = require("../controllers/team-controller");
const { isAuthenticated, isProjectManager, isAdmin, isTeamLead } = require("../middleware/middleware");  // Import role-based middleware

// Routes for Team management
router.post('/create', isAuthenticated, isTeamLead, teamController.createTeam);  // Only ProjectManager and Admin can create teams
router.put('/update/:id', isAuthenticated, isTeamLead, teamController.updateTeam);  // Only ProjectManager and Admin can update teams
router.delete('/delete/:id', isAuthenticated, isAdmin, teamController.deleteTeam);  // Only Admin can delete teams

router.get('/list', isAuthenticated, teamController.listTeams);  // Everyone can list teams
router.get('/list/:id', isAuthenticated, teamController.getTeamById);  // Everyone can get team by ID

module.exports = router;
