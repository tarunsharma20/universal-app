const Base = { form: {}};

getAllMovies();

Base.form.movie = document.getElementById('form-movie');

Base.form.movie.addEventListener('submit', function (event) {
  event.preventDefault();
  addMovie();
})

function getAllMovies () {
  const query = `{
    getAllMovies {
      id
      status
      releaseDate
      directors
      screenWriters
      producers
      budget
      earning
      length
      story
      castMembersIds
      image createdAt
      updatedAt
    }
  }`;

  const variables = {};

  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
  .then(function (response) {
    if(response.statusText !== 'ok') {
      console.log('Something went wrong');
    }
  
    return response.json();
  })
  .then(function (result) {
    const movies = result.data.getAllMovies;
    const moviesContainer = document.getElementById('movies');
  
    moviesContainer.innerHTML = '<pre>' + JSON.stringify(movies, null, 2) + '</pre>';
  })
  .catch(function (error) {
    throw error
  });
}

function addMovie() {
  const query = `mutation CreateMovie($input: MovieInput) {
    createMovie(input: $input) {
      id
      status
      releaseDate
      directors
      screenWriters
      producers
      budget
      earning
      length
      story
      castMembersIds
      image
      createdAt
      updatedAt
    }
  }`;

  const releaseDate = new Date(document.getElementById('movie-release-date').value)

  const variables = {
    input: {
      status        : document.getElementById('movie-status').value,
      releaseDate   : ~~(releaseDate.getTime() / 1000) + '',
      directors     : document.getElementById('movie-director').value.split(','),
      screenWriters : document.getElementById('movie-screen-writer').value.split(','),
      producers     : document.getElementById('movie-producer').value.split(','),
      budget        : ~~document.getElementById('movie-budget').value,
      earning       : ~~document.getElementById('movie-earning').value,
      length        : document.getElementById('movie-length').value,
      story         : document.getElementById('movie-story').value
    }
  }

  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Accept'       : 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
  .then(function (response) {
    if(response.statusText !== 'ok') {
      console.log('Something went wrong');
    }
  
    return response.json();
  })
  .then(function (result) {
    const movie = result.data.createMovie;

    console.log('created new movie: ' + JSON.stringify(movie, null, 2));
    location.reload();
  })
  .catch(function (error) {
    throw error;
  });
}
