const { Router } = require("express");
const axios = require("axios")
const { Dog, Temperament } = require("../db.js")
const router = Router()
const { API_KEY } = process.env 
require('dotenv').config();

router.get("/", async(req,res)=>{    
    try {
        let apiDogs= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        let dbDogs= await Dog.findAll({
            include: Temperament
        })
        let mapApi= apiDogs.data.map((e)=>{
            return {
                id: e.id,
                name: e.name,
                img: e.image.url,
                weight: e.weight.metric,
                temperament: e.temperament,
            }
        })
        let mapDb= dbDogs.map((e)=>{
            let temp=[];
            e.Temperaments.forEach(e=>temp.push(e.name))
            return{
                id: e.id,
                name: e.name,
                img: e.img,
                weight: e.weight,
                temperament: temp.join(" "),
            }
        })
        let searched= mapDb.concat(mapApi);
        if(req.query.name){
            const { name } = req.query
            let temp= searched.filter(e=> e.name.toLowerCase().includes(name.toLowerCase()))
            res.json(temp)
        }else{
            res.json(searched)
        }        
    } catch (e) {
        console.log(e)
    }
})
router.get("/:id", async(req, res)=>{
    const { id } = req.params;
    try {
        if(id.length < 5){
            let apiDog= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            let mapApi= apiDog.data.filter(e=> e.id == id).map((e)=>{
                return {
                    id: e.id,
                    name: e.name,
                    img: e.image.url,
                    weight: e.weight.metric,
                    temperament: e.temperament,
                    life_span: e.life_span,
                    height: e.height.metric
                }
            })
            mapApi.length != 0 ? res.json(mapApi[0]) : res.status(400).send("Dog not found")
        }else {
            let dbDog= await Dog.findAll({
                include: Temperament
            })
            mapDb= dbDog.filter(e=> e.id == id).map((e)=>{
                let temp=[]
                e.Temperaments.forEach(e=>temp.push(e.name))
                return{
                    id: e.id,
                    name: e.name,
                    img: e.img,
                    weight: e.weight,
                    temperament: temp.join(" "),
                    life_span: e.life_span,
                    height: e.height
                }
            })
            dbDog ? res.json(mapDb[0]) : res.status(400).send("Dog not found")
        }
    } catch (e) {
        console.log(e)
    }
})
module.exports = router;