import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlass,
  FadersHorizontal,
  GridFour,
  List,
  Star,
  StarHalf,
  ArrowRight,
  DownloadSimple,
  PlayCircle,
  Check,
  X,
  CaretDown,
  CaretRight,
  Sparkle,
  SquaresFour,
  Globe,
  Sun,
  Drop,
  Compass,
  Leaf,
  Buildings,
  Clock,
  ShieldCheck,
  Eye,
  Terminal,
  AppWindow,
  RocketLaunch,
  ThumbsUp,
  Quotes,
  CaretDoubleRight,
  ArrowClockwise,
  Tag,
  Scan,
  Ruler,
  Plant,
} from '@phosphor-icons/react';
import { LAND_APPS } from '../lib/mock-data';
import type { LandApp } from '../types';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'gis-mapping': Compass,
  'soil-agtech': Leaf,
  'zoning': Buildings,
  'drone-surveying': RocketLaunch,
  'forestry': Plant,
  'valuation': Ruler,
  'cadastral': Scan,
};

const ACCENT_CLASSES: Record<string, { bg: string; text: string; ring: string; light: string; badge: string }> = {
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', ring: 'ring-emerald-400', light: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-600', ring: 'ring-amber-400', light: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700' },
  blue: { bg: 'bg-blue-500', text: 'text-blue-600', ring: 'ring-blue-400', light: 'bg-blue-50', badge: 'bg-blue-100 text-blue-700' },
  violet: { bg: 'bg-violet-500', text: 'text-violet-600', ring: 'ring-violet-400', light: 'bg-violet-50', badge: 'bg-violet-100 text-violet-700' },
  green: { bg: 'bg-green-500', text: 'text-green-600', ring: 'ring-green-400', light: 'bg-green-50', badge: 'bg-green-100 text-green-700' },
  lime: { bg: 'bg-lime-500', text: 'text-lime-600', ring: 'ring-lime-400', light: 'bg-lime-50', badge: 'bg-lime-100 text-lime-700' },
  indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', ring: 'ring-indigo-400', light: 'bg-indigo-50', badge: 'bg-indigo-100 text-indigo-700' },
  stone: { bg: 'bg-stone-500', text: 'text-stone-600', ring: 'ring-stone-400', light: 'bg-stone-50', badge: 'bg-stone-100 text-stone-700' },
  teal: { bg: 'bg-teal-500', text: 'text-teal-600', ring: 'ring-teal-400', light: 'bg-teal-50', badge: 'bg-teal-100 text-teal-700' },
  sky: { bg: 'bg-sky-500', text: 'text-sky-600', ring: 'ring-sky-400', light: 'bg-sky-50', badge: 'bg-sky-100 text-sky-700' },
};

