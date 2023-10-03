const initialState = {
  itineraries: [], // Inicializa el estado itineraries como un array vacío
};

export const itineraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ITINERARYS_SUCCESS":
      return {
        itineraries: action.payload, // Actualiza el estado itineraries
      };
    case "ADD_ITINERARY":
      return {
        itineraries: action.payload, // Actualiza el estado itineraries
      };
    default:
      return state;
  }
};
