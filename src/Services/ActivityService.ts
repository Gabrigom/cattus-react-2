import { getData, postDataJSON, updateData } from './api';
import { Activity, ActivityResponse } from './types';

const getByCat = (catId: string, offset: number = 0, limit: number = 50): Promise<Activity[]> => 
    getData<Activity[]>(`/activities/${catId}/cat?offset=${offset}&limit=${limit}`);

const getByCompany = (companyId: string, offset: number = 0, limit: number = 50): Promise<Activity[]> => 
    getData<Activity[]>(`/activities/${companyId}/company?offset=${offset}&limit=${limit}`);

const create = (data: Partial<Activity>): Promise<ActivityResponse> => 
    postDataJSON<ActivityResponse>('/activities', data, "Atividade registrada com sucesso!");

const update = (id: string, data: Partial<Activity>): Promise<ActivityResponse> => 
    updateData<ActivityResponse>('/activities/', id, data, "Atividade atualizada com sucesso!");

export default {
    getByCat,
    getByCompany,
    create,
    update
};