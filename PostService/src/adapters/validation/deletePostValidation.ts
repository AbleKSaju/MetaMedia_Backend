import { body, validationResult } from 'express-validator';

export const validateDeletePost = [
    body('postId')
        .notEmpty()
        .withMessage('Post ID is required'),
];