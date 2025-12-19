import React, { useState } from "react";
import { Mountain, Star, ArrowRight, ChevronLeft, CheckCircle } from "lucide-react";

const App = () => {
  const [page, setPage] = useState("home");
  const [selectedMountain, setSelectedMountain] = useState(null);

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    people: 1,
  });

  const [bookings, setBookings] = useState([]);

  /* ================= DATA GUNUNG (TETAP LENGKAP) ================= */
  const mountains = [
    { id: 1, name: "Gunung Rinjani", price: 250000, rating: 4.8, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" },
    { id: 2, name: "Gunung Semeru", price: 200000, rating: 4.9, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800" },
    { id: 3, name: "Gunung Bromo", price: 150000, rating: 4.7, image: "/bromo.jpg" },
    { id: 4, name: "Gunung Merbabu", price: 100000, rating: 4.6, image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800" },
    { id: 5, name: "Gunung Kerinci", price: 300000, rating: 4.8, image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800" },
    { id: 6, name: "Gunung Prau", price: 75000, rating: 4.5, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" },
  ];

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT BOOKING ================= */
  const handleBooking = () => {
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.date) {
      alert("Lengkapi semua data!");
      return;
    }

    const newBooking = {
      id: Date.now(),
      mountain: selectedMountain.name,
      ...bookingData,
      total: selectedMountain.price * bookingData.people,
      status: "MENUNGGU_PEMBAYARAN",
      va: "BCA 880812345678",
    };

    setBookings([...bookings, newBooking]);
    setPage("bookings");
  };

  /* ================= KONFIRMASI PEMBAYARAN ================= */
  const confirmPayment = (id) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: "LUNAS" } : b
    );
    setBookings(updated);
  };

  /* ================= HOME ================= */
  const Home = () => (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Booking Pendakian Gunung</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mountains.map((m) => (
          <div
            key={m.id}
            onClick={() => {
              setSelectedMountain(m);
              setPage("detail");
            }}
            className="bg-white rounded-xl shadow hover:shadow-xl cursor-pointer"
          >
            <img src={m.image} className="h-48 w-full object-cover rounded-t-xl" />
            <div className="p-4">
              <h3 className="font-bold">{m.name}</h3>
              <div className="flex items-center text-yellow-500 gap-1">
                <Star size={16} /> {m.rating}
              </div>
              <p className="text-green-600 font-bold mt-2">
                Rp {m.price.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ================= DETAIL ================= */
  const Detail = () => (
    <div className="max-w-md mx-auto p-6">
      <button onClick={() => setPage("home")} className="flex items-center gap-2 text-green-600 mb-4">
        <ChevronLeft /> Kembali
      </button>

      <h2 className="text-xl font-bold mb-4">Booking {selectedMountain.name}</h2>

      {["name", "email", "phone", "date", "people"].map((f) => (
        <input
          key={f}
          type={f === "date" ? "date" : f === "people" ? "number" : "text"}
          name={f}
          placeholder={f}
          value={bookingData[f]}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />
      ))}

      <button
        onClick={handleBooking}
        className="w-full bg-green-600 text-white py-3 rounded font-bold"
      >
        Bayar Sekarang
      </button>
    </div>
  );

  /* ================= RIWAYAT ================= */
  const Bookings = () => (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Riwayat Booking</h1>

      {bookings.map((b) => (
        <div key={b.id} className="bg-white p-6 rounded-xl shadow mb-4">
          <h2 className="font-bold">{b.mountain}</h2>
          <p>Nama: {b.name}</p>
          <p>Total: Rp {b.total.toLocaleString("id-ID")}</p>

          {b.status === "MENUNGGU_PEMBAYARAN" ? (
            <>
              <p className="mt-2 text-sm">
                Virtual Account: <strong>{b.va}</strong>
              </p>
              <button
                onClick={() => confirmPayment(b.id)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Saya Sudah Bayar
              </button>
            </>
          ) : (
            <div className="mt-4 bg-green-50 p-4 rounded-lg flex items-center gap-3">
              <CheckCircle className="text-green-600" />
              <div>
                <p className="font-bold text-green-700">Pembayaran Lunas</p>
                <p className="text-sm text-gray-600">Terima kasih, selamat mendaki! 🏔️</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {page === "home" && <Home />}
      {page === "detail" && <Detail />}
      {page === "bookings" && <Bookings />}
    </div>
  );
};

export default App;
