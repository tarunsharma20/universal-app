const Movie = require('./model');

const getAllMovies = async (obj, params, context) => {
  const from  = params.from  || 0;
  const count = params.count || 20;

  return await Movie.find().skip(from).limit(count)
}

const createMovie = async (obj, params, context) => {

  const {
    status,
    releaseDate: release_date,
    directors,
    screenWriters: screen_writers,
    producers,
    budget,
    earning,
    length,
    story,
    castMembersIds: cast_members_ids,
    image
  } = params.input;

  const movie = new Movie ({
    status,
    release_date,
    directors,
    screen_writers,
    producers,
    budget,
    earning,
    length,
    story,
    cast_members_ids,
    image
  });

  return await movie.save()

  return await movie.save(function (error, response) {

  });
}

const Query = {
  getAllMovies
};

const Mutation = {
  createMovie
};

module.exports = { Query, Mutation };
