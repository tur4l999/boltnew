#!/bin/bash

# Automatic deployment script for GitHub Pages
# This script builds the project and pushes to GitHub

echo "🚀 Starting deployment process..."

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

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project for GitHub Pages
echo "🔨 Building project for GitHub Pages..."
npm run build:github

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

# Copy .nojekyll file to dist
echo "📄 Copying .nojekyll file..."
cp public/.nojekyll dist/

# Add all changes
echo "📝 Adding changes to git..."
git add .

# Get current timestamp
timestamp=$(date "+%Y-%m-%d %H:%M:%S")

# Commit changes
echo "💾 Committing changes..."
git commit -m "Auto-deploy: $timestamp"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Deployment completed successfully!"
    echo "🌐 Your site will be available at: https://tur4l999.github.io/boltnew/"
    echo "⏳ Please wait a few minutes for GitHub Pages to update."
else
    echo "❌ Push failed. Please check your git configuration and internet connection."
    exit 1
fi