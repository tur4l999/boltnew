#!/bin/bash

# DDA.az Figma Setup Script
# Bu skript Figma ilə inteqrasiya üçün lazım olan hər şeyi qurur

echo "🚀 DDA.az Figma Setup başlayır..."

# 1. Environment variables yoxla
if [ -z "$FIGMA_API_TOKEN" ]; then
    echo "❌ FIGMA_API_TOKEN environment variable təyin edilməyib"
    echo "💡 Figma → Settings → Personal Access Tokens-dan token yaradın"
    echo "💡 Sonra: export FIGMA_API_TOKEN=your_token_here"
    exit 1
fi

if [ -z "$FIGMA_FILE_KEY" ]; then
    echo "❌ FIGMA_FILE_KEY environment variable təyin edilməyib"
    echo "💡 Figma faylının URL-indən key-i götürün"
    echo "💡 Məsələn: https://figma.com/file/ABC123/Design → ABC123"
    echo "💡 Sonra: export FIGMA_FILE_KEY=your_file_key"
    exit 1
fi

# 2. Node.js paketlərini yükle
echo "📦 NPM paketləri yüklənir..."
npm install --save-dev @figma/plugin-typings
npm install --save-dev figma-api
npm install --save-dev html-to-figma

# 3. Figma plugin qovluğunu yarat
echo "📁 Plugin qovluğu yaradılır..."
mkdir -p figma-plugin

# 4. Package.json-a skriptlər əlavə et
echo "📝 Package.json yenilənir..."
npm pkg set scripts.figma:sync="node scripts/sync-to-figma.js"
npm pkg set scripts.figma:plugin="cd figma-plugin && figma-plugin build"
npm pkg set scripts.figma:dev="cd figma-plugin && figma-plugin dev"

# 5. .env faylını yarat (əgər yoxdursa)
if [ ! -f .env ]; then
    echo "🔧 .env faylı yaradılır..."
    cat > .env << EOF
# Figma Integration
FIGMA_API_TOKEN=your_figma_token_here
FIGMA_FILE_KEY=your_figma_file_key_here

# DDA.az App
VITE_APP_NAME=DDA.az
VITE_APP_VERSION=1.0.0
EOF
    echo "✅ .env faylı yaradıldı - tokenləri daxil edin"
else
    echo "✅ .env faylı mövcuddur"
fi

# 6. Gitignore yenilə
echo "📝 .gitignore yenilənir..."
if ! grep -q "figma-export.json" .gitignore; then
    echo "figma-export.json" >> .gitignore
fi

if ! grep -q "figma-plugin/dist" .gitignore; then
    echo "figma-plugin/dist" >> .gitignore
fi

# 7. README yenilə
echo "📚 README yenilənir..."
cat >> README.md << 'EOF'

## 🎨 Figma Integration

### Quraşdırma
1. Figma Personal Access Token yaradın
2. Environment variables təyin edin:
```bash
export FIGMA_API_TOKEN=your_token
export FIGMA_FILE_KEY=your_file_key
```

### İstifadə
```bash
# Design tokenləri sinxronlaşdır
npm run figma:sync

# Plugin development
npm run figma:dev

# Plugin build
npm run figma:plugin
```

### Avtomatik Export
- Rəng palitri
- Typography stilləri  
- Komponent strukturu
- Ekran layoutları
- Design system

EOF

echo ""
echo "🎉 Figma setup tamamlandı!"
echo ""
echo "📋 Növbəti addımlar:"
echo "1. Figma-da Personal Access Token yaradın"
echo "2. .env faylında tokenləri təyin edin"
echo "3. npm run figma:sync əmrini işə salın"
echo ""
echo "🔗 Faydalı linklər:"
echo "• Figma API: https://www.figma.com/developers/api"
echo "• Token yaratmaq: https://www.figma.com/developers/api#access-tokens"
echo "• Plugin development: https://www.figma.com/plugin-docs/"