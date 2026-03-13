import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, Heart, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { upcomingEvents, announcements } from "@/lib/mock-data";
import { useTranslation } from "@/i18n/LanguageContext";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import { useState, useEffect } from "react";

const heroImages = [hero1, hero2, hero3];

const eventTranslationKeys = ["bathukamma", "ugadi", "picnic"] as const;
const announcementKeys = ["membershipDrive", "volunteer", "scholarship"] as const;

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, lang } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: currentSlide === i ? 1 : 0 }}
          >
            <img src={img} alt={t.home.heroTitles[i]} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/10" />
          </div>
        ))}
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-16 md:pb-20">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-4 max-w-2xl text-3xl font-bold text-primary-foreground md:text-5xl lg:text-6xl font-display leading-tight">
                {t.home.heroTitles[currentSlide]}
              </h1>
              <p className="mb-6 max-w-lg text-sm text-primary-foreground/80 md:text-base">
                {t.home.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="gradient-saffron border-0 text-primary-foreground hover:opacity-90">
                  <Link to="/events">{t.home.upcomingEvents} <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  <Link to="/membership">{t.home.becomeAMember}</Link>
                </Button>
              </div>
            </motion.div>
            <div className="mt-6 flex gap-2">
              {heroImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${currentSlide === i ? "w-8 bg-primary" : "w-2 bg-primary-foreground/40"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold font-display md:text-4xl">{t.home.aboutTitle}</h2>
            <div className="mx-auto mb-6 h-1 w-16 rounded-full gradient-saffron" />
            <p className="text-muted-foreground leading-relaxed">{t.home.aboutText}</p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Calendar, label: t.home.stats.events, desc: t.home.stats.eventsDesc },
              { icon: Users, label: t.home.stats.members, desc: t.home.stats.membersDesc },
              { icon: Heart, label: t.home.stats.years, desc: t.home.stats.yearsDesc },
              { icon: Megaphone, label: t.home.stats.hub, desc: t.home.stats.hubDesc },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/50 bg-card text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold font-display">{stat.label}</h3>
                    <p className="text-sm text-muted-foreground">{stat.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold font-display md:text-4xl">{t.home.upcomingEvents}</h2>
              <div className="mt-2 h-1 w-16 rounded-full gradient-saffron" />
            </div>
            <Button asChild variant="link" className="text-primary">
              <Link to="/events">{t.home.viewAll} <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 gradient-saffron opacity-20" />
                    <div className="absolute bottom-3 left-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${event.isFree ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
                        {event.isFree ? t.home.free : `$${event.ticketPrice}`}
                      </span>
                    </div>
                  </div>
                  <CardContent className="flex flex-1 flex-col p-5">
                    <p className="mb-1 text-xs font-medium text-primary">
                      {new Date(event.date).toLocaleDateString(lang === "te" ? "te-IN" : "en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                    <h3 className="mb-2 text-lg font-bold font-display leading-snug">
                      {t.data.events[eventTranslationKeys[i]]?.title ?? event.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">
                      {t.data.events[eventTranslationKeys[i]]?.description ?? event.description}
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to="/events">{t.home.learnMore}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-2 text-3xl font-bold font-display md:text-4xl">{t.home.announcementsTitle}</h2>
          <div className="mb-10 h-1 w-16 rounded-full gradient-saffron" />
          <div className="grid gap-4 md:grid-cols-3">
            {announcements.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <p className="mb-1 text-xs text-muted-foreground">
                      {new Date(item.publishedAt).toLocaleDateString(lang === "te" ? "te-IN" : "en-US", { month: "short", day: "numeric" })}
                    </p>
                    <h3 className="mb-2 font-bold font-display">
                      {t.data.announcements[announcementKeys[i]]?.title ?? item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {t.data.announcements[announcementKeys[i]]?.content ?? item.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-saffron py-16 md:py-20">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground font-display md:text-4xl">
            {t.home.ctaTitle}
          </h2>
          <p className="mx-auto mb-8 max-w-md text-primary-foreground/80">
            {t.home.ctaText}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              <Link to="/membership">{t.home.viewPlans}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
              <Link to="/contact">{t.home.contactUs}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
