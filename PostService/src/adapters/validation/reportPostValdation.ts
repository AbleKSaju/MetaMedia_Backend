import { body, validationResult } from 'express-validator';

export const validateReportPost = [
    body('postId')
        .notEmpty()
        .withMessage('Post ID is required'),
    body('content')
        .notEmpty()
        .withMessage('content te required'),
    body('userId')
        .notEmpty()
        .withMessage('userId te required'),
];