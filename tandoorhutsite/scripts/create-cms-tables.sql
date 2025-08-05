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

-- Insert complete menu items with proper data
INSERT INTO menu_items (item_id, name, description, price, category, is_available, is_featured, spice_level, sort_order) VALUES
-- Appetizers - Vegetarian
('app-veg-001', 'Samosa (2 pcs)', 'Crispy pastry filled with spiced potatoes and peas', 5.99, 'Appetizers - Vegetarian', true, true, 'mild', 1),
('app-veg-002', 'Paneer Tikka', 'Marinated cottage cheese grilled to perfection', 12.99, 'Appetizers - Vegetarian', true, false, 'medium', 2),
('app-veg-003', 'Vegetable Pakora', 'Mixed vegetable fritters with mint chutney', 8.99, 'Appetizers - Vegetarian', true, false, 'mild', 3),
('app-veg-004', 'Aloo Tikki (2 pcs)', 'Spiced potato patties with chutneys', 6.99, 'Appetizers - Vegetarian', true, false, 'mild', 4),
('app-veg-005', 'Papdi Chaat', 'Crispy wafers with yogurt and chutneys', 7.99, 'Appetizers - Vegetarian', true, false, 'mild', 5),

-- Appetizers - Non Vegetarian
('app-nonveg-001', 'Chicken Tikka', 'Tender chicken pieces marinated in yogurt and spices', 14.99, 'Appetizers - Non Vegetarian', true, true, 'medium', 1),
('app-nonveg-002', 'Seekh Kebab', 'Spiced ground lamb skewers grilled in tandoor', 15.99, 'Appetizers - Non Vegetarian', true, false, 'hot', 2),
('app-nonveg-003', 'Fish Tikka', 'Fresh fish marinated with herbs and spices', 16.99, 'Appetizers - Non Vegetarian', true, false, 'medium', 3),
('app-nonveg-004', 'Chicken Wings', 'Spicy tandoori chicken wings', 12.99, 'Appetizers - Non Vegetarian', true, false, 'hot', 4),

-- Tiffin Specials
('tiffin-001', 'Masala Dosa', 'Crispy crepe filled with spiced potatoes', 11.99, 'Tiffin Specials', true, true, 'mild', 1),
('tiffin-002', 'Idli Sambar (3 pcs)', 'Steamed rice cakes with lentil curry', 9.99, 'Tiffin Specials', true, false, 'mild', 2),
('tiffin-003', 'Uttapam', 'Thick pancake topped with vegetables', 10.99, 'Tiffin Specials', true, false, 'mild', 3),
('tiffin-004', 'Vada Sambar (2 pcs)', 'Fried lentil donuts with sambar', 8.99, 'Tiffin Specials', true, false, 'mild', 4),
('tiffin-005', 'Rava Dosa', 'Crispy semolina crepe', 12.99, 'Tiffin Specials', true, false, 'mild', 5),

-- Rice Specials
('rice-001', 'Chicken Biryani', 'Fragrant basmati rice with spiced chicken', 16.99, 'Rice Specials', true, true, 'medium', 1),
('rice-002', 'Mutton Biryani', 'Aromatic rice with tender mutton pieces', 18.99, 'Rice Specials', true, true, 'medium', 2),
('rice-003', 'Vegetable Biryani', 'Mixed vegetables with basmati rice', 14.99, 'Rice Specials', true, false, 'mild', 3),
('rice-004', 'Egg Biryani', 'Spiced rice with boiled eggs', 13.99, 'Rice Specials', true, false, 'mild', 4),
('rice-005', 'Jeera Rice', 'Cumin flavored basmati rice', 6.99, 'Rice Specials', true, false, 'none', 5),
('rice-006', 'Curd Rice', 'Yogurt rice with tempering', 8.99, 'Rice Specials', true, false, 'none', 6),

-- Entree Specials - Vegetarian
('entree-veg-001', 'Paneer Butter Masala', 'Cottage cheese in rich tomato cream sauce', 15.99, 'Entree Specials - Vegetarian', true, true, 'mild', 1),
('entree-veg-002', 'Dal Tadka', 'Yellow lentils tempered with spices', 11.99, 'Entree Specials - Vegetarian', true, false, 'mild', 2),
('entree-veg-003', 'Palak Paneer', 'Cottage cheese in spinach gravy', 14.99, 'Entree Specials - Vegetarian', true, false, 'mild', 3),
('entree-veg-004', 'Chana Masala', 'Chickpeas in spiced tomato gravy', 12.99, 'Entree Specials - Vegetarian', true, false, 'medium', 4),
('entree-veg-005', 'Aloo Gobi', 'Cauliflower and potatoes with spices', 13.99, 'Entree Specials - Vegetarian', true, false, 'mild', 5),
('entree-veg-006', 'Baingan Bharta', 'Roasted eggplant mash with spices', 13.99, 'Entree Specials - Vegetarian', true, false, 'medium', 6),

