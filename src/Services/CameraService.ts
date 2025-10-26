import { getData, postDataJSON, updateData, deleteData } from './api';
import { Camera, CameraResponse } from './types';

const getAll = (offset: number = 0, limit: number = 50): Promise<Camera[]> => 
    getData<Camera[]>(`/cameras?offset=${offset}&limit=${limit}`);

const getOne = (id: string | number): Promise<Camera> => 
    getData<Camera>('/cameras/', id.toString());

const create = (data: Partial<Camera>): Promise<CameraResponse> => 
    postDataJSON<CameraResponse>('/cameras', data, "Câmera cadastrada com sucesso!");

const update = (id: string | number, data: Partial<Camera>): Promise<CameraResponse> => 
    updateData<CameraResponse>('/cameras/', id.toString(), data, "Dados da câmera atualizados com sucesso!");

const remove = (id: string | number): Promise<boolean> => 
    deleteData('/cameras/', id.toString(), "Câmera removida com sucesso!");

const softDelete = (id: string | number): Promise<CameraResponse> => 
    updateData<CameraResponse>('/cameras/', id.toString(), {}, "Câmera removida com sucesso!");

export default {
    getAll,
    getOne,
    create,
    update,
    remove,
    softDelete
};