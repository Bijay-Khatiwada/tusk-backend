const Project = require("../models/project.js");

exports.createProject = async (projectData) => {
  try {
    if (!projectData || !projectData.name || !projectData.description || !projectData.createdBy || !projectData.team) {
      throw new Error("Missing required project data");
    }

    const newProject = new Project(projectData);
    return await newProject.save();
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Error creating project: " + error.message);
  }
};


exports.listProjects = async () => {
  try {
    return await Project.find({})
      .populate("createdBy", "name")
      .populate({
        path: "team",
        select: "name members",
        populate: {
          path: "members",
          select: "name",
        },
      });
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Error fetching projects: " + error.message);
  }
};

exports.getProjectById = async (projectId) => {
  try {
    return await Project.findById(projectId)
      .populate("createdBy", "name")
      .populate({
        path: "team",
        select: "name members",
        populate: {
          path: "members",
          select: "name",
        },
      });
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("Error fetching project: " + error.message);
  }
};

exports.updateProject = async (projectId, updateData) => {
  try {
    console.log("Updating project:", projectId);

    const { name, description, team } = updateData;

    const updatedFields = {
      name,
      description,
    };

    if (team) {
      updatedFields.team = team; // either ObjectId or properly populated
    }

    return await Project.findByIdAndUpdate(projectId, updatedFields, { new: true });
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Error updating project: " + error.message);
  }
};

exports.deleteProject = async (projectId) => {
  try {
    return await Project.findByIdAndDelete(projectId);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Error deleting project: " + error.message);
  }
};
