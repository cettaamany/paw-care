import React from 'react';
import { PawPrint, MapPin, Phone, Loader2 } from 'lucide-react';

// Komponen Card Shelter
const ShelterCard = ({ shelter }) => (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 transition-shadow duration-200 hover:shadow-lg">
        <h3 className="text-xl font-bold text-teal-800 mb-2">{shelter.name}</h3>
        <div className="space-y-1 text-gray-700">
            <p className="text-sm flex items-start">
                <PawPrint className="inline w-4 h-4 mr-2 mt-1 text-pink-500 flex-shrink-0" /> 
                {/* Menghapus markdown ** di dalam template React */}
                Hewan yang Ditampung: {shelter.pets}
            </p>
            <p className="text-sm flex items-start">
                <MapPin className="inline w-4 h-4 mr-2 mt-1 text-teal-600 flex-shrink-0" /> 
                {shelter.address}
            </p>
            <p className="text-sm flex items-start">
                <Phone className="inline w-4 h-4 mr-2 mt-1 text-teal-600 flex-shrink-0" /> 
                {shelter.contact}
            </p>
        </div>
    </div>
);

// Komponen Loading
const Loading = () => (
    <div className="flex flex-col items-center justify-center p-8 text-teal-600">
        <Loader2 className="animate-spin h-12 w-12" />
        <p className="mt-4 text-lg font-semibold">Memuat Data Shelter Adopsi...</p>
    </div>
);


const AdopsiPage = ({ adoptions, isLoading }) => {
    // Menambahkan pengecekan untuk memastikan 'adoptions' adalah array dan bukan undefined/null
    const isDataValid = Array.isArray(adoptions);

    return (
        <div className="min-h-screen pb-20 p-4 pt-8 md:p-8 bg-gray-50">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-teal-200 pb-2 flex items-center">
                <PawPrint className="w-7 h-7 mr-2 text-teal-600" /> Adopsi & Rescue Shelter Semarang
            </h1>
            <p className="text-gray-600 mb-8">Pilih untuk mengadopsi! Berikut adalah daftar shelter terpercaya di Semarang yang siap Anda hubungi. Data ini dimuat dari API internal.</p>
            
            {isLoading ? <Loading /> : (
                <div className="space-y-4">
                    {/* Safety check ditambahkan di sini: pastikan adoptions ada sebelum map */}
                    {isDataValid && adoptions.length > 0 ? (
                        adoptions.map(shelter => (
                            <ShelterCard key={shelter.id} shelter={shelter} />
                        ))
                    ) : (
                        <div className="text-center p-10 bg-white rounded-xl shadow-lg text-gray-500">
                            <p className="font-semibold">Data adopsi tidak ditemukan atau gagal dimuat.</p>
                            <p className="text-sm">Silakan periksa koneksi atau data di database Anda.</p>
                        </div>
                    )}
                </div>
            )}
            
            <div className="mt-8 p-4 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700 shadow-inner">
                <p className='font-semibold'>Penting:</p>
                <p>Data ini menggunakan Web Service/API yang dibuat sendiri. Hubungi shelter terkait untuk konfirmasi prosedur adopsi.</p>
            </div>
        </div>
    );
};

export default AdopsiPage;