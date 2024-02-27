const Genre = require("./Genre");
const Artist = require("./Artist");
const Album = require("./Album");
const Song = require("./Song");


//table pivot: genreArtist
Genre.belongsToMany(Artist, { through: 'genreArtist' });
Artist.belongsToMany(Genre, { through: 'genreArtist' });


// albums -> arstisId
Album.belongsTo(Artist);
Artist.hasMany(Album);

//songs -> albumId
Song.belongsTo(Album);
Artist.hasMany(Song);

//table pivot: songArtist
Song.belongsToMany(Artist, { through: 'songArtist' });
Artist.belongsToMany(Song, { through: 'songArtist' });

//table pivot : songGenre
Song.belongsToMany(Genre,{through:'songGenre'});
Genre.belongsToMany(Song,{through:'songGenre'});