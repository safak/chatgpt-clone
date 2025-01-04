import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoginStatus, setUserData } from '../../redux/authSlice';
import Button from '../../components/buttonInput/Button';
import Input from '../../components/buttonInput/Input';
import { useForm } from 'react-hook-form';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import authService from '../../services/auth.service'; // Custom authentication service
import conf from '../../conf/conf';

function SignInPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Check if the user is already authenticated
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    dispatch(setUserData(currentUser));
                    dispatch(setLoginStatus(true));
                    navigate('/dashboard');
                }
            } catch {
                // User not signed in, do nothing
            }
        };
        checkAuth();
    }, [dispatch, navigate]);

    // Handle Google Login success
    const handleGoogleSuccess = async (credentialResponse) => {
        const { credential } = credentialResponse;
        setLoading(true);
        try {
            const response = await authService.googleLogin({ tokenId: credential });
            const userData = await authService.getCurrentUser();
            dispatch(setUserData(userData));
            dispatch(setLoginStatus(true));
            navigate('/dashboard');
        } catch (error) {
            console.error('Google login failed:', error);
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleFailure = () => {
        console.error('Google Login Failed');
    };

    // Handle form-based login
    const login = async (data) => {
        setError("");
        setLoading(true);
        try {
            const { accessToken, refreshToken } = await authService.login({
                emailOrUsername: data.email,
                password: data.password
            });

            const userData = await authService.getCurrentUser();
            dispatch(setUserData(userData));
            dispatch(setLoginStatus(true));
            navigate('/dashboard');
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center w-full min-h-screen bg-gray-100'>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
                    <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
            )}

            <div className='mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-xl border border-gray-200'>
                <h2 className="text-center text-3xl font-bold leading-tight text-gray-800">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="font-medium text-blue-500 transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email / Username"
                            placeholder="Enter your email or username"
                            type="text"
                            {...register("email", { required: "Email or Username is required" })}
                            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        />
                        <Button type="submit" className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                            Sign In
                        </Button>

                        <div className="mt-4 flex items-center justify-between">
                            <hr className="border-gray-300 flex-grow" />
                            <span className="text-gray-600 mx-4">or</span>
                            <hr className="border-gray-300 flex-grow" />
                        </div>

                        <div className="mt-4">
                            <GoogleOAuthProvider clientId={conf.googleClientId}>
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleFailure}
                                    useOneTap
                                    redirectUri={conf.googleRedirectUri}
                                    render={(renderProps) => (
                                        <Button
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                            className="w-full py-3 bg-red-600 text-white rounded-md flex justify-center items-center gap-2 hover:bg-red-700 transition-colors duration-200"
                                        >
                                            Sign in with Google
                                        </Button>
                                    )}
                                />
                            </GoogleOAuthProvider>
                        </div>

                        <p className="mt-4 text-center text-sm text-gray-500">
                            <Link to="/forgot-password" className="font-medium text-blue-500 hover:underline">
                                Forgot Password?
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;
