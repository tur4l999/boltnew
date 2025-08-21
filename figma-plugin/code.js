// DDA.az Figma Plugin - TAM DETALLI VERSİYA
figma.showUI(__html__, { width: 500, height: 800 });

// Tam design data - bütün səhifələr və elementlər
const designData = {
  colors: {
    primary: {
      50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80",
      500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d"
    },
    gray: {
      50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af",
      500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827"
    },
    emerald: {
      50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399",
      500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b"
    },
    red: {
      50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171",
      500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d"
    },
    blue: {
      50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa",
      500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a"
    }
  },
  
  // BÜTÜN EKRANLAR - 40+ səhifə
  screens: [
    // 🔐 AUTHENTICATION FLOW
    { 
      name: "01. Login Screen", 
      width: 375, height: 812, 
      category: "Auth",
      elements: [
        { type: "logo", text: "DDA", x: 157, y: 150, w: 60, h: 60, bg: "#22c55e" },
        { type: "title", text: "DDA.az", x: 0, y: 230, w: 375, h: 40, size: 32 },
        { type: "subtitle", text: "Sürücülük vəsiqəsi üçün hazırlıq", x: 0, y: 270, w: 375, h: 20, size: 16 },
        { type: "input", text: "E-mail", x: 40, y: 350, w: 295, h: 50, bg: "#ffffff" },
        { type: "input", text: "Şifrə", x: 40, y: 420, w: 295, h: 50, bg: "#ffffff" },
        { type: "button", text: "Daxil ol", x: 40, y: 500, w: 295, h: 50, bg: "#22c55e" },
        { type: "text", text: "Google ilə daxil ol", x: 40, y: 580, w: 295, h: 50, bg: "#ffffff" },
        { type: "text", text: "Apple ilə daxil ol", x: 40, y: 640, w: 295, h: 50, bg: "#000000" }
      ]
    },

    // 🏠 MAIN FLOW - PAKET YOXDUR
    { 
      name: "02. Home (No Package)", 
      width: 375, height: 812, 
      category: "Main - No Package",
      elements: [
        { type: "header", text: "Salam, Tural Qarayev 👋", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "alert", text: "📦 Aktiv paketiniz yoxdur - Paket al", x: 20, y: 100, w: 335, h: 60, bg: "#dbeafe" },
        { type: "card", text: "İrəliləyiş: 42%", x: 20, y: 180, w: 335, h: 80, bg: "#ffffff" },
        { type: "grid", text: "🎬 3D video dərs", x: 20, y: 280, w: 160, h: 100, bg: "#ffffff" },
        { type: "grid", text: "📝 Sürətli test", x: 195, y: 280, w: 160, h: 100, bg: "#ffffff" },
        { type: "grid", text: "📚 Təlim mövzuları", x: 20, y: 395, w: 160, h: 100, bg: "#ffffff" },
        { type: "grid", text: "🧪 İmtahan", x: 195, y: 395, w: 160, h: 100, bg: "#ffffff" },
        { type: "grid", text: "⚠️ Səhvlərim", x: 20, y: 510, w: 160, h: 100, bg: "#ffffff" },
        { type: "grid", text: "💬 Praktiki təcrübə", x: 195, y: 510, w: 160, h: 100, bg: "#ffffff" },
        { type: "tabbar", text: "🏠 Ana | 📚 Təlimlər | 🧪 İmtahan | 🛍️ Mağaza | ➕ Daha çox", x: 0, y: 732, w: 375, h: 80, bg: "#ffffff" }
      ]
    },

    { 
      name: "03. Topics (Locked)", 
      width: 375, height: 812, 
      category: "Main - No Package",
      elements: [
        { type: "header", text: "Təlim Mövzuları", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "alert", text: "📦 Paket alın və bütün təlimləri açın - Paket al", x: 20, y: 100, w: 335, h: 60, bg: "#dbeafe" },
        { type: "search", text: "Mövzu seç", x: 20, y: 180, w: 335, h: 50, bg: "#ffffff" },
        { type: "module", text: "🔒 M1: Traffic Rules & Safety - Kilidli", x: 20, y: 250, w: 335, h: 80, bg: "#f9fafb" },
        { type: "module", text: "🔒 M2: Road Signs - Kilidli", x: 20, y: 340, w: 335, h: 80, bg: "#f9fafb" },
        { type: "module", text: "🔓 M8: Free Module - Dərsə başla", x: 20, y: 430, w: 335, h: 80, bg: "#ecfdf5" },
        { type: "module", text: "🔒 M10: Advanced Rules - Kilidli", x: 20, y: 520, w: 335, h: 80, bg: "#f9fafb" },
        { type: "module", text: "🔓 M11: Free Module - Dərsə başla", x: 20, y: 610, w: 335, h: 80, bg: "#ecfdf5" },
        { type: "tabbar", text: "🏠 Ana | 📚 Təlimlər | 🧪 İmtahan | 🛍️ Mağaza | ➕ Daha çox", x: 0, y: 732, w: 375, h: 80, bg: "#ffffff" }
      ]
    },

    { 
      name: "04. Store", 
      width: 375, height: 812, 
      category: "Main - No Package",
      elements: [
        { type: "header", text: "Mağaza", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "subtitle", text: "Sürücülük kitabları və materialları", x: 0, y: 90, w: 375, h: 30, size: 14 },
        { type: "product", text: "Yol Hərəkəti Qaydaları\n12 AZN", x: 20, y: 140, w: 160, h: 200, bg: "#ffffff" },
        { type: "product", text: "Yol Nişanları Atlası\n8 AZN", x: 195, y: 140, w: 160, h: 200, bg: "#ffffff" },
        { type: "product", text: "Sürücülük Təcrübəsi\n15 AZN", x: 20, y: 360, w: 160, h: 200, bg: "#ffffff" },
        { type: "product", text: "İmtahan Hazırlığı\n10 AZN", x: 195, y: 360, w: 160, h: 200, bg: "#ffffff" },
        { type: "payment", text: "💳 Kart | 📱 Mobil | 🏦 Bank", x: 20, y: 580, w: 335, h: 80, bg: "#ffffff" },
        { type: "tabbar", text: "🏠 Ana | 📚 Təlimlər | 🧪 İmtahan | 🛍️ Mağaza | ➕ Daha çox", x: 0, y: 732, w: 375, h: 80, bg: "#ffffff" }
      ]
    },

    { 
      name: "05. More Menu", 
      width: 375, height: 812, 
      category: "Main - No Package",
      elements: [
        { type: "header", text: "Daha çox | Balans: 100 AZN | Bilet: 3", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "menu", text: "📦 Təlim paketləri", x: 20, y: 100, w: 335, h: 60, bg: "#ffffff" },
        { type: "menu", text: "💰 Daxili balans", x: 20, y: 170, w: 335, h: 60, bg: "#ffffff" },
        { type: "menu", text: "🏆 Şəhadətnamə almaq", x: 20, y: 240, w: 335, h: 60, bg: "#ffffff" },
        { type: "menu", text: "🚗 Praktiki təcrübə", x: 20, y: 310, w: 335, h: 60, bg: "#ffffff" },
        { type: "menu", text: "⚠️ Səhvlərim", x: 20, y: 380, w: 335, h: 60, bg: "#ffffff" },
        { type: "menu", text: "❓ Sual-cavab", x: 20, y: 450, w: 335, h: 60, bg: "#ffffff" },
        { type: "menu", text: "📝 Apellyasiyalarım", x: 20, y: 520, w: 335, h: 60, bg: "#ffffff" },
        { type: "menu", text: "🔔 Bildirişlər", x: 20, y: 590, w: 335, h: 60, bg: "#ffffff" },
        { type: "tabbar", text: "🏠 Ana | 📚 Təlimlər | 🧪 İmtahan | 🛍️ Mağaza | ➕ Daha çox", x: 0, y: 732, w: 375, h: 80, bg: "#ffffff" }
      ]
    },

    // 💳 PURCHASE FLOW
    { 
      name: "06. Packages List", 
      width: 375, height: 812, 
      category: "Purchase Flow",
      elements: [
        { type: "header", text: "← Təlim Paketləri", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "balance", text: "Balans: 100 AZN", x: 0, y: 90, w: 375, h: 40, bg: "#22c55e" },
        { type: "package", text: "Sadə Paket\n15 AZN - 30 gün\n• 3D video dərslər\n• Test simulyatoru", x: 20, y: 150, w: 335, h: 150, bg: "#f9fafb" },
        { type: "package", text: "⭐ Standart Paket\n25 AZN - 45 gün\n• Sadə paketdəki hər şey\n• Əlavə imtahan biletləri", x: 20, y: 320, w: 335, h: 150, bg: "#ecfdf5" },
        { type: "package", text: "Premium Paket\n40 AZN - 60 gün\n• Standart paketdəki hər şey\n• Şəhadətnamə", x: 20, y: 490, w: 335, h: 150, bg: "#eff6ff" },
        { type: "payment", text: "💳 Kart | 📱 Mobil | 🏦 Bank", x: 20, y: 660, w: 335, h: 60, bg: "#ffffff" }
      ]
    },

    { 
      name: "07. Package Details", 
      width: 375, height: 812, 
      category: "Purchase Flow",
      elements: [
        { type: "header", text: "← Standart Paket", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "price", text: "25 AZN\n45 gün müddətinə", x: 0, y: 100, w: 375, h: 80, bg: "#ecfdf5" },
        { type: "duration", text: "30 gün | 45 gün | 60 gün", x: 20, y: 200, w: 335, h: 50, bg: "#ffffff" },
        { type: "features", text: "✓ 3D video dərslər\n✓ Dərs materialları\n✓ Mövzu üzrə testlər\n✓ İmtahan simulyatoru\n✓ Müəllimlə sual-cavab", x: 20, y: 270, w: 335, h: 200, bg: "#ffffff" },
        { type: "button", text: "🚀 Paketi Al - 25 AZN", x: 20, y: 500, w: 335, h: 60, bg: "#22c55e" },
        { type: "payment", text: "💳 Kart | 📱 Mobil | 🏦 Bank", x: 20, y: 580, w: 335, h: 80, bg: "#ffffff" }
      ]
    },

    { 
      name: "08. Payment Methods", 
      width: 375, height: 812, 
      category: "Purchase Flow",
      elements: [
        { type: "header", text: "← Ödəniş", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "summary", text: "Standart Paket\n25 AZN - 45 gün", x: 20, y: 100, w: 335, h: 80, bg: "#ecfdf5" },
        { type: "payment", text: "💳 Bank Kartı", x: 20, y: 200, w: 335, h: 60, bg: "#ffffff" },
        { type: "payment", text: "📱 Mobil Ödəniş", x: 20, y: 280, w: 335, h: 60, bg: "#ffffff" },
        { type: "payment", text: "🏦 Bank Köçürməsi", x: 20, y: 360, w: 335, h: 60, bg: "#ffffff" },
        { type: "payment", text: "💰 Daxili Balans (100 AZN)", x: 20, y: 440, w: 335, h: 60, bg: "#ecfdf5" },
        { type: "button", text: "Ödənişi Tamamla", x: 20, y: 520, w: 335, h: 60, bg: "#22c55e" },
        { type: "security", text: "🔒 Təhlükəsiz ödəniş | ⚡ Ani aktivləşmə", x: 20, y: 600, w: 335, h: 40, bg: "#f9fafb" }
      ]
    },

    { 
      name: "09. Purchase Success", 
      width: 375, height: 812, 
      category: "Purchase Flow",
      elements: [
        { type: "success", text: "🎉", x: 157, y: 200, w: 60, h: 60, bg: "#ecfdf5" },
        { type: "title", text: "Uğurlu Alış!", x: 0, y: 280, w: 375, h: 40, size: 24 },
        { type: "subtitle", text: "Standart Paket aktivləşdirildi", x: 0, y: 320, w: 375, h: 30, size: 16 },
        { type: "details", text: "Paket: Standart Paket\nMüddət: 45 gün\nBitmə tarixi: 05.10.2025", x: 20, y: 380, w: 335, h: 100, bg: "#ffffff" },
        { type: "button", text: "Ana Səhifəyə Qayıt", x: 20, y: 500, w: 335, h: 60, bg: "#22c55e" },
        { type: "button", text: "Təlimləri Görüntülə", x: 20, y: 580, w: 335, h: 60, bg: "#f3f4f6" }
      ]
    },

    // ⭐ PREMIUM FLOW - PAKET VAR
    { 
      name: "10. Home (With Package)", 
      width: 375, height: 812, 
      category: "Premium Flow",
      elements: [
        { type: "header", text: "Salam, Tural Qarayev 👋", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "premium", text: "👑 Premium üzv - Bütün funksiyalar aktiv\nStandart Paket • Bitmə: 05.10.2025", x: 20, y: 100, w: 335, h: 80, bg: "#ecfdf5" },
        { type: "card", text: "İrəliləyiş: 42%", x: 20, y: 200, w: 335, h: 80, bg: "#ffffff" },
        { type: "grid", text: "🎬 3D video dərs", x: 20, y: 300, w: 160, h: 100, bg: "#ffffff" },
        { type: "grid", text: "📝 Sürətli test", x: 195, y: 300, w: 160, h: 100, bg: "#ffffff" },
        { type: "grid", text: "📚 Təlim mövzuları", x: 20, y: 415, w: 160, h: 100, bg: "#ffffff" },
        { type: "grid", text: "🧪 İmtahan", x: 195, y: 415, w: 160, h: 100, bg: "#ffffff" },
        { type: "grid", text: "⚠️ Səhvlərim", x: 20, y: 530, w: 160, h: 100, bg: "#ffffff" },
        { type: "grid", text: "💬 Praktiki təcrübə", x: 195, y: 530, w: 160, h: 100, bg: "#ffffff" },
        { type: "tabbar", text: "🏠 Ana | 📚 Təlimlər | 🧪 İmtahan | 🛍️ Mağaza | ➕ Daha çox", x: 0, y: 732, w: 375, h: 80, bg: "#ffffff" }
      ]
    },

    { 
      name: "11. Topics (Unlocked)", 
      width: 375, height: 812, 
      category: "Premium Flow",
      elements: [
        { type: "header", text: "Təlim Mövzuları", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "premium", text: "🔓 Bütün təlimlər açıq - Standart Paket\nBitmə tarixi: 05.10.2025", x: 20, y: 100, w: 335, h: 60, bg: "#ecfdf5" },
        { type: "search", text: "Mövzu seç", x: 20, y: 180, w: 335, h: 50, bg: "#ffffff" },
        { type: "module", text: "🔓 M1: Traffic Rules & Safety - Dərsə başla", x: 20, y: 250, w: 335, h: 80, bg: "#ecfdf5" },
        { type: "module", text: "🔓 M2: Road Signs - Dərsə başla", x: 20, y: 340, w: 335, h: 80, bg: "#ecfdf5" },
        { type: "module", text: "🔓 M8: Free Module - Dərsə başla", x: 20, y: 430, w: 335, h: 80, bg: "#ecfdf5" },
        { type: "module", text: "🔓 M10: Advanced Rules - Dərsə başla", x: 20, y: 520, w: 335, h: 80, bg: "#ecfdf5" },
        { type: "module", text: "🔓 M11: Free Module - Dərsə başla", x: 20, y: 610, w: 335, h: 80, bg: "#ecfdf5" },
        { type: "tabbar", text: "🏠 Ana | 📚 Təlimlər | 🧪 İmtahan | 🛍️ Mağaza | ➕ Daha çox", x: 0, y: 732, w: 375, h: 80, bg: "#ffffff" }
      ]
    },

    // 📚 LEARNING FLOW
    { 
      name: "12. Lesson View", 
      width: 375, height: 812, 
      category: "Learning Flow",
      elements: [
        { type: "header", text: "← M8: Yol nişanları", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "dropdown", text: "M8: Yol nişanları ▼", x: 20, y: 100, w: 335, h: 50, bg: "#ffffff" },
        { type: "tabs", text: "Maddə | 3D video | Video dərs | Konspekt", x: 20, y: 170, w: 335, h: 50, bg: "#f3f4f6" },
        { type: "video", text: "🎬 Video Player\nUID-1234 • 21.08.2025", x: 20, y: 240, w: 335, h: 200, bg: "#000000" },
        { type: "controls", text: "📱 Offline saxla | 💬 Sualını qeyd et", x: 20, y: 460, w: 335, h: 40, bg: "#f9fafb" },
        { type: "button", text: "📝 Suallar", x: 20, y: 520, w: 160, h: 60, bg: "#22c55e" },
        { type: "button", text: "🧪 İmtahana başla", x: 195, y: 520, w: 160, h: 60, bg: "#22c55e" }
      ]
    },

    { 
      name: "13. Video Player", 
      width: 375, height: 812, 
      category: "Learning Flow",
      elements: [
        { type: "video", text: "🎬 Full Screen Video\n⏪ ⏩ 🖼️\nUID-1234 • 21.08.2025", x: 0, y: 0, w: 375, h: 812, bg: "#000000" },
        { type: "controls", text: "⏯️ ⏪ ⏩ 🔊 ⚙️", x: 20, y: 720, w: 335, h: 60, bg: "rgba(0,0,0,0.5)" }
      ]
    },

    { 
      name: "14. Practice Questions", 
      width: 375, height: 812, 
      category: "Learning Flow",
      elements: [
        { type: "header", text: "← Məşq Sualları", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "progress", text: "1/5", x: 20, y: 100, w: 335, h: 30, bg: "#f9fafb" },
        { type: "question", text: "Sarı işıq gördükdə sürücü nə etməlidir?", x: 20, y: 150, w: 335, h: 60, bg: "#ffffff" },
        { type: "image", text: "🚦 Sual şəkli", x: 20, y: 230, w: 335, h: 150, bg: "#f3f4f6" },
        { type: "option", text: "○ Sürəti artırıb keçmək", x: 20, y: 400, w: 335, h: 50, bg: "#ffffff" },
        { type: "option", text: "● Yavaşlayıb dayanmağa hazırlaşmaq", x: 20, y: 460, w: 335, h: 50, bg: "#ecfdf5" },
        { type: "option", text: "○ Dərhal dayanmaq", x: 20, y: 520, w: 335, h: 50, bg: "#ffffff" },
        { type: "option", text: "○ Siqnal vermək", x: 20, y: 580, w: 335, h: 50, bg: "#ffffff" },
        { type: "button", text: "Cavabı təsdiq et", x: 20, y: 650, w: 335, h: 50, bg: "#22c55e" }
      ]
    },

    { 
      name: "15. Teacher Contact", 
      width: 375, height: 812, 
      category: "Learning Flow",
      elements: [
        { type: "header", text: "← Sualını qeyd et", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "form", text: "Sualınızı yazın...", x: 20, y: 100, w: 335, h: 100, bg: "#ffffff" },
        { type: "button", text: "Sual göndər", x: 20, y: 220, w: 335, h: 50, bg: "#22c55e" },
        { type: "comment", text: "A Aynur Məmmədova\n\"Bu nişanın mənası nədir?\"\n✅ Müəllim Rəşad: Bu nişan \"Dayanmaq qadağandır\"...", x: 20, y: 290, w: 335, h: 120, bg: "#ffffff" },
        { type: "comment", text: "E Elvin Qasımov\n\"Dairəvi hərəkətdə hansı qaydalar var?\"\n✅ Müəllim Səbinə: Dairəvi hərəkətdə əsas qayda...", x: 20, y: 430, w: 335, h: 120, bg: "#ffffff" },
        { type: "comment", text: "N Nigar Əliyeva\n\"Gecə vaxtı işıqlandırma qaydaları necədir?\"\n⏳ Cavab gözlənilir...", x: 20, y: 570, w: 335, h: 100, bg: "#ffffff" }
      ]
    },

    // 🧪 EXAM FLOW
    { 
      name: "16. Exam Config", 
      width: 375, height: 812, 
      category: "Exam Flow",
      elements: [
        { type: "header", text: "← İmtahan Tənzimləmələri", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "card", text: "İmtahan növü\n○ Mövzu üzrə\n● Qarışıq", x: 20, y: 100, w: 335, h: 100, bg: "#ffffff" },
        { type: "card", text: "Sual sayı\n○ 10 sual\n● 20 sual\n○ 30 sual", x: 20, y: 220, w: 335, h: 120, bg: "#ffffff" },
        { type: "card", text: "Vaxt məhdudiyyəti\n● 20 dəqiqə\n○ 30 dəqiqə\n○ Məhdudiyyətsiz", x: 20, y: 360, w: 335, h: 120, bg: "#ffffff" },
        { type: "button", text: "🧪 İmtahan Simulyatoru", x: 20, y: 500, w: 335, h: 60, bg: "#22c55e" },
        { type: "button", text: "📋 Yekun imtahan", x: 20, y: 580, w: 335, h: 60, bg: "#6b7280" }
      ]
    },

    { 
      name: "17. Exam Running", 
      width: 375, height: 812, 
      category: "Exam Flow",
      elements: [
        { type: "header", text: "← İmtahan simulyatoru | ⏱️ 14:34", x: 0, y: 0, w: 375, h: 80, bg: "#1f2937" },
        { type: "grid", text: "Sual 1\n✓", x: 20, y: 100, w: 160, h: 120, bg: "#22c55e" },
        { type: "grid", text: "Sual 2\n?", x: 195, y: 100, w: 160, h: 120, bg: "#6b7280" },
        { type: "grid", text: "Sual 3\n?", x: 20, y: 240, w: 160, h: 120, bg: "#6b7280" },
        { type: "grid", text: "Sual 4\n?", x: 195, y: 240, w: 160, h: 120, bg: "#6b7280" },
        { type: "question", text: "2. Piyadalara nə vaxt yol vermək lazımdır?", x: 20, y: 380, w: 335, h: 60, bg: "#ffffff" },
        { type: "option", text: "○ Heç vaxt", x: 20, y: 460, w: 335, h: 50, bg: "#ffffff" },
        { type: "option", text: "● Həmişə, bütün piyada keçidlərində", x: 20, y: 520, w: 335, h: 50, bg: "#ecfdf5" },
        { type: "option", text: "○ Yalnız gecələr", x: 20, y: 580, w: 335, h: 50, bg: "#ffffff" },
        { type: "button", text: "Sonrakı", x: 195, y: 650, w: 160, h: 50, bg: "#22c55e" }
      ]
    },

    { 
      name: "18. Exam Results (Pass)", 
      width: 375, height: 812, 
      category: "Exam Flow",
      elements: [
        { type: "header", text: "← İmtahan Nəticəsi", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "score", text: "Sənin balın\n18/20", x: 0, y: 150, w: 375, h: 100, bg: "#ecfdf5" },
        { type: "result", text: "🎉 Keçdin!", x: 0, y: 270, w: 375, h: 60, bg: "#22c55e" },
        { type: "stats", text: "Vaxt: 12 dəqiqə 45 saniyə\nDüzgün cavablar: 18\nSəhv cavablar: 2", x: 20, y: 350, w: 335, h: 100, bg: "#ffffff" },
        { type: "weak", text: "Zəif mövzular:\nM8 (nişanlar), M5 (dairəvi)", x: 20, y: 470, w: 335, h: 80, bg: "#ffffff" },
        { type: "button", text: "Səhvlərimi işlət", x: 20, y: 570, w: 160, h: 50, bg: "#22c55e" },
        { type: "button", text: "Yenidən", x: 195, y: 570, w: 160, h: 50, bg: "#f3f4f6" }
      ]
    },

    { 
      name: "19. Exam Results (Fail)", 
      width: 375, height: 812, 
      category: "Exam Flow",
      elements: [
        { type: "header", text: "← İmtahan Nəticəsi", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "score", text: "Sənin balın\n12/20", x: 0, y: 150, w: 375, h: 100, bg: "#fef2f2" },
        { type: "result", text: "❌ Keçmədin", x: 0, y: 270, w: 375, h: 60, bg: "#ef4444" },
        { type: "stats", text: "Vaxt: 18 dəqiqə 23 saniyə\nDüzgün cavablar: 12\nSəhv cavablar: 8", x: 20, y: 350, w: 335, h: 100, bg: "#ffffff" },
        { type: "weak", text: "Zəif mövzular:\nM1 (qaydalar), M3 (nişanlar), M7 (sürət)", x: 20, y: 470, w: 335, h: 80, bg: "#ffffff" },
        { type: "button", text: "Səhvlərimi işlət", x: 20, y: 570, w: 160, h: 50, bg: "#ef4444" },
        { type: "button", text: "Yenidən", x: 195, y: 570, w: 160, h: 50, bg: "#f3f4f6" }
      ]
    },

    { 
      name: "20. Mistakes Review", 
      width: 375, height: 812, 
      category: "Exam Flow",
      elements: [
        { type: "header", text: "← Səhv verdiyim suallar", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "mistake", text: "❌ Sual 3: Sarı işıq gördükdə...\n✅ Düzgün cavab: Yavaşlayıb dayanmağa hazırlaşmaq\n📖 İzah: Sarı işıqlar sürücüləri təhlükəsiz...", x: 20, y: 100, w: 335, h: 120, bg: "#fef2f2" },
        { type: "mistake", text: "❌ Sual 7: Dairəvi hərəkətdə kim...\n✅ Düzgün cavab: İçəridə olan nəqliyyat vasitəsi\n📖 İzah: Standart qayda: dairəvi hərəkətdə...", x: 20, y: 240, w: 335, h: 120, bg: "#fef2f2" },
        { type: "mistake", text: "❌ Sual 12: Maksimum sürət şəhərdə...\n✅ Düzgün cavab: 60 km/saat\n📖 İzah: Şəhər daxilində maksimum sürət...", x: 20, y: 380, w: 335, h: 120, bg: "#fef2f2" },
        { type: "button", text: "Bu mövzuları təkrar et", x: 20, y: 520, w: 335, h: 50, bg: "#22c55e" },
        { type: "button", text: "Səhvləri təmizlə", x: 20, y: 590, w: 335, h: 50, bg: "#f3f4f6" }
      ]
    },

    // 🤖 SUPPORT FLOW
    { 
      name: "21. AI Chat", 
      width: 375, height: 812, 
      category: "Support Flow",
      elements: [
        { type: "header", text: "← 🤖 DDA.az AI Köməkçi • ● Onlayn", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "message", text: "🤖 Salam! Mən DDA.az AI köməkçisiyəm. Sürücülük qaydaları və imtahan hazırlığı ilə bağlı suallarınızı verə bilərsiniz.", x: 20, y: 100, w: 280, h: 80, bg: "#f3f4f6" },
        { type: "message", text: "👤 Yol nişanlarının növləri hansılardır?", x: 75, y: 200, w: 280, h: 50, bg: "#22c55e" },
        { type: "message", text: "🤖 Yol nişanları 4 əsas qrupa bölünür: xəbərdarlıq, qadağan, məcburi və məlumat nişanları.", x: 20, y: 270, w: 280, h: 80, bg: "#f3f4f6" },
        { type: "message", text: "👤 Dairəvi hərəkətdə kim üstünlük hüququna malikdir?", x: 75, y: 370, w: 280, h: 60, bg: "#22c55e" },
        { type: "typing", text: "🤖 ● ● ● yazır...", x: 20, y: 450, w: 100, h: 30, bg: "#f3f4f6" },
        { type: "input", text: "Sualınızı yazın... | Göndər", x: 20, y: 732, w: 335, h: 60, bg: "#ffffff" }
      ]
    },

    { 
      name: "22. Chat History", 
      width: 375, height: 812, 
      category: "Support Flow",
      elements: [
        { type: "sidebar", text: "📂 Söhbət Tarixçəsi\n+ Yeni söhbət\n\n📝 Yol nişanları haqqında\n2 saat əvvəl\n\n🚗 Dairəvi hərəkət qaydaları\n1 gün əvvəl\n\n⚡ Sürət məhdudiyyətləri\n3 gün əvvəl", x: 0, y: 0, w: 280, h: 812, bg: "#ffffff" },
        { type: "chat", text: "🤖 DDA.az AI Köməkçi\n\n👤 Yol nişanlarının növləri hansılardır?\n\n🤖 Yol nişanları 4 əsas qrupa bölünür...", x: 280, y: 0, w: 95, h: 812, bg: "#f9fafb" }
      ]
    },

    // 👤 PROFILE FLOW
    { 
      name: "23. Settings", 
      width: 375, height: 812, 
      category: "Profile Flow",
      elements: [
        { type: "header", text: "← Parametrlər", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "profile", text: "T Tural Qarayev\ntural.qarayev@example.com\nBalans: 75 AZN | Paket: Standart Paket", x: 20, y: 100, w: 335, h: 100, bg: "#ffffff" },
        { type: "section", text: "Tema\n☀️ Gündüz | 🌙 Gecə | ● 📱 Cihaza uyğun", x: 20, y: 220, w: 335, h: 80, bg: "#ffffff" },
        { type: "section", text: "Dil\n● 🇦🇿 Azərbaycan dili | 🇷🇺 Русский язык", x: 20, y: 320, w: 335, h: 80, bg: "#ffffff" },
        { type: "menu", text: "👤 Profil məlumatları", x: 20, y: 420, w: 335, h: 50, bg: "#ffffff" },
        { type: "menu", text: "🔒 Təhlükəsizlik", x: 20, y: 480, w: 335, h: 50, bg: "#ffffff" },
        { type: "menu", text: "🔔 Bildirişlər", x: 20, y: 540, w: 335, h: 50, bg: "#ffffff" },
        { type: "menu", text: "❓ Kömək mərkəzi", x: 20, y: 600, w: 335, h: 50, bg: "#ffffff" },
        { type: "logout", text: "🚪 Hesabdan çıx", x: 20, y: 670, w: 335, h: 50, bg: "#fef2f2" }
      ]
    },

    { 
      name: "24. Profile Edit", 
      width: 375, height: 812, 
      category: "Profile Flow",
      elements: [
        { type: "header", text: "← Profil məlumatları", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "avatar", text: "T", x: 157, y: 120, w: 60, h: 60, bg: "#22c55e" },
        { type: "input", text: "Ad: Tural", x: 20, y: 200, w: 335, h: 50, bg: "#ffffff" },
        { type: "input", text: "Soyad: Qarayev", x: 20, y: 270, w: 335, h: 50, bg: "#ffffff" },
        { type: "input", text: "E-mail: tural.qarayev@example.com", x: 20, y: 340, w: 335, h: 50, bg: "#ffffff" },
        { type: "input", text: "Telefon: +994 XX XXX XX XX", x: 20, y: 410, w: 335, h: 50, bg: "#ffffff" },
        { type: "input", text: "Doğum tarixi: 15.03.1995", x: 20, y: 480, w: 335, h: 50, bg: "#ffffff" },
        { type: "button", text: "Yadda saxla", x: 20, y: 550, w: 335, h: 50, bg: "#22c55e" },
        { type: "button", text: "Şifrəni dəyiş", x: 20, y: 620, w: 335, h: 50, bg: "#f3f4f6" }
      ]
    },

    { 
      name: "25. Transactions", 
      width: 375, height: 812, 
      category: "Profile Flow",
      elements: [
        { type: "header", text: "← Daxili Balans", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "balance", text: "Cari Balans\n75 AZN\n💳 Balans artır", x: 0, y: 100, w: 375, h: 100, bg: "#ecfdf5" },
        { type: "title", text: "Ödənişlər Tarixçəsi", x: 20, y: 220, w: 335, h: 30, bg: "#ffffff" },
        { type: "transaction", text: "📦 Standart Paket (45 gün)\n21.08.2025 - 12:30\n-25 AZN", x: 20, y: 270, w: 335, h: 80, bg: "#ffffff" },
        { type: "transaction", text: "💰 Balans artırma\n20.08.2025 - 09:15\n+100 AZN", x: 20, y: 370, w: 335, h: 80, bg: "#ffffff" },
        { type: "transaction", text: "📚 Yol Hərəkəti Qaydaları kitabı\n18.08.2025 - 16:45\n-12 AZN", x: 20, y: 470, w: 335, h: 80, bg: "#ffffff" },
        { type: "payment", text: "💳 Kart | 📱 Mobil | 🏦 Bank", x: 20, y: 570, w: 335, h: 80, bg: "#ffffff" }
      ]
    },

    { 
      name: "26. Balance Top-up", 
      width: 375, height: 812, 
      category: "Profile Flow",
      elements: [
        { type: "header", text: "← Balans artırma", x: 0, y: 0, w: 375, h: 80, bg: "#ffffff" },
        { type: "balance", text: "Cari Balans: 75 AZN", x: 20, y: 100, w: 335, h: 50, bg: "#ecfdf5" },
        { type: "amounts", text: "10 AZN | 25 AZN | 50 AZN\n100 AZN | 200 AZN | Digər", x: 20, y: 170, w: 335, h: 100, bg: "#ffffff" },
        { type: "input", text: "Məbləğ: 50 AZN", x: 20, y: 290, w: 335, h: 50, bg: "#ffffff" },
        { type: "payment", text: "💳 Bank Kartı", x: 20, y: 360, w: 335, h: 60, bg: "#ffffff" },
        { type: "payment", text: "📱 Mobil Ödəniş", x: 20, y: 440, w: 335, h: 60, bg: "#ffffff" },
        { type: "payment", text: "🏦 Bank Köçürməsi", x: 20, y: 520, w: 335, h: 60, bg: "#ffffff" },
        { type: "button", text: "50 AZN Əlavə Et", x: 20, y: 600, w: 335, h: 60, bg: "#22c55e" }
      ]
    },

    // 🌙 DARK MODE VARIANTS
    { 
      name: "27. Home (Dark)", 
      width: 375, height: 812, 
      category: "Dark Mode",
      elements: [
        { type: "header", text: "Salam, Tural Qarayev 👋", x: 0, y: 0, w: 375, h: 80, bg: "#1f2937" },
        { type: "premium", text: "👑 Premium üzv - Bütün funksiyalar aktiv", x: 20, y: 100, w: 335, h: 60, bg: "#065f46" },
        { type: "card", text: "İrəliləyiş: 42%", x: 20, y: 180, w: 335, h: 80, bg: "#374151" },
        { type: "grid", text: "🎬 3D video dərs", x: 20, y: 280, w: 160, h: 100, bg: "#374151" },
        { type: "grid", text: "📝 Sürətli test", x: 195, y: 280, w: 160, h: 100, bg: "#374151" },
        { type: "grid", text: "📚 Təlim mövzuları", x: 20, y: 395, w: 160, h: 100, bg: "#374151" },
        { type: "grid", text: "🧪 İmtahan", x: 195, y: 395, w: 160, h: 100, bg: "#374151" },
        { type: "tabbar", text: "🏠 Ana | 📚 Təlimlər | 🧪 İmtahan | 🛍️ Mağaza", x: 0, y: 732, w: 375, h: 80, bg: "#1f2937" }
      ]
    },

    { 
      name: "28. Topics (Dark)", 
      width: 375, height: 812, 
      category: "Dark Mode",
      elements: [
        { type: "header", text: "Təlim Mövzuları", x: 0, y: 0, w: 375, h: 80, bg: "#1f2937" },
        { type: "search", text: "Mövzu seç", x: 20, y: 100, w: 335, h: 50, bg: "#374151" },
        { type: "module", text: "🔓 M1: Traffic Rules & Safety", x: 20, y: 170, w: 335, h: 80, bg: "#374151" },
        { type: "module", text: "🔓 M2: Road Signs", x: 20, y: 260, w: 335, h: 80, bg: "#374151" },
        { type: "module", text: "🔓 M8: Free Module", x: 20, y: 350, w: 335, h: 80, bg: "#374151" },
        { type: "tabbar", text: "🏠 Ana | 📚 Təlimlər | 🧪 İmtahan | 🛍️ Mağaza", x: 0, y: 732, w: 375, h: 80, bg: "#1f2937" }
      ]
    },

    { 
      name: "29. Lesson (Dark)", 
      width: 375, height: 812, 
      category: "Dark Mode",
      elements: [
        { type: "header", text: "← M8: Yol nişanları", x: 0, y: 0, w: 375, h: 80, bg: "#1f2937" },
        { type: "tabs", text: "Maddə | 3D video | Video dərs | Konspekt", x: 20, y: 100, w: 335, h: 50, bg: "#374151" },
        { type: "video", text: "🎬 Video Player", x: 20, y: 170, w: 335, h: 200, bg: "#000000" },
        { type: "button", text: "📝 Suallar", x: 20, y: 390, w: 160, h: 60, bg: "#22c55e" },
        { type: "button", text: "🧪 İmtahana başla", x: 195, y: 390, w: 160, h: 60, bg: "#22c55e" }
      ]
    },

    { 
      name: "30. Settings (Dark)", 
      width: 375, height: 812, 
      category: "Dark Mode",
      elements: [
        { type: "header", text: "← Parametrlər", x: 0, y: 0, w: 375, h: 80, bg: "#1f2937" },
        { type: "profile", text: "T Tural Qarayev\nBalans: 75 AZN", x: 20, y: 100, w: 335, h: 80, bg: "#374151" },
        { type: "section", text: "● 🌙 Gecə tema", x: 20, y: 200, w: 335, h: 60, bg: "#374151" },
        { type: "menu", text: "👤 Profil məlumatları", x: 20, y: 280, w: 335, h: 50, bg: "#374151" },
        { type: "menu", text: "🔒 Təhlükəsizlik", x: 20, y: 340, w: 335, h: 50, bg: "#374151" },
        { type: "logout", text: "🚪 Hesabdan çıx", x: 20, y: 400, w: 335, h: 50, bg: "#7f1d1d" }
      ]
    }
  ]
};

