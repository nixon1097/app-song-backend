require("../models")
const request = require("supertest")
const app = require('../app')
const Album = require("../models/Album")
const Artist = require("../models/Artist")
const Genre = require("../models/Genre")


 let song
let album 
let songId
 const URL_SONG= '/songs'


beforeAll(async()=>{

 album =await Album.create({
    name:'album1',
    image: "image.jpg",
    releaseYear:2008

 })
 song ={
    name: 'song1',
    albumId: album.id
 }
})

test("POST -> '/URL_SONG', should return statu code 201, and res.body to be defined and res.body.name= album.name",async()=>{
    const res= await request(app)
    .post(URL_SONG)
    .send(song)
    songId = res.body.id 

 expect(res.status).toBe(201)
 expect(res.body).toBeDefined()
 expect(res.body.name).toBe(song.name)
})

test("GET -> 'URL_SONG',should return status code 200, and res.body to be defined and res.body.length = 1 ",async()=>{
    const res= await request(app)
    .get(URL_SONG)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
})
test("GET -> 'URL_SONG/:id',should return status code 200, and res.body to be defined and res.body.length = 1 ",async()=>{
    const res= await request(app)
    .get(`${URL_SONG}/${songId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(song.name)
})


test("PUT -> 'URL_SONG/:id',should return status code 200, and res.body to be defined and res.body.length = 1 ",async()=>{
    const res= await request(app)
    .put(`${URL_SONG}/${songId}`)
     .send({name:'arroz'})
     

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe('arroz')
})

test("POTS -> 'URL_SONG/:id/artists', should return code 200, and res.body to be defiend", async()=>{

     const  artist = await Artist.create({
        name: "Juanes",
        country:"colombia",
        formationYear:1998,
        image:"loremp20"
    })



        const res= await  request(app)
         .post(`${URL_SONG}/${songId}/artists`)
         .send([artist.id])

         expect(res.status).toBe(200)
         expect(res.body).toBeDefined()
         expect(res.body).toHaveLength(1)
         expect(res.body[0].id).toBe(artist.id)
         await artist.destroy()


})

test("POST -> 'URL_SONG/:id/genres, should return code 200, and res.body to be defined and res.body.length = 1'",async()=>{
    const genre= await  Genre.create({
        name: "rock"
    })
      
    const res= await request(app)
     .post(`${URL_SONG}/${songId}/genres`)
     .send([genre.id])

     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body).toHaveLength(1)
     expect(res.body[0].id).toBe(genre.id)

     await genre.destroy()
})


test(" DELETE -> 'URL_ARTIST/:Id', should return status code 204 ",async()=>{
    const  res =await request(app)
        .delete(`${URL_SONG}/${songId}`)

        expect(res.status).toBe(204)
        
        await album.destroy()
       
})