import { Request, Response } from 'express';
import Order from '../models/order.model';


export const createOrder = async (req: Request, res:Response)=>{
    try {

        const {user_id, total_amount, expected_delivery_date, coupon_id, discount_amount} = req.body;

        if (!user_id || typeof user_id !== 'number') {
            return res.status(400).json({ message: 'user_id must be a valid number' });
        }
        if (!total_amount || typeof total_amount !== 'number') {
            return res.status(400).json({ message: 'total_amount must be a valid number' });
        }
        const newOrder = await Order.create({
            user_id,
            total_amount,
            expected_delivery_date: expected_delivery_date ?? null,
            coupon_id: coupon_id ?? null,
            discount_amount: discount_amount ?? 0,
        } as any);

        return res.status(201).json({
            message: 'Order created successfully',
            order: newOrder,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({
            message: 'Failed to create order',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const getAllOrders = async (req:Request, res:Response) => {

    try { 
        const orders = await Order.findAll();
        return res.status(200).json({
            message: 'Orders retrieved successfully',
            orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({
            message: 'Failed to fetch orders',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};


// single Order by ID
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        // find order by ID
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({
            message: 'Order retrieved successfully',
            order,
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        return res.status(500).json({
            message: 'Failed to fetch order',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { status } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // update order status
        order.status = status;
        await order.save();

        return res.status(200).json({
            message: 'Order status updated successfully',
            order,
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({
            message: 'Failed to update order status',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Delete an Order
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);

        // Validate ID
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }

        // delete order
        const deletedCount = await Order.destroy({ where: { id } });
        if (!deletedCount) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({
            message: 'Order deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({
            message: 'Failed to delete order',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

