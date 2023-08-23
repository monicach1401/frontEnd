import React, { useEffect, useState } from "react";
import { NewCityForm } from '../components/NewCityForm';

export const FetchData = () => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [showNewCityForm, setShowNewCityForm] = useState(false); // Agregamos un estado para controlar la visibilidad del formulario

  const selectCity = (citySelected) => {
    setCity(citySelected);
  }

  useEffect(() => {
    fetch("http://localhost:5000/cities/all")
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const ShowCities = () => {
    return cities.map((city) => (
      <li className="listCities" key={city._id}>
        <h6> {city.name}, {city.country} <img src={city.img} alt="..." style={{ maxWidth: '100%', maxHeight: '300px' }} /></h6>
      </li>
    ));
  };

  return (
    <>
      <div className="filter-container">
        <h1 className="filter-title">Choose a City</h1>
        <input
          type="text"
          className="filter-input"
          onChange={e => selectCity(e.target.value)}
        />
        <button className="myButton"onClick={() => setShowNewCityForm(true)}>Add New City</button> {/* Modificamos el onClick para cambiar el estado */}
      </div>
     {/* Renderizamos el formulario si showNewCityForm es true y cuando los datos se envien se llamará a la función onSucess que ocultará el formulario*/}
      {showNewCityForm && <NewCityForm hideForm={() => setShowNewCityForm(false)}/>} 
      
      <div>
        <ul>{ShowCities()}</ul>
      </div>
    </>
  );
};
