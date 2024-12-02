import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, email, phone, password, user_type } = req.body;

        if (user_type !== 'employee' && user_type !== 'admin') {
            res.status(400).json({
                success: false,
                message: 'Invalid user type'
            });
            return;
        }

        const newUser = await User.create({
            name,
            email,
            phone,
            password,
            user_type
        });

        res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating user'
        });
    }
};

export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userType = req.query.user_type || 'admin';
        
        const employees = await User.findAll({
            where: {
                user_type: 'employee'  
            }
        });

        res.status(200).json({
            success: true,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching employees'
        });
    }
};

export const getAllAdmins = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userType = req.query.user_type || 'admin';
        
        const employees = await User.findAll({
            where: {
                user_type: 'admin'  // Only fetch admin users
            }
        });

        res.status(200).json({
            success: true,
            data: employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching employees'
        });
    }
};

export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const employee = await User.findByPk(id);
        if (!employee) {
            res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
            return;
        }

        await employee.update(updates);

        res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating employee'
        });
    }
};

export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const employee = await User.findByPk(id);
        if (!employee) {
            res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
            return;
        }

        await employee.destroy();

        res.status(200).json({
            success: true,
            message: 'Employee deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting employee'
        });
    }
};
