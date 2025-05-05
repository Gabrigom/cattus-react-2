import { API_URL } from './api';

const getAnimalReport = (animalId: string): void => {
    window.open(`${API_URL}/report/${animalId}`, '_blank');
};

export default {
    getAnimalReport
};