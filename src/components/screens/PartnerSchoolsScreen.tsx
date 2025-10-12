import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

// Fix Leaflet default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDkuNCAxMi41IDI4LjUgMTIuNSAyOC41UzI1IDIxLjkgMjUgMTIuNUMyNSA1LjYgMTkuNCAwIDEyLjUgMHoiIGZpbGw9IiMzYjgyZjYiLz48Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTIuNSIgcj0iNyIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSAwQzUuNiAwIDAgNS42IDAgMTIuNWMwIDkuNCAxMi41IDI4LjUgMTIuNSAyOC41UzI1IDIxLjkgMjUgMTIuNUMyNSA1LjYgMTkuNCAwIDEyLjUgMHoiIGZpbGw9IiMzYjgyZjYiLz48Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTIuNSIgcj0iNyIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
  shadowUrl: '',
});

interface PartnerSchool {
  id: string;
  name: string;
  logo: string;
  description: string;
  languages: string[];
  specialties: string[];
  location: string;
  coordinates: { lat: number; lng: number };
  contact: string;
  email: string;
  website?: string;
}

interface ApplicationForm {
  schoolId: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
}

export function PartnerSchoolsScreen() {
  const { goBack, isDarkMode } = useApp();
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSchool, setApplicationSchool] = useState<PartnerSchool | null>(null);
  const [mapExpanded, setMapExpanded] = useState(true);
  const [formData, setFormData] = useState<ApplicationForm>({
    schoolId: '',
    name: '',
    phone: '',
    email: '',
    category: 'B',
    message: ''
  });

  const partnerSchools: PartnerSchool[] = [
    {
      id: '1',
      name: 'Avto Məktəb "Sürücü"',
      logo: '🚗',
      description: 'Bakının ən yaxşı sürücülük məktəblərindən biri. 20 illik təcrübə və peşəkar müəllimlər.',
      languages: ['Azərbaycan dili', 'Rus dili', 'İngilis dili'],
      specialties: ['B kateqoriya', 'C kateqoriya', 'D kateqoriya'],
      location: 'Nəsimi rayonu',
      coordinates: { lat: 40.4093, lng: 49.8671 },
      contact: '+994 50 123 45 67',
      email: 'info@surucu.az'
    },
    {
      id: '2',
      name: 'Driving Academy "Əsas"',
      logo: '🏫',
      description: 'Müasir avadanlıq və innovativ tədris metodları ilə təchiz olunmuş məktəb.',
      languages: ['Azərbaycan dili', 'Rus dili'],
      specialties: ['B kateqoriya', 'Moto', 'Avtomat transmissiya'],
      location: 'Yasamal rayonu',
      coordinates: { lat: 40.3777, lng: 49.8384 },
      contact: '+994 55 234 56 78',
      email: 'contact@esas.az',
      website: 'www.drivingacademy.az'
    },
    {
      id: '3',
      name: 'Pro Driving School',
      logo: '🎓',
      description: 'Beynəlxalq standartlara uyğun təhsil və sertifikatlaşdırma.',
      languages: ['Azərbaycan dili', 'İngilis dili', 'Türk dili'],
      specialties: ['B kateqoriya', 'C kateqoriya', 'Təhlükəsizlik təlimi'],
      location: 'Xətai rayonu',
      coordinates: { lat: 40.3953, lng: 49.9213 },
      contact: '+994 51 345 67 89',
      email: 'info@prodrive.az',
      website: 'www.prodrive.az'
    },
    {
      id: '4',
      name: 'Auto Master Academy',
      logo: '🏆',
      description: 'Yüksək keçid faizi və fərdi yanaşma ilə tanınan məktəb.',
      languages: ['Azərbaycan dili', 'Rus dili', 'İngilis dili', 'Türk dili'],
      specialties: ['B kateqoriya', 'Avtomat transmissiya', 'VIP təlim'],
      location: 'Nərimanov rayonu',
      coordinates: { lat: 40.4035, lng: 49.8580 },
      contact: '+994 70 456 78 90',
      email: 'academy@automaster.az',
      website: 'www.automaster.az'
    },
    {
      id: '5',
      name: 'Sürücülük Mərkəzi "Qafqaz"',
      logo: '🚙',
      description: 'Əsas və əlavə kateqoriyalar üzrə geniş təlim proqramları.',
      languages: ['Azərbaycan dili', 'Rus dili'],
      specialties: ['B kateqoriya', 'C kateqoriya', 'D kateqoriya', 'E kateqoriya'],
      location: 'Sabunçu rayonu',
      coordinates: { lat: 40.4282, lng: 49.9536 },
      contact: '+994 55 567 89 01',
      email: 'qafqaz@driving.az'
    },
    {
      id: '6',
      name: 'Smart Drive School',
      logo: '🌟',
      description: 'Virtual simulyatorlar və interaktiv təlim sistemləri ilə təchiz edilmiş müasir məktəb.',
      languages: ['Azərbaycan dili', 'İngilis dili'],
      specialties: ['B kateqoriya', 'Avtomat transmissiya', 'Elektromobil təlimi'],
      location: 'Binəqədi rayonu',
      coordinates: { lat: 40.4513, lng: 49.8202 },
      contact: '+994 50 678 90 12',
      email: 'hello@smartdrive.az',
      website: 'www.smartdrive.az'
    }
  ];

  // Custom marker icon
  const createCustomIcon = (emoji: string) => {
    return new L.Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="50" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C11.2 0 4 7.2 4 16c0 12 16 34 16 34s16-22 16-34c0-8.8-7.2-16-16-16z" fill="#3b82f6"/>
          <circle cx="20" cy="16" r="12" fill="white"/>
          <text x="20" y="22" text-anchor="middle" font-size="16">${emoji}</text>
        </svg>
      `)}`,
      iconSize: [40, 50],
      iconAnchor: [20, 50],
      popupAnchor: [0, -50]
    });
  };

  // Filter schools based on search query
  const filteredSchools = partnerSchools.filter(school => 
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleSchool = (schoolId: string) => {
    setSelectedSchool(selectedSchool === schoolId ? null : schoolId);
  };

  const handleApplyClick = (school: PartnerSchool) => {
    setApplicationSchool(school);
    setFormData({ ...formData, schoolId: school.id });
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert(`Müraciətiniz "${applicationSchool?.name}" məktəbinə göndərildi!\n\nAd: ${formData.name}\nTelefon: ${formData.phone}\nKateqoriya: ${formData.category}`);
    setShowApplicationForm(false);
    setFormData({
      schoolId: '',
      name: '',
      phone: '',
      email: '',
      category: 'B',
      message: ''
    });
  };

  const handleMapMarkerClick = (schoolId: string) => {
    setSelectedSchool(schoolId);
    // Scroll to school in list
    setTimeout(() => {
      const element = document.getElementById(`school-${schoolId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/10'
        }`}></div>
        <div className={`absolute bottom-20 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-green-500/5' : 'bg-green-400/10'
        }`}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={goBack}
            className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isDarkMode 
                ? 'border-gray-600/50 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 backdrop-blur-sm' 
                : 'border-gray-300/50 bg-white/80 hover:bg-gray-50/80 text-gray-700 backdrop-blur-sm'
            }`}
          >
            <span className="text-lg">←</span>
          </button>
          <div className="flex-1">
            <h1 className={`text-2xl font-black transition-colors duration-200 bg-gradient-to-r ${
              isDarkMode ? 'from-blue-400 to-green-400' : 'from-blue-600 to-green-600'
            } bg-clip-text text-transparent`}>
              Digər Məktəblər
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {filteredSchools.length} məktəb tapıldı
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4 animate-fadeInUp">
          <div className={`relative rounded-2xl border-2 transition-all duration-200 ${
            isDarkMode 
              ? 'border-gray-700 bg-gray-800/80 backdrop-blur-sm' 
              : 'border-gray-200 bg-white/80 backdrop-blur-sm'
          }`}>
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <EmojiIcon emoji="🔍" size={20} />
            </div>
            <input
              type="text"
              placeholder="Məktəb axtar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 bg-transparent outline-none text-sm font-medium ${
                isDarkMode ? 'text-gray-100 placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Interactive Map - Collapsible */}
        <Card variant="elevated" className="mb-4 overflow-hidden animate-fadeInUp" style={{ animationDelay: '50ms' }}>
          {/* Map Header */}
          <button
            onClick={() => setMapExpanded(!mapExpanded)}
            className={`w-full p-4 flex items-center justify-between transition-colors ${
              isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <EmojiIcon emoji="🗺️" size={20} />
              </div>
              <div className="text-left">
                <h3 className={`font-bold text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Məktəblərin Xəritəsi
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  İnteraktiv xəritədə məktəbləri görün
                </p>
              </div>
            </div>
            <div className={`text-2xl transition-transform duration-300 ${
              mapExpanded ? 'rotate-90' : ''
            }`}>
              ▶
            </div>
          </button>

          {/* Map Container */}
          {mapExpanded && (
            <div className="relative animate-fadeInUp">
              <div className={`h-80 w-full ${isDarkMode ? 'brightness-90' : ''}`}>
                <MapContainer
                  center={[40.4093, 49.8671]}
                  zoom={12}
                  scrollWheelZoom={true}
                  style={{ height: '100%', width: '100%', borderRadius: '0 0 1rem 1rem' }}
                  className="z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                  />
                  {partnerSchools.map((school) => (
                    <Marker
                      key={school.id}
                      position={[school.coordinates.lat, school.coordinates.lng]}
                      icon={createCustomIcon(school.logo)}
                      eventHandlers={{
                        click: () => handleMapMarkerClick(school.id)
                      }}
                    >
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{school.logo}</span>
                            <h4 className="font-bold text-sm">{school.name}</h4>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{school.description}</p>
                          <div className="text-xs text-gray-500 mb-2">
                            📍 {school.location}
                          </div>
                          <button
                            onClick={() => handleApplyClick(school)}
                            className="w-full mt-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs font-bold rounded-lg hover:from-blue-600 hover:to-green-600 transition-all"
                          >
                            📝 Müraciət et
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              {/* Map Controls Info */}
              <div className={`px-4 py-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 text-xs">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    💡 İpucu: Xəritəni zoom edin, hərəkət etdirin və markerləri klikləyin
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Info Banner */}
        <Card variant="elevated" padding="lg" className="mb-4 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="🤝" size={24} />
            </div>
            <div>
              <h3 className={`font-bold text-base mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Tərəfdaş Məktəblər
              </h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Xəritədə və ya siyahıda məktəbləri seçin. Müraciət etmək üçün "Müraciət et" düyməsini klikləyin.
              </p>
            </div>
          </div>
        </Card>

        {/* Schools List */}
        <div className="space-y-3">
          {filteredSchools.length === 0 ? (
            <Card variant="elevated" padding="lg" className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Məktəb tapılmadı
              </p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Başqa açar söz sınayın
              </p>
            </Card>
          ) : (
            filteredSchools.map((school, index) => (
              <Card
                key={school.id}
                id={`school-${school.id}`}
                variant="elevated"
                className={`overflow-hidden transition-all duration-300 cursor-pointer animate-fadeInUp ${
                  selectedSchool === school.id ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{ animationDelay: `${(index + 2) * 50}ms` }}
                onClick={() => toggleSchool(school.id)}
              >
                {/* School Header */}
                <div className="p-4 flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                  }`}>
                    {school.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-base mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {school.name}
                    </h3>
                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                      {school.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs">
                      <EmojiIcon emoji="📍" size={12} />
                      <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>
                        {school.location}
                      </span>
                    </div>
                  </div>
                  <div className={`text-2xl transition-transform duration-300 ${
                    selectedSchool === school.id ? 'rotate-90' : ''
                  }`}>
                    →
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedSchool === school.id && (
                  <div className={`border-t px-4 pb-4 pt-3 space-y-3 animate-fadeInUp ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    {/* Languages */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <EmojiIcon emoji="🗣️" size={16} />
                        <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Dillər:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {school.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isDarkMode 
                                ? 'bg-blue-900/30 text-blue-300' 
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <EmojiIcon emoji="📋" size={16} />
                        <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          İxtisaslar:
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {school.specialties.map((spec, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isDarkMode 
                                ? 'bg-green-900/30 text-green-300' 
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <EmojiIcon emoji="📞" size={14} />
                        <a 
                          href={`tel:${school.contact}`}
                          className={`text-xs font-medium ${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          } hover:underline`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Zəng et
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <EmojiIcon emoji="✉️" size={14} />
                        <a 
                          href={`mailto:${school.email}`}
                          className={`text-xs font-medium ${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          } hover:underline`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Email
                        </a>
                      </div>
                    </div>

                    {/* Website */}
                    {school.website && (
                      <div className="flex items-center gap-2">
                        <EmojiIcon emoji="🌐" size={14} />
                        <a 
                          href={`https://${school.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs font-medium ${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          } hover:underline`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {school.website}
                        </a>
                      </div>
                    )}

                    {/* Apply Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyClick(school);
                      }}
                      className={`w-full mt-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-500 hover:to-green-500' 
                          : 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600'
                      }`}
                    >
                      📝 Müraciət et
                    </button>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>

        {/* Bottom Partnership Info */}
        <Card variant="elevated" padding="lg" className="mt-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="text-center">
            <div className="text-3xl mb-3">💼</div>
            <h3 className={`font-bold text-base mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Əməkdaşlıq
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Məktəbiniz də bizimlə əməkdaşlıq etmək istəyirsə, bizimlə əlaqə saxlayın.
            </p>
            <button
              onClick={() => alert('Əlaqə forması (demo)')}
              className={`mt-4 px-6 py-2 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
              }`}
            >
              Əlaqə saxlayın
            </button>
          </div>
        </Card>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && applicationSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowApplicationForm(false)}
          ></div>
          
          {/* Modal */}
          <div className={`relative w-full max-w-md rounded-3xl p-6 shadow-2xl animate-scale-in ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {applicationSchool.logo}
                </div>
                <div>
                  <h3 className={`font-bold text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Müraciət formu
                  </h3>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {applicationSchool.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowApplicationForm(false)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitApplication} className="space-y-3">
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Ad və Soyad *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border-2 outline-none text-sm transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500' 
                      : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder="Adınızı daxil edin"
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Telefon *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border-2 outline-none text-sm transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500' 
                      : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder="+994 XX XXX XX XX"
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border-2 outline-none text-sm transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500' 
                      : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Kateqoriya *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border-2 outline-none text-sm transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500' 
                      : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                >
                  <option value="B">B kateqoriya</option>
                  <option value="C">C kateqoriya</option>
                  <option value="D">D kateqoriya</option>
                  <option value="E">E kateqoriya</option>
                  <option value="Moto">Motosiklet</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Əlavə qeyd
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-2.5 rounded-xl border-2 outline-none text-sm resize-none transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500' 
                      : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
                  }`}
                  placeholder="Əlavə məlumat və ya suallarınız..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  İmtina
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-500 hover:to-green-500' 
                      : 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600'
                  }`}
                >
                  Göndər
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
