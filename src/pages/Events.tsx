import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { upcomingEvents, pastEvents } from "@/lib/mock-data";
import { toast } from "sonner";

const EventCard = ({ event, isPast = false }: { event: (typeof upcomingEvents)[0] | (typeof pastEvents)[0]; isPast?: boolean }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="aspect-video bg-muted relative overflow-hidden">
      <div className="absolute inset-0 gradient-saffron opacity-15" />
      {!isPast && (
        <div className="absolute bottom-3 left-3">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${event.isFree ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
            {event.isFree ? "Free Event" : `$${event.ticketPrice}`}
          </span>
        </div>
      )}
    </div>
    <CardContent className="p-5">
      <div className="mb-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {event.location}
        </span>
      </div>
      <h3 className="mb-2 text-xl font-bold font-display">{event.title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{event.description}</p>
      {!isPast && (
        <div className="flex gap-2">
          {event.isFree ? (
            <Button
              className="gradient-saffron border-0 text-primary-foreground hover:opacity-90"
              onClick={() => toast.success("RSVP confirmed! We'll send you a reminder.")}
            >
              RSVP Now
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => toast.info("Ticket sales coming soon!")}
            >
              <Ticket className="mr-1 h-4 w-4" /> Get Tickets
            </Button>
          )}
        </div>
      )}
    </CardContent>
  </Card>
);

const Events = () => {
  return (
    <>
      {/* Header */}
      <section className="gradient-saffron py-16 md:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-primary-foreground font-display md:text-5xl">Events</h1>
            <p className="mt-2 text-primary-foreground/80">Discover our cultural celebrations and community gatherings</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <EventCard event={event} isPast />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Events;
