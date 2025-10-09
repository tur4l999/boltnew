#!/bin/bash

# Quick deployment script for GitHub Pages
# This ensures your changes are always deployed correctly

echo "🚀 Starting quick deployment..."

# 1. Add all changes
git add -A

# 2. Commit changes
echo "💬 Enter commit message (or press Enter for default):"
read commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update site - $(date +'%Y-%m-%d %H:%M:%S')"
fi
git commit -m "$commit_msg"

# 3. Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

# 4. Build project
echo "🔨 Building project..."
npm run build:github

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# 5. Deploy to docs folder
echo "📁 Deploying to docs folder..."
rm -rf docs
mv dist docs
touch docs/.nojekyll

# 6. Commit and push docs
git add docs
git commit -m "Deploy: $commit_msg"
git push origin main

echo "✅ Deployment complete!"
echo "🌐 Your site will be updated at: https://tur4l999.github.io/boltnew/"
echo "⏳ Please wait 2-5 minutes for changes to appear"
echo ""
echo "🔥 TIP: If you see a white page, clear your browser cache (Ctrl+F5)"