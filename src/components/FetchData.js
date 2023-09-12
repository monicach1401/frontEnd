import React, { useEffect, useState } from "react";
import { NewCityForm } from './NewCityForm';// Formulario de añadir nueva Ciudad
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';// Importa el icono de Material-UI
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { cityAction } from '../store/actions/cityActions';
import { connect } from 'react-redux';
import Itinerary from './Itinerary';




const FetchData = (props) => {

  const navigate = useNavigate();

  //Función para volver atrás
  const goBack = () => {
    navigate("/");
  }

  // variables de Estado
  const [citySelected, setCitySelected] = useState(""); // estado que nos permmite guardar el valor introducido por el usuario en el input
  const [showChooseCity, setShowChooseCity] = useState(true); //  estado para controlar la visibilidad del formulario de NewCity
  const [showNewCityForm, setShowNewCityForm] = useState(false); //  estado para controlar la visibilidad del formulario de NewCity
  const [showItinerary, setShowItinerary] = useState(false); // estado para mostrar el componente itinerary
  const [showItineraryData, setShowItineraryData] = useState(false); // estado para mostrar los datos del itinerario de una ciudad
  const [showCityList, setShowCityList] = useState(true);// estado para mostrar la lista de ciudades
  const [selectedCityForItinerary, setSelectedCityForItinerary] = useState("");// estado para saber que ciudad se ha elegido


  // Función que permite guardar en la variable de estado City el valor introducido por el usuario
  const selectCity = (citySelected) => {
    setCitySelected(citySelected);
  }

  // Action del backend que se ejectuta al renderizar el componente 
  useEffect(() => {
    props.cityAction();
  }, []);


  // -----Función que muestra en una lista de cards de las ciudades de la base de datos. Si el usuario no introduce nada las muestra todas 
  // y sino filtra por el valor introducido 
  const ShowCities = () => {
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

  /*----- Función que se ejecuta el click en una imgen de la ciudad para mostrar sus itinerarios ------------- */
  const handleCityClick = (city) => {
    setShowChooseCity(false); // ocultamos el formulario de Choose a City
    setSelectedCityForItinerary(city); // Guardar la ciudad seleccionada
    setShowItinerary(true); // Mostrar el formulario itinerario
    setShowItineraryData(true); // Mostrar los datos del itinerarii
    setShowNewCityForm(false); // Se oculta el formulario de NewCity
    setShowCityList(false); // Se oculta la lista de ciudades
  };

  /*----- Función que se ejecuta el click en el icono "<" para volver a mostrar el listado de ciudades ------------- */
  const goBackToListOfCities = () => {
    if (showItinerary) {
      // Si se muestran los itinerarios, volvemos al listado de ciudades
      setShowItinerary(false);
      setShowItineraryData(false);
      setShowCityList(true);
      setShowChooseCity(true);
    } else {
      // Si se muestra la lista de ciudades, se comporta como el botón de Home
      navigate("/");
    }
  };

  return (
    <>
      {showChooseCity && (
        <div className="filter-container">
          <h1 className="filter-title">Choose a City</h1>
          {/* Actualizamos la variable selectCity con el valor introducido por el usuario en el input*/}
          <input
            type="text"
            className="filter-input"
            value={citySelected}
            onChange={e => selectCity(e.target.value)}
          />
          <button className="myButton" onClick={() => setShowNewCityForm(true)}>Add New City</button> {/* cambiamos estado a true para mostrar el formulario */}
        </div>
      )}


      {/* Renderizamos el formulario si showNewCityForm es true , showItinerary es false y cuando los datos se envien se llamará a la función onSucess que ocultará el formulario*/}
      {showNewCityForm && !showItinerary &&
        <NewCityForm
          hideForm={() => setShowNewCityForm(false)} // ocultamos el formulario de añadir la nueva ciudad
          cityAction={props.cityAction} // pasamos la cityAction como prop para que vuelva a mostrar el listado de ciudades cuando añadimos una nueva
        />}

      {/* Renderizamos el componente Itinerary si showItinerary es true y hay una ciudad seleccionada*/}
      {showItinerary && selectedCityForItinerary && showItineraryData && (
        <>
          <Itinerary
            city={selectedCityForItinerary}
          />
        </>
      )}

      {/* Renderiza la lista de ciudades solo si showCityList es true */}
      {showCityList && (
        <div >
          <ul>{ShowCities()}</ul>
        </div>
      )}

      {/* siempre mostramos esta section que es la barra inferior con los iconos */}
      <div className="Container-Icons">
        <a href="#" onClick={goBack}>
          <HomeIcon />
        </a>
        <a href="#" onClick={goBackToListOfCities}>
          <ArrowBackIosNewIcon />
        </a>
      </div>

    </>
  );
};
//---------- CONECTAMOS CON REDUX-----------------------------------------------------
/* mapStateToProps es una forma de obtener una porción específica del estado de Redux y pasarla como propiedades a un componente.
 Esto permite que el componente acceda a los datos almacenados en el estado global de Redux sin necesidad de pasar los datos manualmente como propiedades 
 descendentes desde el componente padre. */
const mapStateToProps = (state) => {
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