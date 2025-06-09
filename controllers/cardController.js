import Card from "../models/card.js";

export const createCard = async (req, res, next) => {
    try {
        const newCard = await Card.create({ ...req.body });

        res.status(201).json({ success: true, data: newCard });
    } catch (e) {
        next(e);
    }
};

export const getCard = async (req, res, next) => {
    try {
        const cards = await Card.find();

        res.status(200).json({ success: true, data: cards });
    } catch (e) {
        next(e);
    }
};

export const updateCardById = async (req, res, next) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!updatedCard) {
            return res.status(404).json({ success: false, message: "Card not found" });
        }

        res.status(200).json({ success: true, data: updatedCard });
    } catch (e) {
        next(e);
    }
};

export const deleteCardById = async (req, res, next) => {
    try {
        const deletedCard = await Card.findByIdAndDelete(req.params.id);

        if (!deletedCard) {
            return res.status(404).json({ success: false, message: "Card not found" });
        }

        res.status(200).json({ success: true, message: "Card deleted successfully" });
    } catch (e) {
        next(e);
    }
};
