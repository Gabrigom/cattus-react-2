import { getData, postDataFormData, updateData } from './api';
import { Company, CompanyResponse } from './types';

const getOne = (id: string): Promise<Company> => 
    getData<Company>('/company/select-one/', id);

const create = (formData: FormData): Promise<CompanyResponse> => 
    postDataFormData<CompanyResponse>('/company/create', formData, "Empresa cadastrada com sucesso!");

const update = (id: string, data: Partial<Company>): Promise<CompanyResponse> => 
    updateData<CompanyResponse>('/company/update/', id, data, "Dados da empresa atualizados com sucesso!");

export default {
    getOne,
    create,
    update
};