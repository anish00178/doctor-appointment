import express from 'express'
import { createMessage, deleteWebMessages, getAllMessages } from '../controllers/webMessageController.js';
import { isAdmin, userAuth } from '../middlewares/authMiddleware.js';

const router=express.Router();

//CREATE MESSAGE || POST
router.post("/create",createMessage);

//GET ALL MESSAGE || GET
router.get("/get-all",getAllMessages);

//DELETE MESSAGE || DELETE
router.delete("/delete/:id",userAuth, isAdmin, deleteWebMessages);

export default router;