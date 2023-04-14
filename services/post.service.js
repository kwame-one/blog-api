const PostRepository = require('../respositories/post.repository')
const crypto = require('crypto');
// const config = require('../configs/app')

class PostService {

    static async store(data) {
        const slug = data['title'].split(' ').join('-')
        data['slug'] = slug.toLowerCase();

        const post = await PostRepository.store(data);
        post.image = process.env.APP_URL + '/uploads/posts/'+ post.image;
        return post;
    }

    static async findAll() {
        const posts = await PostRepository.findAll();
        return posts.map(post => {
            post.image = process.env.APP_URL + '/uploads/posts/'+ post.image;
            return post;
        });
    }

    static async find(slug) {
        const post = await PostRepository.find(slug);
        if(!post) {
            return false;
        }
        post.image = process.env.APP_URL + '/uploads/posts/'+ post.image;
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