import React, { useState } from "react";
import {
  Mountain,
  MapPin,
  Star,
  ArrowRight,
  ChevronLeft,
  Phone,
  Mail
} from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [bookings, setBookings] = useState([]);

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    people: 1
  });

  /* ================= DATA GUNUNG ================= */
  const mountains = [
    {
      id: 1,
      name: "Gunung Rinjani",
      location: "Lombok, NTB",
      height: "3.726 mdpl",
      price: 250000,
      difficulty: "Sulit",
      rating: 4.8,
      image: "/rinjani.jpg"
    },
    {
      id: 2,
      name: "Gunung Semeru",
      location: "Lumajang, Jawa Timur",
      height: "3.676 mdpl",
      price: 200000,
      difficulty: "Sulit",
      rating: 4.9,
      image: "/semeru.jpg"
    },
    {
      id: 3,
      name: "Gunung Bromo",
      location: "Probolinggo, Jawa Timur",
      height: "2.329 mdpl",
      price: 150000,
      difficulty: "Mudah",
      rating: 4.7,
      image: "/bromo.jpg"
    },
    {
      id: 4,
      name: "Gunung Merbabu",
      location: "Magelang, Jawa Tengah",
      height: "3.145 mdpl",
      price: 100000,
      difficulty: "Sedang",
      rating: 4.6,
      image: "/Merbabu.jpg"
    },
    {
      id: 5,
      name: "Gunung Kerinci",
      location: "Jambi, Sumatera",
      height: "3.805 mdpl",
      price: 300000,
      difficulty: "Sulit",
      rating: 4.8,
      image: "/ijen.jpg"
    },
    {
      id: 6,
      name: "Gunung Prau",
      location: "Wonosobo, Jawa Tengah",
      height: "2.565 mdpl",
      price: 75000,
      difficulty: "Mudah",
      rating: 4.5,
      image: "/prau.jpg"
    }
  ];

  /* ================= BOOKING ================= */
  const handlePayment = () => {
    if (
      !bookingData.name ||
      !bookingData.email ||
      !bookingData.phone ||
      !bookingData.date
    ) {
      alert("Lengkapi semua data terlebih dahulu");
      return;
    }

    const newBooking = {
      id: Date.now(),
      mountain: selectedMountain.name,
      ...bookingData,
      total:
        selectedMountain.price * bookingData.people,
      status: "LUNAS",
      va: "8808 1234 5678 9012"
    };

    setBookings([...bookings, newBooking]);
    setCurrentPage("bookings");
    setBookingData({
      name: "",
      email: "",
      phone: "",
      date: "",
      people: 1
    });
  };

  /* ================= NAVBAR ================= */
  const Navbar = () => (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setCurrentPage("home")}
        >
          <Mountain className="text-green-600" />
          <span className="font-bold text-xl">
            BookingGunung.id
          </span>
        </div>

        <div className="flex gap-6 font-semibold">
          <button
            onClick={() => setCurrentPage("home")}
            className="hover:text-green-600"
          >
            Beranda
          </button>

          <button
            onClick={() => {
              setCurrentPage("home");
              setTimeout(() => {
                document
                  .getElementById("menu-gunung")
                  ?.scrollIntoView({
                    behavior: "smooth"
                  });
              }, 100);
            }}
            className="hover:text-green-600"
          >
            Menu Gunung
          </button>

          <button
            onClick={() =>
              document
                .getElementById("kontak")
                ?.scrollIntoView({
                  behavior: "smooth"
                })
            }
            className="hover:text-green-600"
          >
            Kontak
          </button>
        </div>
      </div>
    </nav>
  );

  /* ================= HOME ================= */
  const Home = () => (
    <>
      {/* HERO */}
      {/* HERO SECTION */}
<section
  className="relative h-[520px] w-full flex items-center justify-center"
  style={{
    backgroundImage: "url('/ack.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay gelap seperti Traveloka */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Konten */}
  <div className="relative z-10 text-center px-4">

    {/* Box konten (glass effect) */}
    <div className="mx-auto max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl px-10 py-10 shadow-2xl border border-white/20">
      <h1 className="text-5xl font-bold text-white mb-4">
        Jelajahi Puncak Indonesia
      </h1>
      <p className="text-lg text-gray-100">
        Booking tiket pendakian gunung favoritmu dengan mudah & aman
      </p>
    </div>

    {/* Button */}
    <button
      onClick={() =>
        document
          .getElementById("list-gunung")
          ?.scrollIntoView({ behavior: "smooth" })
      }
      className="mt-8 bg-white text-green-600 px-10 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2 shadow-lg"
    >
      Mulai Petualangan <ArrowRight className="w-5 h-5" />
    </button>
  </div>
</section>


      {/* LIST GUNUNG */}
      <section
        id="menu-gunung"
        className="container mx-auto px-6 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Gunung Populer
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {mountains.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-xl shadow hover:shadow-xl cursor-pointer"
              onClick={() => {
                setSelectedMountain(m);
                setCurrentPage("detail");
              }}
            >
              <img
                src={m.image}
                className="h-48 w-full object-cover rounded-t-xl"
              />
              <div className="p-5">
                <h3 className="font-bold text-xl">
                  {m.name}
                </h3>
                <p className="text-sm text-gray-500 flex gap-1 items-center">
                  <MapPin size={14} /> {m.location}
                </p>
                <div className="flex justify-between mt-3">
                  <span className="text-green-600 font-bold">
                    Rp {m.price.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} /> {m.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  /* ================= DETAIL ================= */
  const Detail = () => (
    <div className="container mx-auto px-6 py-10">
      <button
        onClick={() => setCurrentPage("home")}
        className="flex gap-2 mb-6 text-green-600"
      >
        <ChevronLeft /> Kembali
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={selectedMountain.image}
          className="rounded-xl shadow"
        />

        <div>
          <h2 className="text-3xl font-bold mb-2">
            {selectedMountain.name}
          </h2>
          <p className="text-gray-600 mb-4">
            {selectedMountain.location}
          </p>

          <div className="space-y-3">
            <input
              placeholder="Nama Lengkap"
              className="w-full border p-3 rounded"
              value={bookingData.name}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  name: e.target.value
                })
              }
            />
            <input
              placeholder="Email"
              className="w-full border p-3 rounded"
              value={bookingData.email}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  email: e.target.value
                })
              }
            />
            <input
              placeholder="No HP"
              className="w-full border p-3 rounded"
              value={bookingData.phone}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  phone: e.target.value
                })
              }
            />
            <input
              type="date"
              className="w-full border p-3 rounded"
              value={bookingData.date}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  date: e.target.value
                })
              }
            />
            <input
              type="number"
              min="1"
              className="w-full border p-3 rounded"
              value={bookingData.people}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  people: Number(e.target.value)
                })
              }
            />

            <button
              onClick={handlePayment}
              className="w-full bg-green-600 text-white py-3 rounded font-bold"
            >
              Bayar & Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ================= BOOKINGS ================= */
  const Bookings = () => (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">
        Riwayat Booking
      </h2>

      {bookings.length === 0 && (
        <p className="text-gray-500">
          Belum ada booking
        </p>
      )}

      <div className="space-y-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h3 className="font-bold text-xl mb-2">
              {b.mountain}
            </h3>
            <p>Nama: {b.name}</p>
            <p>Total: Rp {b.total.toLocaleString()}</p>
            <p className="text-green-600 font-bold">
              Status: {b.status}
            </p>
            <p className="text-sm text-gray-500">
              VA BCA: {b.va}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  /* ================= FOOTER ================= */
  const Footer = () => (
    <footer
      id="kontak"
      className="bg-gray-800 text-white py-10"
    >
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-xl font-bold mb-4">
          Kontak Kami
        </h3>
        <p className="flex justify-center gap-2">
          <Phone /> 0812-3456-7890
        </p>
        <p className="flex justify-center gap-2 mt-2">
          <Mail /> support@bookinggunung.id
        </p>
      </div>
    </footer>
  );

  return (
    <>
      <Navbar />
      {currentPage === "home" && <Home />}
      {currentPage === "detail" && <Detail />}
      {currentPage === "bookings" && <Bookings />}
      <Footer />
    </>
  );
}
