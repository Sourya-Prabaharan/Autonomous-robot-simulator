-- Tandoor Hut Database Schema
-- This script creates all necessary tables for tracking orders and analytics

-- Orders table - stores main order information
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    platform VARCHAR(20) NOT NULL CHECK (platform IN ('ubereats', 'doordash', 'phone')),
    order_type VARCHAR(10) NOT NULL CHECK (order_type IN ('delivery', 'pickup')),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'initiated' CHECK (status IN ('initiated', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table - stores individual items in each order
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(order_id) ON DELETE CASCADE,
    item_id VARCHAR(50) NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(8,2) NOT NULL,
    quantity INTEGER NOT NULL,
    item_total DECIMAL(8,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Item analytics table - aggregated data for popular items
CREATE TABLE IF NOT EXISTS item_analytics (
    item_id VARCHAR(50) PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(8,2) NOT NULL,
    total_orders INTEGER DEFAULT 0,
    total_quantity INTEGER DEFAULT 0,
    total_revenue DECIMAL(10,2) DEFAULT 0,
    last_ordered TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Platform analytics table - daily performance by platform
CREATE TABLE IF NOT EXISTS platform_analytics (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    total_orders INTEGER DEFAULT 0,
    total_revenue DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(platform, date)
);

-- Customer interactions table - track user behavior
CREATE TABLE IF NOT EXISTS customer_interactions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100),
    interaction_type VARCHAR(30) NOT NULL CHECK (interaction_type IN ('page_view', 'add_to_cart', 'platform_click', 'phone_call')),
    page_url TEXT,
    item_id VARCHAR(50),
    item_name VARCHAR(100),
    platform VARCHAR(20),
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_platform ON orders(platform);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_item_id ON order_items(item_id);
CREATE INDEX IF NOT EXISTS idx_platform_analytics_date ON platform_analytics(date);
CREATE INDEX IF NOT EXISTS idx_customer_interactions_type ON customer_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_customer_interactions_created_at ON customer_interactions(created_at);

-- Insert complete Tandoor Hut menu into item_analytics
INSERT INTO item_analytics (item_id, item_name, category, price) VALUES
-- Appetizers - Vegetarian
('app-veg-1', 'Chilli Paneer', 'Appetizers - Vegetarian', 12.00),
('app-veg-2', 'Baby Corn Manchurian', 'Appetizers - Vegetarian', 12.00),
('app-veg-3', 'Gobi Manchurian', 'Appetizers - Vegetarian', 12.00),
('app-veg-4', 'Gobi 65', 'Appetizers - Vegetarian', 12.00),
('app-veg-5', 'Paneer Pakoda', 'Appetizers - Vegetarian', 12.00),
('app-veg-6', 'Veg Samosa', 'Appetizers - Vegetarian', 1.75),
('app-veg-7', 'Aloo Bonda', 'Appetizers - Vegetarian', 1.75),
('app-veg-8', 'Mysore Bonda', 'Appetizers - Vegetarian', 1.75),
('app-veg-9', 'Masala Vada', 'Appetizers - Vegetarian', 1.75),
('app-veg-10', 'Medhu Vada', 'Appetizers - Vegetarian', 1.75),
('app-veg-11', 'Mirchi Bajji', 'Appetizers - Vegetarian', 1.75),
('app-veg-12', 'Cut Mirchi Bajji', 'Appetizers - Vegetarian', 2.00),
('app-veg-13', 'Onion Pakoda', 'Appetizers - Vegetarian', 4.00),
('app-veg-14', 'Vada Pav', 'Appetizers - Vegetarian', 4.50),
('app-veg-15', 'Dahi Vada', 'Appetizers - Vegetarian', 4.00),
('app-veg-16', 'Dhokla', 'Appetizers - Vegetarian', 4.00),
('app-veg-17', 'Chakli', 'Appetizers - Vegetarian', 3.00),

-- Appetizers - Non Vegetarian
('app-nonveg-1', 'Chicken Samosa', 'Appetizers - Non Vegetarian', 2.00),
('app-nonveg-2', 'Chicken 65', 'Appetizers - Non Vegetarian', 13.00),
('app-nonveg-3', 'Chilli Chicken', 'Appetizers - Non Vegetarian', 13.00),
('app-nonveg-4', 'Chilli Fish', 'Appetizers - Non Vegetarian', 15.00),
('app-nonveg-5', 'Tilapia Fish Fry', 'Appetizers - Non Vegetarian', 11.00),

-- Tiffin Specials
('tiffin-1', 'Idli - 3 piece', 'Tiffin Specials', 6.50),
('tiffin-2', 'Sambar Idli', 'Tiffin Specials', 6.50),
('tiffin-3', 'Plain Dosa', 'Tiffin Specials', 7.00),
('tiffin-4', 'Masala Dosa', 'Tiffin Specials', 8.50),
('tiffin-5', 'Podi Dosa', 'Tiffin Specials', 8.50),
('tiffin-6', 'Mysore Masala Dosa', 'Tiffin Specials', 9.00),
('tiffin-7', 'Onion Chili Dosa', 'Tiffin Specials', 8.50),
('tiffin-8', 'Ghee Roast Dosa', 'Tiffin Specials', 13.00),
('tiffin-9', 'Cheese Dosa', 'Tiffin Specials', 8.50),
('tiffin-10', 'Chocolate Dosa', 'Tiffin Specials', 8.50),
('tiffin-11', 'Plain Rava Dosa', 'Tiffin Specials', 8.50),
('tiffin-12', 'Onion Chilli Rava Dosa/Masala', 'Tiffin Specials', 9.50),
('tiffin-13', 'Uthapam', 'Tiffin Specials', 8.50),

-- Rice Specials
('rice-1', 'Chicken Biryani', 'Rice Specials', 12.00),
('rice-2', 'Chicken Fried Rice', 'Rice Specials', 12.00),
('rice-3', 'Veg Biryani', 'Rice Specials', 10.00),
('rice-4', 'Veg Fried Rice', 'Rice Specials', 11.00),
('rice-5', 'Egg Biryani', 'Rice Specials', 12.00),
('rice-6', 'Hakka Noodles Veg', 'Rice Specials', 12.00),
('rice-7', 'Hakka Noodles - Chicken', 'Rice Specials', 13.00),
('rice-8', 'Chef Special Variety - Rice', 'Rice Specials', 8.00),
('rice-9', 'White Rice', 'Rice Specials', 7.00),

-- Entree Specials - Vegetarian
('entree-veg-1', 'Paneer Butter Masala', 'Entree Specials - Vegetarian', 10.00),
('entree-veg-2', 'Palak Paneer', 'Entree Specials - Vegetarian', 10.00),
('entree-veg-3', 'Punjabi Kadhi', 'Entree Specials - Vegetarian', 9.00),
('entree-veg-4', 'Dal Makhani', 'Entree Specials - Vegetarian', 9.00),
('entree-veg-5', 'Dal Tadka', 'Entree Specials - Vegetarian', 9.00),
('entree-veg-6', 'Veg Entrees (Chef Special of the day)', 'Entree Specials - Vegetarian', 9.00),

-- Entree Specials - Non Vegetarian
('entree-nonveg-1', 'Goat Roast', 'Entree Specials - Non Vegetarian', 15.00),
('entree-nonveg-2', 'Goat Curry', 'Entree Specials - Non Vegetarian', 15.00),
('entree-nonveg-3', 'Goat Chilli Masala', 'Entree Specials - Non Vegetarian', 15.00),
('entree-nonveg-4', 'Shrimp Masala', 'Entree Specials - Non Vegetarian', 15.00),
('entree-nonveg-5', 'Lamb Keema', 'Entree Specials - Non Vegetarian', 16.00),
('entree-nonveg-6', 'Chicken Roast', 'Entree Specials - Non Vegetarian', 14.00),
('entree-nonveg-7', 'Butter Chicken', 'Entree Specials - Non Vegetarian', 11.00),
('entree-nonveg-8', 'Chicken Entrees (Chef Special of the day)', 'Entree Specials - Non Vegetarian', 9.00),
('entree-nonveg-9', 'Egg Curry', 'Entree Specials - Non Vegetarian', 9.00),

-- Breads & Tandoori Specials
('bread-1', 'Butter Naan', 'Breads & Tandoori Specials', 3.50),
('bread-2', 'Garlic Naan', 'Breads & Tandoori Specials', 4.00),
('bread-3', 'Chilli Naan', 'Breads & Tandoori Specials', 4.00),
('bread-4', 'Tandoori Roti', 'Breads & Tandoori Specials', 3.50),
('bread-5', 'Chapathi', 'Breads & Tandoori Specials', 2.00),
('bread-6', 'Rumali Roti', 'Breads & Tandoori Specials', 4.50),
('bread-7', 'Tandoori Chicken', 'Breads & Tandoori Specials', 4.50),
('bread-8', 'Chicken Tikka', 'Breads & Tandoori Specials', 13.00),
('bread-9', 'Paneer Tikka', 'Breads & Tandoori Specials', 13.00),

-- Chaat Specials
('chaat-1', 'Samosa Chaat', 'Chaat Specials', 7.50),
('chaat-2', 'Papdi Chaat', 'Chaat Specials', 7.50),
('chaat-3', 'Bhel Puri', 'Chaat Specials', 7.50),
('chaat-4', 'Peanut Chaat', 'Chaat Specials', 7.50),
('chaat-5', 'Aloo Tikki Chaat', 'Chaat Specials', 7.50),
('chaat-6', 'Ragda Chaat', 'Chaat Specials', 7.50),
('chaat-7', 'Pani Puri', 'Chaat Specials', 7.50),
('chaat-8', 'Vatana Chaat', 'Chaat Specials', 7.50),
('chaat-9', 'Masala Peanut', 'Chaat Specials', 6.00),

-- Beverages & Desserts
('bev-1', 'Masala Chai', 'Beverages & Desserts', 2.00),
('bev-2', 'Filter Coffee', 'Beverages & Desserts', 2.00),
('bev-3', 'Mango Lassi', 'Beverages & Desserts', 4.00),
('bev-4', 'Salt/Sweet Lassi', 'Beverages & Desserts', 4.00),
('bev-5', 'Spicy Lassi', 'Beverages & Desserts', 4.00),
('dessert-1', 'Gulab Jamun', 'Beverages & Desserts', 1.00),
('dessert-2', 'Carrot Halwa', 'Beverages & Desserts', 3.00),
('dessert-3', 'Suji Halwa', 'Beverages & Desserts', 3.50),
('dessert-4', 'Rasmalai', 'Beverages & Desserts', 1.50),
('dessert-5', 'Rasgula', 'Beverages & Desserts', 1.50),
('dessert-6', 'Kulfi', 'Beverages & Desserts', 2.50)

ON CONFLICT (item_id) DO UPDATE SET
    item_name = EXCLUDED.item_name,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    updated_at = CURRENT_TIMESTAMP;

-- Create a view for easy analytics queries
CREATE OR REPLACE VIEW order_summary AS
SELECT 
    o.order_id,
    o.platform,
    o.order_type,
    o.total_amount,
    o.created_at,
    COUNT(oi.id) as item_count,
    STRING_AGG(oi.item_name, ', ') as items
FROM orders o
LEFT JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.platform, o.order_type, o.total_amount, o.created_at
ORDER BY o.created_at DESC;

-- Function to update item analytics when new orders are added
CREATE OR REPLACE FUNCTION update_item_analytics()
RETURNS TRIGGER AS $$
BEGIN
    -- Update or insert item analytics
    INSERT INTO item_analytics (item_id, item_name, category, price, total_orders, total_quantity, total_revenue, last_ordered, updated_at)
    VALUES (NEW.item_id, NEW.item_name, NEW.category, NEW.price, 1, NEW.quantity, NEW.item_total, NOW(), NOW())
    ON CONFLICT (item_id) 
    DO UPDATE SET
        total_orders = item_analytics.total_orders + 1,
        total_quantity = item_analytics.total_quantity + NEW.quantity,
        total_revenue = item_analytics.total_revenue + NEW.item_total,
        last_ordered = NOW(),
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update analytics
DROP TRIGGER IF EXISTS trigger_update_item_analytics ON order_items;
CREATE TRIGGER trigger_update_item_analytics
    AFTER INSERT ON order_items
    FOR EACH ROW
    EXECUTE FUNCTION update_item_analytics();

-- Function to update platform analytics
CREATE OR REPLACE FUNCTION update_platform_analytics()
RETURNS TRIGGER AS $$
BEGIN
    -- Update or insert platform analytics for today
    INSERT INTO platform_analytics (platform, date, total_orders, total_revenue)
    VALUES (NEW.platform, CURRENT_DATE, 1, NEW.total_amount)
    ON CONFLICT (platform, date)
    DO UPDATE SET
        total_orders = platform_analytics.total_orders + 1,
        total_revenue = platform_analytics.total_revenue + NEW.total_amount;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for platform analytics
DROP TRIGGER IF EXISTS trigger_update_platform_analytics ON orders;
CREATE TRIGGER trigger_update_platform_analytics
    AFTER INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_platform_analytics();
