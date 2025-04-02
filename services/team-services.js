const Team = require("../models/team.js");

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
    return await Team.find({});
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw new Error("Error fetching teams: " + error.message);
  }
};

exports.getTeamById = async (teamId) => {
  try {
    return await Team.findById(teamId).populate("members").populate("projects");
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