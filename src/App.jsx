// src/App.jsx

import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS untuk layout
import { supabase } from './supabaseClient'; // Import client Supabase

function App() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGuides() {
      // 1. Set status loading
      setLoading(true);
      setError(null);
      
      // 2. Ambil data dari tabel 'guides'
      let { data, error } = await supabase
        .from('guides') // Ganti 'guides' jika nama tabel kamu berbeda
        .select('*');

      // 3. Cek Error
      if (error) {
        console.error('Error fetching data:', error);
        setError('Gagal mengambil data dari Supabase: ' + error.message);
      } else {
        // 4. Set data ke state
        setGuides(data);
      }
      
      // 5. Matikan loading
      setLoading(false);
    }

    fetchGuides();
  }, []); // Array kosong berarti fungsi ini hanya berjalan sekali (saat komponen pertama kali dimuat)

  return (
    <div className="App-Container"> {/* Menggunakan class untuk centering */}
      
      <header style={{ textAlign: 'center', padding: '20px 0' }}>
        <h1>Paw Guide 🐾</h1>
        <p>Aplikasi ini memuat data dari Supabase.</p>
        <hr />
      </header>

      <main>
        {loading && <p className="loading-message">Memuat data panduan...</p>}
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}

        {/* Menampilkan Daftar Panduan */}
        {!loading && !error && guides.length > 0 ? (
            guides.map(guide => (
                <div key={guide.id} className="guide-item">
                    <h2>{guide.title}</h2>
                    <p>{guide.content}</p>
                </div>
            ))
        ) : (
             // Jika tidak ada data dan tidak sedang loading/error
             !loading && !error && <p className="loading-message">Tidak ada panduan yang ditemukan.</p>
        )}
      </main>

    </div>
  );
}

export default App;