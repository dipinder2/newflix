import React from 'react';
import {Link} from '@reach/router'

const Movie = ({vote_average:v_avg,release_date:rd,vote_count:v_c,title,poster_path,overview}) => {
  return (
<div style={{backgroundColor:"#565755",height:"auto",padding:"15px"}}>
	<h7 style={{color:"#cc1f00"}}>
		<Link to="">
			{title}
		</Link>
	</h7>
	<br/>
	<br/>
	<img style={{ 
		width:"150px",
		height:"200px"}} 
		src={`https://image.tmdb.org/t/p/original/${poster_path}`}/>
		<p>Vote Average: {v_avg}</p>
		<p>Vote Count: {v_c}</p>
		<p>Release Date: {rd}</p>
</div>
  )
}

export default Movie;