import "./AllMovies.css"
import projectFirestore from "../firebase/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const AllMovies = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const unsubscribe = projectFirestore.collection("movies").onSnapshot((snapshot) => {

      if (snapshot.exist) {
        setError("Žádné chyby k vypsání")
      } else {
        let result = []
        snapshot.docs.forEach((oneMovie) => {
          result.push({id: oneMovie.id, ...oneMovie.data()})
        })
        setData(result)
      }
    }, (err) => setError(err.message)) 

    return () => unsubscribe()
  }, [])

  const deleteMovie = (id) => {
    projectFirestore.collection("movies").doc(id).delete()
  }

  return <section>
    {error && <p>{error}</p>}
    {data.map((oneMovie) => {
      const {id, title} = oneMovie

      return <div key={id} className="one-movie">
        <p>{title}</p>
        <Link to={`/one-movie/${id}`}>Více informací</Link>
        <button onClick={() => deleteMovie(id)}>Smazat</button>
      </div>
    })}
  </section>
}

export default AllMovies