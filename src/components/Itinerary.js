import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadItinerariesByCity } from '../store/actions/ItinerariesByCity'; 

export const Itinerary = ({ city }) => {
  useEffect(() => {
    // Cargar los itinerarios de la ciudad seleccionada cuando el componente se monta
    loadItinerariesByCity(city.name);
  }, []);

  return (
    <>
      <div>
        <h2>Itineraries for</h2>
        <h5>{city.name}, {city.country}</h5>

      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log('estoy en ITINERARY.JS y el state es:',state)
  return {
    itineraries: state.itineraries,
  };
};

const mapDispatchToProps = {
  loadItinerariesByCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);



