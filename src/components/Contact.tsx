import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import { LegoStuds } from './LegoStuds';
import { useState } from 'react';


const socialLinks = [
  {
    icon: <Linkedin size={22} />,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/Krishna-chaturvedi-14',
    color: 'bg-success',
  },
  {
    icon: <Github size={22} />,
    label: 'GitHub',
    href: 'https://github.com/Krishna-chaturvedi-14',
    color: 'bg-muted',
  },
  {
    icon: <Mail size={22} />,
    label: 'Email',
    href: 'mailto:krishna14chaturvedi@gmail.com',
    color: 'bg-accent',
  },
];

export const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });



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
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-md font-mono text-sm font-medium mb-4">
            Contact
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4 font-bold">
            Get In Touch
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? Let's collaborate.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {/* Contact Card */}
            <div className="relative bg-success rounded-lg p-8 shadow-lego text-success-foreground">
              <LegoStuds rows={1} cols={4} color="rgba(255,255,255,0.2)" />

              <div className="pt-4 space-y-5">
                <h3 className="font-display text-lg mb-6 font-semibold">Contact Info</h3>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-md bg-background/20 flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-body text-sm opacity-70">Email</p>
                    <a href="mailto:krishna14chaturvedi@gmail.com" className="font-body font-medium hover:underline">
                      krishna14chaturvedi@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-md bg-background/20 flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-body text-sm opacity-70">Phone</p>
                    <a href="tel:+917417366256" className="font-body font-medium hover:underline">
                      +91-7417366256
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-md bg-background/20 flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-body text-sm opacity-70">Location</p>
                    <p className="font-body font-medium">Jaipur, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                  className={`w-12 h-12 ${link.color} text-foreground rounded-lg flex items-center justify-center shadow-lego transition-transform`}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form action="mailto:krishna14chaturvedi@gmail.com" method="POST" encType="text/plain" className="bg-card rounded-lg p-8 shadow-card border border-border">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block font-display text-sm text-foreground mb-2 font-semibold uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-input text-foreground rounded-md border border-border font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-display text-sm text-foreground mb-2 font-semibold uppercase tracking-wide">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-input text-foreground rounded-md border border-border font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-display text-sm text-foreground mb-2 font-semibold uppercase tracking-wide">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-input text-foreground rounded-md border border-border font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                    placeholder="Let's build something together..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full lego-btn bg-accent text-accent-foreground flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16 pt-8 border-t border-border"
        >
          <p className="font-body text-muted-foreground text-sm">
            Built by Krishna Chaturvedi
          </p>
          <p className="font-body text-muted-foreground/60 text-xs mt-2">
            © 2025 All rights reserved
          </p>
        </motion.div>
      </div>
    </div>
  );
};