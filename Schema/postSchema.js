const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    
  },
  
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
