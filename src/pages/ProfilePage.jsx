import React from 'react';
import { User, Info, Settings, LogOut } from 'lucide-react';

const ProfilePage = ({ userId, auth }) => {
    
    // Fungsi untuk LogOut
    const handleLogout = () => {
        if (auth) {
            auth.signOut().then(() => {
                window.location.reload(); // Reload untuk sign in anonim baru
            }).catch(error => {
                console.error("Error signing out:", error);
            });
        }
    }

    return (
        <div className="min-h-screen pb-20 p-4 pt-8 md:p-8 bg-gray-50">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-blue-200 pb-2 flex items-center">
                <User className="w-7 h-7 mr-2 text-blue-600" /> Profil & Pengaturan Aplikasi
            </h1>
            
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-t-4 border-blue-500">
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center"><Settings className='w-5 h-5 mr-2 text-blue-500'/> Informasi Pengguna</h2>
                <div className="space-y-2 text-gray-700 text-sm break-all">
                    <p className='font-semibold'>ID Pengguna (Auth Session):</p>
                    <p className="p-2 bg-gray-100 rounded-md font-mono text-xs select-all border border-gray-200">{userId || 'User ID tidak tersedia (Loading)'}</p>
                    <p className='text-xs text-gray-500'>ID ini digunakan untuk autentikasi dan akses data di database (sesuai security rules).</p>
                </div>
                
                <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center"
                    disabled={!userId}
                >
                    <LogOut className='w-4 h-4 mr-2'/> Keluar / Ganti Akun
                </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center"><Info className='w-5 h-5 mr-2 text-indigo-500'/> Tentang Aplikasi "Paw Care"</h2>
                <p className="text-gray-700 mb-4">
                    Paw Care adalah Progressive Web App (PWA) yang dibangun dengan React dan Vite. Tujuannya adalah menyediakan panduan perawatan hewan peliharaan yang mudah diakses dan dapat diinstal di perangkat Anda.
                </p>
                
                <h3 className='font-bold text-gray-700 mt-4 mb-2'>Persyaratan Modul:</h3>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    <li>**API/Web Service:** Data dimuat dari Firestore (pengganti Supabase) sebagai API buatan sendiri.</li>
                    <li>**Minimal 5 Halaman:** Home (List), Detail (List+Detail), Adopsi, Profile (Terpenuhi).</li>
                    <li>**Navigasi:** Bottom Navigation Bar responsif.</li>
                </ul>
            </div>
        </div>
    );
};

export default ProfilePage;