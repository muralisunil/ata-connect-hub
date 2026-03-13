import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { membershipTiers } from "@/lib/mock-data";
import { toast } from "sonner";

const Membership = () => {
  return (
    <>
      {/* Header */}
      <section className="gradient-saffron py-16 md:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-primary-foreground font-display md:text-5xl">Membership</h1>
            <p className="mt-2 text-primary-foreground/80">Join our community and enjoy exclusive benefits</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-display">Choose Your Membership</h2>
            <p className="mt-2 text-muted-foreground">
              Select the plan that best fits you and your family
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {membershipTiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className={`relative h-full flex flex-col ${tier.popular ? "border-2 border-primary shadow-xl scale-105" : "border-border"}`}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="gradient-saffron rounded-full px-4 py-1 text-xs font-semibold text-primary-foreground flex items-center gap-1">
                        <Star className="h-3 w-3" /> Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-display">{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold font-display">${tier.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">/ {tier.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="flex-1 space-y-3 mb-6">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={tier.popular ? "gradient-saffron border-0 text-primary-foreground hover:opacity-90 w-full" : "w-full"}
                      variant={tier.popular ? "default" : "outline"}
                      onClick={() => toast.info("Membership enrollment coming soon! We'll notify you when it's ready.")}
                    >
                      Join as {tier.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I upgrade my membership?", a: "Yes! You can upgrade at any time and only pay the difference." },
              { q: "Is the Family membership transferable?", a: "Family membership covers your immediate household — spouse and children under 18." },
              { q: "What payment methods are accepted?", a: "We accept all major credit cards. Online payment setup coming soon!" },
              { q: "How do I renew my membership?", a: "You'll receive a renewal reminder 30 days before expiration. Lifetime members never need to renew." },
            ].map((faq) => (
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
