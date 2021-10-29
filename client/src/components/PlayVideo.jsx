import {useState,useEffect} from 'react';
import {Link} from '@reach/router'
import axios from 'axios'
const PlayVideo = ({id}) => {
	const url = `http://localhost:8000/api/video/${id}`;

  return (
    <div>
    	<p>
    		<Link to="../../movies">Go Back</Link>
    		<h2>Watch Movie</h2>
				<video style={{height: "50rem", width:"70rem"}} id="videoPlayer" controls autoplay>
						<source src={url} type="video/mp4"/>
				</video>
    	</p>
    	<p>I do not own the copyrights to this video. I am using it for educational purposes only</p>
    </div>
  )
}

export default PlayVideo;