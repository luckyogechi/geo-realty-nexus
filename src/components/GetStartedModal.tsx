import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Buildings,
  Leaf,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  MapPin,
  CurrencyDollar,
  User,
  Envelope,
  Phone,
  SpinnerGap,
  RocketLaunch,
  House,
  Lightning,
  Flask,
  Star,
  CheckFat,
  Download,
} from '@phosphor-icons/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';

/* ───── Types ───── */
export interface OnboardingLead {
  id: string;
  interest: 'real-estate' | 'biogas';
  budget?: string;
  propertyType?: string;
  location?: string;
  feedstock?: string;
  goal?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  timestamp?: string;
  preferredDate?: string;
  status: 'new' | 'contacted';
}

type Step = 1 | 2 | 3 | 4 | 5;

interface Props {
  open: boolean;
  onClose: () => void;
}

/* ───── Step data ───── */
const BUDGETS = [
  'Under ₦5M',
  '₦5M – ₦15M',
  '₦15M – ₦50M',
  '₦50M – ₦100M',
  '₦100M+',
];
const PROPERTY_TYPES = ['Land', 'House', 'Apartment', 'Commercial'];
const LOCATIONS = ['Umuahia', 'Owerri', 'Aba', 'Enugu', 'Port Harcourt', 'Abuja', 'Lagos'];
const FEEDSTOCK = ['Less than 50 kg/day', '50–200 kg/day', '200–500 kg/day', '500+ kg/day'];
const GOALS = ['Electricity Generation', 'Cooking Gas', 'Organic Fertilizer', 'All Three'];

/* ───── Helpers ───── */
const STORAGE_KEY = 'land_trust_leads';

