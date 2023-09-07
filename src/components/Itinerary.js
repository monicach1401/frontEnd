import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { loadItinerariesByCity } from '../store/actions/ItinerariesByCity';
import { NewItineraryForm } from './NewItineraryForm';


const Itinerary = ({ city, itineraries, loadItinerariesByCity }) => {

  const [showNewItineraryForm, setShowNewItineraryForm] = useState(false); //  estado para controlar la visibilidad del formulario de NewItinerary
  
  useEffect(() => {
    // Cargar los itinerarios de la ciudad seleccionada cuando el componente se monta
    loadItinerariesByCity(city.name);
    // city y loadItinerariesByCity porque quiero que se ejecute la primera vez y cada bez que seleccionemos una ciudad 
  }, [city, loadItinerariesByCity]);

  const itinerariesData = itineraries.itineraries; // ahora las cities es un array dentro de un objecto
  return (
    <>
      <div>
        <h2 className='itineraries'>Itineraries for {city.name}, {city.country}</h2>
        {itinerariesData.length === 0
          ? (
            <div className='noItinerarys'>
              <p >There are no itineraries created for this city. If you want to add one, click the button.</p>
              <button className="myButton" onClick={() => setShowNewItineraryForm(true)}>Add New Itinerary</button> {/* cambiamos estado a true para mostrar el formulario */}
            </div>
          )
          : (
            <ul>
              {itinerariesData.map((itinerary) => (
                <li key={itinerary.id}>
                  <strong>TITLE: {itinerary.title}</strong>
                  <div>
                    <p></p>
                    <p>Duration: {itinerary.duration}</p>
                    <p>Price: {itinerary.price}</p>
                    <p>Rating: {itinerary.rating}</p>
                    <p>ProfilePicture: <img src={itinerary.profilePicture} alt="..." style={{ maxWidth: '95%', maxHeight: '240px' }}></img></p>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
      </div>
        {/* Renderizamos el formulario si showNewCityForm es true , showItinerary es false y cuando los datos se envien se llamará a la función onSucess que ocultará el formulario*/}
        {showNewItineraryForm && <NewItineraryForm hideForm={() => setShowNewItineraryForm(false)} />}

    </>
  );
};
/* Obtenemos una parte del state y se lo pasamos como props al mi componente*/
const mapStateToProps = (state) => {
  console.log('estoy en mapStateToProps de Itinerary state es:', state) // nos interesa solo itineraries
  return {
    itineraries: state.itineraries,
  };
};

/* Despachamos la acción que nos interesa que en este caso es  loadItinerariesByCity*/
const mapDispatchToProps = {
  loadItinerariesByCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);







