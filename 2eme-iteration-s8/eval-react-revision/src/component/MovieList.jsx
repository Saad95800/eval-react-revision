import React, { useState } from 'react'
import MovieCard from './MovieCard'
import Popin from './Popin'

export default function MovieList(){
           
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: 'Inception',
            description: 'Un film de science-fiction réalisé par Christopher Nolan.',
            image: 'https://picsum.photos/200',
          },
          {
            id: 2,
            title: 'Avatar',
            description: 'Un film de science-fiction réalisé par James Cameron.',
            image: 'https://picsum.photos/200',
          },
          {
            id: 3,
            title: 'Equalizer',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam doloremque nihil ducimus quibusdam sed, in voluptas",
            image: 'https://picsum.photos/200',
          }
    ])

    const [popinVisible, setPopinVisible] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [titleMovie, setTitleMovie] = useState('')
    const [contentMovie, setContentMovie] = useState('')
    const [idMovieSelected, setIdMovieSelected] = useState('')

    function showPopin(movie){
        setPopinVisible(true)
        setSelectedMovie(movie)
    }

    function closePopin(){
        setPopinVisible(false)
        setSelectedMovie(null)
    }

    function addMovie(){
        setMovies( [...movies, {
            id: movies.lenght + 1,
            title: titleMovie,
            description: contentMovie,
            image: 'https://picsum.photos/200'
          }] )
          setTitleMovie('')
          setContentMovie('')
    }

    function deleteMovie(idMovieSelected){
        setMovies(
            [...movies].filter( (m)=> Number(m.id) !== Number(idMovieSelected) )
        )
        setIdMovieSelected('')
    }

    function updateMovie(title, content){
        let index = [...movies].findIndex((m) => m.id === selectedMovie.id)
        let newMovies = [...movies]
        newMovies[index].title = title
        newMovies[index].description = content
        setPopinVisible(false)
    }

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
                addMovie()
            }}>
                <h3 className="text-center">Ajouter un film</h3>
                <div className="mb-3 mt-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Titre du film"
                        value={titleMovie}
                        onChange={(e)=>{ setTitleMovie(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Description du film"
                        value={contentMovie}
                        onChange={(e)=>{ setContentMovie(e.target.value)}}
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
                        deleteMovie(idMovieSelected)
                    }}>
                        <div className="mb-3 mt-3">
                            <select className="form-select" onChange={(e)=>{ setIdMovieSelected(e.target.value) }}>
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
                        <MovieCard key={movie.id} movie={movie} showPopin={showPopin}/>  
                    )
                )}
            </div>
            
            {popinVisible && <Popin selectedMovie={selectedMovie} closePopin={closePopin} updateMovie={updateMovie} />}

        </div>
    )
  }