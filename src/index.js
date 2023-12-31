import React from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// Redux
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { cityReducer } from './store/reducers/cityReducer';
import { itineraryReducer } from './store/reducers/itineraryReducer';
import { combineReducers } from '@reduxjs/toolkit';

/* Pasamos nuestro reductor cityReducer a la función createStore de Redux, la cual devuelve un objeto de almacenamiento.
Luego, pasamos este objeto al componente Provider de react-redux, 
que se renderiza en la parte superior de nuestro árbol de componentes. 
Esto asegura que cada vez que nos conectemos a Redux en nuestra aplicación, 
el almacenamiento esté disponible para nuestros componentes.*/

const rootReducer = combineReducers({
  cities: cityReducer,
  itineraries: itineraryReducer,
});

const store = createStore(
  rootReducer ,
  composeWithDevTools(applyMiddleware(thunk))
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);