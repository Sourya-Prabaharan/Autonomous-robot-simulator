-- Create database tables for Tandoor Hut restaurant website
-- This includes menu items, customer interactions, orders, and analytics

-- Drop existing tables if they exist
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customer_interactions CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS menu_categories CASCADE;

-- Create menu categories table
CREATE TABLE menu_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create menu items table with all 87 items
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    item_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER REFERENCES menu_categories(id),
    category VARCHAR(100),
    spice_level VARCHAR(20) DEFAULT 'none',
    is_vegetarian BOOLEAN DEFAULT false,
    is_vegan BOOLEAN DEFAULT false,
    is_gluten_free BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    prep_time_minutes INTEGER DEFAULT 15,
    calories INTEGER,
    image_url VARCHAR(500),
    ingredients TEXT,
    allergens TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create customer interactions table
CREATE TABLE customer_interactions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100),
    interaction_type VARCHAR(50) NOT NULL,
    page_url VARCHAR(500),
    item_id VARCHAR(50),
    item_name VARCHAR(200),
    platform VARCHAR(50),
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(100) UNIQUE,
    customer_name VARCHAR(200),
    customer_email VARCHAR(200),
    customer_phone VARCHAR(20),
    platform VARCHAR(50) NOT NULL,
    order_type VARCHAR(20) DEFAULT 'delivery',
    items TEXT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    session_id VARCHAR(100),
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(100) REFERENCES orders(order_id),
    item_id VARCHAR(50),
    item_name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    item_total DECIMAL(10,2) NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert menu categories
INSERT INTO menu_categories (name, description, display_order) VALUES
('Appetizers', 'Start your meal with our delicious appetizers', 1),
('Tandoor Specialties', 'Fresh from our traditional clay oven', 2),
('Chicken Entrees', 'Flavorful chicken dishes', 3),
('Lamb & Goat', 'Premium lamb and goat preparations', 4),
('Seafood', 'Fresh seafood specialties', 5),
('Vegetarian', 'Delicious vegetarian options', 6),
('Rice & Biryani', 'Aromatic rice dishes', 7),
('Breads', 'Fresh baked Indian breads', 8),
('Desserts & Beverages', 'Sweet endings and refreshing drinks', 9);

-- Insert all 87 menu items with accurate pricing
INSERT INTO menu_items (item_id, name, description, price, category, spice_level, is_vegetarian) VALUES
-- Appetizers
('app_samosa_veg', 'Vegetable Samosa (2 pcs)', 'Crispy pastries filled with spiced vegetables', 6.99, 'Appetizers', 'mild', true),
('app_samosa_meat', 'Meat Samosa (2 pcs)', 'Crispy pastries filled with spiced ground meat', 7.99, 'Appetizers', 'mild', false),
('app_pakora_veg', 'Vegetable Pakora', 'Mixed vegetable fritters with chickpea batter', 8.99, 'Appetizers', 'mild', true),
('app_pakora_chicken', 'Chicken Pakora', 'Tender chicken pieces in spiced batter', 9.99, 'Appetizers', 'mild', false),
('app_tikki_aloo', 'Aloo Tikki (2 pcs)', 'Spiced potato patties served with chutneys', 7.99, 'Appetizers', 'mild', true),
('app_chaat_bhel', 'Bhel Puri', 'Puffed rice mixed with chutneys and vegetables', 8.99, 'Appetizers', 'mild', true),
('app_papadum', 'Papadum (4 pcs)', 'Crispy lentil wafers', 4.99, 'Appetizers', 'none', true),

-- Tandoor Specialties
('tandoor_chicken_full', 'Tandoor Chicken (Full)', 'Whole chicken marinated in yogurt and spices', 18.99, 'Tandoor Specialties', 'medium', false),
('tandoor_chicken_half', 'Tandoor Chicken (Half)', 'Half chicken marinated in yogurt and spices', 12.99, 'Tandoor Specialties', 'medium', false),
('tandoor_tikka_chicken', 'Chicken Tikka', 'Boneless chicken pieces from tandoor', 15.99, 'Tandoor Specialties', 'medium', false),
('tandoor_seekh_chicken', 'Chicken Seekh Kebab', 'Ground chicken kebabs with herbs and spices', 16.99, 'Tandoor Specialties', 'medium', false),
('tandoor_seekh_lamb', 'Lamb Seekh Kebab', 'Ground lamb kebabs with aromatic spices', 18.99, 'Tandoor Specialties', 'medium', false),
('tandoor_boti_lamb', 'Lamb Boti Kebab', 'Tender lamb pieces marinated and grilled', 19.99, 'Tandoor Specialties', 'medium', false),
('tandoor_fish_tikka', 'Fish Tikka', 'Fresh fish marinated in spices and grilled', 17.99, 'Tandoor Specialties', 'mild', false),
('tandoor_shrimp', 'Tandoor Shrimp', 'Jumbo shrimp marinated and grilled', 19.99, 'Tandoor Specialties', 'mild', false),
('tandoor_paneer_tikka', 'Paneer Tikka', 'Cottage cheese cubes with bell peppers', 14.99, 'Tandoor Specialties', 'mild', true),

