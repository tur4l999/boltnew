#!/bin/bash

echo "🔍 Real Server Konfiqurasiyası Yoxlanılır..."
echo ""

# Check .env file
if [ -f ".env" ]; then
    echo "✅ .env faylı tapıldı"
    echo ""
    
    # Check if real API mode is enabled
    if grep -q "VITE_USE_MOCK_BLOG_API=false" .env; then
        echo "✅ Real API Mode: AKTIV"
        echo "   → Serverdən real məlumatlar çəkiləcək"
        echo ""
    else
        echo "❌ Mock Mode hələ də aktiv"
        echo "   → .env faylında VITE_USE_MOCK_BLOG_API=false olmalıdır"
        exit 1
    fi
    
    # Check API base URL
    if grep -q "VITE_API_BASE_URL=/api" .env; then
        echo "✅ API Base URL: /api (Proxy istifadə edilir)"
        echo "   → CORS problemi olmayacaq"
        echo ""
    else
        echo "⚠️  API Base URL: Proxy istifadə edilmir"
        echo "   → CORS problemi ola bilər"
    fi
    
else
    echo "❌ .env faylı tapılmadı!"
    exit 1
fi

# Check if vite.config.ts has proxy
if [ -f "vite.config.ts" ]; then
    if grep -q "proxy:" vite.config.ts; then
        echo "✅ Vite Proxy: Konfiqurasiya edilib"
        echo "   → /api → http://manager.test-domain.co/az/api"
        echo ""
    else
        echo "❌ Vite Proxy: Tapılmadı"
        exit 1
    fi
fi

echo "🚀 Növbəti addımlar:"
echo ""
echo "   1. Server-i dayandırın (Ctrl+C)"
echo "   2. npm run dev"
echo "   3. Browser-i açın: http://localhost:3000"
echo "   4. Blog bölməsinə keçin"
echo "   5. F12 → Console-da log-lara baxın"
echo ""
echo "🔍 Console-da görməlisiniz:"
echo "   [Blog API] Configuration: { USE_MOCK_API: false }"
echo "   [Blog API] Fetching blogs from: /api/blogs/"
echo "   [Blog API] Blogs response status: 200"
echo ""
echo "📝 Real serverdən gələn bloglar:"
echo "   - Şüşələrinin tündləşdirilməsi"
echo "   - Texniki baxış"
echo "   - və digər real bloglar"
echo ""
echo "❓ Problem varsa:"
echo "   → REAL_SERVER_TELIMAT.md faylını oxuyun"
echo "   → Console log-larını yoxlayın"
echo "   → Network tab-ında sorğulara baxın"
echo ""
