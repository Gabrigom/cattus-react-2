import { getData, postDataFormData, updateData, deleteData } from './api';
import { Employee, EmployeeResponse } from './types';

const getAll = (companyId: string, skip: number = 0, limit: number = 10): Promise<Employee[]> => 
    getData<Employee[]>(`/employee/select-all/${companyId}?skip=${skip}&limit=${limit}`);

const getOne = (id: string): Promise<Employee> => 
    getData<Employee>('/employee/select-one/', id);

const create = (formData: FormData): Promise<EmployeeResponse> => 
    postDataFormData<EmployeeResponse>('/employee/create', formData, "Funcionário cadastrado com sucesso!");

const update = (id: string, data: Partial<Employee>): Promise<EmployeeResponse> => 
    updateData<EmployeeResponse>('/employee/update/', id, data, "Dados do funcionário atualizados com sucesso!");

const remove = (id: string): Promise<boolean> => 
    deleteData('/employee/delete/', id, "Funcionário removido com sucesso!");

export default {
    getAll,
    getOne,
    create,
    update,
    remove
};