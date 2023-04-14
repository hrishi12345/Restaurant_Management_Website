import React, { useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [transform, setTransform] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const MoviesHandler=useCallback(async ()=> {
    try {
      setIsLoading(true);
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went Wrong...Retrying');
      }
      const m = await response.json();
      const transformedData = m.results.map((moviesdata) => ({
        id: moviesdata.episode_id,
        title: moviesdata.title,
        releaseDate: moviesdata.release_date,
        openingText: moviesdata.opening_crawl,
      }));

      if (!isCancelled) {
        setTransform(transformedData);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(MoviesHandler, 500);
    }
    setIsLoading(false);
  },[])
  useEffect(()=>MoviesHandler(),[MoviesHandler])
  function abort() {
    setIsCancelled(true);
    setTransform([]);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={MoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && transform.length > 0 && <MoviesList movies={transform} />}
        {!isLoading && transform.length === 0 && !error && <p>No Movies Found</p>}
        {!isLoading && error && (
          <p>
            {isCancelled && <button onClick={abort}>Cancel</button>}
            {error}
          </p>
        )}
        {isLoading && <p>Loading....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
