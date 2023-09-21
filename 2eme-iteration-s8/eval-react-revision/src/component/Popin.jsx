
import { useState } from 'react'

export default function Popin({selectedMovie, closePopin, updateMovie}){

    const [movieTitleEdit, setMovieTitleEdit] = useState(selectedMovie.title)
    const [movieContentEdit, setMovieContentEdit] = useState(selectedMovie.description)

    return (
        <div className="position-fixed w-100 h-100" style={{ top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={()=>{ closePopin() }} >
            <div className="d-flex justify-content-center align-items-center h-100">
            <div className="card" style={{ width: '18rem' }} onClick={(e)=>{
                    e.stopPropagation()
                }}>
                <img src={selectedMovie.image} className="card-img-top" alt={selectedMovie.title} />
                <div className="card-body">
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    updateMovie(movieTitleEdit, movieContentEdit)
                }}>
                    <div className="form-group">
                        <input type="text" className="form-control" value={movieTitleEdit} onChange={(e)=>{ setMovieTitleEdit(e.target.value) }} />
                    </div>
                
                <textarea
                        className="form-control"
                        placeholder="Description du film"
                        value={movieContentEdit}
                        onChange={(e)=>{ setMovieContentEdit(e.target.value)}}
                    ></textarea>
                    <button type="submit" className="btn btn-primary">
                        Modifier
                    </button>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
  }