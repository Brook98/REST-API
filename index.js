const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const knex = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


/**
 * @api {post} /insert Insert one city
 * @apiGroup City Operations
 * @apiParam {Number} ID City ID
 * @apiParam {String} name City Name
 * @apiParam {String} countryCode Country Code
 * @apiParam {String} district District
 * @apiParam {Number} population Population
 * @apiSuccess {Object[]} result Result
 * @apiSuccess {String} result.status Status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "status":"success"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */ 


app.post('/insert', async (req, res) => {

const {id, name, countryCode, district, population} = req.body
const result = await knex('city').insert({ID:id, Name:name, CountryCode:countryCode, District:district, Population:population})

     res.json({"status": "succes"})
});

/**
 * @api {get} /read List one city
 * @apiGroup City Operations
 * @apiSuccess {Object[]} city City
 * @apiSuccess {Number} city.ID City ID
 * @apiSuccess {String} city.Name City Name
 * @apiSuccess {String} city.CountryCode Country Code 
 * @apiSuccess {String} city.District City District
 * @apiSuccess {Number} city.Population Population of city
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "ID":2974,
 *      "Name":"Paris",
 *      "CountryCode":"FRA"
 *      "District":"Île-de-France",
 *      "Population":"2125246"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/read', async (req, res) => {
const {name} = req.body
const result = await knex.from('city').where({Name:name})
  res.json(result);

});

/**
 * @api {post} /update Update a city
 * @apiGroup City Operations
 * @apiParam {String} name City Name
 * @apiParam {Number} population Population
 * @apiSuccess {Object[]} result Result
 * @apiSuccess {String} result.status Status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "status":"success"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */ 

app.post('/update', async (req, res) => {

const {name, population} = req.body
const result = await knex('city').where({Name:name}).update('Population', population)
if (result >= 1){
     res.json({"status": "succes"})
} 
else {
res.json({"status": "failure"})
}
});
/**
 @api {post} /delete Delete a city
 * @apiGroup City Operations
 * @apiParam {String} name City Name
 * @apiSuccess {Object[]} result Result
 * @apiSuccess {String} result.status Status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "status":"success"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */ 

app.post('/delete', async (req, res) => {

const name = req.body

const result = await knex('city').where({Name: name}).del()

 if(result !=0){
     res.json({"status":"success"})
}
else {
    res.json({"status":"failure"})
}

});

app.listen(port, () => {
  console.log(`App running`)
})
