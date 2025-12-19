import React, { useState } from "react";
import {
  Mountain,
  MapPin,
  Calendar,
  Users,
  Star,
  ArrowLeft,
} from "lucide-react";

const mountainsData = [
  {
    id: 1,
    name: "Gunung Rinjani",
    location: "Lombok, NTB",
    height: "3.726 mdpl",
    price: 250000,
    rating: 4.8,
    image: "/rinjani.jpg",
  },
  {
    id: 2,
    name: "Gunung Semeru",
    location: "Lumajang, Jawa Timur",
    height: "3.676 mdpl",
    price: 200000,
    rating: 4.9,
    image: "/semeru.jpg",
  },
  {
    id: 3,
    name: "Gunung Bromo",
    location: "Probolinggo, Jawa Timur",
    height: "2.329 mdpl",
    price: 150000,
    rating: 4.7,
    image: "/bromo.jpg",
  },
  {
    id: 4,
    name: "Gunung Prau",
    location: "Dieng, Jawa Tengah",
    height: "2.565 mdpl",
    price: 120000,
    rating: 4.6,
    image: "/prau.jpg",
  },
  {
    id: 5,
    name: "Gunung Merbabu",
    location: "Magelang, Jawa Tengah",
    height: "3.145 mdpl",
    price: 180000,
    rating: 4.8,
    image: "/merbabu.jpg",
  },
  {
    id: 6,
    name: "Gunung Ijen",
    location: "Banyuwangi, Jawa Timur",
    height: "2.386 mdpl",
    price: 130000,
    rating: 4.7,
    image: "/ijen.jpg",
  },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [bookings, setBookings] = useState([]);

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    people: 1,
  });

  const handleBooking = () => {
    const newBooking = {
      id: Date.now(),
      mountain: selectedMountain,
      ...bookingData,
      total: selectedMountain.price * bookingData.people,
      status: "MENUNGGU PEMBAYARAN",
      va: "8808123456789",
    };

    setBookings([...bookings, newBooking]);
    setPage("history");
    setBookingData({
      name: "",
      email: "",
      phone: "",
      date: "",
      people: 1,
    });
  };

  const handlePayment = (id) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: "LUNAS" } : b
      )
    );
  };

  return (
    <div className="font-sans">
      {/* NAVBAR */}
      <header className="fixed w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl text-green-600">
            <Mountain />
            BookingGunung.id
          </div>
          <nav className="flex gap-6 font-medium">
            <button onClick={() => setPage("home")} className="hover:text-green-600">
              Beranda
            </button>
            <button onClick={() => setPage("menu")} className="hover:text-green-600">
              Menu Gunung
            </button>
            <button onClick={() => setPage("history")} className="hover:text-green-600">
              Riwayat Booking
            </button>
            <button onClick={() => setPage("contact")} className="hover:text-green-600">
              Kontak
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      {page === "home" && (
        <>
          <section
            className="h-[520px] pt-28 flex items-center justify-center text-white relative"
            style={{
              backgroundImage: "url('/ack.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl text-center max-w-3xl">
              <h1 className="text-5xl font-bold mb-4">
                Jelajahi Puncak Indonesia
              </h1>
              <p className="text-lg">
                Booking tiket pendakian gunung favoritmu dengan mudah dan aman
              </p>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center mb-10">
              Gunung Populer di Indonesia
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {mountainsData.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
                >
                  <img src={m.image} alt={m.name} className="h-48 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="font-bold text-lg">{m.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={14} /> {m.location}
                    </p>
                    <p className="text-sm mt-1">{m.height}</p>

                    <div className="flex justify-between items-center mt-3">
                      <span className="text-green-600 font-bold">
                        Rp {m.price.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <Star size={14} className="text-yellow-500" /> {m.rating}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedMountain(m);
                        setPage("booking");
                      }}
                      className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                      Booking Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* BOOKING */}
      {page === "booking" && selectedMountain && (
        <section className="max-w-xl mx-auto pt-32 px-6">
          <button onClick={() => setPage("home")} className="flex items-center gap-2 mb-6">
            <ArrowLeft /> Kembali
          </button>

          <h2 className="text-2xl font-bold mb-4">
            Booking {selectedMountain.name}
          </h2>

          <div className="bg-white shadow rounded-xl p-6 space-y-4">
            <input
              placeholder="Nama Lengkap"
              className="w-full border p-2 rounded"
              value={bookingData.name}
              onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
            />
            <input
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={bookingData.email}
              onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
            />
            <input
              placeholder="No HP"
              className="w-full border p-2 rounded"
              value={bookingData.phone}
              onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
            />
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={bookingData.date}
              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
            />
            <input
              type="number"
              min="1"
              className="w-full border p-2 rounded"
              value={bookingData.people}
              onChange={(e) =>
                setBookingData({ ...bookingData, people: Number(e.target.value) })
              }
            />

            <p className="font-bold">
              Total: Rp{" "}
              {(selectedMountain.price * bookingData.people).toLocaleString()}
            </p>

            <button
              onClick={handleBooking}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Bayar & Booking
            </button>
          </div>
        </section>
      )}

      {/* RIWAYAT */}
      {page === "history" && (
        <section className="max-w-4xl mx-auto pt-32 px-6">
          <h2 className="text-2xl font-bold mb-6">Riwayat Booking</h2>

          {bookings.length === 0 && <p>Belum ada booking.</p>}

          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="border rounded-xl p-5">
                <h3 className="font-bold">{b.mountain.name}</h3>
                <p>{b.name} • {b.people} orang</p>
                <p>Total: Rp {b.total.toLocaleString()}</p>
                <p>Status: <b>{b.status}</b></p>
                <p>VA BCA: <b>{b.va}</b></p>

                {b.status !== "LUNAS" && (
                  <button
                    onClick={() => handlePayment(b.id)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Konfirmasi Pembayaran
                  </button>
                )}

                {b.status === "LUNAS" && (
                  <p className="mt-2 text-green-600 font-semibold">
                    Pembayaran berhasil. Terima kasih 🙏
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* KONTAK */}
      {page === "contact" && (
        <footer className="pt-32 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Kontak Kami</h2>
          <p>Email: support@bookinggunung.id</p>
          <p>WhatsApp: 0812-3456-7890</p>
        </footer>
      )}
    </div>
  );
}
