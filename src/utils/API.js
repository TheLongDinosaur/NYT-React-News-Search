import axios from "axios";

export default {
  getArticles: function(url) {
    return axios.get(url);
  },

  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },

  getSavedArticles: function(id) {
        return axios.get('/api/articles');
  },

  deleteArticle: function(id) {
    return axios.delete('/api/articles/' + id);
  },

  saveArticle: async function(articleData) {   
    console.log("Trying Axios Post");
    return await axios.post('/api/articles', articleData)
  }
};