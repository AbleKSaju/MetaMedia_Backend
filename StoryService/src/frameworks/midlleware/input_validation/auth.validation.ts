import { body, validationResult } from 'express-validator';
export const validateLogin = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),
  ];