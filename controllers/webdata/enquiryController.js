import Enquiry from '../../models/webdata/enquiry.js';

// Get all enquiries
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Enquiries fetched successfully',
      data: enquiries,
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries',
      error: error.message,
    });
  }
};

// Get enquiry by ID
export const getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const enquiry = await Enquiry.findById(id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Enquiry fetched successfully',
      data: enquiry,
    });
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry',
      error: error.message,
    });
  }
};

// Create new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const enquiryData = req.body;
    
    const enquiry = new Enquiry(enquiryData);
    await enquiry.save();
    
    res.status(201).json({
      success: true,
      message: 'Enquiry created successfully',
      data: enquiry,
    });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create enquiry',
      error: error.message,
    });
  }
};

// Update enquiry status
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const enquiry = await Enquiry.findById(id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }
    
    // Update status and notes
    enquiry.status = status;
    if (notes) {
      enquiry.notes = notes;
    }
    
    await enquiry.save();
    
    res.status(200).json({
      success: true,
      message: 'Enquiry status updated successfully',
      data: enquiry,
    });
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry status',
      error: error.message,
    });
  }
};

// Update enquiry
export const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry,
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry',
      error: error.message,
    });
  }
};

// Delete enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    
    const enquiry = await Enquiry.findByIdAndDelete(id);
    
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry',
      error: error.message,
    });
  }
};

// Get enquiry statistics
export const getEnquiryStats = async (req, res) => {
  try {
    const stats = await Enquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Initialize stats object
    const enquiryStats = {
      total: 0,
      new: 0,
      contacted: 0,
      enrolled: 0,
      notInterested: 0,
    };
    
    // Calculate total
    enquiryStats.total = await Enquiry.countDocuments();
    
    // Map aggregated results to stats object
    stats.forEach(stat => {
      if (stat._id && enquiryStats.hasOwnProperty(stat._id)) {
        enquiryStats[stat._id] = stat.count;
      }
    });
    
    res.status(200).json({
      success: true,
      message: 'Enquiry statistics fetched successfully',
      data: enquiryStats,
    });
  } catch (error) {
    console.error('Error fetching enquiry stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry statistics',
      error: error.message,
    });
  }
};

// Get enquiries by status
export const getEnquiriesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    const enquiries = await Enquiry.find({ status }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: `Enquiries with status '${status}' fetched successfully`,
      data: enquiries,
    });
  } catch (error) {
    console.error('Error fetching enquiries by status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries by status',
      error: error.message,
    });
  }
};

// Search enquiries
export const searchEnquiries = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }
    
    const enquiries = await Enquiry.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phoneNumber: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } },
        { course: { $regex: query, $options: 'i' } },
        { message: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Enquiries search completed successfully',
      data: enquiries,
    });
  } catch (error) {
    console.error('Error searching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search enquiries',
      error: error.message,
    });
  }
}; 