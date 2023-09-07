import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { loadItinerariesByCity } from '../store/actions/ItinerariesByCity';
import { NewItineraryForm } from './NewItineraryForm';


const Itinerary = ({ city, itineraries, loadItinerariesByCity }) => {

  //  Estado para controlar la visibilidad del formulario de NewItinerary
  const [showNewItineraryForm, setShowNewItineraryForm] = useState(false);

  // Cargamos los itinerarios de la ciudad seleccionada cuando el componente se monta y cuando seleccionamos una ciudad
  useEffect(() => {
    loadItinerariesByCity(city.name);
  }, [city, loadItinerariesByCity]);   // city y loadItinerariesByCity porque quiero que se ejecute la primera vez y cada bez que seleccionemos una ciudad 

  // ahora las cities es un array dentro de un objecto
  const itinerariesData = itineraries.itineraries;

  return (
    <>
      <div>
        <h2 className='itineraries'>Itineraries for {city.name}, {city.country}</h2>
        {itinerariesData.length === 0 // no tenemos itinerarios
          ? (
            <div className='noItinerarys'>
              <p >There are no itineraries created for this city. If you want to add one, click the button.</p>
              <button className="myButton" onClick={() => setShowNewItineraryForm(true)}>Add New Itinerary</button> {/* cambiamos estado a true para mostrar el formulario */}
            </div>
          )
          : (
            <ul>
              {itinerariesData.map((itinerary) => (
                <li key={itinerary._id}>
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

/*---- Connect con REDUX ------------------ */
/* Obtenemos una parte del state y se lo pasamos como props al mi componente*/
const mapStateToProps = (state) => {
   return {
    itineraries: state.itineraries,
  };
};

/* Despachamos la acción que nos interesa que en este caso es  loadItinerariesByCity*/
const mapDispatchToProps = {
  loadItinerariesByCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);







