import express from 'express'
import { isAdmin, userAuth } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';
import { addDoctor, getAllDoctor, getDoctorDetails, updateDoctor, deleteDoctor} from '../controllers/doctorController.js';


const router=express.Router();

//ADD DOCTOR || POST
router.post("/add",userAuth,isAdmin,upload.single("image"),addDoctor);

//GET ALL DOCTOR || GET
router.get("/get-all",getAllDoctor);

//GET DOCTOR DETAILS || GET
router.get("/get-details/:id",getDoctorDetails);

//UPDATE DOCTOR || POST
router.patch("/update/:id",userAuth,isAdmin,upload.single("image"),updateDoctor);

//DELETE DOCTOR || DELETE
router.delete("/delete/:id",userAuth,isAdmin,deleteDoctor);


export default router;