const PostRepository = require('../respositories/post.repository')
const crypto = require('crypto');

class PostService {

    static store(data) {
        const uuid = crypto.randomUUID();
        const slug = data['title'].split(' ').join('-')
        data['uuid'] = uuid;
        data['slug'] = slug.toLowerCase();

        const post = PostRepository.store(data);
        return post;
    }

    static findAll() {
        const posts = PostRepository.findAll();
        return posts;
    }

    static find(slug) {
        const post = PostRepository.find(slug);
        return post;
    }

    static delete(uuid) {
        const postIndex = PostRepository.findIndex(uuid);
        if (postIndex === -1) {
            //post not found
            return false;
        }
        PostRepository.delete(postIndex)
        return true;
    }

    static update(uuid, data) {
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