import React, { useState } from 'react';

export const NewCityForm = ({hideForm}) => {

  // creamos un objeto tal cual es el modelo de city
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    img: ''
  });


  /* Función que se encarga de actualizar el estado del formulario cada vez que un campo de entrada cambia
  cuando el usuario escribe algo en el campo de nombre o de país, se dispara un evento de cambio (onChange).
  event.target es una referencia al elemento en el que ocurrió el evento, en este caso, el campo de entrada (input) que desencadenó el cambio.*/
  const handleInputChange = (event) => {
    const { name, value } = event.target; // name es el valor de campo del input (name,country,img) y value lo que el usuario ha introducido
    setFormData({
      ...formData, // nos crea una copia del objecto formData 
      [name]: value
    });
  };


  // Función que se ejectuta al enviar el formulario, al darle click al botón
  const handleSubmit = (event) => {
    event.preventDefault();

    // Controlo que los datos que ha introducido el usuario estén correctos antes de enviarlos
    const nameRegex = /^[A-Za-z\s]+$/; // Expresión regular para validar nombre como cadena
    const countryRegex = /^[A-Za-z\s]+$/; // Expresión regular para validar país como cadena
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/; // Expresión regular para validar URL

    if (!nameRegex.test(formData.name)) {
      alert('Invalid city name. Only letters and spaces are allowed.');
    } else if (!countryRegex.test(formData.country)) {
      alert('Invalid country name. Only letters and spaces are allowed.');
    } else if (!urlRegex.test(formData.img)) {
      alert('Invalid image URL format.');
    } else {

      // Datos del formulario los guardo en el objecto newCityData
      const newCityData = {
        name: formData.name,
        country: formData.country,
        img: formData.img
      };

      // guardo los datos en el servidor
      fetch('http://localhost:5000/cities', {
        method: 'POST',
        headers: {// vamos a enviar los datos en formato JSON
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCityData)// convertimos el objeto a texto
      })
        .then(response => response.json())
        .then(data => {
          hideForm(); // oculta el formulario
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });

    }
  };

  return (
    <div className='NewCity'>
      {/*Formulario de entrada de datos de una nueva ciudad */}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="myLabel1" htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="myLabel2" htmlFor="country">Country: </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="myLabel3" htmlFor="img">Image URL: </label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleInputChange}
          />
        </div>
        <button className="myButton" type="submit">Add</button>
      </form>
    </div>
  );
};






