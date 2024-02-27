const request = require("supertest")
const app = require('../app')

     const URL_GENRES="/genres"
     const genre= {
        name:'pop'
     }
     let genreId
    

test("Post -> 'URL_GENRES', should return statuts code 201, and res.body to defined and res.body.name = genre.name",
async()=>{
    const res= await request(app) 
            .post(URL_GENRES)
            .send(genre)
            genreId= res.body.id
     expect(res.status).toBe(201)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(genre.name)       

})

test("GET -> 'URL_GENRES', should retunr status code 200, and res.body to defined and res.body.length = 1",async() =>{
    const res= await request(app)
        .get(URL_GENRES)
        
 expect(res.statusCode).toBe(200)
 expect(res.body).toBeDefined()
 expect(res.body).toHaveLength(1)

})
test("GET -> 'URL_GENRES/:id', should Retunr status code 200, res.body to be defined and res.body.name = genre.name",async()=>{
    const res= await request (app)
        .get(`${URL_GENRES}/${genreId}`)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(genre.name)
})

test("PUT -> 'URL_GENRES/:ID', should retunr status code 200, res.body to be defined and res.body.name = send('text')",async()=>{

    const res= await request(app)
        .put(`${URL_GENRES}/${genreId}`)
        .send({name:'regueton'})

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe('regueton') 

})

test(" DELETE -> 'URL_GENRES/:Id', should return status code 204 ",async()=>{
    const  res =await request(app)
        .delete(`${URL_GENRES}/${genreId}`)

        expect(res.status).toBe(204)
       
})