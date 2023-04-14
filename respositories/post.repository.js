
const Post = require('../models/post.model')
const posts = [];


class PostRepository {
    static async store(data) {
        const post = await Post.create({...data});
        return post;
    }

    static async findAll() {
        return await Post.find();
    }

    static async find(slug) {
        const post = await Post.findOne({slug})
        return post;
    }

    static findByUuid(uuid) {
        const post = posts.find(item => item.uuid === uuid);
        return post;
    }

    static findIndex(uuid) {
        const index = posts.findIndex(item => item.uuid === uuid)
        return index;
    }

    static delete(index) {
       posts.splice(index, 1)
    }

    static update(index, data) {
        posts[index] = data;
        return posts[index];
    }

    static findByTitle(title) {
        const post = Post.findOne({title: title})
        return post;
    }
}

module.exports = PostRepository