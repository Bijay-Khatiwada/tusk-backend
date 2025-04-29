const teamService = require("../services/team-services.js");
const User = require('../models/user.js');

const Team = require('../models/team.js');
const Project = require('../models/project.js');

exports.createTeam = async (req, res) => {
  try {
    const { name, description, createdBy, members, projects } = req.body;

    // Check if the creator exists
    const creatorExists = await User.findById(createdBy);
    if (!creatorExists) {
      return res.status(404).json({ message: "Creator user not found" });
    }

    // Check if members exist
    if (members && members.length) {
      const invalidMembers = await User.find({ '_id': { $in: members } });
      if (invalidMembers.length !== members.length) {
        return res.status(404).json({ message: "Some members not found" });
      }
    }

    // Check if projects exist
    if (projects && projects.length) {
      const invalidProjects = await Project.find({ '_id': { $in: projects } });
      if (invalidProjects.length !== projects.length) {
        return res.status(404).json({ message: "Some projects not found" });
      }
    }

    // Create a new team using the teamService
    const newTeam = await teamService.createTeam(name, description, createdBy, members, projects);
    
    res.status(201).json(newTeam);
  } catch (error) {
    console.error('Error in creating team:', error); // More detailed logging
    res.status(500).json({ message: "Error creating team", error: error.message });
  }
};

exports.listTeams = async (req, res) => {
  try {
    const teams = await teamService.getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error: error.message });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const team = await teamService.getTeamById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team", error: error.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    console.log("Received team data for update:", req.body); // Debugging log
    
    const updatedTeam = await teamService.updateTeam(req.params.id, req.body);
    
    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }
    
    console.log("Updated team:", updatedTeam); // Debugging log
    
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("Error updating team:", error); // More detailed error logs
    res.status(500).json({ message: "Error updating team", error: error.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await teamService.deleteTeam(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting team", error: error.message });
  }
};
