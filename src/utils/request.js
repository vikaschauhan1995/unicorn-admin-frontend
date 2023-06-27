import { USER } from '../redux/Auth/constants';
import { getDataFromLocalStorage } from './getDataFromLocalStorage';

const request = async (method, url, body = {}) => {
  const { token } = JSON.parse(getDataFromLocalStorage(USER));
  const requestInfo = {
    method: method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  }
  if (method === 'GET' || method === 'DELETE') {
    delete requestInfo.body;
  }
  const response = await fetch(url, requestInfo);
  // const json = await response.json();
  return response;
}

export default request;