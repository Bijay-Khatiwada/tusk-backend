
exports.listProjects = async (req, res) => {
    try {
      const { userId, excludeUserId } = req.query; // Extract userId and excludeUserId from query parameters
      const notifications = await notificationService.listallProjects(userId, excludeUserId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  // Get a notification by specific ID
  exports.getProjectById = async (req, res) => {
    try {
      const id = req.params.id;
      const notification = await notificationService.getProjectById(id);
      if (!notification) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(notification);
    } catch (error) {
      console.error("Error fetching notification:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Create a new notification
  exports.createProject = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
      }
  
      const { notificationModel, location, price, description, pickupdate, dropoffdate, userId, condition } = req.body;
      const imagePath = `/uploads/${req.file.filename}`;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newProject = await notificationService.createProject(
        notificationModel,
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
      console.error("Error creating notification:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Update a notification
  exports.updateProject = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Project ID:", id);
  
      const notification = await ProjectModel.findById(id);
      if (!notification) {
        console.log("Project not found.");
        return res.status(404).json({ message: 'Project not found' });
      }
  
      console.log("Request Body:", req.body);
      console.log("Request File:", req.file);
  
      const { notificationModel, location, price, description, pickupdate, dropoffdate, userId, condition } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        console.log("User not found.");
        return res.status(404).json({ message: 'User not found' });
      }
  
  
      const imagePath = req.file ? `/uploads/${req.file.filename}` : notification.image;
      console.log("Image Path:", imagePath);
  
      const updatedProject = await notificationService.updateProject(
        id,
        notificationModel,
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
      console.error("Error updating notification:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  // Delete a notification
  exports.deleteProject = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProject = await notificationService.deleteProject(id);
  
      if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.status(200).json(deletedProject);
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };