import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface RegistrationForm {
  phone: string;
  verificationCode: string;
  email: string;
  password: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const [showVerification, setShowVerification] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationForm>();

  const onSubmit = (data: RegistrationForm) => {
    if (!showVerification) {
      setShowVerification(true);
      return;
    }
    
    if (showVerification && !showEmailPassword) {
      if (data.verificationCode === '1234') {
        setShowEmailPassword(true);
      } else {
        alert('Невірний код підтвердження');
      }
      return;
    }

    navigate('/profile');
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-[#007AFF] flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="ml-2 text-gray-800 font-medium">COMPANY NAME</span>
          </div>
          <button className="text-gray-400">
            ✕
          </button>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#007AFF]"></div>
          <div className={`w-8 h-[2px] ${showVerification ? 'bg-[#007AFF]' : 'bg-gray-200'}`}></div>
          <div className={`w-2 h-2 rounded-full ${showVerification ? 'bg-[#007AFF]' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-[2px] ${showEmailPassword ? 'bg-[#007AFF]' : 'bg-gray-200'}`}></div>
          <div className={`w-2 h-2 rounded-full ${showEmailPassword ? 'bg-[#007AFF]' : 'bg-gray-200'}`}></div>
        </div>
      </div>

      {/* Form Container */}
      <div className="px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">Registration</h2>
          <p className="text-gray-500 text-sm mb-8">
            Fill in the registration data. It will take a couple of minutes. All you need is a phone number and e-mail
          </p>

          {!showVerification && !showEmailPassword && (
            <>
              <div className="mb-4">
                <PhoneInput
                  country={'us'}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  containerClass="phone-input-container"
                  inputClass="!w-full !h-12 !text-base !border-b !border-gray-200 !rounded-none focus:!border-[#007AFF] !pl-12"
                  buttonClass="!border-0 !border-b !border-gray-200 !bg-transparent !rounded-none"
                  dropdownClass="!rounded-lg !border !border-gray-200"
                  searchClass="!rounded-lg !border !border-gray-200"
                />
                {errors.phone && <span className="text-[#007AFF] text-sm mt-1">Enter phone number</span>}
              </div>
              <button
                type="submit"
                className="w-full bg-[#007AFF] text-white py-3 rounded-lg font-medium"
                disabled={!phoneNumber}
              >
                Send Code
              </button>
            </>
          )}

          {showVerification && !showEmailPassword && (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-800">{phoneNumber}</span>
                  <button 
                    type="button" 
                    className="text-[#007AFF]"
                    onClick={() => setShowVerification(false)}
                  >
                    Edit
                  </button>
                </div>
                <p className="text-gray-400 text-sm mb-4">Number not confirmed yet</p>
                <input
                  type="text"
                  {...register('verificationCode', { required: true })}
                  className="w-full p-2 border-b border-gray-200 focus:border-[#007AFF] focus:outline-none"
                  placeholder="Confirmation code"
                />
                <p className="text-gray-400 text-sm mt-2">
                  Confirm phone number with code from sms message
                </p>
                <button type="button" className="text-[#007AFF] mt-4">
                  Send again
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-[#007AFF] text-white py-3 rounded-lg font-medium"
              >
                Confirm
              </button>
            </>
          )}

          {showEmailPassword && (
            <>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-800">{phoneNumber}</span>
                  <span className="text-green-500 text-sm">✓ Number confirmed</span>
                </div>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="w-full p-2 border-b border-gray-200 focus:border-[#007AFF] focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  {...register('password', { required: true, minLength: 6 })}
                  className="w-full p-2 border-b border-gray-200 focus:border-[#007AFF] focus:outline-none"
                  placeholder="Set a password"
                />
                {errors.password ? (
                  <span className="text-[#007AFF] text-sm">Password must be at least 6 characters</span>
                ) : (
                  <span className="text-green-500 text-sm">✓ Good password</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#007AFF] text-white py-3 rounded-lg font-medium"
              >
                Register Now
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Registration; 