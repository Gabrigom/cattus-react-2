import { getData, postDataJSON, updateData, deleteData } from './api';
import { Camera, CameraResponse } from './types';

const getAll = (offset: number = 0, limit: number = 50): Promise<Camera[]> => 
    getData<Camera[]>(`/cameras?offset=${offset}&limit=${limit}`);

const getOne = (id: string): Promise<Camera> => 
    getData<Camera>('/cameras/', id);

const create = (data: Partial<Camera>): Promise<CameraResponse> => 
    postDataJSON<CameraResponse>('/cameras', data, "Câmera cadastrada com sucesso!");

const update = (id: string, data: Partial<Camera>): Promise<CameraResponse> => 
    updateData<CameraResponse>('/cameras/', id, data, "Dados da câmera atualizados com sucesso!");

const remove = (id: string): Promise<boolean> => 
    deleteData('/cameras/', id, "Câmera removida com sucesso!");

const softDelete = (id: string): Promise<CameraResponse> => 
    updateData<CameraResponse>('/cameras/', id, {}, "Câmera removida com sucesso!");

export default {
    getAll,
    getOne,
    create,
    update,
    remove,
    softDelete
};