import React from 'react'
import { showPopin } from '../redux/movie/MovieSlice'
import { useDispatch } from 'react-redux'

export default function MovieCard({movie}) {

  const dispatch = useDispatch()

  return (
    <div className="col-md-4" key={movie.id} onClick={()=>{ dispatch(showPopin(movie)) }}>
        <div className="card">
            <img src={movie.image} className="card-img-top" alt={movie.title} />
            <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            </div>
        </div>
    </div>
  )
}
