import { getData, postDataFormData, updateData, deleteData } from './api';
import { User, UserResponse } from './types';

const getAll = (offset: number = 0, limit: number = 50): Promise<User[]> => 
    getData<User[]>(`/users?offset=${offset}&limit=${limit}`);

const getOne = (id: string): Promise<User> => 
    getData<User>('/users/', id);

const create = (formData: FormData): Promise<UserResponse> => 
    postDataFormData<UserResponse>('/users', formData, "Usuário cadastrado com sucesso!");

const update = (id: string, data: Partial<User> | FormData): Promise<UserResponse> => {
    if (data instanceof FormData) {
        return postDataFormData<UserResponse>(`/users/${id}`, data, "Dados do usuário atualizados com sucesso!");
    }
    return updateData<UserResponse>('/users/', id, data, "Dados do usuário atualizados com sucesso!");
};

const remove = (id: string): Promise<boolean> => 
    deleteData('/users/', id, "Usuário removido com sucesso!");

const forgotPassword = (email: string): Promise<UserResponse> => 
    postDataFormData<UserResponse>('/users/forgot-password', { email }, "Se o email existir, um link de redefinição foi enviado!");

const resetPassword = (token: string, newPassword: string): Promise<UserResponse> => 
    postDataFormData<UserResponse>('/users/reset-password', { token, newPassword }, "Senha atualizada com sucesso!");

export default {
    getAll,
    getOne,
    create,
    update,
    remove,
    forgotPassword,
    resetPassword
};