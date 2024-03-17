// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import apiKeys from "./apiKeys";
// import ReactAnimatedWeather from "react-animated-weather";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import './App.css';

// function Forcast(props) {
//   const [query, setQuery] = useState("");
//   const [error, setError] = useState("");
//   const [weather, setWeather] = useState({});

//   const search = (city) => {
//     axios
//       .get(
//         `${apiKeys.base}weather?q=${
//           city !== "[object Object]" ? city : query
//         }&units=metric&APPID=${apiKeys.key}`
//       )
//       .then((response) => {
//         setWeather(response.data);
//         setQuery("");
//       })
//       .catch(function (error) {
//         console.log(error);
//         setWeather("");
//         setQuery("");
//         setError({ message: "Not Found", query: query });
//       });
//   };

//   const generatePDF = () => {
//     const input = document.getElementById("weather-report");
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       const imgWidth = 210;
//       const pageHeight = 295;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 0;
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }
//       pdf.save("weather-report.pdf");
//     });
//   };

//   useEffect(() => {
//     search("Pakistan");
//   }, []);

//   return (
//     <div className="forecast">
//       <div className="forecast-icon">
//         <ReactAnimatedWeather
//           icon={props.icon}
//         //   color={defaults.color}
//         //   size={defaults.size}
//         //   animate={defaults.animate}
//         />
//       </div>
//       <div className="today-weather">
//         <h3>{props.weather}</h3>
//         <div className="search-box">
//           <input
//             type="text"
//             className="search-bar"
//             placeholder="Search any city"
//             onChange={(e) => setQuery(e.target.value)}
//             value={query}
//           />
//           <div className="img-box">
//             {" "}
//             <img
//               src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
//               onClick={search}
//             />
//           </div >
          
//         </div>
//         <button id="pdf" onClick={generatePDF}>Generate PDF</button>
//         <ul id="weather-report">
//           {typeof weather.main !== "undefined" ? (
//             <div>
//               {" "}
//               <li className="cityHead">
//                 <p>
//                   {weather.name}, {weather.sys.country}
//                 </p>
//                 <img
//                   className="temp"
//                   src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
//                 />
//               </li>
//               <li>
//                 Temperature{" "}
//                 <span className="temp">
//                   {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
//                 </span>
//               </li>
//               <li>
//                 Humidity{" "}
//                 <span className="temp">
//                   {Math.round(weather.main.humidity)}%
//                 </span>
//               </li>
//               <li>
//                 Visibility{" "}
//                 <span className="temp">
//                   {Math.round(weather.visibility)} mi
//                 </span>
//               </li>
//               <li>
//                 Wind Speed{" "}
//                 <span className="temp">
//                   {Math.round(weather.wind.speed)} Km/h
//                 </span>
//               </li>
//             </div>
//           ) : (
//             <li>
//               {error.query} {error.message}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }
// export default Forcast;




import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${encodeURIComponent(
          city !== "[object Object]" ? city : query
        )}&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  const generatePDF = () => {
    const input = document.getElementById("weather-report");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("weather-report.pdf");
    });
  };

  useEffect(() => {
    search("Pakistan"); // Default search
  }, []);

  const boldStyle = { fontWeight: "bold" };
  const tempStyle = { fontSize: "18px" };

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color="white"
          size={112}
          animate={true}
        />
      </div>
            <button id="pdf" onClick={generatePDF}>Generate PDF</button>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            {" "}
            <img id="img"
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={() => search(query)} // Corrected onClick handler
            />
          </div>
        </div>
        <ul id="weather-report">
          {typeof weather.main !== "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                <p style={boldStyle}>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li style={tempStyle}>
                Temperature{" "}
                <span style={boldStyle}>
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li style={tempStyle}>
                Humidity{" "}
                <span style={boldStyle}>
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li style={tempStyle}>
                Visibility{" "}
                <span style={boldStyle}>
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li style={tempStyle}>
                Wind Speed{" "}
                <span style={boldStyle}>
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Forcast;