-- Chicken Entrees
('chicken_curry', 'Chicken Curry', 'Traditional chicken curry with aromatic spices', 14.99, 'Chicken Entrees', 'medium', false),
('chicken_masala', 'Chicken Masala', 'Chicken in rich tomato and onion gravy', 15.99, 'Chicken Entrees', 'medium', false),
('chicken_tikka_masala', 'Chicken Tikka Masala', 'Tandoor chicken in creamy tomato sauce', 16.99, 'Chicken Entrees', 'mild', false),
('chicken_butter', 'Butter Chicken', 'Creamy tomato-based chicken curry', 16.99, 'Chicken Entrees', 'mild', false),
('chicken_korma', 'Chicken Korma', 'Mild chicken curry in cashew and cream sauce', 15.99, 'Chicken Entrees', 'mild', false),
('chicken_vindaloo', 'Chicken Vindaloo', 'Spicy chicken curry with potatoes', 15.99, 'Chicken Entrees', 'hot', false),
('chicken_saag', 'Chicken Saag', 'Chicken cooked with fresh spinach', 15.99, 'Chicken Entrees', 'medium', false),
('chicken_jalfrezi', 'Chicken Jalfrezi', 'Chicken stir-fried with bell peppers and onions', 15.99, 'Chicken Entrees', 'medium', false),
('chicken_madras', 'Chicken Madras', 'South Indian style spicy chicken curry', 15.99, 'Chicken Entrees', 'hot', false),
('chicken_karahi', 'Chicken Karahi', 'Chicken cooked in wok with tomatoes and peppers', 16.99, 'Chicken Entrees', 'medium', false),

-- Lamb & Goat
('lamb_curry', 'Lamb Curry', 'Traditional lamb curry with aromatic spices', 17.99, 'Lamb & Goat', 'medium', false),
('lamb_masala', 'Lamb Masala', 'Lamb in rich tomato and onion gravy', 18.99, 'Lamb & Goat', 'medium', false),
('lamb_korma', 'Lamb Korma', 'Mild lamb curry in cashew and cream sauce', 18.99, 'Lamb & Goat', 'mild', false),
('lamb_vindaloo', 'Lamb Vindaloo', 'Spicy lamb curry with potatoes', 18.99, 'Lamb & Goat', 'hot', false),
('lamb_saag', 'Lamb Saag', 'Lamb cooked with fresh spinach', 18.99, 'Lamb & Goat', 'medium', false),
('lamb_rogan_josh', 'Lamb Rogan Josh', 'Kashmiri style lamb curry', 19.99, 'Lamb & Goat', 'medium', false),
('lamb_karahi', 'Lamb Karahi', 'Lamb cooked in wok with tomatoes and peppers', 19.99, 'Lamb & Goat', 'medium', false),
('goat_curry', 'Goat Curry', 'Traditional goat curry with bone', 19.99, 'Lamb & Goat', 'medium', false),
('goat_karahi', 'Goat Karahi', 'Goat cooked in wok with tomatoes and peppers', 20.99, 'Lamb & Goat', 'medium', false),

-- Seafood
('fish_curry', 'Fish Curry', 'Fresh fish in aromatic curry sauce', 16.99, 'Seafood', 'medium', false),
('fish_masala', 'Fish Masala', 'Fish in rich tomato and onion gravy', 17.99, 'Seafood', 'medium', false),
('shrimp_curry', 'Shrimp Curry', 'Jumbo shrimp in spiced curry sauce', 18.99, 'Seafood', 'medium', false),
('shrimp_masala', 'Shrimp Masala', 'Shrimp in rich tomato and onion gravy', 19.99, 'Seafood', 'medium', false),
('shrimp_vindaloo', 'Shrimp Vindaloo', 'Spicy shrimp curry with potatoes', 19.99, 'Seafood', 'hot', false),

