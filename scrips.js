const tmdbKey='798732a83f6fcced53ce691c72ef1083';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async() => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try
  {
    const response = await fetch(urlToFetch)
      if(response.ok)
      {
        const jsonResponse = await response.json();
        const genres = jsonResponse.genres
        return genres;
      }
  }
  catch(errors)
  {
    console.log(errors)
  }
};

const getMovies = async() => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint='/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`
  const urlToFetch=`${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`
  try
  {
    const response = await fetch(urlToFetch)
    if(response.ok)
    {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies
    }
  }
  catch(error)
  {
    console.log(error)
  }
};


const getMovieInfo = async(movie) => {
 const movieId = movie.id
 const movieEndpoint= `/movie/${movieId}`;
 const requestParams = `?api_key=${tmdbKey}`
 const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
try{
  const response = await fetch(urlToFetch);
  if(response.ok){
    const jsonResponse = await response.json();
    const movieInfo = jsonResponse  
    console.log(movieInfo)
    return movieInfo
  }
}catch(error){
  console.log(error)
}
};


const getReleaseDate = async(movie)=>{
    const movieId = movie.id
    const movieReleaseEndpoint = `/movie/${movieId}/release_dates`
    const requestParams = `?api_key=${tmdbKey}`
    const urlToFetch = `${tmdbBaseUrl}${movieReleaseEndpoint}${requestParams}`;
    try{
        const response = fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            const releaseDate = jsonResponse
            return releaseDate;
        }
    }
    catch(error){
        console.log(error)
    }

}


// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info)
 
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;