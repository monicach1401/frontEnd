import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const NewCityForm = ({ hideForm, cityAction }) => {

  /*------------El hook "useForm" se utiliza para gestionar el estado y la validación de formularios.
   la función "register" se utiliza para registrar los campos de entrada en el formulario, y devuelve las propiedades necesarias para cada entrada.
   La función "handleSubmit" se pasa a la propiedad "onSubmit" del formulario y es responsable de manejar el envío del formulario.*/
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // -----------Función para el botón de Cancel del Formulario
  const handleCancel = () => {
    hideForm(); // Llama a la función hideForm para ocultar el formulario
  };

  //------------- Función que añade los datos del formulario en la base de datos
  const addCityToDatabase = (data) => {
    // Datos del formulario los guardo en el objecto newCityData
    const newCityData = {
      name: data.name,
      country: data.country,
      img: data.img
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
        cityAction(); // volvemos a llamar a cityAcion para mostrar las ciudades una vez que añadimos una en la base de datos
    
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
      <form className="formContainer" onSubmit={handleSubmit(addCityToDatabase)}>
        {/* Name */}
        <div className="inputContainer">
          <label htmlFor="name">Name:</label>
          <input {...register('name', { required: true, pattern: /^[A-Za-z\s]+$/ })} />{/* Letras y espacios */}
          {errors.name && <p className="errorText">This field is required , Only letters and spaces are allowed.</p>}
        </div>
        {/* Country */}
        <div className="inputContainer">
          <label htmlFor="country">Country:</label>
          <input {...register('country', { required: true, pattern: /^[A-Za-z\s]+$/ })} />{/* Letras y espacios */}
          {errors.country && <p className="errorText">This field is required , Only letters and spaces are allowed.</p>}
        </div>
        {/* Img's URL */}
        <div className="inputContainer">
          <label htmlFor="img">URL:</label>
          <input {...register('img', { required: true, pattern: /^(ftp|http|https):\/\/[^ "]+$/ })} />{/* Formato url */}
          {errors.img && <p className="errorText">This field is required.Incorrect format</p>}
        </div>
        <div className='myButton2'>
          <button type="submit">Add City</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>



    </>
  );
};







