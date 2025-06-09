import Contact from "../models/contact.js";

export const createContact = async (req, res, next) => {
    try {
        const newContact = await Contact.create({ ...req.body });

        res.status(201).json({ success: true, data: newContact });
    } catch (e) {
        next(e);
    }
};

export const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: contacts });
    } catch (e) {
        next(e);
    }
};

export const getContactById = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        res.status(200).json({ success: true, data: contact });
    } catch (e) {
        next(e);
    }
};

export const updateContactById = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        res.status(200).json({ success: true, data: contact });
    } catch (e) {
        next(e);
    }
};

export const deleteContactById = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        res.status(200).json({ success: true, message: "Contact deleted successfully" });
    } catch (e) {
        next(e);
    }
};

// Get contacts by status
export const getContactsByStatus = async (req, res, next) => {
    try {
        const contacts = await Contact.find({ 
            status: req.params.status 
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: contacts });
    } catch (e) {
        next(e);
    }
};

// Get unread contacts
export const getUnreadContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({ 
            isRead: false 
        }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: contacts });
    } catch (e) {
        next(e);
    }
};

// Mark contact as read
export const markContactAsRead = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        res.status(200).json({ success: true, data: contact });
    } catch (e) {
        next(e);
    }
};

// Update contact status
export const updateContactStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        
        if (!['new', 'read', 'replied', 'resolved'].includes(status)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid status. Must be one of: new, read, replied, resolved" 
            });
        }

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status, isRead: true },
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        res.status(200).json({ success: true, data: contact });
    } catch (e) {
        next(e);
    }
};
