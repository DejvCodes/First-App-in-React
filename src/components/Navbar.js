import "./Navbar.css"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return <header>
    <nav>
      <NavLink to="/">Domů</NavLink>
      <NavLink to="/all-movies">Filmy</NavLink>
      <NavLink to="/form">Přidání filmů</NavLink>
    </nav>
  </header>
}

export default Navbar