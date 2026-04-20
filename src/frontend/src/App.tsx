import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BookMarked,
  Calendar,
  CalendarPlus,
  Check,
  ChevronDown,
  Compass,
  Eye,
  EyeOff,
  Facebook,
  Filter,
  Flag,
  Flame,
  Grid3X3,
  Heart,
  Home,
  Instagram,
  List,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Search,
  Share2,
  Shield,
  Star,
  Ticket,
  TrendingUp,
  Twitter,
  User,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Organizer {
  name: string;
  avatar: string;
  isVerified: boolean;
  followers: number;
}
interface Event {
  id: number;
  title: string;
  description: string;
  category:
    | "Music"
    | "Technology"
    | "Food & Drink"
    | "Art"
    | "Sports"
    | "Comedy"
    | "Wellness"
    | "Gaming"
    | "Business";
  date: string;
  time: string;
  location: string;
  price: number;
  isFree: boolean;
  isLive: boolean;
  isPast: boolean;
  attendees: number;
  organizer: Organizer;
  speakers: string[];
  tags: string[];
  format: "in-person" | "online" | "hybrid";
  image: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: "Synthwave Nights: Neon Dreams",
    description:
      "An electrifying night of synthesizer music, retro visuals, and immersive light shows. Experience the best electronic artists from across India.",
    category: "Music",
    date: "2026-05-15",
    time: "8:00 PM",
    location: "Bengaluru",
    price: 1200,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 3400,
    organizer: {
      name: "Neon Collective",
      avatar: "https://picsum.photos/seed/org1/40/40",
      isVerified: true,
      followers: 18500,
    },
    speakers: [],
    tags: ["EDM", "Synthwave"],
    format: "in-person",
    image: "https://picsum.photos/seed/1/400/200",
  },
  {
    id: 2,
    title: "Tech Innovate Summit 2026",
    description:
      "Join India's brightest minds for a 2-day deep dive into AI, blockchain, and the future of software engineering. Keynotes, workshops, and networking.",
    category: "Technology",
    date: "2026-05-20",
    time: "9:00 AM",
    location: "Mumbai",
    price: 2500,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 6200,
    organizer: {
      name: "TechForward India",
      avatar: "https://picsum.photos/seed/org2/40/40",
      isVerified: true,
      followers: 42000,
    },
    speakers: ["Priya Sharma", "Arjun Mehta", "Sam Rodriguez"],
    tags: ["AI", "Blockchain"],
    format: "hybrid",
    image: "https://picsum.photos/seed/2/400/200",
  },
  {
    id: 3,
    title: "Gourmet Street Food Festival",
    description:
      "Over 80 stalls showcasing street food from all corners of India. From chaats to dosas, experience culinary art at its finest in the heart of Delhi.",
    category: "Food & Drink",
    date: "2026-05-25",
    time: "11:00 AM",
    location: "Delhi",
    price: 0,
    isFree: true,
    isLive: false,
    isPast: false,
    attendees: 12000,
    organizer: {
      name: "Delhi Food Council",
      avatar: "https://picsum.photos/seed/org3/40/40",
      isVerified: false,
      followers: 9800,
    },
    speakers: [],
    tags: ["Street Food"],
    format: "in-person",
    image: "https://picsum.photos/seed/3/400/200",
  },
  {
    id: 4,
    title: "Hyderabad Art Gallery Opening",
    description:
      "A curated evening of contemporary Indian art spanning painting, sculpture, and digital installations. Meet the artists and collectors.",
    category: "Art",
    date: "2026-04-20",
    time: "6:00 PM",
    location: "Hyderabad",
    price: 500,
    isFree: false,
    isLive: true,
    isPast: false,
    attendees: 800,
    organizer: {
      name: "Canvas & Co.",
      avatar: "https://picsum.photos/seed/org4/40/40",
      isVerified: true,
      followers: 6500,
    },
    speakers: ["Kavya Reddy", "Mohan Das"],
    tags: ["Art", "Gallery"],
    format: "in-person",
    image: "https://picsum.photos/seed/4/400/200",
  },
  {
    id: 5,
    title: "Chennai Marathon 2026",
    description:
      "Run 42km through the scenic boulevards of Chennai. Full marathon, half marathon, and 10K categories. Join 5000+ runners in this iconic event.",
    category: "Sports",
    date: "2026-06-05",
    time: "5:30 AM",
    location: "Chennai",
    price: 800,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 5200,
    organizer: {
      name: "RunIndia Events",
      avatar: "https://picsum.photos/seed/org5/40/40",
      isVerified: true,
      followers: 31000,
    },
    speakers: [],
    tags: ["Marathon", "Running"],
    format: "in-person",
    image: "https://picsum.photos/seed/5/400/200",
  },
  {
    id: 6,
    title: "Stand-Up Comedy Night: Laughs & Latte",
    description:
      "Five of India's top comedians deliver an evening of sharp wit and side-splitting humor. Intimate venue, unlimited laughs guaranteed.",
    category: "Comedy",
    date: "2026-05-10",
    time: "7:30 PM",
    location: "Bengaluru",
    price: 699,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 450,
    organizer: {
      name: "Punchline Productions",
      avatar: "https://picsum.photos/seed/org6/40/40",
      isVerified: false,
      followers: 12300,
    },
    speakers: ["Vikram Shetty", "Aarav Joshi"],
    tags: ["Comedy", "Stand-up"],
    format: "in-person",
    image: "https://picsum.photos/seed/6/400/200",
  },
  {
    id: 7,
    title: "AI & Machine Learning Bootcamp",
    description:
      "Hands-on 3-day bootcamp covering Python, TensorFlow, and real-world ML deployments. From zero to deployed model. Certificate included.",
    category: "Technology",
    date: "2026-05-28",
    time: "10:00 AM",
    location: "Online",
    price: 3500,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 2100,
    organizer: {
      name: "CodeCraft Academy",
      avatar: "https://picsum.photos/seed/org7/40/40",
      isVerified: true,
      followers: 55000,
    },
    speakers: ["Dr. Ananya Krishnan", "Rohan Gupta"],
    tags: ["AI", "Python"],
    format: "online",
    image: "https://picsum.photos/seed/7/400/200",
  },
  {
    id: 8,
    title: "Wine & Cheese Evening",
    description:
      "A sophisticated tasting experience featuring 20 curated international wines paired with artisan cheeses from across Europe and India.",
    category: "Food & Drink",
    date: "2026-05-18",
    time: "6:00 PM",
    location: "Mumbai",
    price: 2200,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 120,
    organizer: {
      name: "Vineyard Circle",
      avatar: "https://picsum.photos/seed/org8/40/40",
      isVerified: false,
      followers: 4200,
    },
    speakers: [],
    tags: ["Wine", "Cheese"],
    format: "in-person",
    image: "https://picsum.photos/seed/8/400/200",
  },
  {
    id: 9,
    title: "Sunrise Yoga at Cubbon Park",
    description:
      "Welcome the day with a rejuvenating 90-minute yoga session led by certified instructors in the lush green setting of Cubbon Park.",
    category: "Wellness",
    date: "2026-05-08",
    time: "6:00 AM",
    location: "Bengaluru",
    price: 0,
    isFree: true,
    isLive: false,
    isPast: false,
    attendees: 350,
    organizer: {
      name: "ZenFlow Wellness",
      avatar: "https://picsum.photos/seed/org9/40/40",
      isVerified: false,
      followers: 7800,
    },
    speakers: ["Lakshmi Iyer"],
    tags: ["Yoga"],
    format: "in-person",
    image: "https://picsum.photos/seed/9/400/200",
  },
  {
    id: 10,
    title: "IPL Watch Party: Finals Night",
    description:
      "Watch the IPL finals on a massive 40ft screen with 2000 fellow fans. DJ sets, food stalls, and prizes for the best fan costumes.",
    category: "Sports",
    date: "2026-04-20",
    time: "6:00 PM",
    location: "Mumbai",
    price: 300,
    isFree: false,
    isLive: true,
    isPast: false,
    attendees: 2000,
    organizer: {
      name: "FanZone Events",
      avatar: "https://picsum.photos/seed/org10/40/40",
      isVerified: false,
      followers: 22000,
    },
    speakers: [],
    tags: ["Cricket", "IPL"],
    format: "in-person",
    image: "https://picsum.photos/seed/10/400/200",
  },
  {
    id: 11,
    title: "Indie Folk Acoustic Night",
    description:
      "An intimate evening of acoustic performances from rising indie folk artists. Sit back, sip your drink, and let the music carry you away.",
    category: "Music",
    date: "2026-06-01",
    time: "7:00 PM",
    location: "Chennai",
    price: 450,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 280,
    organizer: {
      name: "Strings & Stories",
      avatar: "https://picsum.photos/seed/org11/40/40",
      isVerified: false,
      followers: 5600,
    },
    speakers: [],
    tags: ["Indie", "Folk"],
    format: "in-person",
    image: "https://picsum.photos/seed/11/400/200",
  },
  {
    id: 12,
    title: "Web3 & DeFi Conference",
    description:
      "Explore decentralized finance, NFTs, and Web3 development. Panels with founders, live demo sessions, and exclusive networking.",
    category: "Technology",
    date: "2026-06-10",
    time: "10:00 AM",
    location: "Delhi",
    price: 1800,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 3000,
    organizer: {
      name: "BlockBridge India",
      avatar: "https://picsum.photos/seed/org12/40/40",
      isVerified: true,
      followers: 28000,
    },
    speakers: ["Kabir Shah", "Elena Petrov"],
    tags: ["Web3", "DeFi"],
    format: "hybrid",
    image: "https://picsum.photos/seed/12/400/200",
  },
  {
    id: 13,
    title: "Spice Route: Indian Cooking Masterclass",
    description:
      "Learn to cook authentic regional Indian cuisine from a Michelin-trained chef. Take home recipes, spice kits, and unforgettable memories.",
    category: "Food & Drink",
    date: "2026-05-22",
    time: "4:00 PM",
    location: "Hyderabad",
    price: 1500,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 40,
    organizer: {
      name: "Spice Arts Kitchen",
      avatar: "https://picsum.photos/seed/org13/40/40",
      isVerified: false,
      followers: 3100,
    },
    speakers: ["Chef Radhika Menon"],
    tags: ["Cooking"],
    format: "in-person",
    image: "https://picsum.photos/seed/13/400/200",
  },
  {
    id: 14,
    title: "Live Mural Painting: The City Breathes",
    description:
      "Watch six acclaimed street artists transform a blank 30-meter wall into a living mural. Public event, free to attend. Art in real time.",
    category: "Art",
    date: "2026-05-30",
    time: "10:00 AM",
    location: "Mumbai",
    price: 0,
    isFree: true,
    isLive: false,
    isPast: false,
    attendees: 1500,
    organizer: {
      name: "Urban Canvas Project",
      avatar: "https://picsum.photos/seed/org14/40/40",
      isVerified: false,
      followers: 8900,
    },
    speakers: [],
    tags: ["Mural", "Street Art"],
    format: "in-person",
    image: "https://picsum.photos/seed/14/400/200",
  },
  {
    id: 15,
    title: "Bengaluru EDM Carnival",
    description:
      "Three stages, twelve DJs, and 8000 fans under the stars. The biggest electronic music festival in South India returns for its 5th edition.",
    category: "Music",
    date: "2026-06-20",
    time: "4:00 PM",
    location: "Bengaluru",
    price: 2800,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 8000,
    organizer: {
      name: "Neon Collective",
      avatar: "https://picsum.photos/seed/org1/40/40",
      isVerified: true,
      followers: 18500,
    },
    speakers: [],
    tags: ["EDM", "Festival"],
    format: "in-person",
    image: "https://picsum.photos/seed/15/400/200",
  },
  {
    id: 16,
    title: "Open Source Hackathon 2026",
    description:
      "48-hour hackathon building open-source tools for social good. 50 teams, $1L prize pool, mentors from top tech companies.",
    category: "Technology",
    date: "2026-06-14",
    time: "9:00 AM",
    location: "Online",
    price: 0,
    isFree: true,
    isLive: false,
    isPast: false,
    attendees: 1200,
    organizer: {
      name: "CodeCraft Academy",
      avatar: "https://picsum.photos/seed/org7/40/40",
      isVerified: true,
      followers: 55000,
    },
    speakers: [],
    tags: ["Hackathon"],
    format: "online",
    image: "https://picsum.photos/seed/16/400/200",
  },
  {
    id: 17,
    title: "Bollywood Dance Championship",
    description:
      "Regional qualifying round for India's top Bollywood dance competition. Solo, duo, and group categories. Prizes worth ₹5 lakh.",
    category: "Music",
    date: "2026-04-19",
    time: "5:00 PM",
    location: "Delhi",
    price: 200,
    isFree: false,
    isLive: false,
    isPast: true,
    attendees: 3200,
    organizer: {
      name: "DanceIndia Foundation",
      avatar: "https://picsum.photos/seed/org16/40/40",
      isVerified: false,
      followers: 14200,
    },
    speakers: [],
    tags: ["Dance", "Bollywood"],
    format: "in-person",
    image: "https://picsum.photos/seed/17/400/200",
  },
  {
    id: 18,
    title: "Mindfulness & Meditation Retreat",
    description:
      "A weekend retreat for digital detox, mindful living, and holistic wellness. Forest bathing, guided meditation, and Ayurvedic meals included.",
    category: "Wellness",
    date: "2026-05-31",
    time: "8:00 AM",
    location: "Hyderabad",
    price: 4500,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 60,
    organizer: {
      name: "ZenFlow Wellness",
      avatar: "https://picsum.photos/seed/org9/40/40",
      isVerified: false,
      followers: 7800,
    },
    speakers: ["Guru Prakash Dev"],
    tags: ["Meditation", "Retreat"],
    format: "in-person",
    image: "https://picsum.photos/seed/18/400/200",
  },
  {
    id: 19,
    title: "Throwback Comedy: 90s Edition",
    description:
      "A nostalgia-fueled comedy show packed with 90s references, Doordarshan jokes, and stories only millennials will understand.",
    category: "Comedy",
    date: "2026-05-14",
    time: "8:00 PM",
    location: "Chennai",
    price: 500,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 600,
    organizer: {
      name: "Punchline Productions",
      avatar: "https://picsum.photos/seed/org6/40/40",
      isVerified: false,
      followers: 12300,
    },
    speakers: ["Rahul D'souza", "Meera Menon"],
    tags: ["Comedy", "90s"],
    format: "in-person",
    image: "https://picsum.photos/seed/19/400/200",
  },
  {
    id: 20,
    title: "Pro Kabaddi Fan Meet & Greet",
    description:
      "Meet and get autographs from Pro Kabaddi League stars. Photo sessions, Q&A, and exclusive merchandise. Limited slots available.",
    category: "Sports",
    date: "2026-05-12",
    time: "3:00 PM",
    location: "Bengaluru",
    price: 999,
    isFree: false,
    isLive: false,
    isPast: false,
    attendees: 500,
    organizer: {
      name: "FanZone Events",
      avatar: "https://picsum.photos/seed/org10/40/40",
      isVerified: false,
      followers: 22000,
    },
    speakers: [],
    tags: ["Kabaddi"],
    format: "in-person",
    image: "https://picsum.photos/seed/20/400/200",
  },
  {
    id: 21,
    title: "Startup Pitch Night: Bengaluru Edition",
    description:
      "10 startups pitch to a panel of top VCs and angel investors. Networking dinner follows. Open to founders, investors, and ecosystem enthusiasts.",
    category: "Business",
    date: "2026-06-03",
    time: "6:00 PM",
    location: "Bengaluru",
    price: 0,
    isFree: true,
    isLive: false,
    isPast: false,
    attendees: 400,
    organizer: {
      name: "VentureHub India",
      avatar: "https://picsum.photos/seed/org21/40/40",
      isVerified: true,
      followers: 35000,
    },
    speakers: ["Deepa Nair", "Varun Malhotra"],
    tags: ["Startup", "VC"],
    format: "in-person",
    image: "https://picsum.photos/seed/21/400/200",
  },
  {
    id: 22,
    title: "Classical Carnatic Music Evening",
    description:
      "An evening of soulful Carnatic classical music featuring eminent vocalists and instrumentalists. A heritage experience for music lovers.",
    category: "Music",
    date: "2026-04-25",
    time: "6:30 PM",
    location: "Chennai",
    price: 300,
    isFree: false,
    isLive: false,
    isPast: true,
    attendees: 750,
    organizer: {
      name: "Naada Brahma Trust",
      avatar: "https://picsum.photos/seed/org22/40/40",
      isVerified: true,
      followers: 9200,
    },
    speakers: [],
    tags: ["Carnatic", "Classical"],
    format: "in-person",
    image: "https://picsum.photos/seed/22/400/200",
  },
];

