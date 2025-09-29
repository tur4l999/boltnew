#!/bin/bash

# Force deployment script for GitHub Pages
# This script ensures immediate deployment after PR merge

echo "🚀 Force deploying to GitHub Pages..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Not a git repository. Please initialize git first."
    exit 1
fi

# Make sure we're on main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  Warning: You're not on main branch (current: $current_branch)"
    echo "🔄 Switching to main branch..."
    git checkout main
    git pull origin main
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Clean and build the project
echo "🧹 Cleaning previous build..."
rm -rf dist

echo "🔨 Building project for GitHub Pages..."
npm run build:github

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

# Ensure .nojekyll file exists
echo "📄 Ensuring .nojekyll file exists..."
if [ -f "public/.nojekyll" ]; then
    cp public/.nojekyll dist/
else
    touch dist/.nojekyll
fi

# Create a commit to trigger GitHub Actions
echo "📝 Creating deployment commit..."
git add .
git commit -m "Force deploy: $(date '+%Y-%m-%d %H:%M:%S')" --allow-empty

# Push to trigger GitHub Actions
echo "🚀 Pushing to trigger GitHub Actions..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Force deployment triggered successfully!"
    echo "🌐 Your site will be available at: https://tur4l999.github.io/boltnew/"
    echo "⏳ Please wait 2-3 minutes for GitHub Actions to complete the deployment."
    echo "🔍 You can check the deployment status at: https://github.com/tur4l999/boltnew/actions"
else
    echo "❌ Push failed. Please check your git configuration and internet connection."
    exit 1
fi