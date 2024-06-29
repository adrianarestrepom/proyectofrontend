import axios from 'axios';

export const remove = (groupId) => {
  return axios.delete(`http://localhost:3000/groups/${groupId}`);
};
