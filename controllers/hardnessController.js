const Hardness = require('../models/hardness');

exports.getHardnessLevels = async (req, res) => {
    try {
        let levels = await Hardness.findAll();

        res.status(200).json(levels)
    } catch (err) {
        res.status(500).json({ error: 'Error fetching hardness level' });
    }
}

exports.addHardnessLevel = async (req, res) => {
    try {
        const { name, point } = req.body

        if (!name || !point) res.json({error: "Fill all fields please"})

        const newLevel = await Hardness.create({ name, point });
        res.json({status: 200, data: newLevel});
    } catch (err) {
        res.status(500).json({ error: "Error adding hardness level" })
    }
}

exports.editHardnessLevel = async (req, res) => {
    try {
        const { id, newName, point } = req.body;
        // Find the record by id
        // console.log(id, newName)
        const hardnessRecord = await Hardness.findByPk(id);

        if (!hardnessRecord) {
            return res.status(404).json({ error: "Hardness level not found" });
        }

        // Update the name field to the new name
        hardnessRecord.name = newName;

        if (point) hardnessRecord.point = point

        // Save the updated record
        await hardnessRecord.save();

        // Send a success response
        res.status(200).json({status: 200, message: "Hardness level updated successfully", data: hardnessRecord });

    } catch (err) {
        res.status(500).json({ error: "Error editing level" })
    }
}

exports.deleteHardnessLevel = async (req, res) => {
    try {

        const { id } = req.body

        // Find the record by id and delete it
        const deletedHardnessRecord = await Hardness.findByPk(id);
        

        if (!deletedHardnessRecord) {
            return res.status(404).json({ error: "Hardness level not found" });
        }

        await deletedHardnessRecord.destroy();

        // Send a success response
        res.status(200).json({ status: 200, message: "Hardness level deleted successfully", data: deletedHardnessRecord });
    } catch (err) {
        res.status(500).json({ error: "Error deleting level" })
    }
}