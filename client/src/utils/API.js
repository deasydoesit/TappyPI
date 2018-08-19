import axios from "axios";

export default {

  getSales: function() {
    return axios.get('/api/sales');
  },

  postOrder: function(obj) {
    return axios.post('/api/order', obj);
  }

};