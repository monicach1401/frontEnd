import React, { useEffect, useState } from "react";
import { NewCityForm } from './NewCityForm';// Formulario de añadir nueva Ciudad
import Button from '@mui/material/Button';// Importa el componente Button de Material-UI
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';// Importa el icono de Material-UI
import { useNavigate } from 'react-router-dom';
import { cityAction } from '../store/actions/cityActions';
import { connect } from 'react-redux';
import Itinerary  from './Itinerary';



const FetchData = (props) => {
  console.log('Estoy en FETCHDATA""" y lo que tenemos en props es:', props)
  // en props tenemos cities:Array y openItinerary

  const navigate = useNavigate();

  //Función para volver atrás
  const goBack = () => {
    navigate("/");
  }

  // variables de Estado
  const [citySelected, setCitySelected] = useState(""); // estado que nos permmite guardar el valor introducido por el usuario en el input
  const [showNewCityForm, setShowNewCityForm] = useState(false); //  estado para controlar la visibilidad del formulario
  const [showItinerary, setShowItinerary] = useState(false); // estado para mostrar el itinerario
  const [showCityList, setShowCityList] = useState(true);// estado para mostrar la lista de ciudades
  const [selectedCityForItinerary, setSelectedCityForItinerary] = useState("");// estado para saber que ciudad se ha elegido

  // Función que permite guardar en la variable de estado City el valor introducido por el usuario
  const selectCity = (citySelected) => {
    setCitySelected(citySelected);
  }

  useEffect(() => {
    props.cityAction(); // Utiliza la acción desde las propiedades
  }, []);


  // Función que muestra en una lista de cards de las ciudades de la base de datos. Si el usuario no introduce nada las muestra todas y sino filtra por el 
  // valor introducido 

  const ShowCities = () => {
    console.log('estoy en SHOWCITIES y props.cities es:', props.cities)
    /* ahora en props.cities tenemos un objeto con una propiedad cities que contiene el array de ciudades
     accedemos  a props.cities.cities para obtener el arreglo de ciudades real.  */
    const cityData = props.cities.cities; // ahora las cities es un array dentro de un objecto
    const filteredCities = cityData.filter(city => {
      return city.name.toLowerCase().includes(citySelected.toLowerCase()) ||
        city.country.toLowerCase().includes(citySelected.toLowerCase());
    });
    return filteredCities.map((city) => (
      <li className="listCities" key={city._id}>
        <div className="card ">
          <div className="card-body" onClick={() => handleCityClick(city)}>
            <h6 className="card-text"> {city.name}, {city.country}  </h6>
          </div>
          <img src={city.img} alt="..." style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      </li>
    ));
  };


  const handleCityClick = (city) => {
    setSelectedCityForItinerary(city); // Guardar la ciudad seleccionada
    setShowItinerary(true); // Mostrar el itinerario
    setShowNewCityForm(false); // Se oculta el formulario de NewCity
    setShowCityList(false); // Se oculta la lista de ciudades
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

      {/* Renderizamos el formulario si showNewCityForm es true , showItinerary es false y cuando los datos se envien se llamará a la función onSucess que ocultará el formulario*/}
      {showNewCityForm && !showItinerary && <NewCityForm hideForm={() => setShowNewCityForm(false)} />}
      
      {/* Renderizamos el componente Itinerary si showItinerary es true y hay una ciudad seleccionada*/}
      {showItinerary && selectedCityForItinerary && (
        <>
          <Itinerary city={selectedCityForItinerary} />
        </>
      )}

      {/* Renderiza la lista de ciudades solo si showCityList es true */}
      {showCityList && (
        <div>
          <ul>{ShowCities()}</ul>
        </div>
      )}

      <div style={{ marginLeft: '20px', marginTop: '100px' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={goBack}
        >
          Home
        </Button>
      </div>
    </>
  );
};

/* mapStateToProps es una forma de obtener una porción específica del estado de Redux y pasarla como propiedades a un componente.
 Esto permite que el componente acceda a los datos almacenados en el estado global de Redux sin necesidad de pasar los datos manualmente como propiedades 
 descendentes desde el componente padre. */
const mapStateToProps = (state) => {
  console.log('estoy en mapStateToProps de FEtchdata state es:', state) // nos interesa solo cities
  return {
    cities: state.cities,
  };
};

/*mapDispatchToProps es una función que se utiliza en Redux para definir funciones que actúan como acciones (actions) en un componente de React. 
Estas funciones se pueden llamar dentro del componente para despachar acciones al store de Redux.
*/
const mapDispatchToProps = {
  cityAction,
}

/*connect() se utiliza para conectar esta función con MyComponent.
Como resultado, el componente tiene acceso a props.cityAction y puede llamarla para despachar la acción cityAction al store de Redux. */
const ConnectedFetchData = connect(mapStateToProps, mapDispatchToProps)(FetchData);

export default ConnectedFetchData;