import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedMountain, setSelectedMountain] = useState(null);

  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    date: "",
    people: 1,
  });

  const [bookings, setBookings] = useState([]);

  const mountains = [
    { id: 1, name: "Gunung Bromo", price: 150000, image: "/bromo.jpg" },
    { id: 2, name: "Gunung Rinjani", price: 250000, image: "/rinjani.jpg" },
    { id: 3, name: "Gunung Semeru", price: 200000, image: "/semeru.jpg" },
  ];

  /* ==========================
     HANDLE INPUT (PENTING)
  ========================== */
  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  /* ==========================
     SUBMIT BOOKING
  ========================== */
  const handleBooking = () => {
    if (!bookingData.name || !bookingData.phone || !bookingData.date) {
      alert("Lengkapi semua data!");
      return;
    }

    const newBooking = {
      id: Date.now(),
      mountain: selectedMountain.name,
      ...bookingData,
      total: selectedMountain.price * bookingData.people,
      status: "Lunas",
      va: "8808 1234 5678",
    };

    setBookings([...bookings, newBooking]);
    setBookingData({ name: "", phone: "", date: "", people: 1 });
    setPage("history");
  };

  /* ==========================
     HOME
  ========================== */
  if (page === "home") {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Booking Pendakian</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {mountains.map((m) => (
            <div
              key={m.id}
              className="bg-white shadow rounded-xl cursor-pointer"
              onClick={() => {
                setSelectedMountain(m);
                setPage("detail");
              }}
            >
              <img src={m.image} className="h-40 w-full object-cover rounded-t-xl" />
              <div className="p-4">
                <h2 className="font-bold">{m.name}</h2>
                <p className="text-green-600 font-semibold">
                  Rp {m.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ==========================
     DETAIL & FORM
  ========================== */
  if (page === "detail") {
    return (
      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Booking {selectedMountain.name}
        </h1>

        <input
          name="name"
          placeholder="Nama Lengkap"
          value={bookingData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          name="phone"
          placeholder="No HP"
          value={bookingData.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="date"
          name="date"
          value={bookingData.date}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="number"
          name="people"
          min="1"
          value={bookingData.people}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleBooking}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Bayar & Booking
        </button>
      </div>
    );
  }

  /* ==========================
     RIWAYAT BOOKING
  ========================== */
  if (page === "history") {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Riwayat Booking</h1>

        {bookings.length === 0 ? (
          <p>Belum ada booking</p>
        ) : (
          bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white shadow rounded-xl p-6 mb-4"
            >
              <h2 className="font-bold">{b.mountain}</h2>
              <p>Nama: {b.name}</p>
              <p>No HP: {b.phone}</p>
              <p>Tanggal: {b.date}</p>
              <p>Pendaki: {b.people}</p>
              <p className="font-semibold text-green-600">
                Total: Rp {b.total.toLocaleString()}
              </p>
              <span className="inline-block mt-2 bg-green-100 text-green-700 px-4 py-1 rounded-full">
                {b.status}
              </span>
            </div>
          ))
        )}

        <button
          onClick={() => setPage("home")}
          className="mt-6 text-green-600 font-semibold"
        >
          ← Kembali ke Home
        </button>
      </div>
    );
  }
}
