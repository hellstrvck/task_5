import React from 'react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

interface ProfileForm {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
}

const ProfileInfo = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProfileForm>();

  const selectedCountry = watch('country');

  useEffect(() => {
    // Тут можна додати реальний API-запит для отримання списку країн
    setCountries(['Україна', 'Польща', 'Німеччина']);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Тут можна додати реальний API-запит для отримання міст вибраної країни
      setCities(['Київ', 'Львів', 'Харків']);
    }
  }, [selectedCountry]);

  const onSubmit = (data: ProfileForm) => {
    console.log('Дані користувача:', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Інформація профілю</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ім'я</label>
          <input
            {...register('firstName', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.firstName && <span className="text-red-500">Це поле обов'язкове</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Прізвище</label>
          <input
            {...register('lastName', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.lastName && <span className="text-red-500">Це поле обов'язкове</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Країна</label>
          <select
            {...register('country', { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Виберіть країну</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <span className="text-red-500">Виберіть країну</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Місто</label>
          <select
            {...register('city', { required: true })}
            className="w-full p-2 border rounded"
            disabled={!selectedCountry}
          >
            <option value="">Виберіть місто</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <span className="text-red-500">Виберіть місто</span>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Адреса</label>
          <input
            {...register('address', { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.address && <span className="text-red-500">Це поле обов'язкове</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Зберегти
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo; 