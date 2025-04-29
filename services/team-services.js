const Team = require("../models/team.js");
const User = require("../models/user.js");
const mongoose = require("mongoose");
const Project = require("../models/project.js");

exports.createTeam = async (name, description, createdBy, members, projects) => {
  try {
    // Check that the members and projects are valid (optional, can be added here too)
    if (members && members.length) {
      // Check if all members exist, you can fetch from the DB and compare the lengths.
      const validMembers = await User.find({ '_id': { $in: members } });
      if (validMembers.length !== members.length) {
        throw new Error('Some member(s) do not exist');
      }
    }

    if (projects && projects.length) {
      // Check if all projects exist
      const validProjects = await Project.find({ '_id': { $in: projects } });
      if (validProjects.length !== projects.length) {
        throw new Error('Some project(s) do not exist');
      }
    }

    // Create the new team
    const newTeam = new Team({ name, description, createdBy, members, projects });
    return await newTeam.save();
  } catch (error) {
    console.error('Error creating team in service:', error);
    throw new Error('Error creating team: ' + error.message);
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

exports.getTeamById = async (id) => {
  try {
    return await Team.findById(id)
      .populate('createdBy', 'name')  // Populate createdBy with name
      .populate('members', 'name')    // Populate members with names
      .populate('projects', 'name');  // Populate projects with names
  } catch (error) {
    console.error("Error fetching team:", error);
    throw new Error("Error fetching team: " + error.message);
  }
};






exports.updateTeam = async (id, updateData) => {
  try {
    console.log("Updating team with ID:", id);
    console.log("Update data:", updateData);  // Debugging log

    const updatedTeam = await Team.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTeam) {
      throw new Error('Team not found');
    }

    return updatedTeam;
  } catch (error) {
    console.error("Error updating team in service:", error); // More detailed error logs
    throw new Error("Error updating team: " + error.message);
  }
};

exports.deleteTeam = async (id) => {
  try {
    return await Team.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting team:", error);
    throw new Error("Error deleting team: " + error.message);
  }
};
