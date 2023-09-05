// Nos busca todas los itinerarios de una ciudad , pongo la misma route que se pone en backend en routes/itinerary.js
export const loadItinerariesByCity = (cityName) => {
    return (dispatch) => {
      fetch(`http://localhost:5000/itinerary/city/${cityName}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: 'FETCH_ITINERARIES_SUCCESS', payload: data });
          console.log('estoy en loadItinerariesByCity y la data es:',data)
        })
        .catch((error) => {
          dispatch({ type: 'FETCH_ITINERARIES_FAILURE', payload: error });
        });
    };
  };
  