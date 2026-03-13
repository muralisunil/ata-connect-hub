import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { membershipTiers } from "@/lib/mock-data";
import { useTranslation } from "@/i18n/LanguageContext";
import { toast } from "sonner";

const tierKeys = ["individual", "family", "lifetime"] as const;
const benefitKeyMap: Record<string, string> = {
  "Access to all free events": "freeEvents",
  "Discounted tickets for paid events": "discountedTickets",
  "Monthly newsletter": "newsletter",
  "Voting rights in annual elections": "votingRights",
  "Community directory listing": "directoryListing",
  "All Individual benefits": "allIndividual",
  "Covers up to 4 family members": "familyMembers",
  "Priority event registration": "priorityReg",
  "Family photo in annual directory": "familyPhoto",
  "Kids program access": "kidsProgram",
  "Festival kit included": "festivalKit",
  "All Family benefits forever": "allFamily",
  "VIP seating at all events": "vipSeating",
  "Lifetime recognition on website": "lifetimeRecognition",
  "Exclusive lifetime member gatherings": "exclusiveGatherings",
  "Complimentary event tickets (2/year)": "compTickets",
  "Legacy membership for next generation": "legacyMembership",
};

const Membership = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="gradient-saffron py-16 md:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-primary-foreground font-display md:text-5xl">{t.membership.title}</h1>
            <p className="mt-2 text-primary-foreground/80">{t.membership.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-display">{t.membership.chooseTitle}</h2>
            <p className="mt-2 text-muted-foreground">{t.membership.chooseSubtitle}</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {membershipTiers.map((tier, i) => {
              const tierName = t.data.tiers[tierKeys[i]];
              return (
                <motion.div key={tier.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
                  <Card className={`relative h-full flex flex-col ${tier.popular ? "border-2 border-primary shadow-xl scale-105" : "border-border"}`}>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="gradient-saffron rounded-full px-4 py-1 text-xs font-semibold text-primary-foreground flex items-center gap-1">
                          <Star className="h-3 w-3" /> {t.membership.mostPopular}
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-2xl font-display">{tierName}</CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold font-display">${tier.price}</span>
                        <span className="text-sm text-muted-foreground ml-1">/ {tier.duration}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <ul className="flex-1 space-y-3 mb-6">
                        {tier.benefits.map((benefit) => {
                          const key = benefitKeyMap[benefit] as keyof typeof t.data.benefits | undefined;
                          return (
                            <li key={benefit} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span>{key ? t.data.benefits[key] : benefit}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <Button
                        className={tier.popular ? "gradient-saffron border-0 text-primary-foreground hover:opacity-90 w-full" : "w-full"}
                        variant={tier.popular ? "default" : "outline"}
                        onClick={() => toast.info(t.membership.enrollSoon)}
                      >
                        {t.membership.joinAs} {tierName}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold font-display">{t.membership.faqTitle}</h2>
          <div className="space-y-4">
            {t.membership.faqs.map((faq) => (
              <Card key={faq.q}>
                <CardContent className="p-5">
                  <h3 className="font-bold font-display">{faq.q}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Membership;