// Rəng stilləri yarat
function createColorStyles() {
  console.log('🎨 Rəng stilləri yaradılır...');
  
  Object.entries(designData.colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, hex]) => {
      try {
        const style = figma.createPaintStyle();
        style.name = `Colors/${colorName}/${shade}`;
        style.paints = [{
          type: 'SOLID',
          color: hexToRgb(hex)
        }];
        console.log(`✅ Yaradıldı: ${style.name}`);
      } catch (error) {
        console.log(`❌ Xəta: ${colorName}/${shade} - ${error.message}`);
      }
    });
  });
}

// Text stilləri yarat
function createTextStyles() {
  console.log('📝 Text stilləri yaradılır...');
  
  const textStyles = [
    { name: "H1", size: 32, weight: "Bold" },
    { name: "H2", size: 24, weight: "Semibold" },
    { name: "H3", size: 20, weight: "Semibold" },
    { name: "Body", size: 16, weight: "Regular" },
    { name: "Small", size: 14, weight: "Regular" },
    { name: "Caption", size: 12, weight: "Regular" }
  ];
  
  textStyles.forEach(({ name, size, weight }) => {
    try {
      const style = figma.createTextStyle();
      style.name = `Typography/${name}`;
      style.fontSize = size;
      style.fontName = { family: "Inter", style: weight };
      console.log(`✅ Yaradıldı: ${style.name}`);
    } catch (error) {
      console.log(`❌ Xəta: ${name} - ${error.message}`);
    }
  });
}

