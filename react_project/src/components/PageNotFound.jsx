import styles from "../App.module.css";
import { Link } from "react-router-dom";
// Main component start here
function PageNotFoundComponent() {
  return (
    <section className={styles.pageNotFound_contentContainer}>
      <h1>Oops!!</h1>
      <h3>404 - PAGE NOT FOUND</h3>
      <p>
        Sorry The Page you are looking for is not available, it may have been
        removed or had it named changed or is unavailable
      </p>
      <button><Link to={`/`}>Go to Home page</Link></button>
    </section>
  );
}

export default PageNotFoundComponent;