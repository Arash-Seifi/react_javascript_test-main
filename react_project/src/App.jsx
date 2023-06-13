import styles from "./App.module.css";
import Navabr from "./components/Navbar.jsx";

function App() {
  return (
    <main>
      <Navabr />
      <h1 className={styles.pageHeader}>Hi this is our home page (It is empty for now :))</h1>
      <div className={styles.home_container}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam mollitia commodi earum veniam voluptate assumenda, corporis recusandae architecto quia facere, totam quae expedita labore provident, repudiandae obcaecati! Aliquam, debitis fuga.
      </div>
    </main>
  );
}

export default App;
