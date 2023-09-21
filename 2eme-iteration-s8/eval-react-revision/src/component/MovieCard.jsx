import React from 'react'

export default function MovieCard({movie, showPopin}) {
  return (
    <div className="col-md-4" key={movie.id} onClick={()=>{ showPopin(movie) }}>
        <div className="card">
            <img src={movie.image} className="card-img-top" alt={movie.title} />
            <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            </div>
        </div>
    </div>
  )
}
