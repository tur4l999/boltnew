#!/bin/bash

# GitHub Pages deployment script
# This ensures your site is always properly deployed

echo "🚀 Starting deployment to GitHub Pages..."

# Check if we're in a git repo
if [ ! -d ".git" ]; then
    echo "❌ Error: Not a git repository"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building project for production..."
npm run build:github

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed - dist directory not found"
    exit 1
fi

# Add .nojekyll file
echo "📄 Adding .nojekyll file..."
touch dist/.nojekyll

# Deploy to gh-pages branch
echo "🚀 Deploying to gh-pages branch..."
npx gh-pages -d dist --dotfiles -m "Deploy $(date +'%Y-%m-%d %H:%M:%S')"

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your site will be available at: https://tur4l999.github.io/boltnew/"
    echo "⏳ Please wait 2-5 minutes for changes to appear"
else
    echo "❌ Deployment failed"
    exit 1
fi