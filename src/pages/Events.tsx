import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { upcomingEvents, pastEvents } from "@/lib/mock-data";
import { useTranslation } from "@/i18n/LanguageContext";
import { toast } from "sonner";

const upcomingKeys = ["bathukamma", "ugadi", "picnic"] as const;
const pastKeys = ["bonalu", "diwali", "republicDay"] as const;

const Events = () => {
  const { t, lang } = useTranslation();

  const EventCard = ({ event, isPast = false, translationKey }: {
    event: (typeof upcomingEvents)[0];
    isPast?: boolean;
    translationKey?: string;
  }) => {
    const eventData = translationKey ? t.data.events[translationKey as keyof typeof t.data.events] : null;
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video bg-muted relative overflow-hidden">
          <div className="absolute inset-0 gradient-saffron opacity-15" />
          {!isPast && (
            <div className="absolute bottom-3 left-3">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${event.isFree ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
                {event.isFree ? t.events.freeEvent : `$${event.ticketPrice}`}
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <div className="mb-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(event.date).toLocaleDateString(lang === "te" ? "te-IN" : "en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </span>
          </div>
          <h3 className="mb-2 text-xl font-bold font-display">{eventData?.title ?? event.title}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{eventData?.description ?? event.description}</p>
          {!isPast && (
            <div className="flex gap-2">
              {event.isFree ? (
                <Button
                  className="gradient-saffron border-0 text-primary-foreground hover:opacity-90"
                  onClick={() => toast.success(t.events.rsvpSuccess)}
                >
                  {t.events.rsvp}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => toast.info(t.events.ticketsSoon)}
                >
                  <Ticket className="mr-1 h-4 w-4" /> {t.events.getTickets}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <section className="gradient-saffron py-16 md:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-primary-foreground font-display md:text-5xl">{t.events.title}</h1>
            <p className="mt-2 text-primary-foreground/80">{t.events.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-8">
              <TabsTrigger value="upcoming">{t.events.upcoming}</TabsTrigger>
              <TabsTrigger value="past">{t.events.past}</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event, i) => (
                  <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <EventCard event={event} translationKey={upcomingKeys[i]} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event, i) => (
                  <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <EventCard event={event as any} isPast translationKey={pastKeys[i]} />
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
