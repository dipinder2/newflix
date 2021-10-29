import {Link} from '@reach/router'

const Movie = ({id,vote_average:voteAverage,release_date:releaseDate,vote_count:voteCount,title,poster_path,overview}) => {
  return (
		<div style={{backgroundColor:"#565755",height:"auto",padding:"15px"}}>
			<h7 style={{color:"#cc1f00"}}>
				<Link to={`/home/play/${id}`}>
					{title}
				</Link>
			</h7>
			<br/>
			<br/>
			<img style={{ 
				width:"150px",
				height:"200px"}} 
				src={`https://image.tmdb.org/t/p/original/${poster_path}`}/>
				<p>Vote Average: {voteAverage}</p>
				<p>Vote Count: {voteCount}</p>
				<p>Release Date: {releaseDate}</p>
		</div>
)}

export default Movie;