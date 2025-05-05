import { getData, postDataJSON, deleteData } from './api';
import { Notification, NotificationResponse } from './types';

const getAll = (targetId: string): Promise<Notification[]> => 
    getData<Notification[]>(`/notification/select-all/${targetId}`);

const getOne = (id: string): Promise<Notification> => 
    getData<Notification>('/notification/select-one/', id);

const create = (data: Partial<Notification>): Promise<NotificationResponse> => 
    postDataJSON<NotificationResponse>('/notification/create', data, "Notificação criada com sucesso!");

const remove = (id: string): Promise<boolean> => 
    deleteData('/notification/delete/', id, "Notificação removida com sucesso!");

export default {
    getAll,
    getOne,
    create,
    remove
};