#!/bin/bash

echo ""
echo "🔍 PROBLEM TƏHLİLİ"
echo "=================="
echo ""

# Check .env
if grep -q "VITE_USE_MOCK_BLOG_API=false" .env; then
    echo "✅ .env faylı: Düzgün (VITE_USE_MOCK_BLOG_API=false)"
else
    echo "❌ .env faylı: Problem var!"
    echo "   VITE_USE_MOCK_BLOG_API=false olmalıdır"
    exit 1
fi

if grep -q "VITE_API_BASE_URL=/api" .env; then
    echo "✅ API URL: Düzgün (/api)"
else
    echo "❌ API URL: Problem var!"
    exit 1
fi

echo ""
echo "🚨 ƏSAS PROBLEM"
echo "==============="
echo ""
echo "Default bloglar görünür çünki:"
echo ""
echo "  ❌ Dev server restart EDİLMƏYİB"
echo "  ❌ Browser cache TƏMİZLƏNMƏYİB"
echo ""
echo "Environment variables yalnız server başlayanda oxunur!"
echo ""

echo "✅ HƏLL"
echo "======="
echo ""
echo "1️⃣  Terminal-da işləyən dev server-i DAYANDIRIN:"
echo "    → Ctrl+C basın"
echo ""
echo "2️⃣  Cache təmizləyin:"
echo "    → Bu scripti işə salın:"
echo ""
echo "    rm -rf node_modules/.vite dist"
echo ""
echo "3️⃣  Server-i yenidən başladın:"
echo "    → npm run dev"
echo ""
echo "4️⃣  Browser-i TAM yeniləyin:"
echo "    → Ctrl+Shift+R (və ya Cmd+Shift+R)"
echo ""

echo "🔍 YOXLAMA"
echo "=========="
echo ""
echo "Browser Console-da (F12) görməlisiniz:"
echo ""
echo "  ============================================"
echo "  🚀 BLOG API KONFIQURASIYA"
echo "  ============================================"
echo "  USE_MOCK_API: false    ← Bu 'false' olmalı!"
echo "  ============================================"
echo "  ✅ REAL API MODE - Serverdən məlumatlar çəkiləcək"
echo "  ============================================"
echo ""

echo "📊 REAL BLOGLAR (görməlisiniz)"
echo "================================"
echo ""
echo "  ✅ Asdadadsdas"
echo "  ✅ Şüşələrinin tündləşdirilməsi"
echo "  ✅ Texniki baxış"
echo "  ✅ (cəmi 4 blog)"
echo ""

echo "❌ DEFAULT BLOGLAR (görünməməlidir)"
echo "===================================="
echo ""
echo "  ❌ Yol hərəkəti qaydalarında edilən son dəyişikliklər"
echo "  ❌ İmtahana hazırlıq üçün 5 effektiv üsul"
echo "  ❌ Sürücülər üçün qış mövsümünə hazırlaşma tövsiyələri"
echo "  (Bu 3 blog MOCK data-dır)"
echo ""

echo "🎯 Cache Təmizləmək Üçün"
echo "========================"
echo ""
echo "İndi cache təmizləyək? (y/n)"
read -r answer
if [ "$answer" = "y" ]; then
    echo ""
    echo "Cache təmizlənir..."
    rm -rf node_modules/.vite
    rm -rf dist
    echo "✅ Cache təmizləndi!"
    echo ""
    echo "İndi edin:"
    echo "  npm run dev"
    echo ""
else
    echo ""
    echo "Əl ilə edin:"
    echo "  rm -rf node_modules/.vite dist"
    echo "  npm run dev"
    echo ""
fi

echo "📖 Ətraflı məlumat: RESTART_TELIMATI.md"
echo ""
