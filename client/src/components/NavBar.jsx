import styles from '../css/home.module.css';
import {useState,useEffect,useContext,useRef} from 'react'
import axios from 'axios'
import {navigate} from '@reach/router'
import {MoviesContext} from '../App'
const NavBar = () => {
  const {setActivePage:sap,
    genre, genres,setGenres,movies,setMovies,setGenre} = useContext(MoviesContext)


  let apiKey = process.env.REACT_APP_API_KEY
  let searchRef = useRef()
  
  useEffect(() =>{
    axios
    .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then(res=>{
    	setGenres(res.data.genres)
    })
    .catch(err=>console.log(err))
  },[])

  const handleLogOutClick = e =>{
    axios.get("http://localhost:8000/api/logout",{withCredentials:true})
    .then(res=>navigate("/"))
    .catch(err=>console.log(err))
  }



  const handleChange = (e) =>{
  	const {id,value} = e.target
  	if(value==="Browse") {
  		setGenre("Browse")
  		return setMovies([])
  	}
  	setGenre(value)
    sap(1)
  	axios
    .get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${value}`)
    .then(res=>{
      searchRef.current.value = ""
      setMovies(res.data.results)})
    .catch(err=>console.log(err))
  }


  const handleClick = e =>{
    axios
    .get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchRef.current.value}&page=1&include_adult=false`)
    .then(res=>{
      setMovies(res.data.results)
      console.log(res.data.results)
      setGenre("Browse")
    })
    .catch(err=>console.log(err))
  }


  const handleSearchChange = e =>{
      searchRef.current.value = e.target.value
  }


   return (
    <>
    <div className={styles.flex}>
    		<div>
    		<span  style={{fontSize:"24px"}}><span style={{color:"red"}}>New</span>Flix</span>
          	<select value={genre} onChange={handleChange} className="form-select form-select-lg mb-3" name="category" id="category">
  			     <option selected value="Browse">Browse</option>
  				{
  					genres.length<1
  					? null
  					: genres.map(genre =>{
  						return <option value={genre.id} id={genre.id}>
  							{genre.name}
  						</option>

  					})
  				}
  			</select>
        </div>

    	<div>
    		<input ref={searchRef} onChange={handleSearchChange}  type="text" placeholder="search here for movie"/>
    		<button onClick={handleClick} className="btn btn-link">Search</button>
    	</div>
      <button onClick={handleLogOutClick} className="btn btn-danger" >Log Out</button>
    </div>
    </>
  )
}

export default NavBar;