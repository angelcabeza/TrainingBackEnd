const router = require('express').Router();
let Teams = require('../../models/teams')
const {verifyToken} = require('../../middleware/auth');

router.route('/').get(async (req,res) => {
    try{
        const teams = await Teams.find();
        res.json(events)

    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/add').post(async (req,res) => {
    try {
        console.log(req.body);

        const newId = await Teams.findOne({}, {id: 1, _id: 0})
        .sort({ id: -1})
        .limit(1);

        const id = newId.id++;

        const name = req.body.name;
        const logo = req.body.logo;
        const rank = Number(req.body.rank);
        const wins = Number(req.body.wins);
        const ties = Number(req.body.ties);
        const gamesplayed = Number(req.body.gamesplayed);
        const goalsfor = Number(req.body.goalsfor);
        const goalsagansit = Number(req.body.goalsagansit);
        const points = Number(req.body.points);

        const newTeam = new Teams({id,name,logo,rank,wins,ties,gamesplayed,goalsfor,goalsagansit,points});

        await newTeam.save();
        res.json(newTeam);

    } catch (err) {
        res.status(400).json({err: err})
    }
});

router.route('/').delete( async (req,res) => {
    try {
        await Teams.findOneAndDelete({id : parseInt(req.params.id) });
        res.json({});
    } catch (err) {
        res.status(404).json({});
    }
});

module.exports = router;