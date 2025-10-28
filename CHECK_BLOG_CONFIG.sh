#!/bin/bash

echo "🔍 Blog API Konfiqurasiyası Yoxlanılır..."
echo ""

# Check .env file
if [ -f ".env" ]; then
    echo "✅ .env faylı tapıldı"
    echo ""
    echo "📝 Blog konfiqurasiyası:"
    grep -A 2 "Blog Module" .env || echo "❌ Blog Module konfiqurasiyası tapılmadı"
    echo ""
else
    echo "❌ .env faylı tapılmadı!"
    exit 1
fi

# Check if mock mode is enabled
if grep -q "VITE_USE_MOCK_BLOG_API=true" .env; then
    echo "✅ Mock Mode: AKTIV (Tövsiyə edilir)"
    echo "   → CORS problemi olmayacaq"
    echo "   → 3 nümunə blog görünəcək"
else
    echo "⚠️  Mock Mode: DEAKTİV"
    echo "   → Real API istifadə olunur"
    echo "   → CORS problemi ola bilər"
fi

echo ""
echo "🚀 Növbəti addımlar:"
echo "   1. npm run dev"
echo "   2. Browser-i açın: http://localhost:3000"
echo "   3. Blog bölməsinə keçin"
echo ""
echo "❓ Problem varsa:"
echo "   → BLOG_PROBLEM_HELLI.md faylını oxuyun"
echo "   → BLOG_CORS_PROBLEMI.md faylını oxuyun"
echo ""
