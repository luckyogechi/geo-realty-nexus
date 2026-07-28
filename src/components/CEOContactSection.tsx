import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Envelope, WhatsappLogo, Copy, Quotes, ArrowUpRight, Sparkle, SealCheck, Star, ChatCircleText } from '@phosphor-icons/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

const CEO_NAME = 'Lucky Ogechi Ignatius';
const CEO_TITLE = 'C.E.O, Landbusiness Transact Nigeria & Subsidiary Land and Trust Nigeria';
const CEO_EMAIL = 'luckyonuoha2@gmail.com';
const CEO_PHONE = '+2348131828007';
const CEO_ORIGIN = 'Ubani Ibeku Umuahia Abia State, Nigeria';
const CEO_QUOTE = 'Leading transparent land transactions & modern real estate investments across Nigeria.';
const CEO_PORTRAIT = 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9cebb6e-cc53-4bde-bbec-8e27656f3e98/ceo-portrait-lucky-ogechi-ignatius-ddf79cc5-1784966109779.webp';

const ceoActions = [
  { label: 'Call C.E.O.', icon: Phone, href: `tel:${CEO_PHONE}`, variant: 'default' as const },
  { label: 'Mail C.E.O.', icon: Envelope, href: `mailto:${CEO_EMAIL}`, variant: 'outline' as const },
  { label: 'WhatsApp', icon: WhatsappLogo, href: `https://wa.me/${CEO_PHONE.replace(/\D/g, '')}`, variant: 'secondary' as const },
];

const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  } catch {
    toast.error('Failed to copy to clipboard');
  }
};

const CEOContactSection = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="ceo" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-96 w-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] bg-gradient-to-br from-emerald-500/3 to-amber-500/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center space-y-4 mb-16"
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkle className="h-5 w-5 text-amber-500" weight="fill" />
            <Badge variant="secondary" className="text-xs font-semibold tracking-wider uppercase px-4 py-1.5">
              Executive Leadership
            </Badge>
            <Sparkle className="h-5 w-5 text-amber-500" weight="fill" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Meet Our <span className="text-primary">C.E.O.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Direct access to the founder. No barriers, no bureaucracy — just transparent real estate leadership.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Portrait Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="md:col-span-2"
            >
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                  {!imgLoaded && (
                    <div className="aspect-[4/5] bg-muted animate-pulse" />
                  )}
                  <img
                    src={CEO_PORTRAIT}
                    alt={CEO_NAME}
                    onLoad={() => setImgLoaded(true)}
                    className={`w-full aspect-[4/5] object-cover object-center transition-all duration-700 group-hover:scale-105 ${
                      imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                  />
                  {/* Decorative corner accents */}
                  <div className="absolute top-3 left-3 z-20">
                    <div className="h-12 w-12 rounded-full bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center border border-emerald-400/30">
                      <Star className="h-5 w-5 text-emerald-400" weight="fill" />
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute -bottom-3 -right-3 bg-amber-500 text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5"
                >
                  <SealCheck className="h-4 w-4" weight="fill" />
                  Verified Executive
                </motion.div>
              </div>
            </motion.div>

            {/* Info Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="md:col-span-3 space-y-8"
            >
              {/* Name & Title */}
              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {CEO_NAME}
                </h3>
                <p className="text-lg text-primary font-semibold flex items-center gap-2">
                  <ChatCircleText className="h-5 w-5" weight="fill" />
                  {CEO_TITLE}
                </p>
              </div>

              {/* Origin Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-950/30 dark:to-amber-950/30 border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl px-4 py-2.5"
              >
                <MapPin className="h-5 w-5 text-emerald-600" weight="fill" />
                <span className="text-sm font-medium text-foreground/80">
                  From <span className="font-bold text-foreground">{CEO_ORIGIN}</span>
                </span>
              </motion.div>

              {/* Vision Quote */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative bg-gradient-to-br from-emerald-500/5 to-amber-500/5 rounded-xl p-6 border border-emerald-200/20"
              >
                <Quotes className="absolute top-4 left-4 h-8 w-8 text-emerald-500/20" weight="fill" />
                <p className="text-base md:text-lg leading-relaxed italic text-foreground/80 pl-4 border-l-2 border-emerald-500">
                  &ldquo;{CEO_QUOTE}&rdquo;
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {ceoActions.map((action) => (
                  <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant={action.variant}
                      size="lg"
                      className="group h-12 px-5 gap-2"
                    >
                      <action.icon className="h-5 w-5" weight="bold" />
                      <span>{action.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </Button>
                  </a>
                ))}
              </motion.div>

              {/* Contact Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-card border rounded-xl p-5 space-y-4"
              >
                <h4 className="text-sm font-bold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                  <Sparkle className="h-4 w-4 text-amber-500" weight="fill" />
                  Direct Contact Details
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Envelope className="h-5 w-5 text-primary" weight="bold" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground font-medium">Email</p>
                      <a
                        href={`mailto:${CEO_EMAIL}`}
                        className="text-sm font-medium truncate block hover:text-primary transition-colors"
                      >
                        {CEO_EMAIL}
                      </a>
                    </div>
                    <button
                      onClick={() => copyToClipboard(CEO_EMAIL, 'Email')}
                      className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors shrink-0"
                      title="Copy email"
                    >
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-emerald-600" weight="bold" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground font-medium">Phone</p>
                      <a
                        href={`tel:${CEO_PHONE}`}
                        className="text-sm font-medium truncate block hover:text-emerald-600 transition-colors"
                      >
                        {CEO_PHONE}
                      </a>
                    </div>
                    <button
                      onClick={() => copyToClipboard(CEO_PHONE, 'Phone number')}
                      className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors shrink-0"
                      title="Copy phone number"
                    >
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* Quick Actions Row */}
                <div className="flex flex-wrap gap-2 pt-1 border-t">
                  <a
                    href={`https://wa.me/${CEO_PHONE.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                  >
                    <WhatsappLogo className="h-3.5 w-3.5" weight="fill" />
                    WhatsApp
                  </a>
                  <a
                    href={`sms:${CEO_PHONE}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5"
                  >
                    <ChatCircleText className="h-3.5 w-3.5" weight="fill" />
                    Send SMS
                  </a>
                  <button
                    onClick={() => copyToClipboard(`${CEO_NAME}
${CEO_TITLE}
${CEO_EMAIL}
${CEO_PHONE}`, 'Full contact details')}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted ml-auto"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy All
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOContactSection;