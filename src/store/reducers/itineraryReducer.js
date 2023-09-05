import { initialState } from './initialState'

export const itineraryReducer = (state = initialState, action) => {
 
  switch (action.type) {
    case 'FETCH_ITINERARYS_SUCCESS':
      return {
        ...state,
        itinearies: action.payload, // Actualiza el estado itineraries
      
      };
    default:
      return state;
  }

};
