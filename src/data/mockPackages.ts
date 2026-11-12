export type PackageCategory =
  | "UMRAH_REGULER"
  | "UMRAH_VIP"
  | "UMRAH_PLUS"
  | "HAJI_KHUSUS"
  | "HAJI_FURODA";

export interface DepartureItem {
  id: string;
  departureDate: string;
  durationDays: number;
  priceQuad: number;
  priceTriple: number;
  priceDouble: number;
  totalSeats: number;
  availableSeats: number;
}

export interface PackageItem {
  id: string;
  title: string;
  slug: string;
  category: PackageCategory;
  description: string;
  hotelMakkah: string;
  hotelMadinah: string;
  airline: string;
  imageUrl?: string | null;
  includes: string[];
  excludes: string[];
  isActive: boolean;
  departures: DepartureItem[];
}

export const mockPackagesData: PackageItem[] = [
  {
    id: "pkg-001",
    title: "Umrah Reguler Barokah",
    slug: "umrah-reguler-barokah",
    category: "UMRAH_REGULER",
    description: "Perjalanan umrah hemat dengan bimbingan ibadah sesuai sunnah",
    hotelMakkah: "Sofwah",
    hotelMadinah: "Anwar Al Madinah",
    airline: "Air Asia",
    imageUrl:
      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1000&auto=format&fit=crop",
    includes: ["Air Zamzam 5L", "Perlengkapan & Mukena", "Visa & Asuransi"],
    excludes: ["Paspor & Vaksin", "Pengeluaran Pribadi"],
    isActive: true,
    departures: [
      {
        id: "dep-001",
        departureDate: "2026-12-10T00:00:00.000Z",
        durationDays: 9,
        priceQuad: 28500000,
        priceTriple: 30500000,
        priceDouble: 32500000,
        totalSeats: 45,
        availableSeats: 28,
      },
    ],
  },
  {
    id: "pkg-002",
    title: "Umrah Eksekutif VVIP",
    slug: "umrah-eksekutif-vvip",
    category: "UMRAH_VIP",
    description: "Kenyamanan hotel bintang 5 pelataran Masjidil Haram & Nabawi",
    hotelMakkah: "Pullman Zamzam",
    hotelMadinah: "Oberoi Madinah",
    airline: "Saudia Airlines",
    imageUrl:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop",
    includes: ["Hotel Ring 1 Pelataran", "Kereta Cepat Haramain", "Fullboard Menu Indo"],
    excludes: ["Pembuatan Paspor", "Kelebihan Bagasi"],
    isActive: true,
    departures: [
      {
        id: "dep-002",
        departureDate: "2026-12-22T00:00:00.000Z",
        durationDays: 12,
        priceQuad: 38500000,
        priceTriple: 41000000,
        priceDouble: 44500000,
        totalSeats: 35,
        availableSeats: 14,
      },
    ],
  },
  {
    id: "pkg-003",
    title: "Haji Khusus Furoda",
    slug: "haji-khusus-furoda",
    category: "HAJI_FURODA",
    description: "Ibadah haji langsung berangkat tanpa antre dengan maktab VVIP",
    hotelMakkah: "Fairmont Clock Tower",
    hotelMadinah: "Anwar Al Madinah",
    airline: "Garuda Indonesia",
    imageUrl:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop",
    includes: ["Visa Mujamalah Resmi", "Maktab VVIP Arafah", "Dokter & Ustadz"],
    excludes: ["Dam Tamattu", "Keperluan Pribadi"],
    isActive: true,
    departures: [
      {
        id: "dep-003",
        departureDate: "2027-05-10T00:00:00.000Z",
        durationDays: 26,
        priceQuad: 165000000,
        priceTriple: 175000000,
        priceDouble: 190000000,
        totalSeats: 25,
        availableSeats: 9,
      },
    ],
  },
  {
    id: "pkg-004",
    title: "Umrah Plus Thaif 10 Hari",
    slug: "umrah-plus-thaif-10-hari",
    category: "UMRAH_PLUS",
    description: "Ibadah umrah dilengkapi wisata religi ke kota sejuk Thaif",
    hotelMakkah: "Swissotel Makkah",
    hotelMadinah: "Dallah Taibah",
    airline: "Saudia Airlines",
    imageUrl:
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop",
    includes: ["City Tour Thaif & Telefric", "Al Baik & Nasi Mandhi", "Manasik Intensif"],
    excludes: ["Paspor", "Pengeluaran Pribadi"],
    isActive: true,
    departures: [
      {
        id: "dep-004",
        departureDate: "2027-01-08T00:00:00.000Z",
        durationDays: 10,
        priceQuad: 32500000,
        priceTriple: 34500000,
        priceDouble: 36500000,
        totalSeats: 40,
        availableSeats: 21,
      },
    ],
  },
  {
    id: "pkg-005",
    title: "Umrah Awal Ramadhan",
    slug: "umrah-awal-ramadhan",
    category: "UMRAH_REGULER",
    description: "Raih pahala umrah setara haji bersama Rasulullah di bulan suci",
    hotelMakkah: "Makkah Hotel",
    hotelMadinah: "Millennium Aqeeq",
    airline: "Garuda Indonesia",
    imageUrl:
      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1000&auto=format&fit=crop",
    includes: ["Sahur & Iftar Hotel", "Kajian Tarawih", "Air Zamzam 5L"],
    excludes: ["Vaksin Meningitis", "Laundry Pribadi"],
    isActive: true,
    departures: [
      {
        id: "dep-005",
        departureDate: "2027-02-08T00:00:00.000Z",
        durationDays: 12,
        priceQuad: 36000000,
        priceTriple: 38500000,
        priceDouble: 41500000,
        totalSeats: 45,
        availableSeats: 19,
      },
    ],
  },
  {
    id: "pkg-006",
    title: "Umrah Lailatul Qadar VVIP",
    slug: "umrah-lailatul-qadar-vvip",
    category: "UMRAH_VIP",
    description: "I'tikaf 10 malam terakhir Ramadhan tepat di pelataran Haram",
    hotelMakkah: "Raffles Makkah Palace",
    hotelMadinah: "Sofitel Shahd",
    airline: "Saudia Airlines",
    imageUrl:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop",
    includes: ["Suite Pelataran Haram", "Sahur & Buka VVIP", "Kereta Cepat Haramain"],
    excludes: ["Paspor", "Keperluan Pribadi"],
    isActive: true,
    departures: [
      {
        id: "dep-006",
        departureDate: "2027-02-26T00:00:00.000Z",
        durationDays: 15,
        priceQuad: 54000000,
        priceTriple: 58000000,
        priceDouble: 63500000,
        totalSeats: 30,
        availableSeats: 7,
      },
    ],
  },
  {
    id: "pkg-007",
    title: "Umrah Syawal Penuh Berkah",
    slug: "umrah-syawal-penuh-berkah",
    category: "UMRAH_REGULER",
    description: "Suasana ibadah tenang pasca Ramadhan dengan cuaca bersahabat",
    hotelMakkah: "Le Meridien Makkah",
    hotelMadinah: "Emaar Royal",
    airline: "Lion Air (Direct)",
    imageUrl:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop",
    includes: ["Koper & Kain Ihram", "Ziarah Jabal Nur", "Muthawwif 24 Jam"],
    excludes: ["Paspor & Vaksin", "Overweight Bagasi"],
    isActive: true,
    departures: [
      {
        id: "dep-007",
        departureDate: "2027-03-18T00:00:00.000Z",
        durationDays: 9,
        priceQuad: 27900000,
        priceTriple: 29500000,
        priceDouble: 31500000,
        totalSeats: 45,
        availableSeats: 34,
      },
    ],
  },
  {
    id: "pkg-008",
    title: "Umrah Plus Al-Ula & Madinah",
    slug: "umrah-plus-al-ula",
    category: "UMRAH_PLUS",
    description: "Perjalanan spiritual umrah dilanjutkan tadabbur sejarah di Al-Ula",
    hotelMakkah: "Hyatt Regency",
    hotelMadinah: "Movenpick Anwar",
    airline: "Saudia Airlines",
    imageUrl:
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1000&auto=format&fit=crop",
    includes: ["Tiket Wisata Al-Ula", "Kereta Cepat Haramain", "Fullboard Catering"],
    excludes: ["Paspor", "Pengeluaran Pribadi"],
    isActive: true,
    departures: [
      {
        id: "dep-008",
        departureDate: "2027-04-05T00:00:00.000Z",
        durationDays: 12,
        priceQuad: 39500000,
        priceTriple: 42000000,
        priceDouble: 45000000,
        totalSeats: 35,
        availableSeats: 22,
      },
    ],
  },
  {
    id: "pkg-009",
    title: "Haji Khusus Kuota Resmi",
    slug: "haji-khusus-kuota-resmi",
    category: "HAJI_KHUSUS",
    description: "Pendaftaran porsi resmi Kemenag RI dengan masa tunggu singkat",
    hotelMakkah: "Movenpick Hajar Tower",
    hotelMadinah: "Frontel Al Harithia",
    airline: "Garuda Indonesia",
    imageUrl:
      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1000&auto=format&fit=crop",
    includes: ["BPIH Khusus Kemenag", "Tenda AC Mina & Arafah", "Manasik Lengkap"],
    excludes: ["Dam & Qurban", "Biaya Pelunasan Kurs"],
    isActive: true,
    departures: [
      {
        id: "dep-009",
        departureDate: "2027-05-14T00:00:00.000Z",
        durationDays: 25,
        priceQuad: 135000000,
        priceTriple: 145000000,
        priceDouble: 158000000,
        totalSeats: 40,
        availableSeats: 16,
      },
    ],
  },
  {
    id: "pkg-010",
    title: "Umrah Keluarga & Lansia VIP",
    slug: "umrah-keluarga-lansia-vip",
    category: "UMRAH_VIP",
    description: "Pendampingan khusus kursi roda dan akses lift langsung ke pelataran",
    hotelMakkah: "Conrad Makkah",
    hotelMadinah: "Shaza Regency",
    airline: "Garuda Indonesia",
    imageUrl:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop",
    includes: ["Tim Pendamping Lansia", "Kursi Roda & Buggy Car", "Handling Bandara VIP"],
    excludes: ["Paspor & Vaksin", "Keperluan Pribadi"],
    isActive: true,
    departures: [
      {
        id: "dep-010",
        departureDate: "2027-06-12T00:00:00.000Z",
        durationDays: 11,
        priceQuad: 37500000,
        priceTriple: 39800000,
        priceDouble: 42900000,
        totalSeats: 30,
        availableSeats: 18,
      },
    ],
  },
];

export const formatRupiah = (amount: number) => {
  return "Rp " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatDepartureDate = (isoString: string) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];
  const date = new Date(isoString);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
};