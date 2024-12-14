import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../components';

function ForgetPassword() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleForgotPassword = async (data) => {
    setLoading(true);
    setMessage(''); // Reset the message before making the request
    try {
      // Assuming a function to handle the password reset request
      // You should implement the API call or service for the password reset logic
      // Example: await authService.sendPasswordResetEmail(data.email);

      // Simulating a successful response
      setTimeout(() => {
        setLoading(false);
        setMessage('Check your email for the password reset link!');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-xl border border-gray-200">
        <h2 className="text-center text-3xl font-bold leading-tight text-gray-800">Forgot Password</h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Enter your email to receive a password reset link.
        </p>

        {/* Form for email input */}
        <form onSubmit={handleSubmit(handleForgotPassword)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
            />

            <Button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </div>
        </form>

        {/* Message after form submission */}
        {message && (
          <p className={`mt-4 text-center ${message.includes('Check') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
