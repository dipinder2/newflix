import {useState,useEffect} from 'react';
import axios from 'axios'
import {Link} from '@reach/router'
import NavBar from './NavBar';
import MovieList from './MovieList';
import Pagination from "react-js-pagination";
import {activeLink} from '../css/home.module.css';


const Home = ({setPermission}) => {

  const [genres,setGenres] = useState([{}])
  const [genre,setGenre] = useState("Browse")
  const [movies,setMovies] = useState([])
  const [activePage,setActivePage] = useState(1)



  const handleChange = pg =>{
    setActivePage(pg)
    axios
    .get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=${pg}&with_genres=${genre}`)
    .then(res=>setMovies(res.data.results))
    .catch(err=>console.log(err))
  }
  return (
    <>

      <NavBar setPermission={setPermission} activePage={activePage} setActivePage={setActivePage} genre={genre} genres={genres} setGenres={setGenres} setGenre={setGenre} movies={movies} setMovies={setMovies}/>
      {
        movies.length>0?
        <MovieList movies={movies}/>
        :<p className="">No Movies found</p>
      }
      <div style={{margin:"10% 35%"}}>
      {
      genre==="Browse"
      ?null
      :<Pagination
          activePage={activePage}
          activeClass="btn-lg btn-link active"
          lastPageText="last"
          firstPageText="first"
          nextPageText="next"
          prevPageText="prev"
          activeLinkClass={activeLink}
          linkClass={"page-link bg-danger text-white"}
          itemsCountPerPage={20}
          totalItemsCount={500}
          pageRangeDisplayed={4}
          onChange={handleChange}
        />
      }
      </div>
    </>
  )
}

export default Home;