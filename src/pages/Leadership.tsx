import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { leadershipTeam } from "@/lib/mock-data";

const Leadership = () => {
  return (
    <>
      <section className="gradient-saffron py-16 md:py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-primary-foreground font-display md:text-5xl">Our Leadership</h1>
            <p className="mt-2 text-primary-foreground/80">Meet the dedicated team leading ATA Seattle</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {leadershipTeam.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="overflow-hidden text-center hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 gradient-saffron opacity-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary/30 font-display">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold font-display text-lg">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">{member.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Leadership;
