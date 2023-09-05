import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const NewItineraryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 
  return (
    <form className="formContainer" onSubmit={handleSubmit(addItineraryToDatabase)}>
      {/* Name */}
      <div className="inputContainer">
        <label htmlFor="name">Name:</label>
        <input {...register('name', { required: true, pattern: /^[A-Za-z\s]+$/ })} />
        {errors.name && <p className="errorText">This field is required , Only letters and spaces are allowed.</p>}
      </div>
      {/* Country */}
      <div className="inputContainer">
        <label htmlFor="country">Country:</label>
        <input {...register('country', { required: true, pattern: /^[A-Za-z\s]+$/ })} />
        {errors.country && <p className="errorText">This field is required , Only letters and spaces are allowed.</p>}
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







