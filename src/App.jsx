import React, { useState, useEffect } from "react";
import {
  Mountain,
  ArrowRight,
  MapPin,
  Users,
  Calendar,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const mountainsData = [
  {
    id: 1,
    name: "Gunung Bromo",
    location: "Jawa Timur",
    price: 350000,
    image: "/bromo.jpg",
  },
  {
    id: 2,
    name: "Gunung Rinjani",
    location: "NTB",
    price: 550000,
    image: "/rinjani.jpg",
  },
  {
    id: 3,
    name: "Gunung Semeru",
    location: "Jawa Timur",
    price: 450000,
    image: "/semeru.jpg",
  },
  {
    id: 4,
    name: "Gunung Prau",
    location: "Jawa Tengah",
    price: 250000,
    image: "/prau.jpg",
  },
  {
    id: 5,
    name: "Gunung Merbabu",
    location: "Jawa Tengah",
    price: 300000,
    image: "/merbabu.jpg",
  },
  {
    id: 6,
    name: "Gunung Ijen",
    location: "Jawa Timur",
    price: 200000,
    image: "/ijen.jpg",
  },
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [bookings, setBookings] = useState([]);

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    people: 1,
  });

  /* ===== NAVBAR ACTIVE SCROLL ===== */
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "mountains", "contact"];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveMenu(id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== BOOKING ===== */
  const handleBooking = () => {
    if (
      !bookingData.name ||
      !bookingData.email ||
      !bookingData.phone ||
      !bookingData.date
    ) {
      alert("Lengkapi semua data!");
      return;
    }

    const newBooking = {
      id: Date.now(),
      mountain: selectedMountain.name,
      total:
        selectedMountain.price * bookingData.people,
      ...bookingData,
      status: "MENUNGGU_PEMBAYARAN",
      va: "BCA 880812341234",
    };

    setBookings([...bookings, newBooking]);
    setSelectedMountain(null);
    setBookingData({
      name: "",
      email: "",
      phone: "",
      date: "",
      people: 1,
    });
  };

  return (
    <div className="font-sans">

      {/* ===== NAVBAR ===== */}
      <header className="fixed top-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              document
                .getElementById("home")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            <Mountain className="text-green-600" />
            <span className="font-bold text-xl">
              BookingGunung.id
            </span>
          </div>

          <nav className="flex gap-6 font-medium">
            {["home", "mountains", "contact"].map((m) => (
              <button
                key={m}
                onClick={() =>
                  document
                    .getElementById(m)
                    .scrollIntoView({ behavior: "smooth" })
                }
                className={`${
                  activeMenu === m
                    ? "text-green-600"
                    : "text-gray-600"
                } hover:text-green-600`}
              >
                {m === "home"
                  ? "Beranda"
                  : m === "mountains"
                  ? "Menu Gunung"
                  : "Kontak"}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section
        id="home"
        className="h-[500px] pt-24 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/ack.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div
          className="bg-black/50 p-10 rounded-xl text-center"
          style={{
            backgroundImage: "url('/mountains.jpg')",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Jelajahi Puncak Indonesia
          </h1>
          <p>
            Booking tiket pendakian gunung favoritmu
            dengan mudah dan aman
          </p>
        </div>
      </section>

      {/* ===== LIST GUNUNG ===== */}
      <section id="mountains" className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {mountainsData.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={m.image}
                alt={m.name}
                className="h-48 w-full object-cover rounded-t-xl"
              />
              <div className="p-5">
                <h3 className="font-bold text-lg">
                  {m.name}
                </h3>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <MapPin size={14} /> {m.location}
                </p>
                <p className="mt-2 font-semibold">
                  Rp {m.price.toLocaleString()}
                </p>
                <button
                  onClick={() => setSelectedMountain(m)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded"
                >
                  Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BOOKING FORM ===== */}
      {selectedMountain && (
        <section className="bg-gray-100 py-12">
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl">
            <h2 className="font-bold text-xl mb-4">
              Booking {selectedMountain.name}
            </h2>

            <input
              placeholder="Nama"
              className="input"
              value={bookingData.name}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  name: e.target.value,
                })
              }
            />
            <input
              placeholder="Email"
              className="input"
              value={bookingData.email}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  email: e.target.value,
                })
              }
            />
            <input
              placeholder="No HP"
              className="input"
              value={bookingData.phone}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  phone: e.target.value,
                })
              }
            />
            <input
              type="date"
              className="input"
              value={bookingData.date}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  date: e.target.value,
                })
              }
            />
            <button
              onClick={handleBooking}
              className="mt-4 bg-blue-600 text-white w-full py-2 rounded"
            >
              Bayar
            </button>
          </div>
        </section>
      )}

      {/* ===== RIWAYAT ===== */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-bold text-2xl mb-6">
          Riwayat Booking
        </h2>
        {bookings.map((b) => (
          <div
            key={b.id}
            className="border p-4 rounded mb-4"
          >
            <p>
              <strong>{b.mountain}</strong> – Rp{" "}
              {b.total.toLocaleString()}
            </p>
            {b.status === "MENUNGGU_PEMBAYARAN" ? (
              <>
                <p>VA: {b.va}</p>
                <button
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
                  onClick={() =>
                    setBookings(
                      bookings.map((x) =>
                        x.id === b.id
                          ? { ...x, status: "LUNAS" }
                          : x
                      )
                    )
                  }
                >
                  Saya Sudah Bayar
                </button>
              </>
            ) : (
              <p className="text-green-600 flex items-center gap-1">
                <CheckCircle size={16} /> LUNAS
              </p>
            )}
          </div>
        ))}
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        id="contact"
        className="bg-gray-800 text-white py-10"
      >
        <div className="text-center space-y-4">
          <p>support@bookinggunung.id</p>
          <div className="flex justify-center gap-6">
            <Facebook />
            <Instagram />
            <Twitter />
          </div>
          <p className="text-sm text-gray-400">
            © 2024 BookingGunung.id
          </p>
        </div>
      </footer>
    </div>
  );
}
