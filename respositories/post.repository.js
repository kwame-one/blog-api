
const posts = [];

class PostRepository {
    static store(data) {
        posts.push(data);
        return posts.find(post => post.uuid === data.uuid);
    }

    static findAll() {
        return posts;
    }

    static find(slug) {
        const post = posts.find(item => item.slug === slug);
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
        const index = posts.findIndex(item => item.title === title)
        return index;
    }
}

module.exports = PostRepository