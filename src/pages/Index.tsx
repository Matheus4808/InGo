import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { EventFilters } from "@/components/EventFilters";
import { EventList } from "@/components/EventList";
import { FeaturedOrganizers } from "@/components/FeaturedOrganizers";
import { VenuesSection } from "@/components/VenuesSection";
import { SocialProof } from "@/components/SocialProof";
import { Footer } from "@/components/Footer";
import { getEvents, EventCategory, Event, getOrganizers, Organizer } from "@/data/events";

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  async function loadEvents() {
    const ev = await getEvents();
    setEvents(ev);
    return ev;
  }

  async function loadOrganizers() {
    const orgs = await getOrganizers();
    setOrganizers(orgs);
    return orgs;
  }

  useEffect(() => {
    loadEvents();
    loadOrganizers();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Events Section */}
        <section id="events" className="py-16">
          <div className="container mx-auto px-4 space-y-8">
            {/* Section Header */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Eventos em destaque
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Confira os eventos mais procurados e garanta seu ingresso antes que esgote
              </p>
            </div>

            {/* Filters */}
            <EventFilters
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />

            {/* Event Cards */}
            <EventList
              events={events}
              selectedDate={selectedDate}
              selectedCategory={selectedCategory}
              selectedPrice={selectedPrice}
            />
          </div>
        </section>

        {/* Featured Organizers */}
        {/* <FeaturedOrganizers 
          organizers={organizers}
        /> */}

        {/* Venues Section */}
        {/* <VenuesSection /> */}

        {/* Social Proof */}
        <SocialProof />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
