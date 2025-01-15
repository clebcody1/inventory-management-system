 const { body, validationResult, param } = require("express-validator");
const { model } = require("mongoose");


 const createBookValidator = [
        body("bookName")
            .notEmpty().withMessage("Name is required")
            .isLength({minL: 5, max:100}).withMessage("Na,e must be between 5 and 100 character"),
        body("price")
            .notEmpty().withMessage("Price is required")
            .isFloat({min: 1, max: 100}).withMessage("Price must be between 1 and 1000$"),
        body("countInStock")
            .notEmpty("").withMessage("Stock count is required")
            .isInt({min: 1, max: 255}).withMessage("Stock count must be between 1 and 255"),
        body("image")
            .notEmpty("").withMessage("Image URL is required")
            .isURL().withMessage("image must be valid ")
    ];

    const updateBookValidation = [
            body("bookName")
                .optional()
                .isLength({minL: 5, max:100}).withMessage("Na,e must be between 5 and 100 character"),
            body("price")
                .optional()
                .isFloat({min: 1, max: 100}).withMessage("Price must be between 1 and 1000$"),
            body("countInStock")
                .notEmpty()
                .isInt({min: 1, max: 255}).withMessage("Stock count must be between 1 and 255"),
            body("image")
                .optional("")
                .isURL().withMessage("image must be valid ")
        ];


        const idValidation = [param("id").isMongoId().withMessage("Invalid Book ID")]

        const handleValidationErrors  = (req, res, next) => {
             const errors = validationResult(req) 
                        if(!errors.isEmpty())
                        {
                            return res.status(400).json({errors: errors.array()})
                        }
                        next()
        }

        

        module.exports = {
            createBookValidator,
            updateBookValidation,
            handleValidationErrors,
            idValidation
        }