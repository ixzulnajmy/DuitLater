#!/bin/bash

echo "🔄 DuitLater - Sync & Status Check"
echo "=================================="
echo ""

# Check if we're in a git repo
if [ ! -d .git ]; then
    echo "❌ Not in a git repository"
    exit 1
fi

# Fetch latest changes
echo "📡 Fetching latest changes..."
git fetch origin

# Show current branch
echo ""
echo "📍 Current branch:"
git branch --show-current

# Show status
echo ""
echo "📊 Git status:"
git status

# Show last 5 commits
echo ""
echo "📜 Last 5 commits:"
git log --oneline -5

# Check if there are changes to pull
echo ""
echo "🔍 Checking for updates..."
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})

if [ $LOCAL = $REMOTE ]; then
    echo "✅ Already up to date"
else
    echo "⚠️  Updates available. Pull now? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "🔄 Pulling changes..."
        git pull origin main
        echo ""
        echo "📦 Installing/updating dependencies..."
        npm install
    fi
fi

echo ""
echo "✨ Sync complete!"
