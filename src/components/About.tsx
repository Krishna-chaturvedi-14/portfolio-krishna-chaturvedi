import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Sparkles } from 'lucide-react';
import { LegoStuds } from './LegoStuds';
import { PersonalAvatar } from './avatars/PersonalAvatar';

export const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-success/10 text-success rounded-md font-mono text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-foreground font-bold">
            The Engineer Behind The Code
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Avatar/Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-primary rounded-lg p-8 shadow-lego">
              <LegoStuds rows={2} cols={4} color="hsl(var(--primary-foreground))" className="opacity-20" />
              
              <div className="flex flex-col items-center pt-6">
                <PersonalAvatar size="md" className="mb-6" />
                
                <h3 className="font-display text-lg text-primary-foreground mb-2 font-semibold">Krishna Chaturvedi</h3>
                <p className="font-body text-primary-foreground/80 text-center">ML Engineer & Data Scientist</p>

                <div className="flex items-center gap-2 mt-4 text-primary-foreground/70 font-mono text-sm">
                  <MapPin size={14} />
                  Jaipur, India
                </div>
              </div>
            </div>

            {/* Decorative blocks */}
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 -right-3 w-10 h-6 bg-accent rounded-md shadow-lego hidden md:block" 
            />
            <motion.div 
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-3 -left-3 w-12 h-8 bg-success rounded-md shadow-lego hidden md:block" 
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            <div className="bg-card rounded-lg p-6 shadow-card border border-border">
              <div className="flex items-start gap-4">
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-11 h-11 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0"
                >
                  <Sparkles className="text-accent" size={22} />
                </motion.div>
                <div>
                  <h4 className="font-display text-sm text-foreground mb-2 font-semibold uppercase tracking-wide">Who I Am</h4>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    A passionate Machine Learning Engineer focused on building predictive models 
                    and transforming complex data into actionable insights. Currently exploring the 
                    intersection of AI and real-world applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-card border border-border">
              <div className="flex items-start gap-4">
                <motion.div 
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-11 h-11 rounded-md bg-success/10 flex items-center justify-center flex-shrink-0"
                >
                  <GraduationCap className="text-success" size={22} />
                </motion.div>
                <div>
                  <h4 className="font-display text-sm text-foreground mb-2 font-semibold uppercase tracking-wide">Education</h4>
                  <p className="font-body font-medium text-foreground">B.Tech in Computer Science</p>
                  <p className="font-body text-sm text-muted-foreground">
                    Specialization in AI & Machine Learning
                  </p>
                  <p className="font-body text-sm text-muted-foreground">Manipal University Jaipur</p>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm font-mono">
                    <Calendar size={14} />
                    2023 - 2027
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Time-Series Forecasting', 'Data Engineering', 'Predictive Modeling', 'Python'].map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 bg-muted text-foreground rounded-md font-mono text-sm shadow-sm cursor-default"
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