const FEATURED_ORGANIZERS = [
  {
    name: "Neon Collective",
    avatar: "https://picsum.photos/seed/org1/80/80",
    followers: 18500,
    isVerified: true,
    genre: "Music & Events",
  },
  {
    name: "TechForward India",
    avatar: "https://picsum.photos/seed/org2/80/80",
    followers: 42000,
    isVerified: true,
    genre: "Tech Conferences",
  },
  {
    name: "CodeCraft Academy",
    avatar: "https://picsum.photos/seed/org7/80/80",
    followers: 55000,
    isVerified: true,
    genre: "Dev Education",
  },
  {
    name: "VentureHub India",
    avatar: "https://picsum.photos/seed/org21/80/80",
    followers: 35000,
    isVerified: true,
    genre: "Startup Ecosystem",
  },
];

const CATEGORIES = [
  { label: "All", icon: "✨" },
  { label: "Music", icon: "🎵" },
  { label: "Technology", icon: "💻" },
  { label: "Food & Drink", icon: "🍽️" },
  { label: "Art", icon: "🎨" },
  { label: "Sports", icon: "⚽" },
  { label: "Comedy", icon: "😂" },
  { label: "Wellness", icon: "🧘" },
  { label: "Gaming", icon: "🎮" },
  { label: "Business", icon: "💼" },
];

