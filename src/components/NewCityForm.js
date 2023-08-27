import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const NewCityForm = ({ hideForm }) => {

  /*------------El hook "useForm" se utiliza para gestionar el estado y la validación de formularios.
   la función "register" se utiliza para registrar los campos de entrada en el formulario, y devuelve las propiedades necesarias para cada entrada.
   La función "handleSubmit" se pasa a la propiedad "onSubmit" del formulario y es responsable de manejar el envío del formulario.*/
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ----------- Creamos un objeto tal cual es el modelo de city
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    img: ''
  });

  // -----------Función para el botón de Cancel del Formulario
  const handleCancel = () => {
    hideForm(); // Llama a la función hideForm para ocultar el formulario
  };

  //------------- Función que añade los datos del formulario en la base de datos
   const addCityToDatabase=(data)=>{
     // Datos del formulario los guardo en el objecto newCityData
     const newCityData = {
      name: data.name,
      country: data.country,
      img: data.img
    };
    console.log('newCitaDAta es',newCityData)

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

  return (
    <form className="formContainer" onSubmit={handleSubmit(addCityToDatabase)}>
      {/* Name */}
      <div className="inputContainer">
        <label htmlFor="name">Name:</label>
        <input {...register('name', { required: true, pattern: /^[A-Za-z\s]+$/ })} />
        {errors.name && <p className="errorText">This field is required , Only letters and spaces are allowed and the first letter better in Uppercase .</p>}
      </div>
      {/* Country */}
      <div className="inputContainer">
        <label htmlFor="country">Country:</label>
        <input {...register('country', { required: true, pattern: /^[A-Za-z\s]+$/ })} />
        {errors.country && <p className="errorText">This field is required , Only letters and spaces are allowed and the first letter better in Uppercase.</p>}
      </div>
      {/* Img's URL */}
      <div className="inputContainer">
        <label htmlFor="img">URL:</label>
        <input {...register('img', { required: true, pattern: /^(ftp|http|https):\/\/[^ "]+$/ })} />
        {errors.img && <p className="errorText">This field is required.Incorrect format</p>}
      </div>

      <button className="myButton2" type="submit">Add City</button>
      <button className="myButton2" type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};







