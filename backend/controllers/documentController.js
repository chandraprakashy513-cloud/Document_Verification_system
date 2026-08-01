const Document = require("../models/Document");

// Upload Document
exports.uploadDocument = async (req, res) => {
    try {
        const document = await Document.create({
            userId: req.user.id,
            documentName: req.body.documentName,
            filePath: req.file.path
        });

        res.status(201).json({
            message: "Document uploaded successfully",
            document
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get My Documents
exports.getMyDocuments = async (req, res) => {
    try {
        const documents = await Document.find({
            userId: req.user.id
        });

        res.status(200).json({
            documents
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Documents (Admin)
exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find().populate("userId", "name email");

        res.status(200).json({
            documents
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Document Status (Admin)
exports.updateDocumentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const document = await Document.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.status(200).json({
            message: "Document status updated",
            document
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};