const AppCard = ({ app, index }: { app: LandApp; index: number }) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(app.installed);
  const [showDetail, setShowDetail] = useState(false);
  const accent = ACCENT_CLASSES[app.accentColor] || ACCENT_CLASSES.emerald;
  const CategoryIcon = CATEGORY_ICONS[app.category] || AppWindow;

  const handleInstall = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInstalling(true);
    setTimeout(() => {
      setIsInstalling(false);
      setIsInstalled(true);
    }, 1500);
  };

  const handleUninstall = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInstalled(false);
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          i < full ? (
            <Star key={i} className="h-3 w-3 text-amber-400" weight="fill" />
          ) : i === full && half ? (
            <StarHalf key={i} className="h-3 w-3 text-amber-400" weight="fill" />
          ) : (
            <Star key={i} className="h-3 w-3 text-slate-200" weight="fill" />
          )
        ))}
      </span>
    );
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        onClick={() => setShowDetail(true)}
        className="group relative bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-lg hover:border-slate-300/80 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Top accent bar */}
        <div className={`h-1 w-full ${accent.bg} opacity-60`} />

        <div className="p-5 space-y-4">
          {/* Header row */}
          <div className="flex items-start gap-4">
            <div className={`relative h-14 w-14 shrink-0 rounded-2xl ${accent.light} flex items-center justify-center text-2xl shadow-sm ring-1 ${accent.ring} ring-opacity-20`}>
              <span className="select-none">{app.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base truncate">{app.name}</h3>
                {isInstalled && (
                  <span className="shrink-0 h-5 px-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-0.5">
                    <Check className="h-2.5 w-2.5" weight="bold" />
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{app.tagline}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${accent.badge}`}>
                  <CategoryIcon className="h-2.5 w-2.5" weight="bold" />
                  {app.categoryLabel}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">{app.version}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {app.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {app.tags.slice(0, 4).map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
            {app.tags.length > 4 && (
              <span className="text-[10px] text-muted-foreground font-bold">+{app.tags.length - 4}</span>
            )}
          </div>

          {/* Bottom row: rating + action */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              {renderStars(app.rating)}
              <span className="text-[10px] font-bold text-muted-foreground">
                {app.rating}
              </span>
              <span className="text-[10px] text-muted-foreground">({app.reviewsCount})</span>
            </div>

            {isInstalled ? (
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mr-1">
                  <Check className="h-3 w-3" weight="bold" />
                  Installed
                </span>
                <button
                  onClick={handleUninstall}
                  className="h-7 px-2.5 rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-500 text-[10px] font-bold transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className={`h-8 px-4 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all duration-300 ${
                  isInstalling
                    ? 'bg-slate-100 text-slate-400 cursor-wait'
                    : `${accent.bg} text-white hover:shadow-md hover:brightness-110 active:scale-95`
                }`}
              >
                {isInstalling ? (
                  <>
                    <ArrowClockwise className="h-3.5 w-3.5 animate-spin" />
                    Installing...
                  </>
                ) : (
                  <>
                    <DownloadSimple className="h-3.5 w-3.5" weight="bold" />
                    Install
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Banner */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={app.bannerImage}
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button
                  onClick={() => setShowDetail(false)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <X className="h-4 w-4 text-white" weight="bold" />
                </button>
                <div className="absolute bottom-4 left-6 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-3xl shadow-lg">
                    <span>{app.icon}</span>
                  </div>
                  <div className="text-white">
                    <h2 className="text-xl font-bold">{app.name}</h2>
                    <p className="text-sm text-white/80">{app.tagline}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-bold">
                    <User className="h-3.5 w-3.5" />
                    {app.developer}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <Tag className="h-3.5 w-3.5" />
                    {app.pricing}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <Clock className="h-3.5 w-3.5" />
                    v{app.version}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <DownloadSimple className="h-3.5 w-3.5" />
                    {app.size}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Updated {new Date(app.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-bold mb-2">About</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{app.description}</p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                    <Sparkle className="h-4 w-4 text-amber-500" weight="fill" />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {app.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-emerald-600" weight="bold" />
                        </div>
                        <span className="text-xs text-muted-foreground">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-violet-500" weight="fill" />
                    Permissions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {app.permissions.map((perm) => (
                      <span key={perm} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-2 border-t">
                  {isInstalled ? (
                    <>
                      <button className="h-10 px-5 rounded-xl bg-emerald-500 text-white text-sm font-bold flex items-center gap-2 hover:bg-emerald-600 transition-colors shadow-sm">
                        <PlayCircle className="h-4 w-4" weight="fill" />
                        Launch App
                      </button>
                      <button
                        onClick={handleUninstall}
                        className="h-10 px-5 rounded-xl border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-colors"
                      >
                        Uninstall
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleInstall}
                        disabled={isInstalling}
                        className={`h-10 px-6 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                          isInstalling
                            ? 'bg-slate-100 text-slate-400 cursor-wait'
                            : `${accent.bg} text-white hover:shadow-md hover:brightness-110 active:scale-95`
                        }`}
                      >
                        {isInstalling ? (
                          <>
                            <ArrowClockwise className="h-4 w-4 animate-spin" />
                            Installing...
                          </>
                        ) : (
                          <>
                            <DownloadSimple className="h-4 w-4" weight="bold" />
                            Install - {app.pricing === 'Free' ? 'Free' : 'Free Trial'}
                          </>
                        )}
                      </button>
                      <a
                        href={app.documentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 px-4 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        Docs
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const LandAppsSection = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'updated'>('rating');
  const [showInstalledOnly, setShowInstalledOnly] = useState(false);

  // Simulate some installed apps for demo
  const [installedIds, setInstalledIds] = useState<Set<string>>(new Set(['la-2', 'la-5']));

  const categories = useMemo(() => {
    const cats = new Map<string, string>();
    cats.set('all', 'All Apps');
    LAND_APPS.forEach(app => {
      if (!cats.has(app.category)) cats.set(app.category, app.categoryLabel);
    });
    return Array.from(cats.entries());
  }, []);

  const filteredApps = useMemo(() => {
    let apps = [...LAND_APPS];

    // Filter by category
    if (activeCategory !== 'all') {
      apps = apps.filter(app => app.category === activeCategory);
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      apps = apps.filter(
        app =>
          app.name.toLowerCase().includes(q) ||
          app.tagline.toLowerCase().includes(q) ||
          app.description.toLowerCase().includes(q) ||
          app.tags.some(t => t.toLowerCase().includes(q)) ||
          app.developer.toLowerCase().includes(q)
      );
    }

    // Filter installed only
    if (showInstalledOnly) {
      apps = apps.filter(app => installedIds.has(app.id));
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        apps.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        apps.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'updated':
        apps.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
    }

    return apps;
  }, [activeCategory, search, sortBy, showInstalledOnly, installedIds]);

  const installedCount = LAND_APPS.filter(a => installedIds.has(a.id)).length;
  const updatesAvailable = LAND_APPS.filter(a => a.status === 'update_available').length;

  return (
    <section className="py-12">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
            <SquaresFour className="h-3.5 w-3.5" weight="bold" />
            <span>Land Apps Store</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            App Marketplace{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              for Land Professionals
            </span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Extend your Land & Trust dashboard with powerful integrations for GIS mapping, soil analysis, drone surveying, and more.
          </p>
        </motion.div>

        {/* Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { label: 'Total Apps', value: LAND_APPS.length, icon: AppWindow, color: 'text-primary' },
            { label: 'Installed', value: installedCount, icon: Check, color: 'text-emerald-600' },
            { label: 'Updates Available', value: updatesAvailable, icon: ArrowClockwise, color: 'text-amber-600' },
            { label: 'Avg Rating', value: (LAND_APPS.reduce((s, a) => s + a.rating, 0) / LAND_APPS.length).toFixed(1), icon: Star, color: 'text-amber-500' },
          ].map((stat, i) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200/70 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} weight="bold" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="space-y-4"
        >
          {/* Search row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search apps by name, description, or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-10 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300 transition-colors"
                >
                  <X className="h-3 w-3 text-slate-500" weight="bold" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-10 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-bold text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                >
                  <option value="rating">Top Rated</option>
                  <option value="name">A-Z</option>
                  <option value="updated">Recently Updated</option>
                </select>
                <CaretDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" weight="bold" />
              </div>

              {/* View Toggle */}
              <div className="flex bg-slate-100 rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <GridFour className="h-4 w-4" weight="bold" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <List className="h-4 w-4" weight="bold" />
                </button>
              </div>

              {/* Installed toggle */}
              <button
                onClick={() => setShowInstalledOnly(!showInstalledOnly)}
                className={`h-10 px-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                  showInstalledOnly
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'border-slate-200 text-muted-foreground hover:border-slate-300'
                }`}
              >
                <Check className="h-3.5 w-3.5" weight="bold" />
                Installed
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(([cat, label]) => {
              const isActive = activeCategory === cat;
              const Icon = cat === 'all' ? undefined : CATEGORY_ICONS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-white border border-slate-200 text-muted-foreground hover:border-slate-300 hover:text-foreground'
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" weight="bold" />}
                  {label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-bold">
            Showing <span className="text-foreground">{filteredApps.length}</span> of {LAND_APPS.length} apps
          </p>
          {filteredApps.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {installedCount} installed · {LAND_APPS.length - installedCount} available
            </p>
          )}
        </div>

        {/* App Grid / List */}
        <AnimatePresence mode="wait">
          {filteredApps.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-16 space-y-4"
            >
              <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
                <MagnifyingGlass className="h-8 w-8 text-slate-300" weight="bold" />
              </div>
              <h3 className="text-lg font-bold text-muted-foreground">No apps found</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {search
                  ? `No apps match "${search}". Try a different search term or browse categories.`
                  : showInstalledOnly
                    ? 'No installed apps yet. Browse the marketplace and install your first app!'
                    : 'No apps available in this category.'}
              </p>
              {(search || showInstalledOnly) && (
                <button
                  onClick={() => { setSearch(''); setShowInstalledOnly(false); }}
                  className="text-sm text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filteredApps.map((app, i) => (
                <AppCard key={app.id} app={app} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {filteredApps.map((app, i) => (
                <ListAppCard key={app.id} app={app} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Need to import Calendar and User for the detail modal
import { Calendar, User } from '@phosphor-icons/react';

const ListAppCard = ({ app, index }: { app: LandApp; index: number }) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(app.installed);
  const [showDetail, setShowDetail] = useState(false);
  const accent = ACCENT_CLASSES[app.accentColor] || ACCENT_CLASSES.emerald;
  const CategoryIcon = CATEGORY_ICONS[app.category] || AppWindow;

  const handleInstall = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInstalling(true);
    setTimeout(() => {
      setIsInstalling(false);
      setIsInstalled(true);
    }, 1500);
  };

  const handleUninstall = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInstalled(false);
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          i < full ? (
            <Star key={i} className="h-3 w-3 text-amber-400" weight="fill" />
          ) : i === full && half ? (
            <StarHalf key={i} className="h-3 w-3 text-amber-400" weight="fill" />
          ) : (
            <Star key={i} className="h-3 w-3 text-slate-200" weight="fill" />
          )
        ))}
      </span>
    );
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ x: 4, transition: { duration: 0.15 } }}
        onClick={() => setShowDetail(true)}
        className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-200 cursor-pointer"
      >
        <div className={`h-12 w-12 shrink-0 rounded-xl ${accent.light} flex items-center justify-center text-xl shadow-sm ring-1 ${accent.ring} ring-opacity-20`}>
          <span className="select-none">{app.icon}</span>
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm truncate">{app.name}</h3>
              {isInstalled && (
                <span className="shrink-0 h-4 px-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold flex items-center gap-0.5">
                  <Check className="h-2 w-2" weight="bold" />
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">{app.tagline}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {renderStars(app.rating)}
            <span className="text-[10px] font-bold text-muted-foreground">({app.reviewsCount})</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <CategoryIcon className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] font-bold text-muted-foreground">{app.categoryLabel}</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground font-bold">{app.size}</span>
          </div>
        </div>
        {isInstalled ? (
          <button
            onClick={handleUninstall}
            className="shrink-0 h-8 px-3 rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-500 text-[10px] font-bold transition-colors"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className={`shrink-0 h-8 px-4 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all ${
              isInstalling
                ? 'bg-slate-100 text-slate-400 cursor-wait'
                : `${accent.bg} text-white hover:shadow-md hover:brightness-110 active:scale-95`
            }`}
          >
            {isInstalling ? (
              <>
                <ArrowClockwise className="h-3 w-3 animate-spin" />
                Installing...
              </>
            ) : (
              <>
                <DownloadSimple className="h-3.5 w-3.5" weight="bold" />
                Install
              </>
            )}
          </button>
        )}
      </motion.div>

      {/* Detail Modal (same as AppCard) */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={app.bannerImage}
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button
                  onClick={() => setShowDetail(false)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <X className="h-4 w-4 text-white" weight="bold" />
                </button>
                <div className="absolute bottom-4 left-6 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-3xl shadow-lg">
                    <span>{app.icon}</span>
                  </div>
                  <div className="text-white">
                    <h2 className="text-xl font-bold">{app.name}</h2>
                    <p className="text-sm text-white/80">{app.tagline}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-bold">
                    <User className="h-3.5 w-3.5" />
                    {app.developer}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <Tag className="h-3.5 w-3.5" />
                    {app.pricing}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <Clock className="h-3.5 w-3.5" />
                    v{app.version}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <DownloadSimple className="h-3.5 w-3.5" />
                    {app.size}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Updated {new Date(app.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold mb-2">About</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{app.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                    <Sparkle className="h-4 w-4 text-amber-500" weight="fill" />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {app.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-emerald-600" weight="bold" />
                        </div>
                        <span className="text-xs text-muted-foreground">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-violet-500" weight="fill" />
                    Permissions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {app.permissions.map((perm) => (
                      <span key={perm} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t">
                  {isInstalled ? (
                    <>
                      <button className="h-10 px-5 rounded-xl bg-emerald-500 text-white text-sm font-bold flex items-center gap-2 hover:bg-emerald-600 transition-colors shadow-sm">
                        <PlayCircle className="h-4 w-4" weight="fill" />
                        Launch App
                      </button>
                      <button
                        onClick={handleUninstall}
                        className="h-10 px-5 rounded-xl border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-colors"
                      >
                        Uninstall
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleInstall}
                        disabled={isInstalling}
                        className={`h-10 px-6 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                          isInstalling
                            ? 'bg-slate-100 text-slate-400 cursor-wait'
                            : `${accent.bg} text-white hover:shadow-md hover:brightness-110 active:scale-95`
                        }`}
                      >
                        {isInstalling ? (
                          <>
                            <ArrowClockwise className="h-4 w-4 animate-spin" />
                            Installing...
                          </>
                        ) : (
                          <>
                            <DownloadSimple className="h-4 w-4" weight="bold" />
                            Install - {app.pricing === 'Free' ? 'Free' : 'Free Trial'}
                          </>
                        )}
                      </button>
                      <a
                        href={app.documentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 px-4 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        Docs
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandAppsSection;