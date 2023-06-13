import styles from "../App.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <section>
      <nav className={styles.Navber_linksContainer}>
        <ul>
          <li> {" "}
          <Link to={`/layout`}>Layout</Link></li>
          <li>  {" "}
          <Link to={`/`}>Home</Link></li>
          <li>{" "}
          <Link to={`/table`}>Table</Link></li>
          <li>  {" "}
          <Link to={`/searchbar`}>Search</Link></li>
          <li>{" "}
          <Link to={`/sample`}>Sample</Link></li>
        </ul> 
      </nav>
    </section>
  );
}

export default Navbar;