import "./OneMovie.css"
import { useParams, Link } from "react-router-dom"
import projectFirestore from "../firebase/config"
import { useState, useEffect } from "react"

const OneMovie = () => {
  const [data, setData] = useState({})
  const [error, setError] = useState(false)

  const {movieId} = useParams()

  useEffect(() => {
    projectFirestore.collection("movies").doc(movieId).get().then((document) => {
      
      if (document.exists) {
        setData(document.data())
      } else {
        setError("Nenašli jsme tento film")
      }
    }).catch((err) => {
      setError(err.message)
    })
  }, [movieId])

  return <section className="one-movie-section">
    {error && <p>{error}</p>}
    <h1>{data.title}</h1>
    <p>{data.minage} +</p>
    <p>{data.time} minut</p>
    <Link exact to="/all-movies">Zpět na seznam filmů</Link>
  </section>
}

export default OneMovie