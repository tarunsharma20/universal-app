movie = Base.select('#form-movie');

movie.addEvent('submit', function (event) {
  event.preventDefault();
  addMovie();
})

getAllMovies()

// const modelBoxCreateMovie = new modelBox({
//   id: 'model-box-create-movie',
//   closeBtn: 'model-box-create-movie-close-btn',
//   beforeClose: function () {
//     alert('closed');
//   },
//   show: true
// });

const modelBoxCreateMovie = new modelBox({
  id: 'model-box-create-movie',
});

const openNewMovieDialogBtn = Base.select('#btn-new-movie-model-box');
const addNewMovieBtn = Base.select('#btn-add-new-movie');
const cancelNewMovieBtn = Base.select('#btn-cancel-new-movie');

openNewMovieDialogBtn.addEvent('click', function () {
  modelBoxCreateMovie.open();
});

addNewMovieBtn.addEvent('click', function() {
  addMovie();
  modelBoxCreateMovie.close();
});

cancelNewMovieBtn.addEvent('click', function() {
  cancelMovie();
  modelBoxCreateMovie.close();
});








function createMovieTableRow(inputs) {
  const {
    name,
    status,
    releaseDate,
    directors,
    screenWriters,
    producers,
    budget,
    earning,
    length,
    story,
    castMembers,
    image
  } = inputs;

  const temp = Base.createElement('tr', null, [
    Base.createElement('td', null, name),
    Base.createElement('td', null, status),
    Base.createElement('td', null, releaseDate),
    Base.createElement('td', null, directors && directors.join(', ')),
    Base.createElement('td', null, screenWriters && screenWriters.join(',')),
    Base.createElement('td', null, producers && producers.join(',')),
    Base.createElement('td', null, budget),
    Base.createElement('td', null, earning),
    Base.createElement('td', null, length),
    Base.createElement('td', null, story),
    Base.createElement('td', null, castMembers && castMembers.join(', ')),
    Base.createElement('td', null, image),
    Base.createElement('td', null, 'Actions')
  ]);

  return temp;
}

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
      image
      createdAt
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
    if(response.statusText !== 'OK') {
      console.log('Something went wrong');
    }

    return response.json();
  })
  .then(function (result) {
    const movies      = result.data.getAllMovies;
    const moviesTable = document.querySelector('#table-movies tbody');
    const fragment    = document.createDocumentFragment();

    moviesTable.innerHTML = '';

    if(movies.length > 0) {
      movies.forEach(function (movie) {
        const {
          status,
          releaseDate,
          directors,
          screenWriters,
          producers,
          budget,
          earning,
          length,
          story,
          castMembersIds,
          image
        } = movie;

        fragment.appendChild(createMovieTableRow({
          name: null,
          status,
          releaseDate,
          directors,
          screenWriters,
          producers,
          budget,
          earning,
          length,
          story,
          castMembers: castMembersIds,
          image
        }))
      });
    }
    else {
      const tableRow = Base.createElement('tr', { align: 'center' });
      tableRow.innerHTML = '<td colspan="13">There are no movies to show</td>'
      fragment.appendChild(tableRow);
    }

    moviesTable.appendChild(fragment);
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

  const releaseDate = new Date(Base.select('#movie-release-date').val())

  const variables = {
    input: {
      status        : Base.select('#movie-status').val(),
      releaseDate   : ~~(releaseDate.getTime() / 1000) + '',
      directors     : Base.select('#movie-director').val().split(','),
      screenWriters : Base.select('#movie-screen-writer').val().split(','),
      producers     : Base.select('#movie-producer').val().split(','),
      budget        : ~~Base.select('#movie-budget').val(),
      earning       : ~~Base.select('#movie-earning').val(),
      length        : Base.select('#movie-length').val(),
      story         : Base.select('#movie-story').val()
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
    if(response.statusText !== 'OK') {
      console.log('Something went wrong');
    }

    return response.json();
  })
  .then(function (result) {
    const movie = result.data.createMovie;

    const movieTableBody = Base.select('#table-movies tbody');
    const {
      status,
      releaseDate,
      directors,
      screenWriters,
      producers,
      budget,
      earning,
      length,
      story,
      castMembersIds,
      image
    } = movie;

    const newRow = createMovieTableRow({
      name: null,
      status,
      releaseDate,
      directors,
      screenWriters,
      producers,
      budget,
      earning,
      length,
      story,
      castMembers: castMembersIds,
      image
    });

    movieTableBody.elements[0].appendChild(newRow);
    console.log('created new movie: ' + JSON.stringify(movie, null, 2));
    // location.reload();
  })
  .catch(function (error) {
    throw error;
  });
}

function cancelMovie() {
  Base.selectAll('#form-movie input[type="text"]').fillVal('');
  Base.selectAll('#form-movie input[type="file"]').fillVal('');
  Base.selectAll('#form-movie textarea').fillVal('');
  Base.selectAll('#form-movie select').fillVal('');
}
