import axios from "axios";

export default {

  getSales: function() {
    return axios.get('/api/sales');
  }

};