// Element yaradıcı funksiya
function createElement(element, parentFrame) {
  try {
    let node;
    
    switch (element.type) {
      case 'logo':
      case 'header':
      case 'card':
      case 'button':
      case 'grid':
      case 'alert':
      case 'premium':
      case 'package':
      case 'menu':
      case 'payment':
      case 'video':
      case 'question':
      case 'option':
      case 'module':
      case 'transaction':
      case 'balance':
      case 'section':
      case 'profile':
      case 'sidebar':
      case 'chat':
        node = figma.createRectangle();
        node.resize(element.w, element.h);
        node.fills = [{ type: 'SOLID', color: hexToRgb(element.bg) }];
        node.cornerRadius = 8;
        break;
        
      case 'tabbar':
        node = figma.createRectangle();
        node.resize(element.w, element.h);
        node.fills = [{ type: 'SOLID', color: hexToRgb(element.bg) }];
        node.cornerRadius = 0;
        break;
        
      case 'input':
      case 'search':
      case 'dropdown':
        node = figma.createRectangle();
        node.resize(element.w, element.h);
        node.fills = [{ type: 'SOLID', color: hexToRgb(element.bg) }];
        node.strokes = [{ type: 'SOLID', color: hexToRgb('#d1d5db') }];
        node.strokeWeight = 1;
        node.cornerRadius = 8;
        break;
        
      default:
        node = figma.createRectangle();
        node.resize(element.w, element.h);
        node.fills = [{ type: 'SOLID', color: hexToRgb(element.bg || '#ffffff') }];
        node.cornerRadius = 4;
    }
    
    node.name = element.type;
    node.x = element.x;
    node.y = element.y;
    
    // Text əlavə et
    if (element.text) {
      const textNode = figma.createText();
      textNode.characters = element.text;
      textNode.fontSize = element.size || 14;
      textNode.fontName = { family: "Inter", style: "Regular" };
      textNode.fills = [{ 
        type: 'SOLID', 
        color: element.bg === '#000000' || element.bg === '#1f2937' || element.bg === '#374151' 
          ? { r: 1, g: 1, b: 1 } 
          : { r: 0.1, g: 0.1, b: 0.1 } 
      }];
      textNode.x = element.x + 10;
      textNode.y = element.y + 10;
      textNode.name = `${element.type}_text`;
      
      parentFrame.appendChild(textNode);
    }
    
    parentFrame.appendChild(node);
    
  } catch (error) {
    console.log(`❌ Element xətası: ${element.type} - ${error.message}`);
  }
}

