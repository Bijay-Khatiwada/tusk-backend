
exports.listTeams = async (req, res) => {
    try {
      const { userId, excludeUserId } = req.query; // Extract userId and excludeUserId from query parameters
      const teams = await teamService.listallTeams(userId, excludeUserId);
      res.json(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  // Get a team by specific ID
  exports.getTeamById = async (req, res) => {
    try {
      const id = req.params.id;
      const team = await teamService.getTeamById(id);
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
      res.json(team);
    } catch (error) {
      console.error("Error fetching team:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Create a new team
  exports.createTeam = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
      }
  
      const { teamModel,  description, priority, createdAt, updatedAt, createdBy, assignedTo, status, userId} = req.body;
      const imagePath = `/uploads/${req.file.filename}`;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newTeam = await teamService.createTeam(
        teamModel,
        priority,
        createdAt,
        updatedAt,
        description,
        createdBy,
        assignedTo,
        userId,
        status,
        imagePath
      );
  
      res.status(201).json(newTeam);
    } catch (error) {
      console.error("Error creating team:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Update a team
  exports.updateTeam = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Team ID:", id);
  
      const team = await TeamModel.findById(id);
      if (!team) {
        console.log("Team not found.");
        return res.status(404).json({ message: 'Team not found' });
      }
  
      console.log("Request Body:", req.body);
      console.log("Request File:", req.file);
  
      const { teamModel, location, price, description, pickupdate, dropoffdate, userId, condition } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        console.log("User not found.");
        return res.status(404).json({ message: 'User not found' });
      }
  
  
      const imagePath = req.file ? `/uploads/${req.file.filename}` : team.image;
      console.log("Image Path:", imagePath);
  
      const updatedTeam = await teamService.updateTeam(
        id,
        teamModel,
        location,
        price,
        imagePath,
        description,
        pickupdate,
        dropoffdate,
        userId,
        condition
      );
  
      console.log("Updated Team:", updatedTeam);
  
      res.status(200).json(updatedTeam);
    } catch (error) {
      console.error("Error updating team:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  // Delete a team
  exports.deleteTeam = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTeam = await teamService.deleteTeam(id);
  
      if (!deletedTeam) {
        return res.status(404).json({ message: 'Team not found' });
      }
  
      res.status(200).json(deletedTeam);
    } catch (error) {
      console.error("Error deleting team:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };