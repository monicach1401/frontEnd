import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loadItinerariesByCity } from '../store/actions/ItinerariesByCity';

export const NewItineraryForm = ({ hideForm }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCancel = () => {
    hideForm();
  };

  const addItineraryToDatabase = (data) => {
    const newItineraryData = {
      title: data.title,
      city: data.city,
      duration: data.duration,
      price: data.price,
      profilePicture: data.profilePicture,
      rating: data.rating
    };

    fetch('http://localhost:5000/itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItineraryData)
    })
      .then(response => response.json())
      .then(data => {
        hideForm();
        console.log(data);
        loadItinerariesByCity(data.city);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit(addItineraryToDatabase)}>
      {/* Title */}
      <div className="inputContainer">
        <label htmlFor="title">Title:</label>
        <input {...register('title', { required: true, pattern: /^[A-Za-z\s]+$/ })} />
        {errors.title && <p className="errorText">This field is required, Only letters and spaces are allowed.</p>}
      </div>
      {/* City */}
      <div className="inputContainer">
        <label htmlFor="city">City:</label>
        <input {...register('city', { required: true, pattern: /^[A-Za-z\s]+$/ })} />
        {errors.city && <p className="errorText">This field is required, Only letters and spaces are allowed.</p>}
      </div>
      {/* Duration */}
      <div className="inputContainer">
        <label htmlFor="duration">Duration:</label>
        <input {...register('duration', { required: true, pattern: /^[A-Za-z0-9\s]+$/ })} />
        {errors.duration && <p className="errorText">This field is required.Only letters and spaces and numbers are allowed.</p>}
      </div>
      {/* Price */}
      <div className="inputContainer">
        <label htmlFor="price">Price:</label>
        <input {...register('price', { required: true, pattern: /^[A-Za-z0-9\s€]+$/ })} />
        {errors.price && <p className="errorText">This field is required. Only letters and spaces are allowed.</p>}
      </div>
      {/* Profile Picture */}
      <div className="inputContainer">
        <label htmlFor="profilePicture">Profile Picture URL:</label>
        <input {...register('profilePicture', { required: true, pattern: /^(ftp|http|https):\/\/[^ "]+$/ })} />
        {errors.profilePicture && <p className="errorText">This field is required.</p>}
      </div>
      {/* Rating */}
      <div className="inputContainer">
        <label htmlFor="rating">Rating:</label>
        <input {...register('rating', { pattern: /^\d+$/ })} />
        {errors.profilePicture && <p className="errorText">Only numbers are allowed.</p>}
      </div>
      <div className='myButton2'>
        <button type="submit">Add Itinerary</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};