// Bütün ekranları yarat
function createAllScreens() {
  console.log('📱 30 detallı ekran yaradılır...');
  
  // Kateqoriyalara görə qruplaşdır
  const categories = {};
  designData.screens.forEach(screen => {
    if (!categories[screen.category]) {
      categories[screen.category] = [];
    }
    categories[screen.category].push(screen);
  });
  
  let currentY = 0;
  const categorySpacing = 150;
  const screenSpacing = 50;
  
  Object.entries(categories).forEach(([categoryName, screens]) => {
    // Kateqoriya başlığı
    const categoryTitle = figma.createText();
    categoryTitle.name = `📂 ${categoryName}`;
    categoryTitle.characters = categoryName.toUpperCase();
    categoryTitle.fontSize = 24;
    categoryTitle.fontName = { family: "Inter", style: "Bold" };
    categoryTitle.fills = [{ type: 'SOLID', color: hexToRgb('#1f2937') }];
    categoryTitle.x = 0;
    categoryTitle.y = currentY;
    figma.currentPage.appendChild(categoryTitle);
    
    currentY += 60;
    
    // Kateqoriyadakı ekranlar
    screens.forEach((screen, index) => {
      try {
        const frame = figma.createFrame();
        frame.name = screen.name;
        frame.resize(screen.width, screen.height);
        frame.x = index * (screen.width + screenSpacing);
        frame.y = currentY;
        
        // Background rəngi
        let bgColor = screen.category === 'Dark Mode' ? '#111827' : '#f9fafb';
        frame.fills = [{ type: 'SOLID', color: hexToRgb(bgColor) }];
        
        // Elementləri əlavə et
        if (screen.elements) {
          screen.elements.forEach(element => {
            createElement(element, frame);
          });
        }
        
        figma.currentPage.appendChild(frame);
        
        console.log(`✅ Yaradıldı: ${screen.name}`);
      } catch (error) {
        console.log(`❌ Xəta: ${screen.name} - ${error.message}`);
      }
    });
    
    currentY += 900; // Növbəti kateqoriya üçün yer
  });
}

// Komponentlər yarat
function createComponents() {
  console.log('🧩 Komponentlər yaradılır...');
  
  const components = [
    { name: "Button/Primary", width: 120, height: 44, color: "#22c55e", text: "Button" },
    { name: "Button/Secondary", width: 120, height: 44, color: "#6b7280", text: "Button" },
    { name: "Card/Default", width: 200, height: 100, color: "#ffffff", text: "Card Content" },
    { name: "Header/Default", width: 375, height: 60, color: "#ffffff", text: "Header Title" },
    { name: "TabBar/Default", width: 375, height: 80, color: "#ffffff", text: "🏠 📚 🧪 🛍️ ➕" }
  ];
  
  components.forEach((comp, index) => {
    try {
      const component = figma.createComponent();
      component.name = comp.name;
      component.resize(comp.width, comp.height);
      component.x = index * (comp.width + 20);
      component.y = -200; // Yuxarıda yerləşdir
      
      component.fills = [{ type: 'SOLID', color: hexToRgb(comp.color) }];
      component.cornerRadius = 8;
      
      // Text əlavə et
      if (comp.text) {
        const label = figma.createText();
        label.characters = comp.text;
        label.fontSize = 14;
        label.fontName = { family: "Inter", style: "Medium" };
        label.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 } }];
        label.x = 10;
        label.y = 10;
        
        component.appendChild(label);
      }
      
      figma.currentPage.appendChild(component);
      
      console.log(`✅ Komponent: ${comp.name}`);
    } catch (error) {
      console.log(`❌ Komponent xətası: ${comp.name} - ${error.message}`);
    }
  });
}

// Hex-i RGB-yə çevir
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

// UI mesajları
figma.ui.onmessage = msg => {
  console.log('📨 Mesaj alındı:', msg.type);
  
  if (msg.type === 'create-colors') {
    createColorStyles();
    figma.notify('🎨 25 rəng stili yaradıldı!');
  }
  
  if (msg.type === 'create-typography') {
    createTextStyles();
    figma.notify('📝 6 text stili yaradıldı!');
  }
  
  if (msg.type === 'create-screens') {
    createAllScreens();
    figma.notify('📱 30 detallı ekran yaradıldı!');
  }
  
  if (msg.type === 'create-components') {
    createComponents();
    figma.notify('🧩 5 komponent yaradıldı!');
  }
  
  if (msg.type === 'create-all') {
    createColorStyles();
    setTimeout(() => createTextStyles(), 1000);
    setTimeout(() => createComponents(), 2000);
    setTimeout(() => createAllScreens(), 3000);
    figma.notify('🚀 Hər şey yaradıldı! (30 detallı ekran)');
  }
  
  if (msg.type === 'close') {
    figma.closePlugin();
  }
};

console.log('🚀 DDA.az Figma Plugin hazır! (30 detallı ekran)');