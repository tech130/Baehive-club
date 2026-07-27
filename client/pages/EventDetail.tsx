import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ShieldCheck, Mail, Phone, ChevronLeft, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import RegistrationModal from "@/components/ui/RegistrationModal";

interface EventDetailData {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  imageUrl?: string;
  location: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  totalSeats: number;
  remainingSeats: number;
  organizer: string;
  phone: string;
  email: string;
  status: string;
  featured: boolean;
  tags: string[];
  requirements?: string;
  mapLink?: string;
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEventDetails = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/events/${id}`);
      if (res.data.success) {
        setEvent(res.data.data);
      } else {
        toast.error("Failed to load event spec.");
        navigate("/");
      }
    } catch (err) {
      console.error("Fetch event details error:", err);
      toast.error("Error connecting to server. Displaying mock backup details.");
      // Backup mock event detail matching upcoming lists
      setEvent({
        id: Number(id),
        title: "Mock Event details (Offline)",
        description: "This is a fallback description shown when connection is offline. Access real data by running database and backend server.",
        category: "Social",
        image: "https://spaceandbeauty-club.s3.ap-south-1.amazonaws.com/event1.jpeg",
        location: "Chennai",
        venue: "Virtual Room (Fallback)",
        date: "Sat, Jun 14",
        startTime: "16:00",
        endTime: "18:00",
        price: 500,
        totalSeats: 30,
        remainingSeats: 25,
        organizer: "Ananya",
        phone: "9876543210",
        email: "events@baehive.club",
        status: "upcoming",
        featured: false,
        tags: ["Slow", "Thoughtful"],
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const handleBookingSuccess = (ticketNo?: string, email?: string) => {
    if (ticketNo) {
      toast.success(`Booking Confirmed! Ticket ${ticketNo} sent to ${email || 'your email'}.`);
    } else {
      toast.success("Successfully registered! See you at the event.");
    }
    fetchEventDetails(); // Reload event seats
  };


  const getProfileFallback = (name: string) => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!event) return null;

  const isSoldOut = event.remainingSeats <= 0;
  const isCancelled = event.status === "cancelled";
  const isCompleted = event.status === "completed";

  return (
    <div className="min-h-screen bg-bg-cream pb-16 font-manrope">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-semibold"
          >
            <ChevronLeft size={16} />
            Back to Home
          </button>
        </div>
      </header>

      {/* Main Detail Content Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Banner Section */}
        <div className="relative h-[250px] md:h-[450px] w-full rounded-[38px] overflow-hidden shadow-sm border border-gray-100">
          <img
            src={event.imageUrl || event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 md:p-10">
            <div>
              <span className="bg-white/95 text-gray-800 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm">
                {event.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-bold font-serif text-white mt-4">{event.title}</h1>
            </div>
          </div>
        </div>

        {/* Content Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          
          {/* Left Columns - Description, Notes */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-gray-800 border-b border-gray-50 pb-3 font-serif">About Event</h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {event.requirements && (
              <div className="bg-amber-50/50 border border-amber-100 rounded-[32px] p-6 md:p-8 space-y-3">
                <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle size={16} /> Important Notes / Requirements
                </h3>
                <p className="text-amber-800/80 text-sm leading-relaxed">{event.requirements}</p>
              </div>
            )}

            {/* Organizer Profile Summary */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm flex flex-col sm:flex-row items-center gap-4">
              <img
                src={getProfileFallback(event.organizer)}
                alt="Organizer Initials"
                className="h-14 w-14 rounded-full border border-gray-100 object-cover"
              />
              <div className="text-center sm:text-left flex-1 min-w-0">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Hosted & Curated By</p>
                <p className="font-semibold text-gray-800 text-sm mt-1">{event.organizer}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Mail size={12} />
                    <span className="truncate max-w-[180px]">{event.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone size={12} />
                    <span>{event.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Parameters card sticky */}
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-gray-800 pb-3 border-b border-gray-50 font-serif">Event Coordinates</h3>
              
              <div className="space-y-4 text-xs md:text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-pink-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">{event.date}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Date scheduled</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-pink-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">{event.startTime} - {event.endTime}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Hours schedule</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-pink-500 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{event.location}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{event.venue}</p>
                    {event.mapLink && (
                      <a
                        href={event.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-pink-500 font-semibold hover:underline block mt-1"
                      >
                        Open Google Maps
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-pink-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {event.remainingSeats} Seats Available
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{event.totalSeats} Total capacity</p>
                  </div>
                </div>
              </div>

              {/* Price Details */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Ticket Price</span>
                <span className="text-2xl font-black text-gray-800">
                  {event.price === 0 ? "FREE" : `₹${event.price}`}
                </span>
              </div>

              {/* Checkout CTA */}
              {isSoldOut ? (
                <button
                  disabled
                  className="w-full py-4 bg-gray-100 text-gray-400 font-bold rounded-2xl cursor-not-allowed text-center"
                >
                  Sold Out
                </button>
              ) : isCancelled ? (
                <button
                  disabled
                  className="w-full py-4 bg-red-50 text-red-500 font-bold rounded-2xl cursor-not-allowed text-center"
                >
                  Cancelled
                </button>
              ) : isCompleted ? (
                <button
                  disabled
                  className="w-full py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl cursor-not-allowed text-center"
                >
                  Completed
                </button>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-pink-100 transition-all text-center"
                >
                  Book Tickets Now
                </button>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Ticket Purchase Form Overlay */}
      {isModalOpen && (
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          eventId={event.id}
          eventTitle={event.title}
          pricePerTicket={event.price}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