-- Vegetarian
('dal_tadka', 'Dal Tadka', 'Yellow lentils tempered with spices', 11.99, 'Vegetarian', 'mild', true),
('dal_makhani', 'Dal Makhani', 'Black lentils in creamy tomato sauce', 12.99, 'Vegetarian', 'mild', true),
('chana_masala', 'Chana Masala', 'Chickpeas in spiced tomato gravy', 11.99, 'Vegetarian', 'medium', true),
('aloo_gobi', 'Aloo Gobi', 'Potatoes and cauliflower with spices', 11.99, 'Vegetarian', 'mild', true),
('baingan_bharta', 'Baingan Bharta', 'Roasted eggplant mash with spices', 12.99, 'Vegetarian', 'medium', true),
('bhindi_masala', 'Bhindi Masala', 'Okra cooked with onions and spices', 12.99, 'Vegetarian', 'medium', true),
('palak_paneer', 'Palak Paneer', 'Cottage cheese in creamy spinach gravy', 13.99, 'Vegetarian', 'mild', true),
('paneer_makhani', 'Paneer Makhani', 'Cottage cheese in creamy tomato sauce', 14.99, 'Vegetarian', 'mild', true),
('paneer_tikka_masala', 'Paneer Tikka Masala', 'Grilled paneer in creamy tomato sauce', 14.99, 'Vegetarian', 'mild', true),
('matar_paneer', 'Matar Paneer', 'Green peas and cottage cheese curry', 13.99, 'Vegetarian', 'mild', true),
('kadai_paneer', 'Kadai Paneer', 'Paneer cooked with bell peppers in wok', 14.99, 'Vegetarian', 'medium', true),
('malai_kofta', 'Malai Kofta', 'Vegetable dumplings in creamy gravy', 13.99, 'Vegetarian', 'mild', true),
('vegetable_korma', 'Vegetable Korma', 'Mixed vegetables in cashew cream sauce', 12.99, 'Vegetarian', 'mild', true),
('aloo_matar', 'Aloo Matar', 'Potatoes and green peas curry', 11.99, 'Vegetarian', 'mild', true),

-- Rice & Biryani
('rice_basmati', 'Basmati Rice', 'Aromatic long grain basmati rice', 4.99, 'Rice & Biryani', 'none', true),
('rice_jeera', 'Jeera Rice', 'Basmati rice with cumin seeds', 6.99, 'Rice & Biryani', 'none', true),
('rice_pilaf', 'Vegetable Pilaf', 'Basmati rice with mixed vegetables', 8.99, 'Rice & Biryani', 'mild', true),
('biryani_chicken', 'Chicken Biryani', 'Aromatic rice with spiced chicken', 16.99, 'Rice & Biryani', 'medium', false),
('biryani_lamb', 'Lamb Biryani', 'Aromatic rice with spiced lamb', 18.99, 'Rice & Biryani', 'medium', false),
('biryani_goat', 'Goat Biryani', 'Aromatic rice with spiced goat', 19.99, 'Rice & Biryani', 'medium', false),
('biryani_shrimp', 'Shrimp Biryani', 'Aromatic rice with spiced shrimp', 19.99, 'Rice & Biryani', 'medium', false),
('biryani_vegetable', 'Vegetable Biryani', 'Aromatic rice with mixed vegetables', 13.99, 'Rice & Biryani', 'mild', true),

-- Breads
('naan_plain', 'Plain Naan', 'Traditional leavened bread', 3.99, 'Breads', 'none', true),
('naan_garlic', 'Garlic Naan', 'Naan topped with fresh garlic', 4.99, 'Breads', 'none', true),
('naan_butter', 'Butter Naan', 'Naan brushed with butter', 4.49, 'Breads', 'none', true),
('naan_cheese', 'Cheese Naan', 'Naan stuffed with cheese', 5.99, 'Breads', 'none', true),
('naan_keema', 'Keema Naan', 'Naan stuffed with spiced ground meat', 6.99, 'Breads', 'mild', false),
('naan_onion', 'Onion Kulcha', 'Bread stuffed with spiced onions', 5.49, 'Breads', 'mild', true),
('naan_aloo', 'Aloo Paratha', 'Bread stuffed with spiced potatoes', 5.99, 'Breads', 'mild', true),
('roti_tandoori', 'Tandoori Roti', 'Whole wheat bread from tandoor', 3.49, 'Breads', 'none', true),
('chapati', 'Chapati (2 pcs)', 'Thin whole wheat flatbread', 4.99, 'Breads', 'none', true),
('poori', 'Poori (4 pcs)', 'Deep fried puffed bread', 5.99, 'Breads', 'none', true),

