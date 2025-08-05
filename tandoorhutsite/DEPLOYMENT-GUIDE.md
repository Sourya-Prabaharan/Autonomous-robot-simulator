# Tandoor Hut Website Deployment Guide

## Complete Step-by-Step Instructions

### Prerequisites
- GitHub account
- Vercel account
- Neon (PostgreSQL) account

---

## Step 1: Database Setup (Neon)

### 1.1 Create Neon Account
1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub or email
3. Create a new project named "tandoor-hut"

### 1.2 Run Database Script
1. In Neon dashboard, go to "SQL Editor"
2. Copy the entire content from `scripts/create-complete-database.sql`
3. Paste and execute the script
4. Verify tables are created:
   \`\`\`sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   \`\`\`

### 1.3 Get Connection String
1. In Neon dashboard, go to "Connection Details"
2. Copy the connection string (starts with `postgresql://`)
3. Save this for Vercel deployment

---

## Step 2: Code Deployment (Vercel)

### 2.1 Push to GitHub
1. Create new GitHub repository
2. Push all code to the repository:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/tandoor-hut.git
   git push -u origin main
   \`\`\`

### 2.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: Leave empty

### 2.3 Add Environment Variables
In Vercel project settings, add:
\`\`\`
DATABASE_URL=your_neon_connection_string_here
\`\`\`

### 2.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Visit your live site

---

## Step 3: Verification & Testing

### 3.1 Test Website Functionality
- [ ] Homepage loads correctly
- [ ] Navigation works (Menu, About, Contact, Catering)
- [ ] Cart functionality works
- [ ] All 87 menu items display with correct prices
- [ ] Phone and email links work
- [ ] UberEats and DoorDash links work

### 3.2 Test Database Connection
1. Visit `/analytics` page
2. Should show analytics dashboard
3. Add items to cart and verify tracking

### 3.3 Verify Menu Data
1. Go to `/menu` page
2. Check all categories load:
   - Appetizers (7 items)
   - Tandoor Specialties (9 items)
   - Chicken Entrees (10 items)
   - Lamb & Goat (9 items)
   - Seafood (5 items)
   - Vegetarian (14 items)
   - Rice & Biryani (8 items)
   - Breads (10 items)
   - Desserts & Beverages (11 items)
   - Lunch Specials (5 items)

---

## Step 4: Optional CMS Setup

### 4.1 Admin Authentication
1. Default login: `admin` / `admin123`
2. Visit `/cms/login` to access admin panel
3. **IMPORTANT**: Change default password immediately

### 4.2 Menu Management
- Add new menu items
- Update prices and descriptions
- Toggle item availability
- Manage categories

---

## Troubleshooting

### Common Issues

#### Database Connection Error
\`\`\`
Error: connect ECONNREFUSED
\`\`\`
**Solution**: Check DATABASE_URL environment variable

#### Menu Items Not Loading
\`\`\`
Error: relation "menu_items" does not exist
\`\`\`
**Solution**: Re-run the database script

#### Analytics Not Working
\`\`\`
Error: interaction_type is required
\`\`\`
**Solution**: Clear browser cache and reload

#### Build Errors
\`\`\`
Module not found: Can't resolve '@/components/ui/...'
\`\`\`
**Solution**: Ensure all shadcn/ui components are installed

### Performance Optimization
1. Enable Vercel Analytics
2. Set up caching headers
3. Optimize images
4. Monitor database queries

---

## Maintenance

### Regular Tasks
- [ ] Monitor analytics dashboard
- [ ] Update menu items and prices
- [ ] Check order tracking
- [ ] Review customer interactions
- [ ] Backup database regularly

### Updates
- Keep dependencies updated
- Monitor Vercel deployment logs
- Check Neon database performance
- Review and optimize SQL queries

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Neon database logs
3. Review browser console for errors
4. Test in incognito mode
5. Clear cache and cookies

---

## Security Notes

- Change default admin credentials
- Use strong JWT_SECRET
- Monitor database access
- Regular security updates
- Enable HTTPS (automatic with Vercel)

---

## Final Checklist

- [ ] Database created and populated
- [ ] Code deployed to Vercel
- [ ] Environment variables set
- [ ] All functionality tested
- [ ] Analytics working
- [ ] Menu items displaying correctly
- [ ] Admin access secured
- [ ] Performance optimized

Your Tandoor Hut website is now live and fully functional!
