import styles from "../App.module.css";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
function SearchBar() {
  // Function to collect data
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  // Our Variables
  const [country, setCountry] = useState([]);
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState("IR");
  const [chartData, setChartData] = useState({ datasets: [] });
  const [label, setLabel] = useState([]);
  const [ylabel, setYlabel] = useState([]);
  const [prevCountry, setprevCountry] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { data } = await fetch(`http://localhost:3000/?q=${value}`).then(
        //   (response) => response.json()
        // );
        // setCountry(data.results);
        const responsesJSON = await Promise.all([
          fetch(`http://localhost:3000/?q=${value}`),
          //fetch(`http://localhost:3000/chart/${countryCode}`),
        ]);
        const [data] = await Promise.all(responsesJSON.map((r) => r.json()));
        setCountry(data.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [value, countryCode]);

  // Second For 1s callback
  useEffect(() => {
    // This function calls itself every 1second
    //assign interval to a variable to clear it.
    const intervalId = setInterval(() => {
      const fetchData = async () => {
        try {
          const responsesJSON = await Promise.all([
            fetch(`http://localhost:3000/chart/${countryCode}`),
          ]);
          const [dataCharts] = await Promise.all(
            responsesJSON.map((r) => r.json())
          );
          if (countryCode == prevCountry) {
            if (!label.includes(dataCharts.data.x)) {
              // only runs if value not in array
              setLabel((prevLabel) => [...prevLabel, dataCharts.data.x]);
            }
            if (!ylabel.includes(dataCharts.data.y)) {
              // only runs if value not in array
              setYlabel((prevLabel) => [...prevLabel, dataCharts.data.y]);
            }
          } else {
            // Reset new data
            setLabel(() => []);
            setYlabel(() => []);
            setprevCountry(countryCode);
          }

          setChartData({
            labels: label,
            datasets: [
              {
                label: "Our point",
                data: ylabel,
                backgroundColor: [`rgb(73, 85, 235)`],
                borderColor: [`rgb(64, 172, 246)`],
                borderWidth: 4,
              },
            ],
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, 1000);
    return () => clearInterval(intervalId); //This is important
  });
  return (
    <section>
      <Navbar />
      <h1 className={styles.pageHeader}>Welcome to our Amazing Searchbar</h1>
      <div className={styles.SearchBar_container}>
        <div className={styles.searchBar}>
          <input
            type="search"
            placeholder="Search Country..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        {/* Show the Countries */}
        <div className={styles.countryItems}>
          {country &&
            country.map((country, index) => (
              <div key={country.item.code}>
                <div
                  onClick={() => {
                    setCountryCode(country.item.code);
                  }}
                >
                  {/* Index */}
                  <span className={styles.countryItemsColor2}>
                    {index + 1}.
                  </span>{" "}
                  <span>
                    {/* Name */}
                    <span className={styles.countryItemsColor}>Name:</span>{" "}
                    {country.item.name}{" "}
                  </span>{" "}
                  <span> - </span>
                  {/* Code */}
                  <span>
                    <span className={styles.countryItemsColor}>Code:</span>{" "}
                    {country.item.code}
                  </span>
                </div>
              </div>
            ))}
        </div>
        {/* End of showing the Countries */}
      </div>
      {/* For chart */}
      <div className={styles.chart_container}>
        <div>
          <Line data={chartData} />
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
