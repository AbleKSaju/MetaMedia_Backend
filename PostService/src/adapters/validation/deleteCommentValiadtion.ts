import { body, validationResult } from 'express-validator';

export const validateDeleteComment = [
    body('postId')
        .notEmpty()
        .withMessage('Post ID is required'),
    body('commentId')
        .notEmpty()
        .withMessage('Comment ID is required')
];