const { Router } = require("express");
const { Temperament } = require("../db.js")

const router = Router()

router.get("/", async(req, res)=>{
    try {
        let temperaments= await Temperament.findAll()
        res.send(temperaments)
        
    } catch (e) {
        console.log(e)    
    }
})

module.exports = router;
