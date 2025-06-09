import Membership from "../models/membership.js";

export const createMembership = async (req, res, next) => {
    try {
        const newMembership = await Membership.create({ ...req.body });

        res.status(201).json({ success: true, data: newMembership });
    } catch (e) {
        next(e);
    }
};

export const getMemberships = async (req, res, next) => {
    try {
        const memberships = await Membership.find();

        res.status(200).json({ success: true, data: memberships });
    } catch (e) {
        next(e);
    }
};

export const getMembershipById = async (req, res, next) => {
    try {
        const membership = await Membership.findById(req.params.id);

        if (!membership) {
            return res.status(404).json({ success: false, message: "Membership not found" });
        }

        res.status(200).json({ success: true, data: membership });
    } catch (e) {
        next(e);
    }
};

export const updateMembershipById = async (req, res, next) => {
    try {
        const updatedMembership = await Membership.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updatedMembership) {
            return res.status(404).json({ success: false, message: "Membership not found" });
        }

        res.status(200).json({ success: true, data: updatedMembership });
    } catch (e) {
        next(e);
    }
};

export const deleteMembershipById = async (req, res, next) => {
    try {
        const deletedMembership = await Membership.findByIdAndDelete(req.params.id);

        if (!deletedMembership) {
            return res.status(404).json({ success: false, message: "Membership not found" });
        }

        res.status(200).json({ success: true, message: "Membership deleted successfully" });
    } catch (e) {
        next(e);
    }
};