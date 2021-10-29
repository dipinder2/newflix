import {useContext} from 'react';
import Movie from './Movie'
import {MoviesContext} from '../App'
import Pagination from "react-js-pagination";
import {activeLink} from '../css/home.module.css';
import axios from 'axios'
import NavBar from './NavBar';

const MovieList = ({movies}) => {
  const {genre,activePage,setMovies,setActivePage,activeLink} = useContext(MoviesContext)
  const handleChange = pg =>{
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${pg}&with_genres=${genre}`)
      .then(res=>{
        setMovies(res.data.results)
        setActivePage(pg)
        })
      .catch(err=>console.log(err))
  }
  return (
    <>
      <NavBar/>
      <div style={{
      display:'grid',
      gridColumnGap:"10px",
      gridRowGap:"30px",
      gridTemplateColumns:"repeat(6,1fr)"}}>
      {
      	movies.map((movie,index) =>{
      		return <Movie key={index} {...movie}/>
      	})
      }
      </div>

      <div style={{margin:"10% 35%"}}>
                  {
            genre==="Browse"
            ? null
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
              onChange={handleChange}/>
          }
    </div>
  </>
  )
}

export default MovieList;
