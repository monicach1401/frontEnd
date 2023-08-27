import React, { useEffect, useState } from "react";
import { NewCityForm } from '../components/NewCityForm';
// importaciones para crear el Botón de Atrás
import Button from '@mui/material/Button';// Importa el componente Button de Material-UI
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';// Importa el icono de Material-UI
// importaciones para que funcione el botón
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const FetchData = () => {

  //Función para volver atrás
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  }


  // variables de Estado
  const [cities, setCities] = useState([]); // estado para mostrar las ciudades de la base de datos
  const [citySelected, setCitySelected] = useState(""); // estado que nos permmite guardar el valor introducido por el usuario en el input
  const [showNewCityForm, setShowNewCityForm] = useState(false); // Agregamos un estado para controlar la visibilidad del formulario


  // Función que permite guardar en la variable de estado City el valor introducido por el usuario
  const selectCity = (citySelected) => {
    setCitySelected(citySelected);
  }

  useEffect(() => {
    fetch("http://localhost:5000/cities/all")
      .then((response) => response.json())
      .then((data) => {
        setCities(data); // en la variable cities ya tenemos todos los datos de la base de datos
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  // Función que muestra en una lista de cards de las ciudades de la base de datos. Si el usuario no introduce nada las muestra todas y sino filtra por el 
  // valor introducido 
  const ShowCities = () => {

    /* filteredCities una nueva lista que contiene solo las ciudades que coinciden con el valor del filtro. 
    La función includes se utiliza para verificar si el nombre o el país de una ciudad incluyen el valor del filtro,
    y se compara en minúsculas para hacer la comparación insensible a mayúsculas y minúsculas. */
    const filteredCities = cities.filter(city => {
      return city.name.toLowerCase().includes(citySelected.toLowerCase()) ||
        city.country.toLowerCase().includes(citySelected.toLowerCase());
    });
    return filteredCities.map((citySelected) => (
      <li className="listCities" key={citySelected._id}>
        <div className="card ">
          <div className="card-body">
            <h6 className="card-text"> {citySelected.name}, {citySelected.country}  </h6>
          </div>
          <img src={citySelected.img} alt="..." style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      </li>
    ));
  };

  return (
    <>
      <div className="filter-container">
        <h1 className="filter-title">Choose a City</h1>
        {/* ACtualizamos la variable selectCity con el valor introducido por el usuario en el input*/}
        <input
          type="text"
          className="filter-input"
          value={citySelected}
          onChange={e => selectCity(e.target.value)}
        />
        <button className="myButton" onClick={() => setShowNewCityForm(true)}>Add New City</button> {/* Modificamos el onClick para cambiar el estado */}
      </div>
      {/* Renderizamos el formulario si showNewCityForm es true y cuando los datos se envien se llamará a la función onSucess que ocultará el formulario*/}
      {showNewCityForm && <NewCityForm hideForm={() => setShowNewCityForm(false)} />}

      <div>
        <ul>{ShowCities()}</ul>
      </div>

      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={goBack}
        >
        </Button>
      </div>
    </>
  );
};
