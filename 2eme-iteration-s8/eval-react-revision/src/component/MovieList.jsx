import React, { useState } from 'react'
import MovieCard from './MovieCard'
import Popin from './Popin'
import { useSelector } from 'react-redux'
import {setTitleMovie, setContentMovie, setIdMovieSelected, addMovie, deleteMovie} from '../redux/movie/MovieSlice'
import { useDispatch } from 'react-redux'

export default function MovieList(){
    
    const dispatch = useDispatch()

    const movies = useSelector((state) => state.movie.movies )
    const popinVisible = useSelector((state) => state.movie.popinVisible )
    const selectedMovie = useSelector((state) => state.movie.selectedMovie )
    const titleMovie = useSelector((state) => state.movie.titleMovie )
    const contentMovie = useSelector((state) => state.movie.contentMovie )
    const idMovieSelected = useSelector((state) => state.movie.idMovieSelected )

    // Les props servent a transmettre des infos du parent à l'enfant
    // L'enfant , pour transmettre une info au parent doit utiliser une fonction du parent, (le parent transmet la fonction à l'enfant via une prop)
    return (
        <div className="container">
            <form onSubmit={(e)=>{
                e.preventDefault()
                if(titleMovie.length === 0 || contentMovie.length === 0){
                    alert('Veuillez saisir tout les champs')
                    return
                }
                dispatch(addMovie())
            }}>
                <h3 className="text-center">Ajouter un film</h3>
                <div className="mb-3 mt-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Titre du film"
                        value={titleMovie}
                        onChange={(e)=>{ dispatch(setTitleMovie(e.target.value)) }}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Description du film"
                        value={contentMovie}
                        onChange={(e)=>{ dispatch(setContentMovie(e.target.value)) }}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Ajouter
                </button>
            </form>

            <div className="col-md-4 mb-4">
                    <h3 className="text-center">Supprimer un film</h3>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        dispatch(deleteMovie(idMovieSelected))
                    }}>
                        <div className="mb-3 mt-3">
                            <select className="form-select" onChange={(e)=>{ dispatch(setIdMovieSelected(e.target.value)) }}>
                                <option value="">Sélectionnez un film à supprimer</option>
                                {movies.map((movie, i)=>{
                                    return <option key={i} value={movie.id}>{movie.title}</option>
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-danger">
                            Supprimer
                        </button>
                    </form>
                </div>

            <div className="row">
                {movies.map((movie, i)=> ( // Quand on retourne plusieurs composants grace a une boucle en JSX, chaque composant doit avoir une prop key avec un id unique
                        <MovieCard key={movie.id} movie={movie}/>  
                    )
                )}
            </div>
            
            {popinVisible && <Popin selectedMovie={selectedMovie} />}

        </div>
    )
  }