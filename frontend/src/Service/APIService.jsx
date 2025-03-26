import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_URL;
console.log('API URL:', BASE_API_URL);

const searchRecordWithId = async (id) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/student/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getStatisticBySubject = async (subject) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/score/get_statistic`, {
        params: { subject }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getATopStudent = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/student/get_a_top_student`);
    console.log(`${BASE_API_URL}/get_a_top_student`)
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getAllSubject = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/subject`);
    console.log(`${BASE_API_URL}/subject`)
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error
  }
}

export default { searchRecordWithId, getStatisticBySubject, getATopStudent, getAllSubject };
