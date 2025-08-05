-- CMS Tables for Tandoor Hut Menu Management
-- Run this after the main database script

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'manager')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu items table (replaces the simple item_analytics approach)
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    item_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(8,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    is_available BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    spice_level VARCHAR(20) DEFAULT 'none' CHECK (spice_level IN ('none', 'mild', 'medium', 'hot', 'very_hot')),
    dietary_info TEXT[], -- Array for vegetarian, vegan, gluten-free, etc.
    image_url TEXT,
    prep_time INTEGER, -- in minutes
    calories INTEGER,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS menu_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT INTO menu_categories (name, description, sort_order) VALUES
('Appetizers - Vegetarian', 'Vegetarian starters and snacks', 1),
('Appetizers - Non Vegetarian', 'Non-vegetarian starters and snacks', 2),
('Tiffin Specials', 'Traditional South Indian breakfast items', 3),
('Rice Specials', 'Rice dishes and biryanis', 4),
('Entree Specials - Vegetarian', 'Main course vegetarian dishes', 5),
('Entree Specials - Non Vegetarian', 'Main course non-vegetarian dishes', 6),
('Breads & Tandoori Specials', 'Breads and tandoori items', 7),
('Chaat Specials', 'Street food and chaat items', 8),
('Beverages & Desserts', 'Drinks and sweet treats', 9)
ON CONFLICT (name) DO NOTHING;

-- Migrate existing data from item_analytics to menu_items
INSERT INTO menu_items (item_id, name, category, price, is_available)
SELECT item_id, item_name, category, price, true
FROM item_analytics
ON CONFLICT (item_id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    updated_at = CURRENT_TIMESTAMP;

-- Create default admin user (password: admin123)
-- In production, change this immediately!
INSERT INTO admin_users (username, email, password_hash) VALUES
('admin', 'admin@tandoorhut.com', '$2b$10$rOzJqQZJqQZJqQZJqQZJqOzJqQZJqQZJqQZJqQZJqQZJqQZJqQZJq')
ON CONFLICT (username) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_featured ON menu_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- Update function for menu_items timestamp
CREATE OR REPLACE FUNCTION update_menu_items_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for menu_items
DROP TRIGGER IF EXISTS trigger_update_menu_items_timestamp ON menu_items;
CREATE TRIGGER trigger_update_menu_items_timestamp
    BEFORE UPDATE ON menu_items
    FOR EACH ROW
    EXECUTE FUNCTION update_menu_items_timestamp();