function getLeads(): OnboardingLead[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLead(lead: OnboardingLead) {
  const leads = getLeads();
  leads.unshift(lead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

/* ───── Component ───── */
const GetStartedModal = ({ open, onClose }: Props) => {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [interest, setInterest] = useState<'real-estate' | 'biogas' | null>(null);
  const [budget, setBudget] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [feedstock, setFeedstock] = useState('');
  const [goal, setGoal] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setDirection(1);
        setInterest(null);
        setBudget('');
        setPropertyType('');
        setLocation('');
        setFeedstock('');
        setGoal('');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setSubmitting(false);
      }, 300);
    }
  }, [open]);

  const goTo = (s: Step, dir: 1 | -1) => {
    setDirection(dir);
    setStep(s);
  };

  const canNext = () => {
    if (step === 1) return interest !== null;
    if (step === 2) {
      if (interest === 'real-estate') return budget && propertyType && location;
      return feedstock && goal;
    }
    if (step === 3) return name && email && phone;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate 2.5s matching process
    await new Promise((r) => setTimeout(r, 2500));
    const lead: OnboardingLead = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      interest: interest!,
      budget: interest === 'real-estate' ? budget : undefined,
      propertyType: interest === 'real-estate' ? propertyType : undefined,
      location: interest === 'real-estate' ? location : undefined,
      feedstock: interest === 'biogas' ? feedstock : undefined,
      goal: interest === 'biogas' ? goal : undefined,
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    saveLead(lead);
    setSubmitting(false);
    goTo(5, 1);
    toast.success('Your proposal is ready!', {
      description: 'We have matched you with the best options.',
    });
  };

  const handleClose = () => {
    if (step === 5) {
      // Allow closing on success
      onClose();
    } else {
      onClose();
    }
  };

  /* ── Animations ── */
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 320 : -320,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -320 : 320,
      opacity: 0,
    }),
  };

  const stepTitles: Record<Step, string> = {
    1: 'What brings you here?',
    2: 'Tell us more',
    3: 'Your contact details',
    4: 'Finding your match',
    5: 'Your proposal is ready!',
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 shadow-2xl shadow-emerald-500/5"
            initial={{ scale: 0.92, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Glass top shine */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-zinc-400 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Step indicator */}
            <div className="px-8 pt-8 pb-2">
              <div className="flex items-center gap-2 mb-2">
                {([1, 2, 3, 4, 5] as Step[]).map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition-all ${
                        s < step
                          ? 'bg-emerald-500 text-white'
                          : s === step
                            ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50'
                            : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {s < step ? <CheckFat size={12} weight="fill" /> : s}
                    </div>
                    {s < 5 && (
                      <div
                        className={`h-px w-6 transition-colors ${
                          s < step ? 'bg-emerald-500/60' : 'bg-zinc-800'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-bold text-white mt-3">{stepTitles[step]}</h2>
            </div>

            {/* Step content */}
            <div className="px-8 pb-6 pt-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.8 }}
                  className="min-h-[280px]"
                >
                  {step === 1 && <Step1Interest value={interest} onChange={setInterest} />}
                  {step === 2 && interest === 'real-estate' && (
                    <Step2RealEstate
                      budget={budget}
                      setBudget={setBudget}
                      propertyType={propertyType}
                      setPropertyType={setPropertyType}
                      location={location}
                      setLocation={setLocation}
                    />
                  )}
                  {step === 2 && interest === 'biogas' && (
                    <Step2Biogas
                      feedstock={feedstock}
                      setFeedstock={setFeedstock}
                      goal={goal}
                      setGoal={setGoal}
                    />
                  )}
                  {step === 3 && (
                    <Step3Contact
                      name={name}
                      setName={setName}
                      email={email}
                      setEmail={setEmail}
                      phone={phone}
                      setPhone={setPhone}
                      message={message}
                      setMessage={setMessage}
                    />
                  )}
                  {step === 4 && <Step4Matching />}
                  {step === 5 && (
                    <Step5Success
                      interest={interest!}
                      name={name}
                      email={email}
                      phone={phone}
                      budget={budget}
                      propertyType={propertyType}
                      location={location}
                      feedstock={feedstock}
                      goal={goal}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer actions */}
            {step < 4 && (
              <div className="flex items-center justify-between border-t border-white/5 px-8 py-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (step === 1) onClose();
                    else goTo((step - 1) as Step, -1);
                  }}
                  className="text-zinc-400 hover:text-white"
                >
                  {step === 1 ? (
                    'Cancel'
                  ) : (
                    <span className="flex items-center gap-2">
                      <ArrowLeft size={16} /> Back
                    </span>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    if (step === 3) handleSubmit();
                    else goTo((step + 1) as Step, 1);
                  }}
                  disabled={!canNext() || (step === 3 && submitting)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 gap-2"
                >
                  {step === 3 ? (
                    submitting ? (
                      <>
                        <SpinnerGap size={18} className="animate-spin" /> Processing
                      </>
                    ) : (
                      <>
                        Find My Match <RocketLaunch size={18} weight="fill" />
                      </>
                    )
                  ) : (
                    <>
                      Continue <ArrowRight size={16} />
                    </>
                  )}
                </Button>
              </div>
            )}
            {step === 4 && (
              <div className="border-t border-white/5 px-8 py-4">
                <p className="text-center text-sm text-zinc-500">
                  Analyzing your preferences against available listings...
                </p>
              </div>
            )}
            {step === 5 && (
              <div className="flex items-center justify-end gap-3 border-t border-white/5 px-8 py-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.success('Proposal downloaded!');
                  }}
                  className="gap-2 border-white/10 text-zinc-300 hover:bg-white/5"
                >
                  <Download size={16} /> Download Proposal
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Done
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ───── Step 1: Interest Selection ───── */
const Step1Interest = ({
  value,
  onChange,
}: {
  value: 'real-estate' | 'biogas' | null;
  onChange: (v: 'real-estate' | 'biogas') => void;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {[
      {
        id: 'real-estate' as const,
        icon: Buildings,
        title: 'Real Estate & Land',
        desc: 'Find verified properties, land plots, and premium real estate investments.',
        color: 'emerald',
      },
      {
        id: 'biogas' as const,
        icon: Leaf,
        title: 'Biogas Energy Systems',
        desc: 'Power your home with sustainable biogas solutions and clean energy.',
        color: 'emerald',
      },
    ].map((opt) => {
      const selected = value === opt.id;
      return (
        <motion.button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`group relative flex flex-col items-center gap-4 rounded-2xl border p-8 text-center transition-all ${
            selected
              ? 'border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
              : 'border-white/5 bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.06]'
          }`}
        >
          {selected && (
            <motion.div
              layoutId="check"
              className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <CheckFat size={12} weight="fill" className="text-white" />
            </motion.div>
          )}
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all ${
              selected
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-zinc-800/50 text-zinc-400 group-hover:bg-zinc-700/50'
            }`}
          >
            <opt.icon size={32} weight={selected ? 'fill' : 'regular'} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{opt.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{opt.desc}</p>
          </div>
          <div
            className={`mt-auto flex items-center gap-1 text-sm font-medium ${
              selected ? 'text-emerald-400' : 'text-zinc-500'
            }`}
          >
            {selected ? 'Selected' : 'Select'}
            <ArrowRight size={14} />
          </div>
        </motion.button>
      );
    })}
  </div>
);

/* ───── Step 2: Real Estate ───── */
const Step2RealEstate = ({
  budget,
  setBudget,
  propertyType,
  setPropertyType,
  location,
  setLocation,
}: {
  budget: string;
  setBudget: (v: string) => void;
  propertyType: string;
  setPropertyType: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
}) => (
  <div className="space-y-6">
    <div className="space-y-3">
      <Label className="text-zinc-300 text-sm font-medium flex items-center gap-2">
        <CurrencyDollar size={16} className="text-emerald-400" /> Budget Range
      </Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {BUDGETS.map((b) => (
          <motion.button
            key={b}
            onClick={() => setBudget(b)}
            whileTap={{ scale: 0.97 }}
            className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
              budget === b
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/10 hover:text-zinc-200'
            }`}
          >
            {b}
          </motion.button>
        ))}
      </div>
    </div>
    <div className="space-y-3">
      <Label className="text-zinc-300 text-sm font-medium flex items-center gap-2">
        <House size={16} className="text-emerald-400" /> Property Type
      </Label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {PROPERTY_TYPES.map((t) => (
          <motion.button
            key={t}
            onClick={() => setPropertyType(t)}
            whileTap={{ scale: 0.97 }}
            className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
              propertyType === t
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/10 hover:text-zinc-200'
            }`}
          >
            {t}
          </motion.button>
        ))}
      </div>
    </div>
    <div className="space-y-3">
      <Label className="text-zinc-300 text-sm font-medium flex items-center gap-2">
        <MapPin size={16} className="text-emerald-400" /> Preferred Location
      </Label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {LOCATIONS.map((l) => (
          <motion.button
            key={l}
            onClick={() => setLocation(l)}
            whileTap={{ scale: 0.97 }}
            className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
              location === l
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/10 hover:text-zinc-200'
            }`}
          >
            {l}
          </motion.button>
        ))}
      </div>
    </div>
  </div>
);

/* ───── Step 2: Biogas ───── */
const Step2Biogas = ({
  feedstock,
  setFeedstock,
  goal,
  setGoal,
}: {
  feedstock: string;
  setFeedstock: (v: string) => void;
  goal: string;
  setGoal: (v: string) => void;
}) => (
  <div className="space-y-6">
    <div className="space-y-3">
      <Label className="text-zinc-300 text-sm font-medium flex items-center gap-2">
        <Flask size={16} className="text-emerald-400" /> Daily Feedstock Available
      </Label>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
        {FEEDSTOCK.map((f) => (
          <motion.button
            key={f}
            onClick={() => setFeedstock(f)}
            whileTap={{ scale: 0.97 }}
            className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
              feedstock === f
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/10 hover:text-zinc-200'
            }`}
          >
            {f}
          </motion.button>
        ))}
      </div>
    </div>
    <div className="space-y-3">
      <Label className="text-zinc-300 text-sm font-medium flex items-center gap-2">
        <Lightning size={16} className="text-emerald-400" /> Main Goal
      </Label>
      <div className="grid grid-cols-2 gap-2">
        {GOALS.map((g) => (
          <motion.button
            key={g}
            onClick={() => setGoal(g)}
            whileTap={{ scale: 0.97 }}
            className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
              goal === g
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-white/5 bg-white/[0.03] text-zinc-400 hover:border-white/10 hover:text-zinc-200'
            }`}
          >
            {g}
          </motion.button>
        ))}
      </div>
    </div>
  </div>
);

/* ───── Step 3: Contact Details ───── */
const Step3Contact = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  message,
  setMessage,
}: {
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
}) => (
  <div className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-zinc-300 text-sm flex items-center gap-2">
          <User size={14} className="text-emerald-400" /> Full Name
        </Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500/50"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-zinc-300 text-sm flex items-center gap-2">
          <Envelope size={14} className="text-emerald-400" /> Email Address
        </Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="john@example.com"
          className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500/50"
        />
      </div>
    </div>
    <div className="space-y-2">
      <Label className="text-zinc-300 text-sm flex items-center gap-2">
        <Phone size={14} className="text-emerald-400" /> Phone Number
      </Label>
      <Input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="tel"
        placeholder="+234 800 000 0000"
        className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500/50"
      />
    </div>
    <div className="space-y-2">
      <Label className="text-zinc-300 text-sm flex items-center gap-2">
        <Star size={14} className="text-emerald-400" /> Questions or Notes (optional)
      </Label>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Any specific requirements or questions..."
        rows={3}
        className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500/50 resize-none"
      />
    </div>
  </div>
);

/* ───── Step 4: Matchmaking Simulator ───── */
const Step4Matching = () => {
  const [progress, setProgress] = useState(0);
  const statuses = [
    'Scanning available listings...',
    'Analyzing your preferences...',
    'Calculating compatibility scores...',
    'Generating personalized proposals...',
    'Finalizing your matched options...',
  ];
  const currentStatus = statuses[Math.min(Math.floor(progress / 20), statuses.length - 1)];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + (3 + Math.random() * 4);
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-8">
      {/* Animated ring loader */}
      <div className="relative h-28 w-28">
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgb(52 211 153)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 326.7} 326.7`}
            className="drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          >
            <RocketLaunch size={36} weight="fill" className="text-emerald-400" />
          </motion.div>
        </div>
      </div>

      {/* Status text */}
      <div className="text-center space-y-2">
        <motion.p
          key={currentStatus}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-medium"
        >
          {currentStatus}
        </motion.p>
        <p className="text-zinc-500 text-sm">
          Matching you with the best {progress < 100 ? 'options' : 'results'}...
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs h-1.5 rounded-full bg-zinc-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

/* ───── Step 5: Success & Proposal ───── */
const Step5Success = ({
  interest,
  name,
  email,
  phone,
  budget,
  propertyType,
  location,
  feedstock,
  goal,
}: {
  interest: 'real-estate' | 'biogas';
  name: string;
  email: string;
  phone: string;
  budget?: string;
  propertyType?: string;
  location?: string;
  feedstock?: string;
  goal?: string;
}) => (
  <div className="space-y-6">
    {/* Success header */}
    <motion.div
      className="flex flex-col items-center gap-4 py-4"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
        <CheckCircle size={48} weight="fill" className="text-emerald-400" />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white">Welcome, {name.split(' ')[0]}!</h3>
        <p className="text-zinc-400 mt-1">
          We have prepared your personalized proposal based on your preferences.
        </p>
      </div>
    </motion.div>

    {/* Summary card */}
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 space-y-4">
      <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
        <Star size={14} weight="fill" className="text-emerald-400" /> Proposal Summary
      </h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-zinc-500 text-xs">Interest</p>
          <p className="text-white font-medium capitalize">
            {interest === 'real-estate' ? 'Real Estate & Land' : 'Biogas Energy'}
          </p>
        </div>
        {interest === 'real-estate' && (
          <>
            <div>
              <p className="text-zinc-500 text-xs">Budget</p>
              <p className="text-white font-medium">{budget}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs">Property Type</p>
              <p className="text-white font-medium">{propertyType}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs">Location</p>
              <p className="text-white font-medium">{location}</p>
            </div>
          </>
        )}
        {interest === 'biogas' && (
          <>
            <div>
              <p className="text-zinc-500 text-xs">Feedstock</p>
              <p className="text-white font-medium">{feedstock}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs">Goal</p>
              <p className="text-white font-medium">{goal}</p>
            </div>
          </>
        )}
        <div>
          <p className="text-zinc-500 text-xs">Email</p>
          <p className="text-white font-medium truncate">{email}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-xs">Phone</p>
          <p className="text-white font-medium">{phone}</p>
        </div>
      </div>
    </div>

    {/* Matched items hint */}
    <motion.div
      className="flex items-center gap-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
        <Lightning size={20} weight="fill" className="text-emerald-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-white">
          {interest === 'real-estate'
            ? 'We found 3 properties matching your criteria'
            : 'We found 2 biogas systems matching your needs'}
        </p>
        <p className="text-xs text-zinc-400 mt-0.5">
          Our team will reach out within 24 hours with full details.
        </p>
      </div>
    </motion.div>
  </div>
);

export default GetStartedModal;