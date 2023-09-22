import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    movies: [
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
    ],
    popinVisible: false,
    selectedMovie: null,
    titleMovie: '',
    contentMovie: '',
    idMovieSelected: '',
}

export const MovieSlice = createSlice({
    name: 'movie',
    initialState : initialState,
    reducers: {
        showPopin: (state, action) => {
            state.popinVisible = true
            state.selectedMovie = action.payload
        },
        closePopin: (state) => {
            state.popinVisible = false
            state.selectedMovie = null
        },
        addMovie: (state) => {
            state.movies = [...state.movies, {
                id: state.movies.lenght + 1,
                title: state.titleMovie,
                description: state.contentMovie,
                image: 'https://picsum.photos/200'
              }]

            state.titleMovie = ''
            state.contentMovie = ''
        },
        deleteMovie: (state, action) => {
            state.movies = [...state.movies].filter( (m)=> Number(m.id) !== Number(action.payload) )
            state.idMovieSelected = ''
        },
        updateMovie: (state, action) => {
            let index = [...state.movies].findIndex((m) => m.id === state.selectedMovie.id)
            let newMovies = [...state.movies]
            newMovies[index].title = action.payload.title
            newMovies[index].description = action.payload.content
            state.movies = newMovies
            state.popinVisible = false
        },
        setTitleMovie: (state, action) => {
            state.titleMovie = action.payload
        },
        setContentMovie: (state, action) => {
            state.contentMovie = action.payload
        },
        setIdMovieSelected: (state, action) => {
            state.idMovieSelected = action.payload
        },


    }
})

export const {
    showPopin,
    closePopin,
    addMovie,
    deleteMovie,
    updateMovie,
    setTitleMovie,
    setContentMovie,
    setIdMovieSelected
} = MovieSlice.actions

export default MovieSlice.reducer