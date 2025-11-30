import React from 'react';
import { ClipboardList, AlertTriangle, ChevronLeft } from 'lucide-react';

// Komponen Pembantu untuk Care Tips
const CareTipSection = ({ title, content, isDanger = false }) => {
    const Icon = isDanger ? AlertTriangle : ClipboardList;
    const bgColor = isDanger ? 'bg-red-50' : 'bg-indigo-50';
    const textColor = isDanger ? 'text-red-700' : 'text-indigo-700';
    const borderColor = isDanger ? 'border-red-500' : 'border-indigo-500';

    return (
        <div className={`p-5 rounded-xl border-l-4 ${borderColor} ${bgColor}`}>
            <h3 className={`text-xl font-semibold ${textColor} flex items-center mb-2`}>
                <Icon className={`w-5 h-5 mr-2 ${isDanger ? 'text-red-600' : 'text-indigo-600'}`} />
                {title}
            </h3>
            <p className="text-gray-700">{content}</p>
        </div>
    );
};

const DetailPage = ({ pet, onNavigate }) => {
    if (!pet) {
        // Halaman Detail tidak ditemukan
        return (
            <div className="p-4 pt-8 md:p-8">
                <h1 className="text-2xl font-bold text-red-500">Hewan Tidak Ditemukan</h1>
                <button 
                    onClick={() => onNavigate('home')} 
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" /> Kembali ke Home
                </button>
            </div>
        );
    }
    
    // Tips perawatan
    const { careTips } = pet;
    
    return (
        <div className="min-h-screen pb-20 p-4 pt-8 md:p-8 bg-gray-50">
            <button 
                onClick={() => onNavigate('home')} 
                className="text-indigo-600 hover:text-indigo-800 transition-colors mb-4 flex items-center font-medium"
            >
                <ChevronLeft className="w-5 h-5 mr-1" /> Kembali ke List Hewan
            </button>
            
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <img 
                    src={pet.imageUrl} 
                    alt={pet.name} 
                    className="w-full h-64 object-cover" 
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/6366f1/ffffff?text=Paw+Care+Detail" }}
                />
                
                <div className="p-6 md:p-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{pet.name}</h1>
                    <p className="text-xl font-semibold text-indigo-600 mb-6">{pet.type}</p>
                    
                    {/* Detail Teknis */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center bg-gray-50 p-4 rounded-lg">
                        <DetailInfo label="Jangka Umur" value={pet.lifespan} />
                        <DetailInfo label="Berat Umum" value={pet.weight} />
                         <DetailInfo label="Sifat Umum" value={pet.temperament} />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b pb-2">Deskripsi Hewan</h2>
                    <p className="text-gray-700 mb-10">{pet.description}</p>
                    
                    
                    <h2 className="text-2xl font-bold text-pink-600 mb-6 flex items-center border-b pb-2">
                         <ClipboardList className="w-6 h-6 mr-2" /> Tips Perawatan Lengkap ({pet.type})
                    </h2>

                    <div className="space-y-6">
                        <CareTipSection 
                            title="Cara Memandikan & Mengeringkan" 
                            content={careTips.bathing} 
                        />
                         <CareTipSection 
                            title="Jenis Makanan & Nutrisi" 
                            content={careTips.food} 
                        />
                         <CareTipSection 
                            title="Hal Berbahaya yang Harus Dihindari" 
                            content={careTips.danger} 
                            isDanger={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailInfo = ({ label, value }) => (
    <div className="p-2">
        <p className="text-xs font-semibold uppercase text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
);

export default DetailPage;