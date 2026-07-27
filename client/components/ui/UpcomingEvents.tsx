import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import api from "@/services/api";

interface Event {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  image: string;
  price: number;
}

const staticEvents: Event[] = [
  {
    id: 1,
    category: "Mom & Kid Club",
    title: "Mom & Me: Laugh, Bond & Play",
    description:
      "Fun conversations, interactive games, and memorable moments designed to bring moms and kids closer together.",
    date: "Sat, Jun 14 · 4:00 PM",
    location: "Chennai",
    image: "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/event1.jpeg",
    price: 500
  },
  {
    id: 2,
    category: "Movie Club",
    title: "Movie Night & Meaningful Conversations",
    description:
      "Watch a feel-good movie, share your thoughts, and connect with fellow women over stories that stay with you.",
    date: "Sun, Jun 15 · 6:00 PM",
    location: "Chennai",
    image: "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/event2.jpeg",
    price: 250
  },
  {
    id: 3,
    category: "Senior Meet-Up (50+)",
    title: "Tea, Talks & New Friendships",
    description:
      "A warm gathering for women above 50 to share stories, laugh together, and build meaningful connections.",
    date: "Sat, Jun 21 · 5:00 PM",
    location: "Chennai",
    image: "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/event3.jpeg",
    price: 350
  },
  {
    id: 4,
    category: " Senior Getaway (50+)",
    title: "A Trip Made for Her",
    description:
      "Travel, explore, and create beautiful memories with a group of inspiring women who believe life gets better with age.",
    date: "Coming Soon",
    location: "Chennai",
    image: "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/event4.jpeg",
    price: 0
  },
];

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events?status=upcoming");
        if (res.data.success && res.data.data.length > 0) {
          // Map to match image/imageUrl fields
          const mapped = res.data.data.map((item: any) => ({
            id: item.id,
            category: item.category,
            title: item.title,
            description: item.description,
            date: item.date,
            location: item.location,
            image: item.imageUrl || item.image,
            price: item.price
          }));
          setEvents(mapped);
        } else {
          setEvents(staticEvents);
        }
      } catch (err) {
        console.warn("Backend API not reachable. Using mock static events fallback.");
        setEvents(staticEvents);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section id="up-events" className="bg-[#FFF7F4] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Upcoming <span className="gradient-text1">Events</span></h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Moments worth stepping out for. Discover what’s coming up next — thoughtfully
          curated gatherings you can join when it feels right.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-10 w-10 text-pink-500 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}

function EventCard({ event }: { event: Event }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="h-48 w-full object-cover"
        />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs rounded-full">
          {event.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{event.description}</p>

        <div className="text-sm text-gray-500 space-y-1 mb-5">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>
        </div>

        <button 
          onClick={() => navigate(`/event/${event.id}`)}
          className="mt-auto bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
        >
          Join Event
        </button>
      </div>
    </div>
  );
}
