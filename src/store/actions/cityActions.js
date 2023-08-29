/*
Las acciones son objectos javascript que representan eventos o cambios en la aplicación.
Estos objectos desriben que tipo de acción esta ocurriendo .
Estas acciones son despachadas por componentes de la aplicación para notificar que algo ha sucedido.
En nuestro caso se despacha en UseEffect 
*/



export const fetchCities = () => {
  return (dispatch) => {
    fetch("http://localhost:5000/cities/all")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'FETCH_CITIES_SUCCESS', payload: data });
        console.log('estoy en la funcion fetchCities y la data es:',data)
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_CITIES_FAILURE', payload: error });
        console.error("Error fetching data:", error);
      });
  };
};
  