
exports.listProjects = async (req, res) => {
    try {
      const { userId, excludeUserId } = req.query; // Extract userId and excludeUserId from query parameters
      const projects = await projectService.listallProjects(userId, excludeUserId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  // Get a project by specific ID
  exports.getProjectById = async (req, res) => {
    try {
      const id = req.params.id;
      const project = await projectService.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Create a new project
  exports.createProject = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
      }
  
      const { projectModel, location, price, description, pickupdate, dropoffdate, userId, condition } = req.body;
      const imagePath = `/uploads/${req.file.filename}`;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newProject = await projectService.createProject(
        projectModel,
        location,
        price,
        imagePath,
        description,
        pickupdate,
        dropoffdate,
        userId,
        condition
      );
  
      res.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Update a project
  exports.updateProject = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Project ID:", id);
  
      const project = await ProjectModel.findById(id);
      if (!project) {
        console.log("Project not found.");
        return res.status(404).json({ message: 'Project not found' });
      }
  
      console.log("Request Body:", req.body);
      console.log("Request File:", req.file);
  
      const { projectModel, location, price, description, pickupdate, dropoffdate, userId, condition } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        console.log("User not found.");
        return res.status(404).json({ message: 'User not found' });
      }
  
  
      const imagePath = req.file ? `/uploads/${req.file.filename}` : project.image;
      console.log("Image Path:", imagePath);
  
      const updatedProject = await projectService.updateProject(
        id,
        projectModel,
        location,
        price,
        imagePath,
        description,
        pickupdate,
        dropoffdate,
        userId,
        condition
      );
  
      console.log("Updated Project:", updatedProject);
  
      res.status(200).json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  // Delete a project
  exports.deleteProject = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProject = await projectService.deleteProject(id);
  
      if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.status(200).json(deletedProject);
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };