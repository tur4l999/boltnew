import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { EmojiIcon } from '../ui/EmojiIcon';

interface PracticeBooking {
  id: string;
  date: string;
  time: string;
  instructor: string;
  transmissionType: 'manual' | 'automatic';
  vehicleType: 'car' | 'motorcycle' | 'truck';
  duration: number;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export function DrivingPracticeScreen() {
  const { t, isDarkMode } = useApp();
  const [activeTab, setActiveTab] = useState<'book' | 'history'>('book');
  const [selectedTransmission, setSelectedTransmission] = useState<'manual' | 'automatic' | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<'car' | 'motorcycle' | 'truck' | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showTruckAlert, setShowTruckAlert] = useState(false);
  const [showRegionAlert, setShowRegionAlert] = useState(false);

  // Sample data
  const instructors = [
    { id: '1', name: 'Əli Məmmədov', rating: 4.8, experience: '5 il', avatar: '👨‍🏫' },
    { id: '2', name: 'Leyla Həsənova', rating: 4.9, experience: '7 il', avatar: '👩‍🏫' },
    { id: '3', name: 'Rəşad Quliyev', rating: 4.7, experience: '4 il', avatar: '👨‍🏫' },
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const regions = [
    { id: 'baku', name: t.baku, available: true },
    { id: 'ganja', name: t.ganja, available: false },
    { id: 'sumgayit', name: t.sumgayit, available: false },
    { id: 'mingechevir', name: t.mingechevir, available: false },
    { id: 'lankaran', name: t.lankaran, available: false },
    { id: 'shirvan', name: t.shirvan, available: false },
    { id: 'nakhchivan', name: t.nakhchivan, available: false },
    { id: 'gabala', name: t.gabala, available: false },
    { id: 'shaki', name: t.shaki, available: false },
    { id: 'shusha', name: t.shusha, available: false },
  ];

  const practiceHistory: PracticeBooking[] = [
    {
      id: '1',
      date: '2024-01-15',
      time: '10:00',
      instructor: 'Əli Məmmədov',
      transmissionType: 'manual',
      vehicleType: 'car',
      duration: 2,
      price: 80,
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-01-20',
      time: '14:00',
      instructor: 'Leyla Həsənova',
      transmissionType: 'automatic',
      vehicleType: 'car',
      duration: 1.5,
      price: 60,
      status: 'upcoming'
    }
  ];

  const handleVehicleSelect = (vehicle: 'car' | 'motorcycle' | 'truck') => {
    if (vehicle === 'truck') {
      setShowTruckAlert(true);
      return;
    }
    setSelectedVehicle(vehicle);
  };

  const handleRegionSelect = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    if (!region?.available) {
      setShowRegionAlert(true);
      return;
    }
    setSelectedRegion(regionId);
  };

  const handleBookPractice = () => {
    if (selectedTransmission && selectedVehicle && selectedRegion && selectedDate && selectedTime && selectedInstructor) {
      setShowBookingForm(true);
    }
  };

  const handleConfirmBooking = () => {
    // Here you would typically send the booking to a backend
    alert(t.bookingSuccess);
    setShowBookingForm(false);
    // Reset form
    setSelectedTransmission(null);
    setSelectedVehicle(null);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedInstructor('');
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'car': return '🚗';
      case 'motorcycle': return '🏍️';
      case 'truck': return '🚛';
      default: return '🚗';
    }
  };

  const getTransmissionIcon = (type: string) => {
    switch (type) {
      case 'manual': return '⚙️';
      case 'automatic': return '🔄';
      default: return '⚙️';
    }
  };

  return (
    <div className={`p-4 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.drivingPractice}
        </h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Maşın sürməyi öyrənmək üçün praktiki təcrübəyə yazılın
        </p>
      </div>

      {/* Tabs */}
      <div className={`flex rounded-xl p-1 mb-6 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
      }`}>
        <button
          onClick={() => setActiveTab('book')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'book'
              ? 'bg-white text-gray-900 shadow-lg'
              : isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {t.bookPractice}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'history'
              ? 'bg-white text-gray-900 shadow-lg'
              : isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {t.practiceHistory}
        </button>
      </div>

      {activeTab === 'book' ? (
        <div className="space-y-6">
          {/* Transmission Type Selection */}
          <Card>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.transmissionType}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'manual', label: t.manual, icon: '⚙️' },
                { id: 'automatic', label: t.automatic, icon: '🔄' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedTransmission(type.id as 'manual' | 'automatic')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedTransmission === type.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : isDarkMode
                        ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Vehicle Type Selection */}
          <Card>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.vehicleType}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'car', label: t.car, icon: '🚗' },
                { id: 'motorcycle', label: t.motorcycle, icon: '🏍️' },
                { id: 'truck', label: t.truck, icon: '🚛', disabled: true }
              ].map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle.id as 'car' | 'motorcycle' | 'truck')}
                  disabled={vehicle.disabled}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    vehicle.disabled
                      ? 'border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 opacity-50 cursor-not-allowed'
                      : selectedVehicle === vehicle.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : isDarkMode
                          ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className={`text-2xl mb-2 ${vehicle.disabled ? 'grayscale' : ''}`}>{vehicle.icon}</div>
                  <div className={`text-sm font-medium ${
                    vehicle.disabled 
                      ? isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      : isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {vehicle.label}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Region Selection */}
          <Card>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.selectRegion}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleRegionSelect(region.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    !region.available
                      ? 'border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 opacity-60 cursor-not-allowed'
                      : selectedRegion === region.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : isDarkMode
                          ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className={`text-sm font-medium ${
                    !region.available 
                      ? isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      : isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {region.name}
                  </div>
                  {region.available && (
                    <div className={`text-xs mt-1 ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      Mövcud
                    </div>
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Date Selection */}
          <Card>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.selectDate}
            </h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full p-3 rounded-xl border ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            />
          </Card>

          {/* Time Selection */}
          {selectedDate && (
            <Card>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t.selectTime}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      selectedTime === time
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'
                        : isDarkMode
                          ? 'border-gray-600 bg-gray-700 hover:border-gray-500 text-white'
                          : 'border-gray-300 bg-white hover:border-gray-400 text-gray-900'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Instructor Selection */}
          {selectedTime && (
            <Card>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t.selectInstructor}
              </h3>
              <div className="space-y-3">
                {instructors.map((instructor) => (
                  <button
                    key={instructor.id}
                    onClick={() => setSelectedInstructor(instructor.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedInstructor === instructor.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : isDarkMode
                          ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{instructor.avatar}</div>
                      <div className="flex-1 text-left">
                        <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {instructor.name}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          ⭐ {instructor.rating} • {instructor.experience}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Book Button */}
          {selectedTransmission && selectedVehicle && selectedRegion && selectedDate && selectedTime && selectedInstructor && (
            <Button
              onClick={handleBookPractice}
              className="w-full py-4 text-lg font-semibold"
              size="lg"
            >
              {t.bookNow}
            </Button>
          )}
        </div>
      ) : (
        /* Practice History */
        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.upcomingPractices}
            </h3>
            {practiceHistory.filter(p => p.status === 'upcoming').map((practice) => (
              <div key={practice.id} className={`p-3 rounded-lg mb-2 ${
                isDarkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{getVehicleIcon(practice.vehicleType)}</div>
                    <div>
                      <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {practice.date} • {practice.time}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {practice.instructor} • {practice.duration}h • {practice.price}₼
                      </div>
                    </div>
                  </div>
                  <div className="text-emerald-600 font-medium">Yaxınlaşır</div>
                </div>
              </div>
            ))}
          </div>

          <div className={`p-4 rounded-xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.completedPractices}
            </h3>
            {practiceHistory.filter(p => p.status === 'completed').map((practice) => (
              <div key={practice.id} className={`p-3 rounded-lg mb-2 ${
                isDarkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{getVehicleIcon(practice.vehicleType)}</div>
                    <div>
                      <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {practice.date} • {practice.time}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {practice.instructor} • {practice.duration}h • {practice.price}₼
                      </div>
                    </div>
                  </div>
                  <div className="text-green-600 font-medium">Tamamlandı</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.confirmBooking}
            </h3>
            
            <div className={`p-4 rounded-lg mb-4 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.transmissionType}:
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedTransmission === 'manual' ? t.manual : t.automatic}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.vehicleType}:
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedVehicle === 'car' ? t.car : selectedVehicle === 'motorcycle' ? t.motorcycle : t.truck}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Tarix:
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Vaxt:
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.region}:
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {regions.find(r => r.id === selectedRegion)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.instructor}:
                  </span>
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {instructors.find(i => i.id === selectedInstructor)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.price}:
                  </span>
                  <span className={`font-bold text-emerald-600 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    60₼
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowBookingForm(false)}
                variant="ghost"
                className="flex-1"
              >
                Ləğv et
              </Button>
              <Button
                onClick={handleConfirmBooking}
                className="flex-1"
              >
                Təsdiq et
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Truck Unavailable Alert */}
      {showTruckAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="text-center">
              <div className="text-6xl mb-4">🚛</div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t.currentlyUnavailable}
              </h3>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Hal-hazırda yük maşını üçün praktiki təcrübə mövcud deyil. Zəhmət olmasa maşın və ya motosikl seçin.
              </p>
              <Button
                onClick={() => setShowTruckAlert(false)}
                className="w-full"
              >
                Bağla
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Region Coming Soon Alert */}
      {showRegionAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="text-center">
              <div className="text-6xl mb-4">🏙️</div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t.comingSoon}
              </h3>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Bu region üçün xidmət tezliklə başlayacaq. Hal-hazırda yalnız Bakıda praktiki təcrübə mövcuddur.
              </p>
              <Button
                onClick={() => setShowRegionAlert(false)}
                className="w-full"
              >
                Bağla
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}