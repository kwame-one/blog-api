const PostRepository = require('../respositories/post.repository')
const crypto = require('crypto');

const PostService =  {

    store: function (data) {
        const uuid = crypto.randomUUID();
        const slug = data['title'].split(' ').join('-')
        data['uuid'] = uuid;
        data['slug'] = slug.toLowerCase();

        const post = PostRepository.store(data);
        return post;
    },

    findAll: () => {
        const posts = PostRepository.findAll();
        return posts;
    },

    find: (slug) => {
        const post = PostRepository.find(slug);
        return post;
    },

    delete: function(uuid) {
        const postIndex = PostRepository.findIndex(uuid);
        if (postIndex === -1) {
            //post not found
            return false;
        }
        PostRepository.delete(postIndex)
        return true;
    },

    update: function(uuid, data) {
        const postIndex = PostRepository.findIndex(uuid);
        if(postIndex === -1) {
            return false;
        }
        const slug = data['title'].split(' ').join('-')
        data['slug'] = slug.toLowerCase();
        data['uuid'] = uuid;

        const updatedPost = PostRepository.update(postIndex, data);
        return updatedPost;
    }
}

module.exports = PostService