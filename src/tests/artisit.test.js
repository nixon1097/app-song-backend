require('../models')
const request = require("supertest")
const app = require("../app")
const Genre = require('../models/Genre')

const  URL_ARTIST = '/artists'
let artistId 
  const artist ={
    name:"maluma",
    country:"colombia",
    formationYear:1995,
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/2023-11-16_Gala_de_los_Latin_Grammy%2C_20_%28Maluma%29.jpg/330px-2023-11-16_Gala_de_los_Latin_Grammy%2C_20_%28Maluma%29.jpg"
  }

test("POsT -> 'URL_ARTIST', should return  status code 201, and  res.body to be defined and res.body.name= artist.name ",async()=>{
    const res= await request(app)
        .post(URL_ARTIST)
        .send(artist) 
        artistId=res.body.id 

 expect(res.status).toBe(201)
 expect(res.body).toBeDefined()
 expect(res.body.name).toBe(artist.name)
})

test("GET -> 'URL_ARTIST', should return status code 200, and res.body to be defined and res.body.length = 1",async()=>{
    const res= await request(app)
     .get(URL_ARTIST)

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.length).toBe(1)


     // haciendo el testss incluyendo en el get all el genero 
  

    expect(res.body[0].genres).toHaveLength(0)
    expect(res.body[0].genres).toBeDefined()

})

test("GET ONE 'URL_ARTIST/:id', should return code 200,and res.body to be defined and res.body.name= artist.name",async()=>
{
    const res= await request(app)
     .get(`${URL_ARTIST}/${artistId}`)
      .send(artist)  

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(artist.name)
})
test("PUt 'URL_ARTIST/:id', should return code 200,and res.body to be defined and res.body.name= send('text)",async()=>
{
    const res= await request(app)
     .put(`${URL_ARTIST}/${artistId}`)
      .send({name:'juan miguel'})  

     expect(res.status).toBe(200)
     expect(res.  body).toBeDefined()
     expect(res.body.name).toBe("juan miguel")
})
test("POST -> 'URL_ARTIST/id:/genres',should status code 200, res.body to be defined",async()=>{

    const genre= await Genre.create({
      name:"pop1"
    })
  
    const res= await request(app)
      .post(`${URL_ARTIST}/${artistId}/genres`)
      .send([genre.id])
    
     
  
      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
      expect(res.body).toHaveLength(1)
      expect(res.body[0].id).toBe(genre.id)
       await genre.destroy()
})

test(" DELETE -> 'URL_ARTIST/:Id', should return status code 204 ",async()=>{
    const  res =await request(app)
        .delete(`${URL_ARTIST}/${artistId}`)

        expect(res.status).toBe(204)
       
})