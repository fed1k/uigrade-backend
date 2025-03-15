const Statistics = require('../models/statistic');

exports.getStatistics = async (req, res) => {
    try {
        let stats = await Statistics.findAll();
        console.log(stats)
        res.status(200).json(stats)
    } catch (err) {
        res.status(500).json({ error: 'Error fetching statistics level' });
    }
}

exports.addTgVisitorCount = async (req, res) => {
    try {
        const [statistics, created] = await Statistics.findOrCreate({
            where: {},
            defaults: {
                tg_visit_count: 0,
                fully_completed_count: 0,
                unfinished_count: 0
            }
        });

        statistics.tg_visit_count += 1;
        await statistics.save();
        res.status(200).json({ status: 200 })
    } catch (err) {
        res.status(500).json({ error: 'Error incrementing telegram visit count' });
    }
}

exports.incrementUnfinishedCount = async (req, res) => {
    try {
        const [statistics, created] = await Statistics.findOrCreate({
            where: {},
            defaults: {
                tg_visit_count: 0,
                fully_completed_count: 0,
                unfinished_count: 0
            }
        });

        statistics.unfinished_count += 1;
        await statistics.save();
        res.status(200).json({ status: 200 })
    } catch (err) {
        res.status(500).json({ error: 'Error incrementing unfinished count' });
    }
}

exports.incrementFinishedCount = async (req, res) => {
    try {
        const [statistics, created] = await Statistics.findOrCreate({
            where: {},
            defaults: {
                tg_visit_count: 0,
                fully_completed_count: 0,
                unfinished_count: 0
            }
        });

        statistics.fully_completed_count += 1;
        await statistics.save();
        res.status(200).json({ status: 200 })
    } catch (err) {
        res.status(500).json({ error: 'Error incrementing finished count' });
    }
}