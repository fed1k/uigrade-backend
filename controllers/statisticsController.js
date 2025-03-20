const Statistics = require('../models/statistic');
const Result = require('../models/result');
const { Sequelize } = require('sequelize');

exports.getStatistics = async (req, res) => {
    try {
        const [totalResults, completeResults, averageResult] = await Promise.all([
            Result.count(),
            Result.count({ where: { status: 'complete' } }),
            Result.findOne({
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('score')), 'average_score']
                ]
            })
        ]);

        // Extract the average score value
        const averageScore = averageResult ? averageResult.get('average_score') : 0;

        let stats = await Statistics.findAll();
        res.status(200).json({ 
            status: 200, 
            tg_visit_count: stats[0].tg_visit_count,
            totalResults, 
            completeResults, 
            averageScore 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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