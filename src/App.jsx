import React, { useState } from 'react';
import {
  Mountain,
  Calendar,
  MapPin,
  Star,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMountain, setSelectedMountain] = useState(null);

  const [bookings, setBookings] = useState([]);

  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    people: 1
  });

  /* ================== DATA GUNUNG (TIDAK DIKURANGI) ================== */
  const mountains = [
    {
      id: 1,
      name: 'Gunung Rinjani',
      location: 'Lombok, NTB',
      height: '3.726 mdpl',
      price: 250000,
      difficulty: 'Sulit',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    },
    {
      id: 2,
      name: 'Gunung Semeru',
      location: 'Lumajang, Jawa Timur',
      height: '3.676 mdpl',
      price: 200000,
      difficulty: 'Sulit',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'
    },
    {
      id: 3,
      name: 'Gunung Bromo',
      location: 'Probolinggo, Jawa Timur',
      height: '2.329 mdpl',
      price: 150000,
      difficulty: 'Mudah',
      rating: 4.7,
      image: '/bromo.jpg'
    },
    {
      id: 4,
      name: 'Gunung Merbabu',
      location: 'Magelang, Jawa Tengah',
      height: '3.145 mdpl',
      price: 100000,
      difficulty: 'Sedang',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800'
    },
    {
      id: 5,
      name: 'Gunung Kerinci',
      location: 'Jambi, Sumatera',
      height: '3.805 mdpl',
      price: 300000,
      difficulty: 'Sulit',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800'
    },
    {
      id: 6,
      name: 'Gunung Prau',
      location: 'Wonosobo, Jawa Tengah',
      height: '2.565 mdpl',
      price: 75000,
      difficulty: 'Mudah',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    }
  ];

  /* ================== HANDLE INPUT ================== */
  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  /* ================== HANDLE BOOKING ================== */
  const handleBooking = () => {
    if (
      !bookingData.name ||
      !bookingData.email ||
      !bookingData.phone ||
      !bookingData.date
    ) {
      alert('Lengkapi semua data booking!');
      return;
    }

    const newBooking = {
      id: Date.now(),
      mountain: selectedMountain.name,
      ...bookingData,
      totalPrice: selectedMountain.price * bookingData.people,
      paymentStatus: 'LUNAS',
      virtualAccount: '8808 1234 5678'
    };

    setBookings([...bookings, newBooking]);

    setBookingData({
      name: '',
      email: '',
      phone: '',
      date: '',
      people: 1
    });

    setCurrentPage('bookings');
  };

  /* ================== HOME ================== */
  const renderHome = () => (
    <div>
      <section
        className="relative h-[520px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/ack.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">
            Jelajahi Puncak Indonesia
          </h1>
          <p className="text-lg mb-8">
            Booking tiket pendakian gunung favoritmu dengan mudah dan aman
          </p>
          <button
            onClick={() =>
              document.getElementById('mountains').scrollIntoView({ behavior: 'smooth' })
            }
            className="bg-white text-green-600 px-10 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto"
          >
            Mulai Petualangan <ArrowRight />
          </button>
        </div>
      </section>

      <div id="mountains" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Gunung Populer di Indonesia
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mountains.map((m) => (
            <div
              key={m.id}
              onClick={() => {
                setSelectedMountain(m);
                setCurrentPage('detail');
              }}
              className="bg-white rounded-xl shadow hover:shadow-xl cursor-pointer overflow-hidden"
            >
              <img src={m.image} className="h-48 w-full object-cover" />
              <div className="p-6">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold">{m.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} />
                    {m.rating}
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{m.location}</p>
                <p className="text-green-600 font-bold mt-3">
                  Rp {m.price.toLocaleString('id-ID')} / orang
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ================== DETAIL ================== */
  const renderDetail = () => (
    <div className="container mx-auto px-4 py-10 max-w-xl">
      <button
        onClick={() => setCurrentPage('home')}
        className="flex items-center gap-2 text-green-600 mb-6"
      >
        <ChevronLeft /> Kembali
      </button>

      <img
        src={selectedMountain.image}
        className="h-60 w-full object-cover rounded-xl mb-6"
      />

      <h1 className="text-2xl font-bold mb-4">
        Booking {selectedMountain.name}
      </h1>

      <input name="name" placeholder="Nama Lengkap" value={bookingData.name}
        onChange={handleChange} className="input" />
      <input name="email" placeholder="Email" value={bookingData.email}
        onChange={handleChange} className="input" />
      <input name="phone" placeholder="No HP" value={bookingData.phone}
        onChange={handleChange} className="input" />
      <input type="date" name="date" value={bookingData.date}
        onChange={handleChange} className="input" />
      <input type="number" min="1" name="people" value={bookingData.people}
        onChange={handleChange} className="input" />

      <button
        onClick={handleBooking}
        className="w-full bg-green-600 text-white py-3 rounded-lg mt-4"
      >
        Bayar & Booking
      </button>
    </div>
  );

  /* ================== BOOKINGS ================== */
  const renderBookings = () => (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Riwayat Booking</h1>

      {bookings.map((b) => (
        <div key={b.id} className="bg-white p-6 rounded-xl shadow mb-4">
          <h2 className="font-bold">{b.mountain}</h2>
          <p>Nama: {b.name}</p>
          <p>Email: {b.email}</p>
          <p>No HP: {b.phone}</p>
          <p>Tanggal: {b.date}</p>
          <p>Jumlah: {b.people} orang</p>
          <p className="font-bold text-green-600">
            Total: Rp {b.totalPrice.toLocaleString('id-ID')}
          </p>
          <p className="mt-2 text-sm">
            VA Pembayaran: <strong>{b.virtualAccount}</strong>
          </p>
          <span className="inline-block mt-2 bg-green-100 text-green-700 px-4 py-1 rounded-full">
            {b.paymentStatus}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' && renderHome()}
      {currentPage === 'detail' && renderDetail()}
      {currentPage === 'bookings' && renderBookings()}
    </div>
  );
};

export default App;
