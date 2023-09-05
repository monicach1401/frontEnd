import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadItinerariesByCity } from '../store/actions/ItinerariesByCity';
import Button from '@mui/material/Button';// Importa el componente Button de Material-UI
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';// Importa el icono de Material-UI


const Itinerary = ({ city, itineraries, loadItinerariesByCity }) => {
  
  useEffect(() => {
    // Cargar los itinerarios de la ciudad seleccionada cuando el componente se monta
    loadItinerariesByCity(city.name);
    // city lo pongo en dependencias para que se actualize cada vez que seleccionamos una ciudad y loadItinerariesByCity significa que este efecto depende de la función loadItinerariesByCity 
  }, [city, loadItinerariesByCity]);

  console.log('estoy en ITINERARY  y props.itineraries es:', itineraries)
  const itinerariesData = itineraries.itineraries; // ahora las cities es un array dentro de un objecto
  console.log(itinerariesData)
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
               <p>ProfilePicture: <img src={itinerary.profilePicture} alt="..." style={{ maxWidth: '100%', maxHeight: '250px' }}></img></p>
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







