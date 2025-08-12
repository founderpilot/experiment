#!/bin/bash

echo "🚀 Banana Pro Dashboard - Deployment Script"
echo "============================================="

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

cd frontend

echo "📦 Installing dependencies..."
yarn install

echo "🔨 Building the application..."
yarn build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Your app is ready for deployment!"
    echo ""
    echo "📁 Build folder: frontend/build/"
    echo "📊 Bundle sizes:"
    echo "   - Main JS: $(du -h build/static/js/main.*.js | cut -f1)"
    echo "   - Main CSS: $(du -h build/static/css/main.*.css | cut -f1)"
    echo ""
    echo "🚀 Deployment Options:"
    echo "1. Netlify: Drag frontend/build/ to netlify.com"
    echo "2. Vercel: Import your repo to vercel.com"
    echo "3. GitHub Pages: Run 'yarn deploy'"
    echo "4. Local Test: Run 'serve -s build'"
    echo ""
    echo "🎯 Recommended: Start with Netlify for instant deployment!"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi 