import { getData, postDataJSON, postDataFormData, updateData, deleteData } from './api';
import { Animal, AnimalResponse } from './types';

const getAll = (offset: number = 0, limit: number = 50): Promise<Animal[]> => 
    getData<Animal[]>(`/cats?offset=${offset}&limit=${limit}`);

const getOne = (id: string | number): Promise<Animal> => 
    getData<Animal>('/cats/', id.toString());

const create = (formData: FormData): Promise<AnimalResponse> => 
    postDataFormData<AnimalResponse>('/cats', formData, "Gato cadastrado com sucesso!");

const update = (id: string | number, data: Partial<Animal>): Promise<AnimalResponse> => 
    updateData<AnimalResponse>('/cats/', id.toString(), data, "Dados do gato atualizados com sucesso!");

const remove = (id: string | number): Promise<boolean> => 
    deleteData('/cats/', id.toString(), "Gato removido com sucesso!");

const softDelete = (id: string | number): Promise<AnimalResponse> => 
    updateData<AnimalResponse>('/cats/', id.toString(), {}, "Gato removido com sucesso!");

const changeFavorite = (id: string | number): Promise<AnimalResponse> => 
    updateData<AnimalResponse>('/cats/', id.toString(), {}, "Favorito atualizado com sucesso!");

const generateReport = (id: string | number, offset: number = 0, limit: number = 50): Promise<any> => 
    getData<any>(`/cats/report/${id}?offset=${offset}&limit=${limit}`);

const getMarkedAnimals = async (): Promise<Animal[]> => {
    const cats = await getAll();
    return cats.filter(cat => cat.favorite);
}

export default {
    getAll,
    getOne,
    create,
    update,
    remove,
    softDelete,
    changeFavorite,
    generateReport,
    getMarkedAnimals
};