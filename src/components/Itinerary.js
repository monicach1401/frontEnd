import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadItinerariesByCity } from '../store/actions/ItinerariesByCity';


const Itinerary = ({ city, itineraries, loadItinerariesByCity }) => {


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
      </div>
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







