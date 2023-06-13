import styles from "../App.module.css";
import Navabr from "./Navbar.jsx";
import { useState } from "react";
import data from "./tableData.json";
// Function begins here
function Layout() {
  // Here is a sample array of object that we use
  const [users, setUsers] = useState([...data]);
  const [filterDirection, setFilterDirection] = useState("Not Sorted");

  // Make sorting function
  let [sameFilter, setSameFilter] = useState(false);

  // function which is called when clicked by the use on the table header
  function tableSorting(e, filterValue) {
    const copyArray = [...users]; // create a new array & not mutate state
    setUsers([]);
    // Here we set this boolean variable true so when they click on it again iit will make the
    // list go reverse
    setSameFilter(true);

    // Change Color for active
    let allHeaders = document.querySelectorAll("th");
    for (let index = 0; index < allHeaders.length; index++) {
      allHeaders[index].style.color = "white";
    }
    e.target.style.color = "rgb(255, 136, 136)";

    // Here is a sorting method
    // If it is the smae filtere then change toggle ascending or descending
    copyArray.sort((a, b) => {
      if (filterValue != "name") {
        if (sameFilter) {
          setFilterDirection("descending");
          setSameFilter(false);
          return b[filterValue] - a[filterValue];
        } else {
          setFilterDirection("ascending");
          return a[filterValue] - b[filterValue];
        }
      } else {
        if (sameFilter) {
          setSameFilter(false);
          setFilterDirection("descending");
          let fa = b.name.toLowerCase(),
            fb = a.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        } else {
          setFilterDirection("ascending");
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        }
      }
    });
    setUsers([]);
    setTimeout(function () {
      setUsers(copyArray); //re-render
    }, 10);
  }
  return (
    // NAVBAR
    <div>
      <Navabr />
      {/* MAIN table */}
      <h1 className={styles.pageHeader}>Welcome to our awesome Table</h1>
      <div className={styles.tablePosition}>
        <section className={styles.table_TableContainer}>
          <table>
            <thead>
              <tr>
                <th onClick={() => tableSorting(event, "work_experience")}>
                  سابقه خدمت
                </th>
                <th onClick={() => tableSorting(event, "Date_of_employment")}>
                  تاریخ استخدام
                </th>
                <th onClick={() => tableSorting(event, "personal_number")}>
                  شماره پرسنلی
                </th>
                <th onClick={() => tableSorting(event, "name")}>
                  نام و نام خانوادگی
                </th>
                <th onClick={() => tableSorting(event, "row")}>ردیف</th>
              </tr>
            </thead>
            {/* Here we Loop in the array */}
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td> {user.work_experience}</td>
                  <td> {user.Date_of_employment}</td>
                  <td> {user.personal_number}</td>
                  <td> {user.name}</td>
                  <td> {user.row}</td>
                </tr>
              ))}
              {/* End of the Loop */}
            </tbody>
          </table>
        </section>
        <div className={styles.filterDir}>{filterDirection}</div>
      </div>
    </div>
    // Main Content of LAYOUT
  );
}

export default Layout;
