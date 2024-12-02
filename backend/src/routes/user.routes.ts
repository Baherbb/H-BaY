import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { hasPermission } from '../middleware/permissions';
import { Permission } from '../middleware/permissions';
import {
    createEmployee,
    getAllEmployees,
    getAllAdmins,
    updateEmployee,
    deleteEmployee
} from '../controllers/user.controller';

const router = Router();

router.use((req, res, next) => {
    console.log('Route accessed:', {
        path: req.path,
        method: req.method,
        auth: req.headers.authorization ? 'Present' : 'Missing'
    });
    next();
});

router.post(
    '/employees',
    authMiddleware,
    hasPermission(Permission.CREATE_EMPLOYEE),
    createEmployee
);

router.get(
    '/employees',
    authMiddleware,
    hasPermission(Permission.VIEW_USERS),
    getAllEmployees
);

router.get(
    '/admins',
    authMiddleware,
    hasPermission(Permission.VIEW_USERS),
    getAllAdmins
);


router.put(
    '/employees/:id',
    authMiddleware,
    hasPermission(Permission.MANAGE_USERS),
    updateEmployee
);

router.delete(
    '/employees/:id',
    authMiddleware,
    hasPermission(Permission.MANAGE_USERS),
    deleteEmployee
);

export default router;
