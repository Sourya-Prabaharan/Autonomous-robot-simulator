# Tandoor Hut Website Deployment Guide

This guide will help you deploy your Tandoor Hut restaurant website with PostgreSQL analytics tracking.

## Prerequisites

- GitHub account
- Vercel account
- Neon PostgreSQL database (already created)

## Step 1: Database Setup (5 minutes)

1. **Go to your Neon Console**: https://console.neon.tech/
2. **Click "SQL Editor"**
3. **Copy the entire content from `scripts/create-database.sql`**
4. **Paste and execute the script**
5. **Verify tables were created**:
   \`\`\`sql
   SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
   \`\`\`
   You should see: `orders`, `order_items`, `item_analytics`, `platform_analytics`, `customer_interactions`

## Step 2: Deploy to Vercel (10 minutes)

### Push to GitHub
\`\`\`bash
git add .
git commit -m "Tandoor Hut website with PostgreSQL analytics"
git push origin main
\`\`\`

### Deploy on Vercel
1. **Go to**: https://vercel.com/
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Add Environment Variable**:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://neondb_owner:npg_lWVQXo6YbT7M@ep-muddy-lab-aeuqg1ow-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
5. **Click "Deploy"**

## Step 3: Test Your Website (5 minutes)

### Test Cart Functionality
1. **Visit your live site** (Vercel will provide the URL)
2. **Go to `/menu` page**
3. **Add 3-4 items to cart**
4. **Open cart sidebar**
5. **Click "Order via UberEats"**
6. **You should see**: "Order TH-[timestamp] submitted successfully!"

### Test Analytics Dashboard
1. **Visit `/analytics` on your site**
2. **You should see your test order data**
3. **Check different tabs**: Popular Items, Platforms, Recent Orders, Interactions

### Verify Database Data
**In Neon SQL Editor, run**:
\`\`\`sql
-- Check orders
SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;

-- Check order items
SELECT * FROM order_items ORDER BY created_at DESC LIMIT 10;

-- Check interactions
SELECT * FROM customer_interactions ORDER BY created_at DESC LIMIT 10;

-- Check analytics
SELECT * FROM item_analytics WHERE total_orders > 0;
\`\`\`

## Step 4: Custom Domain (Optional)

1. **In Vercel Dashboard**: Go to your project → Settings → Domains
2. **Add your custom domain** (e.g., `tandoorhut.com`)
3. **Follow Vercel's DNS configuration instructions**

## What Gets Tracked

✅ **Page Views** - Every page visit  
✅ **Cart Additions** - Items added to cart  
✅ **Platform Clicks** - UberEats/DoorDash clicks  
✅ **Phone Calls** - Phone number clicks  
✅ **Complete Orders** - Full order details with items and pricing  

## Success Indicators

- ✅ Website loads without errors
- ✅ Cart functionality works (add/remove items)
- ✅ Order submission shows success message
- ✅ Analytics dashboard displays data
- ✅ Database queries return your test data
- ✅ UberEats/DoorDash links open correctly

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` environment variable in Vercel
- Check if all tables exist in Neon console
- Test connection with: `SELECT NOW();`

### Analytics Not Working
- Check browser console for JavaScript errors
- Verify API endpoints work: `/api/analytics`
- Test interaction tracking: `/api/track-interaction`

### Cart Issues
- Clear browser cache and cookies
- Check browser console for errors
- Verify cart state management is working

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify environment variables in Vercel
3. Test database connection in Neon console
4. Review deployment logs in Vercel dashboard

Your Tandoor Hut website is now live with professional analytics tracking!
\`\`\`

Perfect! I've completed the entire menu integration with PostgreSQL tracking. Here's what's now included:

## 🎯 **Complete Menu Database Integration**

### **📊 Full Menu Items Added:**
- **87 authentic menu items** from Tandoor Hut
- **9 categories**: Appetizers (Veg/Non-Veg), Tiffin, Rice, Entrees (Veg/Non-Veg), Breads & Tandoori, Chaat, Beverages & Desserts
- **Exact pricing** matching the real restaurant menu
- **Complete item details** with descriptions and spice levels

### **🗄️ Database Features:**
- All menu items pre-loaded in `item_analytics` table
- Automatic tracking when items are ordered
- Real-time popularity rankings
- Revenue tracking per item
- Category-based analytics

### **📱 Full Functionality:**
- Cart system with all menu items
- Order tracking via UberEats/DoorDash/Phone
- Analytics dashboard with real insights
- Customer interaction tracking
- Complete PostgreSQL integration

## 🚀 **Ready to Deploy:**

1. **Run the SQL script** in your Neon console
2. **Deploy to Vercel** with your DATABASE_URL
3. **Test the cart** - all 87 menu items are trackable
4. **Check analytics** at `/analytics` for real-time data

The system now tracks every menu item order with exact pricing and provides comprehensive business analytics for your restaurant!
