import "./Form.css"
import { useState } from "react"
import projectFirestore from "../firebase/config"

const Form = () => {
  const [movieTitle, setMovieTitle] = useState("")
  const [movieAge, setMovieAge] = useState("")
  const [movieTime, setMovieTime] = useState("")

  const submitForm = async (event) => {
    event.preventDefault()
    // console.log(movieTitle, movieAge, movieTime)

    const newMovie = {
      title: movieTitle, 
      minage: parseInt(movieAge), 
      time: parseInt(movieTime)
    }

    try {
      // Přidání filmu do databáze
      await projectFirestore.collection("movies").add(newMovie)
      setMovieTitle("")
      setMovieAge("")
      setMovieTime("")
    } catch (err) {
      console.log(err.message)
    }
  }

  return <section className="form-section">
    <form onSubmit={submitForm}>
      <h1>Přidej film</h1>
      <input 
        className="input"
        type="text"  
        placeholder="Název filmu"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      /> 

      <input 
        className="input"
        type="number" 
        placeholder="Min. věk"
        min="1"
        value={movieAge}
        onChange={(e) => setMovieAge(e.target.value)}
      />

      <input 
        className="input"
        type="number" 
        placeholder="Čas filmu"
        min="1"
        value={movieTime}
        onChange={(e) => setMovieTime(e.target.value)}
      />
      
      <input type="submit" value="Přidat film"/>
    </form>
  </section>
}

export default Form