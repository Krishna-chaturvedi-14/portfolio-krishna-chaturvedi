import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import { LegoStuds } from './LegoStuds';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const socialLinks = [
  {
    icon: <Linkedin size={24} />,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/Krishna-chaturvedi-14',
    color: 'bg-lego-blue',
  },
  {
    icon: <Github size={24} />,
    label: 'GitHub',
    href: 'https://github.com/Krishna-chaturvedi-14',
    color: 'bg-lego-black',
  },
  {
    icon: <Mail size={24} />,
    label: 'Email',
    href: 'mailto:krishna14chaturvedi@gmail.com',
    color: 'bg-lego-red',
  },
];

export const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    toast({
      title: "Message sent! 🧱",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    setFormState({ name: '', email: '', message: '' });
  };

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
          <span className="inline-block px-4 py-2 bg-lego-orange/10 text-lego-orange rounded-lg font-body text-sm font-medium mb-4">
            📬 Contact
          </span>
          <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
            Let's Build Together
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? Want to collaborate? Drop me a message!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact Card */}
            <div className="relative bg-lego-green rounded-2xl p-8 shadow-lego text-lego-white">
              <LegoStuds rows={1} cols={4} color="rgba(255,255,255,0.3)" />
              
              <div className="pt-4 space-y-6">
                <h3 className="font-display text-sm mb-6">GET IN TOUCH</h3>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-lego-white/20 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-body text-sm opacity-70">Email</p>
                    <a href="mailto:krishna14chaturvedi@gmail.com" className="font-body font-medium hover:underline">
                      krishna14chaturvedi@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-lego-white/20 flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-body text-sm opacity-70">Phone</p>
                    <a href="tel:+917417366256" className="font-body font-medium hover:underline">
                      +91-7417366256
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-lego-white/20 flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-body text-sm opacity-70">Location</p>
                    <p className="font-body font-medium">Jaipur, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`w-14 h-14 ${link.color} text-lego-white rounded-xl flex items-center justify-center shadow-lego transition-transform`}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-display text-xs text-foreground mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-muted text-foreground rounded-lg border border-border font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-display text-xs text-foreground mb-2">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-muted text-foreground rounded-lg border border-border font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-display text-xs text-foreground mb-2">
                    YOUR MESSAGE
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-muted text-foreground rounded-lg border border-border font-body focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Let's build something amazing..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full lego-btn bg-primary text-primary-foreground flex items-center justify-center gap-2"
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
          transition={{ delay: 0.5 }}
          className="text-center mt-16 pt-8 border-t border-border"
        >
          <p className="font-body text-muted-foreground text-sm">
            Built with 🧱 by Krishna Chaturvedi
          </p>
          <p className="font-body text-muted-foreground/60 text-xs mt-2">
            © 2025 All rights reserved
          </p>
        </motion.div>
      </div>
    </div>
  );
};
