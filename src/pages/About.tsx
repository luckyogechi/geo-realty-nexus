import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Buildings, Globe, Lightning, Users, ArrowRight, Sparkle, SealCheck, Target, Eye } from '@phosphor-icons/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import CEOContactSection from '../components/CEOContactSection';

const stats = [
  { value: '25+', label: 'Verified Properties', icon: Buildings },
  { value: '100%', label: 'Transaction Security', icon: ShieldCheck },
  { value: '40+', label: 'Partner Agents', icon: Users },
  { value: '5+', label: 'Years of Trust', icon: SealCheck },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust & Transparency',
    description: 'Every listing undergoes rigorous multi-step verification. We ensure full disclosure of property history, titles, and legal status.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Buildings,
    title: 'Premium Portfolio',
    description: 'We curate only the finest residential, commercial, and land investment opportunities across Nigeria&apos;s fastest-growing corridors.',
    color: 'text-amber-600',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Globe,
    title: 'Nationwide Reach',
    description: 'From Lagos to Umuahia, our network spans major Nigerian cities with deep local expertise in every market we serve.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Lightning,
    title: 'Innovation First',
    description: 'We combine real estate expertise with modern technology — digital verification, energy solutions, and seamless online transactions.',
    color: 'text-amber-600',
    bg: 'bg-amber-500/10',
  },
];

const About = () => {
  return (
    <div className="space-y-0 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="max-w-3xl space-y-6"
          >
            <Badge variant="secondary" className="w-fit text-xs font-semibold tracking-wider uppercase px-4 py-1.5 bg-white/10 text-white border-white/20">
              About Landbusiness Transact Nigeria
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Building Trust in <span className="text-primary">Nigerian</span> Real Estate
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
              We are a technology-driven real estate and renewable energy platform committed to transparent, secure, and accessible property transactions across Nigeria.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/contact">
                <Button size="lg" className="h-14 px-8 text-lg">
                  Contact Us <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/properties">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                  Explore Properties
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="container mx-auto px-4 -mt-14 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <Card className="p-5 md:p-6 text-center hover:shadow-lg transition-shadow">
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" weight="bold" />
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <Card className="p-8 h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-emerald-600" weight="bold" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize access to verified real estate opportunities in Nigeria by combining
                  cutting-edge technology with deep local expertise. We eliminate the opacity that has
                  long plagued the industry, ensuring every transaction is secure, transparent, and
                  beneficial for all parties.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <Card className="p-8 h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-amber-600" weight="bold" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become Nigeria&apos;s most trusted real estate and property technology platform,
                  setting the standard for transparency, innovation, and customer satisfaction.
                  We envision a future where every Nigerian can invest in real estate with absolute
                  confidence and ease.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkle className="h-5 w-5 text-amber-500" weight="fill" />
              <Badge variant="secondary" className="text-xs font-semibold tracking-wider uppercase px-4 py-1.5">
                Core Values
              </Badge>
              <Sparkle className="h-5 w-5 text-amber-500" weight="fill" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What We <span className="text-primary">Stand For</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all group">
                  <div className={`h-12 w-12 rounded-xl ${value.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <value.icon className={`h-6 w-6 ${value.color}`} weight="bold" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <CEOContactSection />
    </div>
  );
};

export default About;