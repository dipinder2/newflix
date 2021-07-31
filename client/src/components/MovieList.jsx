import React from 'react';
import Movie from './Movie'

const MovieList = ({movies}) => {
  return (
    <div style={{
    display:'grid',
    gridColumnGap:"10px",
    gridRowGap:"30px",
    gridTemplateColumns:"repeat(6,1fr)"}}>
    {
    	movies.map((movie,id) =>{
    		return <Movie key={id} {...movie}/>
    	})
    }
    </div>
  )
}

export default MovieList;