-- Desserts & Beverages
('dessert_gulab_jamun', 'Gulab Jamun (2 pcs)', 'Sweet milk dumplings in syrup', 5.99, 'Desserts & Beverages', 'none', true),
('dessert_rasmalai', 'Rasmalai (2 pcs)', 'Cottage cheese dumplings in sweet milk', 6.99, 'Desserts & Beverages', 'none', true),
('dessert_kheer', 'Rice Kheer', 'Traditional rice pudding', 4.99, 'Desserts & Beverages', 'none', true),
('dessert_kulfi', 'Kulfi', 'Traditional Indian ice cream', 4.99, 'Desserts & Beverages', 'none', true),
('drink_lassi_sweet', 'Sweet Lassi', 'Traditional yogurt drink', 4.99, 'Desserts & Beverages', 'none', true),
('drink_lassi_mango', 'Mango Lassi', 'Yogurt drink with mango', 5.99, 'Desserts & Beverages', 'none', true),
('drink_lassi_salt', 'Salt Lassi', 'Savory yogurt drink', 4.99, 'Desserts & Beverages', 'none', true),
('drink_chai', 'Masala Chai', 'Spiced Indian tea', 3.99, 'Desserts & Beverages', 'none', true),
('drink_coffee', 'Indian Coffee', 'Traditional filter coffee', 3.99, 'Desserts & Beverages', 'none', true),
('drink_soda', 'Soft Drinks', 'Coke, Pepsi, Sprite, etc.', 2.99, 'Desserts & Beverages', 'none', true),
('drink_water', 'Bottled Water', 'Premium bottled water', 1.99, 'Desserts & Beverages', 'none', true),

-- Lunch Specials (Weekday 11 AM - 3 PM)
('lunch_chicken_curry', 'Lunch Chicken Curry', 'Chicken curry with rice and naan', 11.99, 'Lunch Specials', 'medium', false),
('lunch_lamb_curry', 'Lunch Lamb Curry', 'Lamb curry with rice and naan', 13.99, 'Lunch Specials', 'medium', false),
('lunch_vegetable', 'Lunch Vegetable Special', 'Two vegetables with rice and naan', 10.99, 'Lunch Specials', 'mild', true),
('lunch_tandoori', 'Lunch Tandoori Special', 'Tandoori chicken with rice and naan', 12.99, 'Lunch Specials', 'medium', false),
('lunch_biryani', 'Lunch Biryani Special', 'Choice of biryani with raita', 12.99, 'Lunch Specials', 'medium', false);

-- Create indexes for better performance
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_customer_interactions_type ON customer_interactions(interaction_type);
CREATE INDEX idx_customer_interactions_created ON customer_interactions(created_at);
CREATE INDEX idx_orders_platform ON orders(platform);
CREATE INDEX idx_orders_created ON orders(created_at);

-- Create views for analytics
CREATE VIEW item_analytics AS
SELECT 
    mi.item_id,
    mi.name as item_name,
    mi.category,
    mi.price,
    COALESCE(cart_stats.total_orders, 0) as total_orders,
    COALESCE(cart_stats.total_quantity, 0) as total_quantity,
    COALESCE(cart_stats.total_revenue, 0) as total_revenue,
    cart_stats.last_ordered
FROM menu_items mi
LEFT JOIN (
    SELECT 
        item_id,
        COUNT(*) as total_orders,
        SUM(1) as total_quantity,
        COUNT(*) * 1.0 as total_revenue,
        MAX(created_at) as last_ordered
    FROM customer_interactions 
    WHERE interaction_type = 'add_to_cart' 
        AND item_id IS NOT NULL
    GROUP BY item_id
) cart_stats ON mi.item_id = cart_stats.item_id;

CREATE VIEW platform_analytics AS
SELECT 
    DATE(created_at) as date,
    platform,
    COUNT(*) as total_orders,
    SUM(total_amount) as total_revenue
FROM orders
GROUP BY DATE(created_at), platform;

-- Insert sample data for testing
INSERT INTO customer_interactions (interaction_type, page_url, session_id) VALUES
('page_view', '/', 'test_session_1'),
('page_view', '/menu', 'test_session_1'),
('add_to_cart', '/menu', 'test_session_1');

COMMIT;
