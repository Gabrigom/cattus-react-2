import { getData, postDataJSON, postDataFormData, updateData, deleteData } from './api';
import { Animal, AnimalResponse } from './types';

const getAll = (companyId: string, skip: number = 0, limit: number = 100): Promise<Animal[]> => 
    getData<Animal[]>(`/animal/select-all/${companyId}?skip=${skip}&limit=${limit}`);

const getOne = (id: string): Promise<Animal> => 
    getData<Animal>('/animal/select-one/', id);

const create = (formData: FormData): Promise<AnimalResponse> => 
    postDataFormData<AnimalResponse>('/animal/create', formData, "Gato cadastrado com sucesso!");

const update = (id: string, data: Partial<Animal>): Promise<AnimalResponse> => 
    updateData<AnimalResponse>('/animal/update/', id, data, "Dados do gato atualizados com sucesso!");

const remove = (id: string): Promise<boolean> => 
    deleteData('/animal/delete/', id, "Gato removido com sucesso!");

const search = (query: string, fields: string[]): Promise<Animal[]> => 
    postDataJSON<Animal[]>('/animal/search', { query, fields });

const getSickAnimals = (): Promise<any> => 
    getData<any>('/animal/charts/sick-animals');

const getTotalAnimals = (): Promise<any> => 
    getData<any>('/animal/charts/total-animals');

const getMarkedAnimals = (companyId: string): Promise<Animal[]> => {
    return getAll(companyId).then(
        cats => {
            return cats.filter(cat => cat.petFavorite);
        }
    )
}


export default {
    getAll,
    getOne,
    create,
    update,
    remove,
    search,
    getSickAnimals,
    getTotalAnimals,
    getMarkedAnimals
};