require("../models")
const request = require("supertest")
const app = require("../app.js");
const Artist = require("../models/Artist.js");

let artist
let album
const URL_ALBUM = "/albums"
let  albumId

beforeAll(async () => {
    artist = await Artist.create({
        name: "Testing Artist",
        country:"colombia",
        formationYear:2005,

        image:"testing Image",
        albumIs: null

    })
    album={
        name : "malo",
        image : "imagen de un malo",
        releaseYear: 2002,
        artistId : artist.id

    }

})

test("POST -> '/URL_ALBUM', should return status code 201 , and res.body to be defined and res.body.name = album.name",
async()=>{
    const res=await request(app)
    .post(URL_ALBUM)
    .send(album)
    albumId=res.body.id


    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(album.name)
   
})

test( "GET -> '/ URL_ALBUM', should return status code 200 , res.body to be defined and res.body.length=1", async () =>{
    const res = await request(app)
     .get(URL_ALBUM)
     

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.length).toBe(1)


})
test( "GET -> '/ URL_ALBUM/:id', should return status code 200 , res.body to be defined and res.body.name=album.name", async () =>{
    const res = await request(app)
     .get(`${URL_ALBUM}/${albumId}`)

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(album.name)
})
test('PUT -> "/URL_ALBUM/:id", should return status code 200, res.body to be defined and res.body.name = send("text")', async () =>{
    const res= await request(app)
     .put(`${URL_ALBUM}/${albumId}`)
     .send({name:"lorm29"})
     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe("lorm29")

})
test(" DELETE -> 'URL_ALBUM/:Id', should return status code 204 ",async()=>{
    const  res =await request(app)
        .delete(`${URL_ALBUM}/${albumId}`)

        expect(res.status).toBe(204)
     await artist.destroy()
       
})