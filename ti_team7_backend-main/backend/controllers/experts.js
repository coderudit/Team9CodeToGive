const Experts = require('../models/experts/Experts')

  exports.getAllExperts = async (req, res, next) => {

    const query = req.query.new
    try {
      const experts = query
        ? await Experts.find().sort({ _id: -1 }).limit(5)
        : await Experts.find()
  
      if (experts.length > 0) {
        const successResponse = {
          message: 'Experts fetched successfully',
          success: true,
          experts: experts,
        }
        res.status(200).json(successResponse)
      } else {
        const errorResponse = {
          message: 'No Experts found',
          success: false,
        }
        res.status(404).json(errorResponse)
      }
    } catch (err) {
      const errorResponse = {
        message: err,
        success: false,
      }
      res.status(500).json(errorResponse)
    }
  }

  exports.bookExpert = async (req, res) => {
    try{
        const expertDetails = await Experts.findById(req.params.id);
        res.status(200).json({
          success: true,
          expertDetails: expertDetails
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Error"
          })
    }
  };
