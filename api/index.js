//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { default: axios } = require("axios");
const { API_KEY } = process.env 
require("dotenv").config()
const server = require('./src/app.js');
const { conn, Temperament } = require('./src/db.js');


// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {

  const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  const temperaments = [];
  api.data.map((e)=>{
    if(e.temperament){
      temperaments.push(e.temperament.split(","))
    }
  })
  let temperamentsFiltered = [];
  temperaments.map((e)=>{
    temperamentsFiltered = temperamentsFiltered.concat(e)
    }
  )
  let result= temperamentsFiltered.filter((acc, i)=>{
    return temperamentsFiltered.indexOf(acc.trim()) === i;
  })
  result= result.sort().map((e)=>{
    return {name: e}
  })
  await Temperament.bulkCreate(result)


  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
