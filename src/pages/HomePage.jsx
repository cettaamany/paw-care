import React from 'react';
import { Home, Info, Loader2 } from 'lucide-react';

// Komponen Card Hewan (dipisahkan untuk kejelasan)
const PetCard = ({ pet, onClick }) => (
    <div 
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-indigo-300"
        onClick={() => onClick(pet.id)}
    >
        <img 
            src={pet.imageUrl} 
            alt={pet.name} 
            className="w-full h-32 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/6366f1/ffffff?text=Paw+Care" }}
        />
        <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{pet.name}</h3>
            <p className="text-sm text-indigo-600 font-medium">{pet.type}</p>
        </div>
    </div>
);

// Komponen Loading
const Loading = () => (
    <div className="flex flex-col items-center justify-center p-8 text-indigo-600">
        <Loader2 className="animate-spin h-12 w-12" />
        <p className="mt-4 text-lg font-semibold">Memuat Data Hewan...</p>
    </div>
);

const HomePage = ({ onNavigate, pets, isLoading }) => {
    
    // Navigasi ke detail halaman
    const navigateToDetail = (id) => {
        onNavigate('detail', id);
    };

    return (
        <div className="min-h-screen pb-20 p-4 pt-8 md:p-8 bg-gray-50">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-indigo-200 pb-2 flex items-center">
                <Home className="w-7 h-7 mr-2 text-indigo-600" /> Jelajahi Hewan Peliharaan
            </h1>
            <p className="text-gray-600 mb-8">Pilih jenis hewan di bawah untuk melihat detail, deskripsi sifat, dan tips perawatan dasar.</p>

            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Katalog Paw Care</h2>
            
            {isLoading ? <Loading /> : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pets.map(pet => (
                        <PetCard key={pet.id} pet={pet} onClick={navigateToDetail} />
                    ))}
                </div>
            )}
            
            {/* Mengganti halaman tips terpisah dengan pengarahan yang lebih fungsional */}
            <div className="mt-12 p-6 bg-pink-50 border-l-4 border-pink-500 rounded-lg shadow-md">
                 <h3 className="text-xl font-semibold text-pink-800 flex items-center">
                    <Info className="w-5 h-5 mr-2" /> Tips Perawatan
                 </h3>
                 <p className="mt-2 text-pink-700">Untuk melihat **Tips Perawatan** lengkap (memandikan, makanan, bahaya), silakan klik pada kartu hewan di atas.</p>
            </div>
        </div>
    );
};

export default HomePage;