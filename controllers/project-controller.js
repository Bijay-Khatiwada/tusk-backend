const projectService = require("../services/project-services.js");
const User = require('../models/user.js');

exports.createProject = async (req, res) => {
  try {
    const { name, description, createdBy, team } = req.body;

    // Optional: Validate creator exists
    const creator = await User.findById(createdBy);
    if (!creator) {
      return res.status(404).json({ message: "Creator user not found" });
    }

    // Create the project using the service
    const newProject = await projectService.createProject({ name, description, createdBy, team });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error: error.message });
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
    const project = await projectService.getProjectById(req.params.projectId);
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
    const updatedProject = await projectService.updateProject(req.params.projectId, req.body);
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
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
