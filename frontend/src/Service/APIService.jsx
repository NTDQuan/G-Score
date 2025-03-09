import axios from 'axios';

const BASE_API_URL = 'http://127.0.0.1:8000/score';

const searchRecordWithId = async (id) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getStatisticBySubject = async (subject) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/get_statistic`, {
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
    const response = await axios.get(`${BASE_API_URL}/get_a_top_student`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default { searchRecordWithId, getStatisticBySubject, getATopStudent };
