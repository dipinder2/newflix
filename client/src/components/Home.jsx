import {useState,useContext} from 'react';
import MovieList from './MovieList';
import {activeLink} from '../css/home.module.css';
import {MoviesContext} from '../App'

const Home = (props) => {
  return (
    <>
      {
        props.children
      }
      
    </>
  )
}

export default Home;