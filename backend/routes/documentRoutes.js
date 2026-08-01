const express = require("express");
const router = express.Router();

const multer = require("multer");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    uploadDocument,
    getMyDocuments,
    getAllDocuments,
    updateDocumentStatus
} = require("../controllers/documentController");


// Multer Storage Setup
const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, "uploads/");
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }

});


const upload = multer({
    storage: storage
});



// Upload Document
router.post(
    "/upload",
    authMiddleware,
    upload.single("document"),
    uploadDocument
);



// Get My Documents
router.get(
    "/mydocuments",
    authMiddleware,
    getMyDocuments
);



// Admin - Get All Documents
router.get(
    "/all",
    authMiddleware,
    adminMiddleware,
    getAllDocuments
);



// Admin - Update Document Status
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateDocumentStatus
);


module.exports = router;