-- Entree Specials - Non Vegetarian
('entree-nonveg-001', 'Butter Chicken', 'Tender chicken in creamy tomato sauce', 17.99, 'Entree Specials - Non Vegetarian', true, true, 'mild', 1),
('entree-nonveg-002', 'Chicken Curry', 'Traditional chicken curry with spices', 16.99, 'Entree Specials - Non Vegetarian', true, false, 'medium', 2),
('entree-nonveg-003', 'Mutton Curry', 'Slow-cooked mutton in rich gravy', 19.99, 'Entree Specials - Non Vegetarian', true, false, 'hot', 3),
('entree-nonveg-004', 'Fish Curry', 'Fresh fish in coconut curry', 18.99, 'Entree Specials - Non Vegetarian', true, false, 'medium', 4),
('entree-nonveg-005', 'Chicken Tikka Masala', 'Grilled chicken in spiced tomato sauce', 17.99, 'Entree Specials - Non Vegetarian', true, true, 'medium', 5),

-- Breads & Tandoori Specials
('bread-001', 'Naan', 'Traditional leavened bread', 3.99, 'Breads & Tandoori Specials', true, false, 'none', 1),
('bread-002', 'Garlic Naan', 'Naan topped with garlic and herbs', 4.99, 'Breads & Tandoori Specials', true, true, 'none', 2),
('bread-003', 'Butter Naan', 'Naan brushed with butter', 4.49, 'Breads & Tandoori Specials', true, false, 'none', 3),
('bread-004', 'Roti', 'Whole wheat flatbread', 2.99, 'Breads & Tandoori Specials', true, false, 'none', 4),
('bread-005', 'Paratha', 'Layered flatbread', 4.99, 'Breads & Tandoori Specials', true, false, 'none', 5),
('bread-006', 'Tandoori Chicken (Half)', 'Half chicken marinated and grilled', 15.99, 'Breads & Tandoori Specials', true, true, 'hot', 6),

-- Chaat Specials
('chaat-001', 'Bhel Puri', 'Puffed rice with chutneys and vegetables', 7.99, 'Chaat Specials', true, false, 'mild', 1),
('chaat-002', 'Pani Puri (6 pcs)', 'Crispy shells with spiced water', 6.99, 'Chaat Specials', true, true, 'medium', 2),
('chaat-003', 'Dahi Puri', 'Crispy shells with yogurt and chutneys', 8.99, 'Chaat Specials', true, false, 'mild', 3),
('chaat-004', 'Aloo Chaat', 'Spiced potato salad with chutneys', 7.99, 'Chaat Specials', true, false, 'medium', 4),

-- Beverages & Desserts
('bev-001', 'Mango Lassi', 'Sweet yogurt drink with mango', 4.99, 'Beverages & Desserts', true, true, 'none', 1),
('bev-002', 'Sweet Lassi', 'Traditional sweet yogurt drink', 3.99, 'Beverages & Desserts', true, false, 'none', 2),
('bev-003', 'Salt Lassi', 'Savory yogurt drink', 3.99, 'Beverages & Desserts', true, false, 'none', 3),
('bev-004', 'Masala Chai', 'Spiced Indian tea', 2.99, 'Beverages & Desserts', true, false, 'none', 4),
('bev-005', 'Gulab Jamun (2 pcs)', 'Sweet milk dumplings in syrup', 5.99, 'Beverages & Desserts', true, true, 'none', 5),
('bev-006', 'Rasmalai (2 pcs)', 'Cottage cheese dumplings in milk', 6.99, 'Beverages & Desserts', true, false, 'none', 6),
('bev-007', 'Kulfi', 'Traditional Indian ice cream', 4.99, 'Beverages & Desserts', true, false, 'none', 7)
ON CONFLICT (item_id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    category = EXCLUDED.category,
    is_available = EXCLUDED.is_available,
    is_featured = EXCLUDED.is_featured,
    spice_level = EXCLUDED.spice_level,
    sort_order = EXCLUDED.sort_order,
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
