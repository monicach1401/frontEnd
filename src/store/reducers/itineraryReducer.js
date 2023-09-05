 const initialState = {
   itineraries: [],// Inicializa el estado cities como un array vacío
};

export const itineraryReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'FETCH_ITINERARYS_SUCCESS':
      return {
        itineraries: action.payload, // Actualiza el estado itineraries
      };
    default:
      return state;
  }

};

