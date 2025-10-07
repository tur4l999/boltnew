#!/bin/bash

# Deploy to GitHub Pages using docs folder
echo "🚀 Building and deploying to docs folder..."

# Build the project
npm run build:github

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Remove old docs and replace with new build
rm -rf docs
mv dist docs
touch docs/.nojekyll

# Commit and push
git add docs
git commit -m "Update GitHub Pages site - $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main

echo "✅ Deployed to docs folder!"
echo "🌐 Site: https://tur4l999.github.io/boltnew/"
echo "⚙️  Make sure GitHub Pages is set to: main branch + /docs folder"