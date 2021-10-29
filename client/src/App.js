import logo from './logo.svg';
import './App.css';
import {Router} from '@reach/router'
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import MovieList from './components/MovieList';
import PlayVideo from './components/PlayVideo';
import {useState,createContext,useContext} from 'react'
import Cookies from 'js-cookie';



export const MoviesContext = createContext(); 

function App() {
  const [genres,setGenres] = useState([{}])
  const [genre,setGenre] = useState("Browse")
  const [movies,setMovies] = useState([])
  const [activePage,setActivePage] = useState(1)
  return (
    <div className="App">
      <MoviesContext.Provider value={{genres,setGenres,
        genre,setGenre,
        movies,setMovies,activePage,setActivePage}}>
        <Router>
          <LoginForm path="/"/>
          <Home path="/home">
              <MovieList movies={movies} path="/movies"/>
              <PlayVideo movies={movies} path="/play/:id"/>
          </Home>
        </Router>
      </MoviesContext.Provider>
    </div>
  );
}

export default App;
