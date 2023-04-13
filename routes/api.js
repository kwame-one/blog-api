const PostController = require('../controllers/post.controller')
const Validator = require('../validators/validator')
const PostValidator = require('../validators/post.validator')

const routes = (app) => {
    app.post('/posts', Validator.validate(PostValidator.storeRules), PostController.store);
    app.get('/posts', PostController.findAll);
    app.get('/posts/:slug', PostController.find);
    app.delete('/posts/:uuid', PostController.delete);
    app.put('/posts/:uuid', Validator.validate(PostValidator.updateRules), PostController.update);
}

module.exports = routes