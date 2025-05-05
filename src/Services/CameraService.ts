import { getData, postDataJSON, updateData, deleteData } from './api';
import { Camera, CameraResponse } from './types';

const getAll = (companyId: string): Promise<Camera[]> => 
    getData<Camera[]>(`/camera/select-all/${companyId}`);

const getOne = (id: string): Promise<Camera> => 
    getData<Camera>('/camera/select-one/', id);

const create = (data: Partial<Camera>): Promise<CameraResponse> => 
    postDataJSON<CameraResponse>('/camera/create', data, "Câmera cadastrada com sucesso!");

const update = (id: string, data: Partial<Camera>): Promise<CameraResponse> => 
    updateData<CameraResponse>('/camera/update/', id, data, "Dados da câmera atualizados com sucesso!");

const remove = (id: string): Promise<boolean> => 
    deleteData('/camera/delete/', id, "Câmera removida com sucesso!");

const search = (query: string, fields: string[]): Promise<Camera[]> => 
    postDataJSON<Camera[]>('/camera/search', { query, fields });

export default {
    getAll,
    getOne,
    create,
    update,
    remove,
    search
};