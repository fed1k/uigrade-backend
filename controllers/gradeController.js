const Grade = require('../models/grade');

exports.getGrades = async (req, res) => {
    try {
        let grades = await Grade.findAll();

        res.status(200).json(grades)
    } catch (err) {
        res.status(500).json({ error: "Error fetching grades" })
    }
}

exports.addGrade = async (req, res) => {
    try {
        const { name, min_point, max_point } = req.body

        if (!name || !min_point || !max_point) res.json({error: "Fill all fields please"})

        const newGrade = await Grade.create({ name, min_point, max_point });
        res.json({status: 200, data: newGrade});
    } catch (err) {
        res.status(500).json({ error: "Error adding grade" })
    }
}

exports.editGrade = async (req, res) => {
    try {
        const { id, newName, min_point, max_point } = req.body;
       
        const gradeRecord = await Grade.findByPk(id);

        if (!gradeRecord) {
            return res.status(404).json({ error: "Grade not found" });
        }

        // Update the name field to the new name
        gradeRecord.name = newName;
        if (min_point) gradeRecord.min_point = min_point
        if (max_point) gradeRecord.max_point = max_point

        // Save the updated record
        await gradeRecord.save();

        // Send a success response
        res.status(200).json({  status:200, message: "Grade updated successfully", data: gradeRecord });
    } catch (err) {
        res.status(500).json({ error: "Error editing grade" })
    }
}

exports.deleteGrade = async (req, res) => {
    try {
        const { id } = req.body

        // Find the record by id and delete it
        const deletedGradeRecord = await Grade.findByPk(id);
        

        if (!deletedGradeRecord) {
            return res.status(404).json({ error: "Grade level not found" });
        }

        await deletedGradeRecord.destroy();

        // Send a success response
        res.status(200).json({ status: 200, message: "Grade deleted successfully", data: deletedGradeRecord });
    } catch (err) {
        res.status(500).json({ error: "Error deleting grade" })
    }
}