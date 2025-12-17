import React, { useState } from 'react';
import { Mountain, MapPin, Star, ArrowRight, ChevronLeft, CheckCircle } from 'lucide-react';

const App = () => {
  const [page, setPage] = useState('home');
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    people: 1
  });

  const mountains = [
    { id: 1, name: 'Gunung Rinjani', location: 'Lombok, NTB', price: 250000, rating: 4.8, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
    { id: 2, name: 'Gunung Semeru', location: 'Jawa Timur', price: 200000, rating: 4.9, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800' },
    { id: 3, name: 'Gunung Bromo', location: 'Jawa Timur', price: 150000, rating: 4.7, image: '/bromo.jpg' },
    { id: 4, name: 'Gunung Merbabu', location: 'Jawa Tengah', price: 100000, rating: 4.6, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800' },
    { id: 5, name: 'Gunung Kerinci', location: 'Jambi', price: 300000, rating: 4.8, image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800' },
    { id: 6, name: 'Gunung Prau', location: 'Jawa Tengah', price: 75000, rating: 4.5, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' }
  ];

  const total = selectedMountain ? selectedMountain.price * form.people : 0;
  const VA_NUMBER = '8808 8899 1234';

  const handlePay = () => {
    const booking = {
      id: Date.now(),
      mountain: selectedMountain.name,
      name: form.name,
      phone: form.phone,
      date: form.date,
      people: form.people,
      total,
      va: VA_NUMBER,
      status: 'Lunas'
    };
    setBookings([...bookings, booking]);
    setCurrentBooking(booking);
    setPage('success');
  };

  /* ================= UI ================= */

  const Home = () => (
    <>
      <section
        className="relative h-[520px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/ack.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-white text-center max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">Jelajahi Puncak Indonesia</h1>
          <p className="mb-8 text-lg">
            Pesan tiket pendakian resmi dengan pembayaran aman
          </p>
          <button
            onClick={() => document.getElementById('mountains').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-green-600 px-10 py-3 rounded-full font-semibold"
          >
            Mulai Booking
          </button>
        </div>
      </section>

      <div id="mountains" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10">Gunung Populer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mountains.map(m => (
            <div key={m.id}
              className="bg-white rounded-xl shadow hover:shadow-xl cursor-pointer"
              onClick={() => { setSelectedMountain(m); setPage('detail'); }}
            >
              <img src={m.image} className="h-48 w-full object-cover rounded-t-xl" />
              <div className="p-5">
                <h3 className="font-bold text-lg">{m.name}</h3>
                <p className="text-gray-500">{m.location}</p>
                <div className="flex justify-between mt-3">
                  <span className="text-green-600 font-bold">Rp {m.price.toLocaleString()}</span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" /> {m.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const Detail = () => (
    <div className="container mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">
      <div>
        <img src={selectedMountain.image} className="rounded-xl mb-6" />
        <h1 className="text-3xl font-bold">{selectedMountain.name}</h1>
        <p className="text-gray-500 flex items-center gap-2">
          <MapPin /> {selectedMountain.location}
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Data Pendaki</h2>

        <input className="w-full border p-3 mb-3 rounded"
          placeholder="Nama Lengkap"
          onChange={e => setForm({ ...form, name: e.target.value })} />

        <input className="w-full border p-3 mb-3 rounded"
          placeholder="No. HP"
          onChange={e => setForm({ ...form, phone: e.target.value })} />

        <input type="date" className="w-full border p-3 mb-3 rounded"
          onChange={e => setForm({ ...form, date: e.target.value })} />

        <input type="number" min="1" className="w-full border p-3 mb-5 rounded"
          placeholder="Jumlah Pendaki"
          onChange={e => setForm({ ...form, people: Number(e.target.value) })} />

        <div className="flex justify-between font-bold mb-4">
          <span>Total</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>

        <button
          onClick={() => setPage('payment')}
          className="w-full bg-green-600 text-white py-3 rounded-lg">
          Lanjutkan Pembayaran
        </button>
      </div>
    </div>
  );

  const Payment = () => (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow text-center w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Virtual Account</h2>
        <p className="text-lg mb-2">Bank BCA</p>
        <p className="text-2xl font-bold mb-6">{VA_NUMBER}</p>
        <p className="mb-6">Total: <strong>Rp {total.toLocaleString()}</strong></p>

        <button
          onClick={handlePay}
          className="bg-green-600 text-white py-3 w-full rounded-lg">
          Konfirmasi Pembayaran
        </button>
      </div>
    </div>
  );

  const Success = () => (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow max-w-xl text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Pembayaran Berhasil</h1>

        <div className="text-left text-sm bg-gray-50 p-4 rounded mb-6">
          <p><strong>Nama:</strong> {currentBooking.name}</p>
          <p><strong>Gunung:</strong> {currentBooking.mountain}</p>
          <p><strong>Tanggal:</strong> {currentBooking.date}</p>
          <p><strong>Jumlah:</strong> {currentBooking.people} orang</p>
          <p><strong>VA:</strong> {currentBooking.va}</p>
          <p><strong>Status:</strong> {currentBooking.status}</p>
        </div>

        <button
          onClick={() => setPage('home')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg">
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {page === 'home' && <Home />}
      {page === 'detail' && <Detail />}
      {page === 'payment' && <Payment />}
      {page === 'success' && <Success />}
    </div>
  );
};

export default App;
