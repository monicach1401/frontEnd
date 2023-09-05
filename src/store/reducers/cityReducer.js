/* Los reductores son funciones que toman el estado actual y una accion como argumentos.
Si el type de Accion es  FETCH_CITIES_SUCCESS que nos viene de CityAction .
CityAction nos devuelve un dispactch con un Type y un payload.
Aqui miraramos que type es.
Si hay ido todo bien, en cities ponemos el resultado de action.payload 
*/
const initialState = {
  cities: [],// Inicializa el estado cities como un array vacío
};

export const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CITIES_SUCCESS':
      return {
         cities: action.payload, // Actualiza el estado cities con los datos recibidos
      };
    default:
      return state;
  }
};




