const router = require('express').Router();
let Teams = require('../../models/teams')
const {verifyToken} = require('../../middleware/auth');

router.get('/', verifyToken, async (req,res) => {
    try{
        const teams = await Teams.find();
        res.json(teams)
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

router.post('/add',verifyToken, async (req,res) => {
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

        await newTeam.save()
        res.json(newTeam);
    } catch (err) {
        res.status(400).json({err: err})
    }
});

router.delete('/:id',verifyToken, async (req,res) => {
    try {
        console.log(req.params.id);
        await Teams.findByIdAndDelete(req.params.id);
        res.json({});
    } catch (err) {
        res.status(404).json({});
    }
});

router.get('/:name',verifyToken, async (req,res) => {
    try{
        const teams = await Teams.find({'name' : { '$regex' : req.params.name, '$options' : 'i' } });
        res.json(teams);
    } catch (e){
        res.status(400).json('Error puta: ' + e);
    }
})

module.exports = router;