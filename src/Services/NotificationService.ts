import { getData, postDataJSON, deleteData } from './api';
import { Notification, NotificationResponse } from './types';

const getAll = (targetId: string): Promise<Notification[]> => 
    getData<Notification[]>(`/notifications/${targetId}`);

const getOne = (id: string): Promise<Notification> => 
    getData<Notification>('/notifications/', id);

const create = (data: Partial<Notification>): Promise<NotificationResponse> => 
    postDataJSON<NotificationResponse>('/notifications', data, "Notificação criada com sucesso!");

const remove = (id: string): Promise<boolean> => 
    deleteData('/notifications/', id, "Notificação removida com sucesso!");

export default {
    getAll,
    getOne,
    create,
    remove
};