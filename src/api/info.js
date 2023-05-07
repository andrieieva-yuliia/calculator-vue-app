import { client } from '../utils/fetchClient';

export const getInfo = (characterId) => {
  return client.get(`/people/${characterId}`);
};