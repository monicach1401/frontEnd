

export const addItineraryAction=(itineraryData)=>{
  return (dispatch) => {
    dispatch({ 
      type: 'ADD_ITINERARY', 
      payload: itineraryData });
  }
}
