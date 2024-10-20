import express from "express";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";
const router = express.Router();

// Define the routes
router.post("/add",middleware,  async (req, res) => {
//   res.status(200).json({ message: " i am working" });
    console.log(req.body);
    try {
      const { title, description } = req.body;

      const newNote = new Note({
        title,
        description,
        userId: req.user.id,
      });

      await newNote.save();
      res.status(200).json({ success: true, message: "Note added successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Server Error in adding note" });
    }
});

router.get("/",middleware, async (req, res) => {
    try {
      const notes = await Note.find({userId: req.user.id});
      res.status(200).json({ success: true, notes });
    } catch (error) {
      console.log(error);
      res
       .status(500)
       .json({ success: false, message: "Server Error in retrieving notes" });
    }
});
router.put("/:id", async (req, res) => {
    try {
       const {id} = req.params;
       const updateNote = await Note.findByIdAndUpdate(id, req.body);
       return res.status(200).json({success: true, updateNote})
    } catch (error) {
      console.log(error);
      res
       .status(500)
       .json({ success: false, message: "Server Error in updating notes" });
    }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    res
     .status(500)
     .json({ success: false, message: "Server Error in deleting note" });
  }
})

export default router;
