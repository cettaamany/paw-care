import { createClient } from '@supabase/supabase-js';
import { MOCK_PET_DATA, MOCK_ADOPTION_DATA } from './mockData';

// --- KONFIGURASI SUPABASE ---
// PENTING: Ganti nilai placeholder ini dengan kredensial Supabase Anda yang sebenarnya
const SUPABASE_URL = 'https://trkzgmeukiyxqozrssin.supabase.co'; // Contoh URL Supabase Anda
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRya3pnbWV1a2l5eHFvenJzc2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDYwMDMsImV4cCI6MjA4MDA4MjAwM30.lXM4oN18bc8lNeaxKZuziDc36K22MVyVy_9l8FYORfM'; // Ganti dengan Anon Key Anda

// Inisialisasi Klien Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const TABLE_NAME = 'pets_data'; // Nama tabel utama Anda

// --- LOGIKA API UTAMA ---

export const fetchPetsData = async () => {
    try {
        // Ambil data Hewan (Kucing, Anjing, Hamster). Filter berdasarkan kolom 'type'.
        const { data: pets, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .in('type', ['Kucing', 'Anjing', 'Hamster']);
            
        if (error) throw error;

        console.log("Data Hewan dari Supabase:", pets);
        // Jika Supabase mengembalikan data, gunakan itu; jika tidak, gunakan mock data
        return pets.length > 0 ? pets : MOCK_PET_DATA; 
        
    } catch (e) {
        console.error("Error fetching pets from Supabase, returning mock data:", e);
        // Fallback: Jika ada error (misalnya koneksi, key salah), gunakan mock data.
        return MOCK_PET_DATA;
    }
};

export const fetchAdoptionShelters = async () => {
    try {
        // Ambil data Shelter. Filter berdasarkan type = 'RescueShelter'.
        const { data: shelters, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('type', 'RescueShelter'); // Hanya ambil data yang bertipe 'RescueShelter'
            
        if (error) throw error;

        console.log("Data Shelter Adopsi dari Supabase:", shelters);
        return shelters.length > 0 ? shelters : MOCK_ADOPTION_DATA;

    } catch (e) {
        console.error("Error fetching shelters from Supabase, returning mock data:", e);
        // Fallback
        return MOCK_ADOPTION_DATA;
    }
};


/**
 * Fungsi utilitas untuk inisialisasi data mock ke Supabase jika tabel kosong.
 * Ini hanya untuk mempermudah setup awal di database.
 */
export const initializeSupabaseData = async () => {
    try {
        // Cek apakah sudah ada data di tabel
        const { data: existingData, error: checkError } = await supabase
            .from(TABLE_NAME)
            .select('id', { count: 'exact' }) // Ambil hitungan data yang ada
            .limit(1);

        if (checkError) throw checkError;
        
        // Jika tabel kosong, masukkan semua data mock
        if (existingData.length === 0) {
            console.log("Tabel Supabase kosong, memulai inisialisasi data mock...");
            
            // Gabungkan data hewan dan shelter
            const allMockData = [...MOCK_PET_DATA, ...MOCK_ADOPTION_DATA];
            
            const { error: insertError } = await supabase
                .from(TABLE_NAME)
                .insert(allMockData); // Lakukan insert semua data sekaligus

            if (insertError) throw insertError;
            
            console.log("Inisialisasi data mock ke Supabase berhasil.");
        }
    } catch (e) {
        console.error("Gagal menginisialisasi data Supabase. Pastikan RLS diatur dengan benar.", e);
    }
};