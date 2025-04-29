const projectService = require("../services/project-services.js");
const User = require('../models/user.js');

const Project = require('../models/project.js'); // Assuming you have a Project model
const Team = require('../models/team.js'); // <--- YOU FORGOT THIS DUDE

exports.createProject = async (req, res) => {
  try {
    const { name, description, team, createdBy } = req.body;

    // Validate if team exists
    const existingTeam = await Team.findById(team);
    if (!existingTeam) {
      return res.status(400).json({ message: 'Team not found' });
    }

    const project = new Project({
      name,
      description,
      team,
      createdBy,
    });

    await project.save();

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
};



exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.listProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description, team } = req.body;

    const updateData = { name, description, team };

    const updatedProject = await projectService.updateProject(req.params.id, updateData);
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating project", error: error.message });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await projectService.deleteProject(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};
