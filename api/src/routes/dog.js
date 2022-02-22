const { Router } = require("express");
const { v4:uuidv4 } = require("uuid")
const { Dog } = require("../db.js")

const router = Router()

router.post("/", async(req, res)=>{
    const { name, height, weight, img, life_span, temperament } = req.body
    try {
        let newDog=await Dog.create({ name, height, weight, img, life_span, id:uuidv4() })

        let idDog= newDog.id
        let dog= await Dog.findByPk(idDog)

        let temp= await dog.addTemperaments(temperament)
        res.json({newDog, temp})
    } catch (e) {
        console.log(e)
    }
})
module.exports = router;