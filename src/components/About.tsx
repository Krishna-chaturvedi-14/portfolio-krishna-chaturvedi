import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Sparkles } from 'lucide-react';
import { LegoStuds } from './LegoStuds';

export const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-lego-blue/10 text-accent rounded-lg font-body text-sm font-medium mb-4">
            🧱 About Me
          </span>
          <h2 className="font-display text-xl md:text-2xl text-foreground">
            The Builder Behind The Code
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Avatar/Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-lego-yellow rounded-2xl p-8 shadow-lego">
              <LegoStuds rows={2} cols={4} color="hsl(var(--lego-black))" className="opacity-20" />
              
              <div className="flex flex-col items-center pt-6">
                <div className="w-32 h-32 rounded-2xl bg-lego-white/30 flex items-center justify-center mb-6">
                  <span className="text-6xl">🧑‍💻</span>
                </div>
                
                <h3 className="font-display text-sm text-lego-black mb-2">Krishna Chaturvedi</h3>
                <p className="font-body text-lego-black/70 text-center">ML Engineer & Data Scientist</p>

                <div className="flex items-center gap-2 mt-4 text-lego-black/60 font-body text-sm">
                  <MapPin size={14} />
                  Jaipur, India
                </div>
              </div>
            </div>

            {/* Decorative bricks */}
            <div className="absolute -top-4 -right-4 w-12 h-8 bg-lego-red rounded-lg shadow-lego hidden md:block" />
            <div className="absolute -bottom-4 -left-4 w-16 h-10 bg-lego-blue rounded-lg shadow-lego hidden md:block" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-display text-xs text-foreground mb-2">WHO I AM</h4>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    I'm a passionate Machine Learning Engineer who loves building predictive models 
                    and turning complex data into actionable insights. Currently exploring the 
                    intersection of AI and real-world applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-card border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="font-display text-xs text-foreground mb-2">EDUCATION</h4>
                  <p className="font-body font-medium text-foreground">B.Tech in Computer Science</p>
                  <p className="font-body text-sm text-muted-foreground">
                    Specialization in AI & Machine Learning
                  </p>
                  <p className="font-body text-sm text-muted-foreground">Manipal University Jaipur</p>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
                    <Calendar size={14} />
                    2023 - 2027
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {['Time-Series Forecasting', 'Data Engineering', 'Predictive Modeling', 'Python'].map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="px-4 py-2 bg-muted text-foreground rounded-lg font-body text-sm shadow-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
