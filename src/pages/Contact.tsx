import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Envelope, Clock, ArrowRight, Buildings, ShieldCheck, CaretRight } from '@phosphor-icons/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import CEOContactSection from '../components/CEOContactSection';

const contactInfo = [
  { icon: MapPin, label: 'Office Address', value: '123 Victoria Island, Lagos, Nigeria', color: 'text-emerald-600' },
  { icon: Phone, label: 'Phone', value: '+234 800 LAND TRUST', href: 'tel:+2348005263878', color: 'text-emerald-600' },
  { icon: Envelope, label: 'Email', value: 'info@landandtrust.ng', href: 'mailto:info@landandtrust.ng', color: 'text-emerald-600' },
  { icon: Clock, label: 'Business Hours', value: 'Mon - Sat: 8:00 AM - 6:00 PM', color: 'text-amber-600' },
];

const Contact = () => {
  return (
    <div className="space-y-0 pb-20">
      {/* Hero / Header */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="max-w-3xl space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
              We&apos;re here to help with your real estate and energy needs. Reach out to us directly or connect with our C.E.O. personally.
            </p>
            {/* Subsidiary Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5"
            >
              <Buildings className="h-4 w-4 text-emerald-300" weight="bold" />
              <span className="text-sm font-medium text-gray-100">
                Land and Trust Nigeria — A subsidiary of{' '}
                <span className="text-emerald-300 font-semibold">Landbusiness Transact Nigeria</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className={`h-6 w-6 ${item.color}`} weight="bold" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-base font-semibold hover:text-primary transition-colors block mt-0.5">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base font-semibold mt-0.5">{item.value}</p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Corporate Transparency Card */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-emerald-950/20 dark:via-zinc-950 dark:to-amber-950/20 border-emerald-200/50 dark:border-emerald-800/30">
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-40 w-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Buildings className="h-5 w-5 text-emerald-600" weight="bold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Corporate Structure</h2>
                  <p className="text-sm text-muted-foreground">Transparent ownership &amp; entity hierarchy</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-emerald-200/40 dark:border-emerald-800/20">
                    <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-6 w-6 text-emerald-600" weight="fill" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">Land and Trust Nigeria</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Our customer-facing brand for real estate transactions, property verification, and renewable energy solutions across Nigeria.
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 mt-2">
                        <CaretRight className="h-3 w-3" weight="bold" />
                        Operating Subsidiary
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-500/5 border border-amber-200/40 dark:border-amber-800/20">
                    <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Buildings className="h-6 w-6 text-amber-600" weight="fill" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">Landbusiness Transact Nigeria</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        The parent company overseeing corporate strategy, regulatory compliance, and executive leadership for all subsidiary brands.
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 mt-2">
                        <CaretRight className="h-3 w-3" weight="bold" />
                        Parent Company
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-emerald-200/30 dark:border-emerald-800/20">
                <p className="text-sm text-center text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Land and Trust Nigeria</strong> is a registered subsidiary of{' '}
                  <strong className="text-foreground">Landbusiness Transact Nigeria</strong>.
                  All transactions are conducted under the regulatory oversight and corporate governance of the parent entity.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <h2 className="text-2xl font-bold tracking-tight mb-6">Send a Message</h2>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = 'mailto:info@landandtrust.ng';
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us more about your needs..."
                  className="w-full px-4 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Send Message <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>
          </motion.div>

          {/* Map / Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-tight mb-6">Our Location</h2>
            <div className="rounded-xl overflow-hidden border bg-muted h-[300px] flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" weight="fill" />
                <p className="text-lg font-semibold">Lagos Office</p>
                <p className="text-muted-foreground">123 Victoria Island, Lagos, Nigeria</p>
                <a
                  href="https://maps.google.com/maps?q=Victoria+Island+Lagos+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3 hover:underline"
                >
                  Open in Google Maps <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <Card className="p-5">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-amber-600" weight="bold" />
                </div>
                <div>
                  <p className="font-semibold">Office Hours</p>
                  <p className="text-sm text-muted-foreground">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                  <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CEO Contact Section */}
      <CEOContactSection />
    </div>
  );
};

export default Contact;