function getCategoryClass(category: string): string {
  const map: Record<string, string> = {
    Music: "badge-base category-music",
    Technology: "badge-base category-tech",
    "Food & Drink": "badge-base category-food",
    Art: "badge-base category-art",
    Sports: "badge-base category-sports",
    Comedy: "badge-base category-comedy",
    Wellness: "badge-base category-wellness",
    Gaming: "badge-base category-gaming",
    Business: "badge-base category-business",
  };
  return map[category] || "badge-base category-tech";
}

function formatAttendees(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function getPasswordStrength(pw: string) {
  if (!pw) return { label: "", color: "bg-muted", width: "0%" };
  if (pw.length < 6)
    return { label: "Weak", color: "bg-red-500", width: "33%" };
  if (pw.length < 10 || !/[A-Z]/.test(pw) || !/[0-9]/.test(pw))
    return { label: "Medium", color: "bg-yellow-500", width: "66%" };
  return { label: "Strong", color: "bg-green-500", width: "100%" };
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
}: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="glass overflow-hidden animate-pulse">
      <div className="h-48 bg-white/10" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-white/10 rounded w-1/3" />
        <div className="h-5 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-2/3" />
        <div className="flex gap-2 mt-4">
          <div className="h-9 bg-white/10 rounded flex-1" />
          <div className="h-9 bg-white/10 rounded w-10" />
        </div>
      </div>
    </div>
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({
  event,
  index,
  liked,
  onLike,
  onSelect,
  onTicket,
  isListView,
}: {
  event: Event;
  index: number;
  liked: boolean;
  onLike: (id: number) => void;
  onSelect: (e: Event) => void;
  onTicket: (e: Event) => void;
  isListView: boolean;
}) {
  const delay = Math.min(index * 0.05, 0.5);

  if (isListView) {
    return (
      <button
        type="button"
        className="glass hover-glow transition-smooth cursor-pointer flex gap-4 p-4 hover:border-purple-500/40 hover:bg-white/5 w-full text-left"
        style={{ animationDelay: `${delay}s` }}
        data-ocid={`event.item.${index + 1}`}
        onClick={() => onSelect(event)}
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={getCategoryClass(event.category)}>
              {event.category}
            </span>
            {event.isLive && (
              <span className="badge-base bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                🔴 LIVE NOW
              </span>
            )}
            {event.isFree && (
              <span className="badge-base bg-green-500/20 text-green-400 border border-green-500/30">
                FREE
              </span>
            )}
          </div>
          <h3 className="font-semibold text-foreground truncate text-sm">
            {event.title}
          </h3>
          <p className="text-muted-foreground text-xs line-clamp-1 mt-0.5">
            {event.description}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {event.date} {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {event.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {formatAttendees(event.attendees)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className="text-sm font-bold text-primary">
            {event.isFree ? "Free" : `₹${event.price.toLocaleString()}`}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTicket(event);
            }}
            className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-smooth"
            data-ocid={`event.ticket_button.${index + 1}`}
          >
            Get Tickets
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLike(event.id);
            }}
            className={`flex items-center gap-1 text-xs ${liked ? "text-red-400" : "text-muted-foreground hover:text-red-400"} transition-smooth`}
            data-ocid={`event.like_button.${index + 1}`}
            aria-label="Like event"
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-red-400" : ""}`} />{" "}
            {event.attendees + (liked ? 1 : 0)}
          </button>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="glass overflow-hidden hover-glow transition-smooth cursor-pointer group hover:border-purple-500/40 hover:bg-white/5 hover:scale-[1.02] slide-up text-left w-full"
      style={{ animationDelay: `${delay}s` }}
      data-ocid={`event.item.${index + 1}`}
      onClick={() => onSelect(event)}
    >
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className={getCategoryClass(event.category)}>
            {event.category}
          </span>
          {event.isLive && (
            <span className="badge-base bg-red-500/90 text-white border-0 animate-pulse">
              🔴 LIVE NOW
            </span>
          )}
          {event.isFree && (
            <span className="badge-base bg-green-500/90 text-white border-0">
              FREE
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-3">
          {event.description}
        </p>
        <div className="space-y-1 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-primary/70" />
            {event.date} • {event.time}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-primary/70" />
            {event.location}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3 text-primary/70" />
            {formatAttendees(event.attendees)} attending
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <img
            src={event.organizer.avatar}
            alt={event.organizer.name}
            className="w-5 h-5 rounded-full"
          />
          <span className="text-xs text-muted-foreground truncate">
            {event.organizer.name}
          </span>
          {event.organizer.isVerified && (
            <BadgeCheck className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTicket(event);
            }}
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-smooth flex items-center justify-center gap-1"
            data-ocid={`event.ticket_button.${index + 1}`}
          >
            <Ticket className="w-3 h-3" />
            {event.isFree
              ? "Register Free"
              : `₹${event.price.toLocaleString()}`}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLike(event.id);
            }}
            aria-label="Like"
            className={`flex items-center gap-1 px-2.5 py-2 rounded-lg border transition-smooth text-xs ${liked ? "bg-red-500/20 border-red-500/40 text-red-400" : "border-white/10 text-muted-foreground hover:border-red-500/40 hover:text-red-400"}`}
            data-ocid={`event.like_button.${index + 1}`}
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-red-400" : ""}`} />
          </button>
        </div>
      </div>
    </button>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [events] = useState<Event[]>(MOCK_EVENTS);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(MOCK_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likedEvents, setLikedEvents] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [cookieConsent, setCookieConsent] = useState<
    "pending" | "accepted" | "rejected"
  >("pending");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<
    "date-newest" | "date-oldest" | "price-low" | "price-high" | "popularity"
  >("date-newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutEvent, setCheckoutEvent] = useState<Event | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportEvent, setReportEvent] = useState<Event | null>(null);
  const [showFiltersSidebar, setShowFiltersSidebar] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [priceRange, setPriceRange] = useState(5000);
  const [distanceFilter, setDistanceFilter] = useState("any");
  const [formatFilter, setFormatFilter] = useState<string[]>([]);
  const [followedOrganizers, setFollowedOrganizers] = useState<Set<string>>(
    new Set(),
  );
  const [isEmailVerification, setIsEmailVerification] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [searchTimestamp, setSearchTimestamp] = useState(Date.now());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [mockJwt] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGVtb0BldmVudC5pbyIsImlhdCI6MTcwMDAwMDAwMH0...",
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [reportReason, setReportReason] = useState("Spam");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [cvv, setCvv] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
        setShowAuthModal(false);
        setShowCheckoutModal(false);
        setShowReportModal(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    let result = [...events];
    if (selectedCategory !== "All")
      result = result.filter((e) => e.category === selectedCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q),
      );
    }
    if (dateFilter === "today") {
      const t = new Date().toISOString().split("T")[0];
      result = result.filter((e) => e.date === t);
    } else if (dateFilter === "week") {
      const now = new Date();
      const wk = new Date(now.getTime() + 7 * 86400000);
      result = result.filter((e) => {
        const d = new Date(e.date);
        return d >= now && d <= wk;
      });
    } else if (dateFilter === "month") {
      const now = new Date();
      const mo = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
      result = result.filter((e) => {
        const d = new Date(e.date);
        return d >= now && d <= mo;
      });
    }
    if (priceRange < 5000)
      result = result.filter((e) => e.isFree || e.price <= priceRange);
    if (formatFilter.length > 0)
      result = result.filter((e) => formatFilter.includes(e.format));
    result.sort((a, b) => {
      if (sortBy === "date-newest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "date-oldest")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return b.attendees - a.attendees;
    });
    setFilteredEvents(result);
  }, [
    events,
    selectedCategory,
    searchQuery,
    sortBy,
    dateFilter,
    priceRange,
    formatFilter,
  ]);

  const handleSearch = useCallback(
    (val: string) => {
      if (/<script/i.test(val) || /javascript:/i.test(val)) {
        toast.error("🛡️ Input blocked: scripts are not allowed");
        return;
      }
      const now = Date.now();
      if (now - searchTimestamp < 2000) {
        const nc = searchCount + 1;
        setSearchCount(nc);
        if (nc >= 5) {
          toast.warning("⏱️ Slow down! Too many requests");
          return;
        }
      } else {
        setSearchCount(1);
        setSearchTimestamp(now);
      }
      setSearchQuery(val);
    },
    [searchCount, searchTimestamp],
  );

  const handleLike = (id: number) =>
    setLikedEvents((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoggedIn(true);
    setShowAuthModal(false);
    toast.success("Welcome back! 🎉");
  };
  const handleRegister = () => {
    if (!regEmail || !regPassword || !regConfirm) {
      toast.error("Please fill in all fields");
      return;
    }
    if (regPassword !== regConfirm) {
      toast.error("Passwords don't match");
      return;
    }
    setIsEmailVerification(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileDropdownOpen(false);
    toast.success("Logged out");
  };
  const toggleFormat = (f: string) =>
    setFormatFilter((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  const toggleOrganizer = (name: string) =>
    setFollowedOrganizers((prev) => {
      const n = new Set(prev);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });

  const trendingEvents = events.filter((e) => !e.isPast).slice(0, 5);
  const recommendedEvents = events
    .filter((e) => e.category === "Music" || e.category === "Technology")
    .slice(0, 4);
  const passwordStrength = getPasswordStrength(regPassword);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0a0a1a", color: "#e2e8f0" }}
    >
      <Toaster position="top-right" richColors />

      {/* ── Sticky Navbar ─────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl"
        style={{ background: "rgba(10,10,26,0.85)" }}
        data-ocid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-gradient font-display">
              EventFinder
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="#events"
              className="hover:text-foreground transition-smooth"
              data-ocid="nav.events_link"
            >
              Events
            </a>
            <a
              href="#trending"
              className="hover:text-foreground transition-smooth"
              data-ocid="nav.trending_link"
            >
              Trending
            </a>
            <a
              href="#organizers"
              className="hover:text-foreground transition-smooth"
              data-ocid="nav.organizers_link"
            >
              Organizers
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-smooth"
              data-ocid="nav.post_event_button"
            >
              <Bell className="w-3.5 h-3.5" />
              Post Event
            </button>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 glass px-3 py-1.5 hover:bg-white/10 transition-smooth"
                  data-ocid="nav.profile_button"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs text-white font-bold">
                    U
                  </div>
                  <span className="text-sm hidden md:block">Demo User</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 glass border border-white/10 rounded-xl shadow-xl p-3 space-y-2"
                    data-ocid="nav.profile_dropdown"
                  >
                    <div className="text-xs text-muted-foreground px-2 py-1">
                      <div className="font-medium text-foreground mb-1">
                        JWT Token
                      </div>
                      <div className="font-mono text-[10px] text-purple-400 truncate">
                        {mockJwt.slice(0, 40)}...
                      </div>
                    </div>
                    <div className="border-t border-white/10 pt-2">
                      <div className="flex items-center justify-between px-2 py-1.5">
                        <span className="text-sm flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5" />
                          Profile Privacy
                        </span>
                        <button
                          type="button"
                          onClick={() => setProfilePrivate(!profilePrivate)}
                          className={`w-10 h-5 rounded-full transition-smooth relative ${profilePrivate ? "bg-purple-600" : "bg-white/20"}`}
                          data-ocid="nav.privacy_toggle"
                          aria-label="Toggle privacy"
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-smooth ${profilePrivate ? "left-5" : "left-0.5"}`}
                          />
                        </button>
                      </div>
                      <span className="text-xs text-muted-foreground px-2">
                        {profilePrivate ? "Private" : "Public"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-smooth"
                      data-ocid="nav.logout_button"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthTab("login");
                }}
                className="glass px-4 py-2 text-sm font-medium hover:bg-white/10 transition-smooth"
                data-ocid="nav.login_button"
              >
                Login
              </button>
            )}
            <button
              type="button"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-ocid="nav.hamburger_button"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-1">
            <button
              type="button"
              className="block w-full text-left py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => {
                setMobileMenuOpen(false);
                document
                  .getElementById("events")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid="nav.mobile_events_link"
            >
              Events
            </button>
            <button
              type="button"
              className="block w-full text-left py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => {
                setMobileMenuOpen(false);
                document
                  .getElementById("trending")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid="nav.mobile_trending_link"
            >
              Trending
            </button>
            <button
              type="button"
              className="block w-full text-left py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => {
                setMobileMenuOpen(false);
                document
                  .getElementById("organizers")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid="nav.mobile_organizers_link"
            >
              Organizers
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section
        className="relative pt-16 pb-8 overflow-hidden min-h-[55vh] flex items-center"
        data-ocid="hero.section"
      >
        <div className="absolute inset-0 hero-gradient" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.1) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center w-full">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs text-purple-300 mb-6 border border-purple-500/30">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>22 live events happening now</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-4 leading-tight">
            <span className="text-gradient">Discover</span>
            <br />
            <span className="text-foreground">Amazing Events</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find concerts, tech talks, food festivals, and more — happening
            right now in your city.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              ref={searchRef}
              type="text"
              aria-label="Search events"
              placeholder="Search events, cities, categories..."
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-foreground placeholder:text-muted-foreground backdrop-blur-xl focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 transition-smooth text-sm"
              onChange={(e) => handleSearch(e.target.value)}
              data-ocid="hero.search_input"
            />
          </div>
        </div>
      </section>

      {/* ── Category Chips ────────────────────────────────────────────────────── */}
      <section
        className="border-b border-white/10 py-4"
        style={{ background: "rgba(10,10,26,0.9)" }}
        data-ocid="category.section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-smooth whitespace-nowrap ${selectedCategory === cat.label ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/30" : "glass text-muted-foreground hover:text-foreground hover:border-purple-500/30"}`}
                data-ocid={`category.filter.${cat.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────────── */}
      <section
        className="py-6 border-b border-white/10"
        style={{ background: "rgba(15,10,30,0.8)" }}
        data-ocid="stats.section"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <Calendar className="w-4 h-4" />,
              value: 12400,
              suffix: "+",
              label: "Events",
            },
            {
              icon: <Users className="w-4 h-4" />,
              value: 3200000,
              suffix: "+",
              label: "Attendees",
            },
            {
              icon: <MapPin className="w-4 h-4" />,
              value: 180,
              suffix: "",
              label: "Cities",
            },
            {
              icon: <Star className="w-4 h-4" />,
              value: 50,
              suffix: "+",
              label: "Categories",
            },
          ].map((stat) => (
            <div key={stat.label} className="text-center glass py-4 px-6">
              <div className="flex items-center justify-center gap-2 text-purple-400 mb-1">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gradient font-display">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trending This Week ────────────────────────────────────────────────── */}
      <section
        className="py-10 border-b border-white/10"
        id="trending"
        data-ocid="trending.section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Flame className="w-5 h-5 text-orange-400" />
            <h2 className="text-2xl font-bold font-display text-foreground">
              Trending This Week
            </h2>
          </div>
          <div
            className="flex gap-4 overflow-x-auto pb-3"
            style={{ scrollbarWidth: "none" }}
          >
            {trendingEvents.map((event, i) => (
              <button
                type="button"
                key={event.id}
                className="flex-shrink-0 w-64 glass overflow-hidden hover-glow transition-smooth cursor-pointer hover:border-purple-500/40 group text-left"
                onClick={() => setSelectedEvent(event)}
                data-ocid={`trending.item.${i + 1}`}
              >
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute top-2 right-2 text-xl">🔥</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-1 mb-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </span>
                    <span className="text-primary font-medium">
                      {event.isFree
                        ? "Free"
                        : `₹${event.price.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Events Area ──────────────────────────────────────────────────── */}
      <section className="py-10" id="events" data-ocid="events.section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div
              className={`md:w-64 flex-shrink-0 ${showFiltersSidebar ? "block" : "hidden md:block"}`}
              data-ocid="filters.sidebar"
            >
              <div className="glass p-5 space-y-5 sticky top-20">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  Filters
                </h3>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                    Date
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["all", "today", "week", "month"] as const).map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setDateFilter(d)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-smooth ${dateFilter === d ? "bg-purple-600/30 text-purple-300 border border-purple-500/40" : "glass text-muted-foreground hover:text-foreground"}`}
                        data-ocid={`filters.date_${d}_button`}
                      >
                        {d === "all"
                          ? "All Time"
                          : d === "week"
                            ? "This Week"
                            : d === "month"
                              ? "This Month"
                              : "Today"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="price-range"
                    className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide block"
                  >
                    Max Price: ₹{priceRange}
                  </label>
                  <input
                    id="price-range"
                    type="range"
                    min={0}
                    max={5000}
                    step={500}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-purple-500"
                    data-ocid="filters.price_slider"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>Free</span>
                    <span>₹5000+</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                    Distance
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["5km", "10km", "25km", "50km", "any"].map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setDistanceFilter(d)}
                        className={`py-1 px-2.5 rounded-full text-xs transition-smooth ${distanceFilter === d ? "bg-cyan-600/30 text-cyan-300 border border-cyan-500/40" : "glass text-muted-foreground hover:text-foreground"}`}
                        data-ocid={`filters.distance_${d}_button`}
                      >
                        {d === "any" ? "Any" : d}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                    Format
                  </p>
                  {(["in-person", "online", "hybrid"] as const).map((f) => (
                    <label
                      key={f}
                      htmlFor={`format-${f}`}
                      className="flex items-center gap-2 py-1 cursor-pointer"
                    >
                      <input
                        id={`format-${f}`}
                        type="checkbox"
                        checked={formatFilter.includes(f)}
                        onChange={() => toggleFormat(f)}
                        className="accent-purple-500"
                        data-ocid={`filters.format_${f}_checkbox`}
                      />
                      <span className="text-xs capitalize text-muted-foreground">
                        {f}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Events Main */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="md:hidden flex items-center gap-1.5 glass px-3 py-2 text-xs"
                    onClick={() => setShowFiltersSidebar(!showFiltersSidebar)}
                    data-ocid="events.filter_toggle_button"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    Filters
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {filteredEvents.length} events found
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="sr-only">
                    Sort by
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="glass text-xs px-3 py-2 bg-transparent border-white/20 rounded-lg focus:outline-none focus:border-purple-500/60 text-foreground"
                    data-ocid="events.sort_select"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <option
                      value="date-newest"
                      style={{ background: "#0a0a1a" }}
                    >
                      Date: Newest
                    </option>
                    <option
                      value="date-oldest"
                      style={{ background: "#0a0a1a" }}
                    >
                      Date: Oldest
                    </option>
                    <option value="price-low" style={{ background: "#0a0a1a" }}>
                      Price: Low → High
                    </option>
                    <option
                      value="price-high"
                      style={{ background: "#0a0a1a" }}
                    >
                      Price: High → Low
                    </option>
                    <option
                      value="popularity"
                      style={{ background: "#0a0a1a" }}
                    >
                      Popularity
                    </option>
                  </select>
                  <div className="flex glass rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      aria-label="Grid view"
                      className={`p-2 transition-smooth ${viewMode === "grid" ? "bg-purple-600/30 text-purple-300" : "text-muted-foreground hover:text-foreground"}`}
                      data-ocid="events.grid_view_button"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      aria-label="List view"
                      className={`p-2 transition-smooth ${viewMode === "list" ? "bg-purple-600/30 text-purple-300" : "text-muted-foreground hover:text-foreground"}`}
                      data-ocid="events.list_view_button"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
                    <SkeletonCard key={k} />
                  ))}
                </div>
              ) : filteredEvents.length === 0 ? (
                <div
                  className="glass text-center py-16 px-4"
                  data-ocid="events.empty_state"
                >
                  <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <h3 className="font-semibold text-foreground mb-2">
                    No events found
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                      if (searchRef.current) searchRef.current.value = "";
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium"
                    data-ocid="events.clear_filters_button"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                      : "space-y-3"
                  }
                >
                  {filteredEvents.map((event, i) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={i}
                      liked={likedEvents.has(event.id)}
                      onLike={handleLike}
                      onSelect={setSelectedEvent}
                      onTicket={(e) => {
                        setCheckoutEvent(e);
                        setShowCheckoutModal(true);
                      }}
                      isListView={viewMode === "list"}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Organizers ───────────────────────────────────────────────── */}
      <section
        className="py-10 border-t border-white/10"
        id="organizers"
        style={{ background: "rgba(15,10,30,0.6)" }}
        data-ocid="organizers.section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold font-display mb-6 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Featured Organizers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURED_ORGANIZERS.map((org) => (
              <div
                key={org.name}
                className="glass p-5 text-center hover-glow transition-smooth"
                data-ocid={`organizer.item.${FEATURED_ORGANIZERS.indexOf(org) + 1}`}
              >
                <div className="relative inline-block mb-3">
                  <img
                    src={org.avatar}
                    alt={org.name}
                    className="w-16 h-16 rounded-full mx-auto border-2 border-purple-500/40"
                  />
                  {org.isVerified && (
                    <BadgeCheck className="w-5 h-5 text-blue-400 absolute -bottom-1 -right-1 bg-card rounded-full" />
                  )}
                </div>
                <h3 className="font-semibold text-sm truncate mb-0.5">
                  {org.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-1">
                  {org.genre}
                </p>
                <p className="text-xs text-purple-400 mb-3">
                  {(org.followers / 1000).toFixed(0)}k followers
                </p>
                <button
                  type="button"
                  onClick={() => toggleOrganizer(org.name)}
                  className={`w-full py-1.5 rounded-lg text-xs font-medium transition-smooth ${followedOrganizers.has(org.name) ? "bg-purple-600/30 text-purple-300 border border-purple-500/40" : "glass text-muted-foreground hover:text-foreground hover:border-purple-500/30"}`}
                  data-ocid={`organizer.follow_button.${FEATURED_ORGANIZERS.indexOf(org) + 1}`}
                >
                  {followedOrganizers.has(org.name) ? (
                    <>
                      <Check className="w-3 h-3 inline mr-1" />
                      Following
                    </>
                  ) : (
                    "Follow"
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── You Might Like ────────────────────────────────────────────────────── */}
      <section
        className="py-10 border-t border-white/10"
        data-ocid="recommendations.section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold font-display mb-2 flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-400" />
            You Might Like
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Based on your interest in Music & Technology
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedEvents.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                liked={likedEvents.has(event.id)}
                onLike={handleLike}
                onSelect={setSelectedEvent}
                onTicket={(e) => {
                  setCheckoutEvent(e);
                  setShowCheckoutModal(true);
                }}
                isListView={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────────── */}
      <section
        className="py-14 border-t border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(6,182,212,0.05) 100%)",
        }}
        data-ocid="newsletter.section"
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Mail className="w-10 h-10 text-purple-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold font-display mb-2">
            Stay in the loop
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Get personalized event recommendations delivered to your inbox every
            week.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-purple-500/60 transition-smooth"
              data-ocid="newsletter.email_input"
            />
            <button
              type="button"
              onClick={() => {
                if (newsletterEmail) {
                  toast.success("Subscribed! 🎉");
                  setNewsletterEmail("");
                } else toast.error("Enter a valid email");
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-smooth flex items-center gap-2"
              data-ocid="newsletter.subscribe_button"
            >
              Subscribe <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            🔒 We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer
        className="border-t border-white/10 py-12"
        style={{ background: "rgba(8,8,20,0.95)" }}
        data-ocid="footer.section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-gradient font-display">
                  EventFinder
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Discover the best events happening near you. Music, tech, food,
                art and more.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Discover</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                {[
                  "Browse Events",
                  "Trending Now",
                  "Near Me",
                  "Free Events",
                ].map((l) => (
                  <button
                    type="button"
                    key={l}
                    className="block hover:text-foreground cursor-pointer transition-smooth"
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">For Organizers</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                {[
                  "Create Event",
                  "Event Dashboard",
                  "Analytics",
                  "Pricing",
                ].map((l) => (
                  <button
                    type="button"
                    key={l}
                    className="block hover:text-foreground cursor-pointer transition-smooth"
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[Twitter, Instagram, Facebook, Youtube].map((Icon) => (
                  <button
                    type="button"
                    key={Icon.displayName ?? Icon.name}
                    aria-label="Social link"
                    className="w-8 h-8 glass rounded-full flex items-center justify-center hover:border-purple-500/40 hover:text-purple-400 transition-smooth text-muted-foreground"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
            <span>
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="text-purple-400 hover:text-purple-300 transition-smooth"
              >
                caffeine.ai
              </a>
            </span>
            <div className="flex gap-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (l) => (
                  <span
                    key={l}
                    className="hover:text-foreground cursor-pointer transition-smooth"
                  >
                    {l}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Mobile Bottom Nav ─────────────────────────────────────────────────── */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 flex"
        style={{ background: "rgba(10,10,26,0.95)" }}
        data-ocid="mobile.bottom_nav"
      >
        {[
          { icon: Home, label: "Home", href: "#" },
          { icon: Compass, label: "Explore", href: "#events" },
          { icon: BookMarked, label: "Saved", href: "#" },
          { icon: User, label: "Profile", href: "#" },
        ].map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            className="flex-1 flex flex-col items-center py-2.5 text-muted-foreground hover:text-purple-400 transition-smooth gap-0.5"
            data-ocid={`mobile.nav_${label.toLowerCase()}_link`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px]">{label}</span>
          </a>
        ))}
      </div>

      {/* ── Event Detail Modal ────────────────────────────────────────────────── */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          data-ocid="event_detail.dialog"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
            onClick={() => setSelectedEvent(null)}
            aria-label="Close modal"
          />
          <div className="relative glass max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20">
            <div className="relative">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-56 object-cover rounded-t-2xl"
              />
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 w-8 h-8 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-smooth"
                data-ocid="event_detail.close_button"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={getCategoryClass(selectedEvent.category)}>
                  {selectedEvent.category}
                </span>
                {selectedEvent.isLive && (
                  <span className="badge-base bg-red-500/90 text-white border-0 animate-pulse">
                    🔴 LIVE NOW
                  </span>
                )}
                {selectedEvent.isFree && (
                  <span className="badge-base bg-green-500/90 text-white border-0">
                    FREE
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4 gap-3">
                <h2 className="text-xl font-bold font-display">
                  {selectedEvent.title}
                </h2>
                <span className="text-xl font-bold text-primary flex-shrink-0">
                  {selectedEvent.isFree
                    ? "Free"
                    : `₹${selectedEvent.price.toLocaleString()}`}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {selectedEvent.description}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="glass p-3 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">
                    Date & Time
                  </p>
                  <p className="text-sm font-medium">
                    {selectedEvent.date} • {selectedEvent.time}
                  </p>
                </div>
                <div className="glass p-3 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="text-sm font-medium">
                    {selectedEvent.location}
                  </p>
                </div>
                <div className="glass p-3 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Format</p>
                  <p className="text-sm font-medium capitalize">
                    {selectedEvent.format}
                  </p>
                </div>
                <div className="glass p-3 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">
                    Attendees
                  </p>
                  <p className="text-sm font-medium">
                    {selectedEvent.attendees.toLocaleString()}
                  </p>
                </div>
              </div>
              {selectedEvent.speakers.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-semibold text-sm mb-3">Speakers</h3>
                  <div className="flex gap-3 flex-wrap">
                    {selectedEvent.speakers.map((s) => (
                      <div
                        key={s}
                        className="flex items-center gap-2 glass px-3 py-1.5 rounded-full"
                      >
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-[9px] text-white font-bold">
                          {s[0]}
                        </div>
                        <span className="text-xs">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-5">
                <h3 className="font-semibold text-sm mb-3">Schedule</h3>
                <div className="space-y-2">
                  {[
                    {
                      time: selectedEvent.time,
                      title: "Doors Open & Registration",
                    },
                    { time: "30 min later", title: "Opening Ceremony" },
                    { time: "1 hr later", title: "Main Program Begins" },
                    { time: "3 hrs later", title: "Networking & Closing" },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 text-xs">
                      <span className="text-muted-foreground w-24 flex-shrink-0">
                        {item.time}
                      </span>
                      <span className="text-foreground">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-5 glass rounded-xl overflow-hidden h-24 flex items-center justify-center bg-white/5">
                <div className="text-center">
                  <MapPin className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">
                    {selectedEvent.location} · View on Maps
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutEvent(selectedEvent);
                    setShowCheckoutModal(true);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-smooth flex items-center justify-center gap-2"
                  data-ocid="event_detail.get_tickets_button"
                >
                  <Ticket className="w-4 h-4" />
                  Get Tickets
                </button>
                <button
                  type="button"
                  onClick={() => toast.success("Link copied!")}
                  aria-label="Share"
                  className="glass px-4 py-3 rounded-xl text-sm hover:bg-white/10 transition-smooth"
                  data-ocid="event_detail.share_button"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toast.success("Added to calendar!")}
                  aria-label="Add to calendar"
                  className="glass px-4 py-3 rounded-xl text-sm hover:bg-white/10 transition-smooth"
                  data-ocid="event_detail.calendar_button"
                >
                  <CalendarPlus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReportEvent(selectedEvent);
                    setShowReportModal(true);
                  }}
                  aria-label="Report event"
                  className="glass px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-smooth"
                  data-ocid="event_detail.report_button"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Auth Modal ────────────────────────────────────────────────────────── */}
      {showAuthModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          data-ocid="auth.dialog"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
            onClick={() => {
              setShowAuthModal(false);
              setIsEmailVerification(false);
            }}
            aria-label="Close"
          />
          <div className="relative glass max-w-md w-full rounded-2xl border border-white/20 p-6">
            <button
              type="button"
              onClick={() => {
                setShowAuthModal(false);
                setIsEmailVerification(false);
              }}
              className="absolute top-4 right-4"
              data-ocid="auth.close_button"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            {isEmailVerification ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-green-400" />
                </div>
                <h2 className="text-xl font-bold mb-2">Check your inbox</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  We sent a verification link to{" "}
                  <span className="text-purple-400">{regEmail}</span>
                </p>
                <button
                  type="button"
                  onClick={() => toast.success("Verification email resent!")}
                  className="glass px-4 py-2 text-sm hover:bg-white/10 transition-smooth"
                  data-ocid="auth.resend_email_button"
                >
                  Resend Email
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold font-display mb-5">
                  {authTab === "login" ? "Welcome back" : "Create account"}
                </h2>
                <div className="flex glass rounded-xl mb-5 p-1">
                  <button
                    type="button"
                    onClick={() => setAuthTab("login")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-smooth ${authTab === "login" ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white" : "text-muted-foreground"}`}
                    data-ocid="auth.login_tab"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthTab("register")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-smooth ${authTab === "register" ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white" : "text-muted-foreground"}`}
                    data-ocid="auth.register_tab"
                  >
                    Register
                  </button>
                </div>
                {authTab === "login" ? (
                  <div className="space-y-3">
                    <label htmlFor="login-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      placeholder="Email address"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:border-purple-500/60 transition-smooth"
                      data-ocid="auth.login_email_input"
                    />
                    <div className="relative">
                      <label htmlFor="login-password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:border-purple-500/60 transition-smooth pr-10"
                        data-ocid="auth.login_password_input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-smooth"
                      data-ocid="auth.login_submit_button"
                    >
                      Login
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label htmlFor="reg-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="Email address"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:border-purple-500/60 transition-smooth"
                      data-ocid="auth.register_email_input"
                    />
                    <label htmlFor="reg-password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="reg-password"
                      type="password"
                      placeholder="Password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:border-purple-500/60 transition-smooth"
                      data-ocid="auth.register_password_input"
                    />
                    {regPassword && (
                      <div className="space-y-1">
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-smooth ${passwordStrength.color}`}
                            style={{ width: passwordStrength.width }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {passwordStrength.label}
                        </span>
                      </div>
                    )}
                    <label htmlFor="reg-confirm" className="sr-only">
                      Confirm password
                    </label>
                    <input
                      id="reg-confirm"
                      type="password"
                      placeholder="Confirm password"
                      value={regConfirm}
                      onChange={(e) => setRegConfirm(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass bg-transparent text-sm focus:outline-none focus:border-purple-500/60 transition-smooth"
                      data-ocid="auth.register_confirm_input"
                    />
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-smooth"
                      data-ocid="auth.register_submit_button"
                    >
                      Create Account
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Secure Checkout Modal ─────────────────────────────────────────────── */}
      {showCheckoutModal && checkoutEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          data-ocid="checkout.dialog"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
            onClick={() => setShowCheckoutModal(false)}
            aria-label="Close"
          />
          <div className="relative glass max-w-sm w-full rounded-2xl border border-white/20 p-6">
            <button
              type="button"
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4"
              data-ocid="checkout.close_button"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2 mb-5">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">
                Secure Checkout
              </span>
              <Shield className="w-4 h-4 text-cyan-400 ml-auto" />
            </div>
            <div className="glass p-3 rounded-xl mb-5">
              <h3 className="font-semibold text-sm line-clamp-1 mb-1">
                {checkoutEvent.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {checkoutEvent.date}
                </span>
                <span className="text-lg font-bold text-primary">
                  {checkoutEvent.isFree
                    ? "Free"
                    : `₹${checkoutEvent.price.toLocaleString()}`}
                </span>
              </div>
            </div>
            <div className="space-y-3 mb-5">
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">
                  Card Number
                </p>
                <div className="glass px-4 py-3 rounded-xl text-sm font-mono text-muted-foreground">
                  •••• •••• •••• 4242
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Expiry</p>
                  <div className="glass px-4 py-3 rounded-xl text-sm font-mono text-muted-foreground">
                    12/27
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="cvv-input"
                    className="text-xs text-muted-foreground mb-1.5 block"
                  >
                    CVV
                  </label>
                  <input
                    id="cvv-input"
                    type="text"
                    maxLength={3}
                    placeholder="•••"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    className="w-full glass px-4 py-3 rounded-xl text-sm bg-transparent focus:outline-none focus:border-purple-500/60 transition-smooth"
                    data-ocid="checkout.cvv_input"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4 glass px-3 py-2 rounded-lg">
              <Shield className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-green-400">
                256-bit SSL Encrypted
              </span>
              <Lock className="w-3 h-3 text-green-400 ml-auto" />
            </div>
            <button
              type="button"
              onClick={() => {
                setShowCheckoutModal(false);
                toast.success("🎫 Ticket booked successfully!");
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-smooth flex items-center justify-center gap-2"
              data-ocid="checkout.pay_button"
            >
              <Lock className="w-3.5 h-3.5" />
              Pay Securely{" "}
              {checkoutEvent.isFree
                ? ""
                : `₹${checkoutEvent.price.toLocaleString()}`}
            </button>
          </div>
        </div>
      )}

      {/* ── Report Modal ──────────────────────────────────────────────────────── */}
      {showReportModal && reportEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          data-ocid="report.dialog"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
            onClick={() => setShowReportModal(false)}
            aria-label="Close"
          />
          <div className="relative glass max-w-sm w-full rounded-2xl border border-white/20 p-6">
            <button
              type="button"
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4"
              data-ocid="report.close_button"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2 mb-5">
              <Flag className="w-4 h-4 text-red-400" />
              <h2 className="font-semibold">Report Event</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Why are you reporting &quot;{reportEvent.title}&quot;?
            </p>
            <div className="space-y-2 mb-5">
              {["Spam", "Inappropriate", "Scam", "Misleading"].map((reason) => (
                <label
                  key={reason}
                  htmlFor={`report-${reason}`}
                  className="flex items-center gap-3 cursor-pointer glass p-3 rounded-xl hover:bg-white/5 transition-smooth"
                >
                  <input
                    id={`report-${reason}`}
                    type="radio"
                    name="report"
                    value={reason}
                    checked={reportReason === reason}
                    onChange={() => setReportReason(reason)}
                    className="accent-red-500"
                    data-ocid={`report.reason_${reason.toLowerCase()}_radio`}
                  />
                  <span className="text-sm">{reason}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="flex-1 py-2.5 glass rounded-xl text-sm text-muted-foreground hover:text-foreground transition-smooth"
                data-ocid="report.cancel_button"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowReportModal(false);
                  toast.success("Report submitted. Thank you!");
                }}
                className="flex-1 py-2.5 bg-red-600/80 hover:bg-red-600 rounded-xl text-white text-sm font-semibold transition-smooth"
                data-ocid="report.submit_button"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Cookie Consent Banner ─────────────────────────────────────────────── */}
      {cookieConsent === "pending" && (
        <div
          className="fixed bottom-16 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40 glass border border-white/20 rounded-2xl p-4 shadow-xl"
          data-ocid="cookie.banner"
        >
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            🍪 We use cookies to enhance your experience and provide
            personalized event recommendations.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setCookieConsent("accepted");
                toast.success("Preferences saved!");
              }}
              className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-semibold transition-smooth"
              data-ocid="cookie.accept_button"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={() => setCookieConsent("rejected")}
              className="flex-1 py-2 glass rounded-lg text-xs text-muted-foreground hover:text-foreground transition-smooth"
              data-ocid="cookie.reject_button"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => toast.info("Customize coming soon!")}
              className="px-2 py-2 glass rounded-lg text-xs text-muted-foreground hover:text-foreground transition-smooth"
              data-ocid="cookie.customize_button"
              aria-label="Customize cookies"
            >
              ⚙️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
