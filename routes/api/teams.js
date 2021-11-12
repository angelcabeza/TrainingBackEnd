const router = require('express').Router();
let Teams = require('../../models/teams')
const {verifyToken} = require('../../middleware/auth');

router.route('/').get(async (req,res) => {
    try{
        console.log("COJO DATOS");
        const teams = await Teams.find();
        res.json(teams)
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.route('/add').post(async (req,res) => {
    try {
        const name = req.body.name;
        const logo = req.body.logo;
        const rank = Number(req.body.rank);
        const wins = Number(req.body.wins);
        const ties = Number(req.body.ties);
        const gamesplayed = Number(req.body.gamesplayed);
        const goalsfor = Number(req.body.goalsfor);
        const goalsagansit = Number(req.body.goalsagansit);
        const points = Number(req.body.points);

        const newTeam = new Teams({name,logo,rank,wins,ties,gamesplayed,goalsfor,goalsagansit,points});

        console.log(newTeam);
        await newTeam.save()
        res.json(newTeam);
        console.log("HE GUARDADO NEWTEAM");

    } catch (err) {
        res.status(400).json({err: err})
    }
});

router.route('/:id').delete( async (req,res) => {
    try {
        console.log(req.params.id);
        await Teams.findByIdAndDelete(req.params.id);
        res.json({});
    } catch (err) {
        res.status(404).json({});
    }
});

module.exports = router;