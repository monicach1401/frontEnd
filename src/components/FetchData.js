import React, { useEffect, useState } from "react";

export const FetchData = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al backend aquí
    fetch("http://localhost:5000/cities/all")  // Cambia la URL por la correcta
      .then((response) => response.json())
      .then((data) => {
        setCities(data); // Actualizar el estado con los datos recibidos
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const ShowCities = () => {
    return cities.map((city) => (
      <li key={city._id}>
       <h5> {city.name}, {city.country} <img src={city.img} alt="..."  style={{ maxWidth: '100%', maxHeight: '300px' }}/></h5>
      </li>
    ));
  };

  return (
    <div>
      <ul>{ShowCities()}</ul>
    </div>
  );
};