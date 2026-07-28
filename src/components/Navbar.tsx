import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGetStarted } from '../App';
import {
  List,
  X,
  House,
  ShoppingBag,
  SquaresFour,
  MagnifyingGlass,
  ShoppingCart,
  User,
  Drop,
  Info,
  PhoneCall,
} from '@phosphor-icons/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, textarea, select';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [cartCount] = useState(0);
  const { openGetStarted } = useGetStarted();

  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '/', icon: House },
    { name: 'Properties', href: '/properties', icon: MagnifyingGlass },
    { name: 'Energy Store', href: '/store', icon: ShoppingBag },
    { name: 'Biogas', href: '/biogas', icon: Drop },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: PhoneCall },
    { name: 'Dashboard', href: '/dashboard', icon: SquaresFour },
  ];

  const isActive = (path: string) => location.pathname === path;

  // --- Focus trap & keyboard handling ---
  const getFocusableElements = useCallback(
    () =>
      drawerRef.current
        ? Array.from<HTMLElement>(
            drawerRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
          ).filter((el) => el.offsetParent !== null)
        : [],
    []
  );

  const trapFocus = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [getFocusableElements]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      trapFocus(e);
    },
    [trapFocus]
  );

  // --- Open / close side effects ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      // Focus first focusable element after animation starts
      requestAnimationFrame(() => {
        const focusable = getFocusableElements();
        if (focusable.length > 0) focusable[0].focus();
      });
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      menuBtnRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown, getFocusableElements]);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const SPRING_EASING = 'cubic-bezier(0.68, -0.55, 0.27, 1.55)';

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <House className="h-5 w-5 text-primary-foreground" weight="bold" />
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:block">
                Land<span className="text-primary">&</span>Trust
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" weight="bold" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" weight="bold" />
            </Button>
            <Button className="hidden sm:flex" onClick={openGetStarted}>
              Get Started
            </Button>

            {/* Hamburger toggle */}
            <button
              ref={menuBtnRef}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
            >
              {isOpen ? <X className="h-6 w-6" weight="bold" /> : <List className="h-6 w-6" weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile drawer */}
      <div
        id="mobile-navigation"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main Navigation Menu"
        style={{
          transition: `transform 0.4s ${SPRING_EASING}`,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
        className="fixed top-0 left-0 bottom-0 z-50 w-4/5 max-w-xs bg-background border-r shadow-xl md:hidden flex flex-col"
      >
        {/* Close button inside drawer */}
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <House className="h-5 w-5 text-primary-foreground" weight="bold" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Land<span className="text-primary">&</span>Trust
            </span>
          </Link>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-6 w-6" weight="bold" />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-2 pt-4 pb-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                <Icon className="h-5 w-5" weight="bold" />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="px-4 py-4 border-t space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              closeMenu();
            }}
          >
            <User className="h-5 w-5 mr-3" weight="bold" />
            Profile
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              closeMenu();
              openGetStarted();
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;