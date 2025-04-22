const Team = require("../models/team.js");
const User = require("../models/user.js");

exports.createTeam = async (name, description, createdBy, members, projects) => {
  try {
    const newTeam = new Team({ name, description, createdBy, members, projects });
    return await newTeam.save();
  } catch (error) {
    console.error("Error creating team:", error);
    throw new Error("Error creating team: " + error.message);
  }
};

exports.getAllTeams = async () => {
  try {
    return await Team.find({})
      .populate('createdBy', 'name')   // Only get the name field
      .populate('members', 'name')     // Populate each member's name
      .populate('projects', 'name');   // Populate each project's name
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw new Error("Error fetching teams: " + error.message);
  }
};

exports.getTeamById = async (teamId) => {
  try {
    return await Team.findById(teamId)
    .populate('members', 'name')   // Populate members (referencing User model)
      .populate("projects"); // Populate projects (referencing Project model)
  } catch (error) {
    console.error("Error fetching team:", error);
    throw new Error("Error fetching team: " + error.message);
  }
};

exports.updateTeam = async (teamId, updateData) => {
  try {
    return await Team.findByIdAndUpdate(teamId, updateData, { new: true });
  } catch (error) {
    console.error("Error updating team:", error);
    throw new Error("Error updating team: " + error.message);
  }
};

exports.deleteTeam = async (teamId) => {
  try {
    return await Team.findByIdAndDelete(teamId);
  } catch (error) {
    console.error("Error deleting team:", error);
    throw new Error("Error deleting team: " + error.message);
  }
};
