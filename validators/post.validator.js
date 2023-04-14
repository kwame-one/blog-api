const { body } = require("express-validator");
const PostRepository = require('../respositories/post.repository')

const storeRules = [
    body('title').trim()
        .notEmpty().withMessage('title is required').bail()
        .isLength({ min: 5 }).withMessage('title must be at least 5 characters').bail()
        .custom((val) => {
            const result = PostRepository.findByTitle(val)
            if (result) {
                throw new Error()
            }

            return true;
        })
        .withMessage('This title already exists').bail(),

    body('content').trim()
        .notEmpty().withMessage('content is required').bail()
        .isLength({ min: 10}).withMessage('content is not enough').bail()
]



module.exports = {
    storeRules,
    updateRules: storeRules
}