const {validationResult} = require("express-validator");

const validate = (rules) => {
    return async (req, res, next) => {
        await Promise.all(rules.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const errorMessages = {}
        errors.array().map(err => errorMessages[[err.param]] = err.msg)
        res.status(400).json({errors: errorMessages});
    };
};

module.exports = {
    validate
}