import api from '@/services/api';

export default {
  getHospital(params) {
    return api().get(`/health-center?search=${params.word}`);
  },
};
