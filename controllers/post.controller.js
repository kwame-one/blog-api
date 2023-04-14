const PostService = require('../services/post.service') //import post service here

class PostController {
    static async store(req, res) {
        const body = req.body; // retrieve request body / data
        body.image = req.file.filename
        const post = await PostService.store(body); //call post service
        res.status(201).json(post)
    }

    static async findAll(req, res) {
        const posts =  await PostService.findAll();
        res.json(posts);
    }

    static async find(req, res) {
        const slug = req.params.slug;
        const post = await PostService.find(slug)
        if(!post) {
            return res.status(404).json({message: 'post not found'})
        }
        res.json(post);
    }

    static delete(req, res) {
        const uuid = req.params.uuid;
        const isDeleted = PostService.delete(uuid);
        if(!isDeleted) {
            return res.status(404).json({message: 'post not found'})
        }
        res.status(204).json();
    }

    static update(req, res) {
        const uuid = req.params.uuid;
        const body = req.body;

        const updatedPost = PostService.update(uuid, body);
        if(!updatedPost) {
            return res.status(404).json({message: 'post not found'})
        }
        res.json(updatedPost);

    }
}

module.exports = PostController