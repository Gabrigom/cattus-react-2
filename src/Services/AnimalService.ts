import { getData, postDataJSON, postDataFormData, updateData, deleteData } from './api';
import { Animal, AnimalResponse } from './types';

const getAll = (offset: number = 0, limit: number = 50): Promise<Animal[]> => 
    getData<Animal[]>(`/cats?offset=${offset}&limit=${limit}`);

const getOne = (id: string): Promise<Animal> => 
    getData<Animal>('/cats/', id);

const create = (formData: FormData): Promise<AnimalResponse> => 
    postDataFormData<AnimalResponse>('/cats', formData, "Gato cadastrado com sucesso!");

const update = (id: string, data: Partial<Animal>): Promise<AnimalResponse> => 
    updateData<AnimalResponse>('/cats/', id, data, "Dados do gato atualizados com sucesso!");

const remove = (id: string): Promise<boolean> => 
    deleteData('/cats/', id, "Gato removido com sucesso!");

const softDelete = (id: string): Promise<AnimalResponse> => 
    updateData<AnimalResponse>('/cats/', id, {}, "Gato removido com sucesso!");

const changeFavorite = (id: string): Promise<AnimalResponse> => 
    updateData<AnimalResponse>('/cats/', id, {}, "Favorito atualizado com sucesso!");

const generateReport = (id: string, offset: number = 0, limit: number = 50): Promise<any> => 
    getData<any>(`/cats/report/${id}?offset=${offset}&limit=${limit}`);

const getMarkedAnimals = (): Promise<Animal[]> => {
    return getAll().then(
        cats => {
            return cats.filter(cat => cat.favorite);
        }
    )
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