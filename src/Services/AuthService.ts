import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { API_URL, getData } from './api';
import { LoginCredentials, LoginResponse } from './types';

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${API_URL}/employee/login`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (data.ok) {
            Cookies.set("token", data.token);
            return data as LoginResponse;
        } else {
            toast.error(data.message || "Erro ao fazer login");
            throw new Error(data.message || "Erro ao fazer login");
        }
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};

const logout = async (): Promise<void> => {
    await getData('/employee/logout');
    Cookies.remove("token");
    window.location.href = "/login";
};

export default {
    login,
    logout
};