import { create } from "zustand";
import axios from "axios";

const url = import.meta.env.VITE_SERVER_URL;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${url}/auth/signup`, {
                email,
                password, 
                name
            })
            set({user:response.data.user, isAuthenticated:true, isLoading: false})
        }
        catch (error) {
            set({ error: error.response.message || "Error signing up", isLoading: false });
            throw error;
        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${url}/auth/login`, {
                email,
                password
            })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
        }

        catch (error) {
            set({ error: error.response.message || "Error signing up", isLoading: false });
            throw error;
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${url}/auth/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        }
        catch (error) {
            set({ error: "Error logging out", isLoading: false });
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${url}/auth/verify-email`, {
                code
            });
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            });

            return response.data;
        }

        catch (error) {
            set({ error: error.response.data.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${url}/auth/check-auth`);
            set({
                user: response.data.user,
                isAuthenticated: true,
                isCheckingAuth: false
            })
        }

        catch (error) {
            set({
                error: null,
                isCheckingAuth: false
            })
        }
    },
    forgotPassword:async (email) => {
        set({
            isLoading: true,
            error: null
        });

        try {
            const response = await axios.post(`${url}/auth/forgot-password`, {email});
            set({
                message: response.data.message,
                isLoading: false
            });
        }
        catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error sending reset password email"
            });
            throw error;
        }
    },
    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${url}/auth/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error resetting password",
            });
            throw error;
        }
    },
}))