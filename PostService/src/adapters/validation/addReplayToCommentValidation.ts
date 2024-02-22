import { body, validationResult } from 'express-validator';

export const validateComment = [
    body('postId')
        .notEmpty()
        .withMessage('Post ID is required'),
    body('commentId')
        .notEmpty()
        .withMessage('Comment ID is required'),
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Comment content is required'),
    body('userId')
        .notEmpty()
        .withMessage('User ID is required')
];