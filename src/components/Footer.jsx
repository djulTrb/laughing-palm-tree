import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  
  // Refs
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);
  const navLinksWrapperRef = useRef(null);
  const emailInputRef = useRef(null);
  const socialIconsWrapperRef = useRef(null);
  const addressRef = useRef(null);
  const copyrightRef = useRef(null);
  
  const bgGlowRef = useRef(null);
  
  const scrollTopBtnRef = useRef(null);
  const aiBubbleRef = useRef(null);
  const sparkleIconRef = useRef(null);
  
  const arrowIconRef = useRef(null);
  const checkIconRef = useRef(null);
  
  const bgTween = useRef(null);
  const sparkleTween = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 1px)", () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const navLinks = navLinksWrapperRef.current ? navLinksWrapperRef.current.children : [];
      const socialIcons = socialIconsWrapperRef.current ? socialIconsWrapperRef.current.children : [];
      
      // Footer Entrance Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
      
      if (prefersReducedMotion) {
        gsap.set(footerRef.current, { opacity: 0 });
        tl.to(footerRef.current, { opacity: 1, duration: 0.3 });
      } else {
        // Initial States
        gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
        gsap.set(taglineRef.current, { opacity: 0, y: 10 });
        if (navLinks.length) gsap.set(navLinks, { opacity: 0, y: 8 });
        gsap.set(emailInputRef.current, { opacity: 0, y: 12 });
        if (socialIcons.length) gsap.set(socialIcons, { opacity: 0, scale: 0 });
        gsap.set(addressRef.current, { opacity: 0 });
        gsap.set(copyrightRef.current, { opacity: 0 });
        
        // Sequence
        tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" })
          .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
          .to(navLinks, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, "-=0.35") // starts 0.15s after tagline
          .to(emailInputRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25") // starts 0.25s after tagline
          .to(socialIcons, { scale: 1, opacity: 1, stagger: 0.06, ease: "back.out(1.6)" }, ">") // starts after email input finishes
          .to(addressRef.current, { opacity: 1, duration: 0.4 }, ">")
          .to(copyrightRef.current, { opacity: 1, duration: 0.3 }, ">");
      }
      
            
      // Idle Background Gradient
      if (!prefersReducedMotion && bgGlowRef.current) {
        gsap.set(bgGlowRef.current, { x: -20 });
        bgTween.current = gsap.to(bgGlowRef.current, { x: 20, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 });
      }
      
      // AI Sparkle Pulse
      if (!prefersReducedMotion && sparkleIconRef.current) {
        sparkleTween.current = gsap.to(sparkleIconRef.current, { scale: 1.08, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      }
    });

    return () => mm.revert();
  }, []);


  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    gsap.to(arrowIconRef.current, { x: 8, opacity: 0, duration: 0.25 });
    gsap.to(checkIconRef.current, { opacity: 1, duration: 0.25, delay: 0.1 });
    
    setTimeout(() => {
      setEmail('');
      gsap.to(arrowIconRef.current, { x: 0, opacity: 1, duration: 0.2 });
      gsap.to(checkIconRef.current, { opacity: 0, duration: 0.2 });
    }, 1200);
  };

  // Social Icon Hover
  const handleSocialEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2, ease: "power1.out" });
  };
  const handleSocialLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power1.out" });
  };

  // AI Bubble Interactivity
  const onAiHover = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (sparkleTween.current) sparkleTween.current.pause();
    gsap.to(aiBubbleRef.current, { scale: 1.08, duration: 0.2 });
  };
  const onAiLeave = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (sparkleTween.current) sparkleTween.current.play();
    gsap.to(aiBubbleRef.current, { scale: 1, duration: 0.2 });
  };
  const onAiClick = () => {
    gsap.to(aiBubbleRef.current, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 });
  };

  // Scroll to Top Hover
  const onScrollTopEnter = () => gsap.to(scrollTopBtnRef.current, { y: -3, duration: 0.2 });
  const onScrollTopLeave = () => gsap.to(scrollTopBtnRef.current, { y: 0, duration: 0.2 });

  return (
    <>
      <footer ref={footerRef} className="w-full bg-surface pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-outline-variant/20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center relative z-10">
          
          {/* Brand Identity */}
          <div className="mb-10 flex flex-col items-center">
            <div ref={logoRef} className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"></path>
                <circle cx="12" cy="12" r="4"></circle>
              </svg>
            </div>
            <h3 ref={taglineRef} className="font-accent text-xs font-semibold text-black uppercase tracking-[0.25em] mb-4">{t('footer_slogan')}</h3>
          </div>
          
          {/* Navigation Links */}
          <nav ref={navLinksWrapperRef} className="flex flex-wrap justify-center gap-8 mb-10">
            <Link className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:text-[#9D4EDD] transition-colors" to="/events">{t('events')}</Link>
            <Link className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:text-[#9D4EDD] transition-colors" to="/gallery">{t('gallery')}</Link>
            <Link className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:text-[#9D4EDD] transition-colors" to="/resources">{t('resources')}</Link>
            <Link className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:text-[#9D4EDD] transition-colors" to="/contact">{t('contact')}</Link>
            <Link className="font-body font-semibold text-xs uppercase tracking-wider text-on-surface-variant hover:text-[#9D4EDD] transition-colors" to="/registration">{t('recruitment')}</Link>
          </nav>
          
          {/* Subscription Form */}
          <div ref={emailInputRef} className="w-full max-w-md mb-10">
            <form onSubmit={handleSubscribe} className="relative flex items-center group">
                <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-full pl-6 pr-12 rtl:pr-6 rtl:pl-12 py-3.5 font-body text-sm focus:ring-2 focus:ring-[#9D4EDD] outline-none transition-all shadow-[0_0_0_rgba(157,78,221,0)] focus:shadow-[0_0_15px_rgba(157,78,221,0.2)]" 
                placeholder={t('footer_email_ph')} 
                type="email" 
                dir="auto" 
                required 
              />
              <button 
                  type="submit" 
                  aria-label="Subscribe to newsletter"
                  className="absolute right-3 rtl:right-auto rtl:left-3 w-10 h-10 text-[#9D4EDD] flex items-center justify-center overflow-hidden" 
                >
                  <div ref={arrowIconRef} className="absolute flex items-center justify-center rtl:-scale-x-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-horizontal">
                      <path d="m3 3 3 9-3 9 19-9Z"/><path d="M6 12h16"/>
                    </svg>
                  </div>
                  <span ref={checkIconRef} className="material-symbols-outlined text-xl absolute opacity-0 font-bold">check</span>
                </button>
            </form>
          </div>
          
          {/* Social Links */}
          <div ref={socialIconsWrapperRef} className="flex gap-4 mb-10">
            <a onMouseEnter={handleSocialEnter} onMouseLeave={handleSocialLeave} aria-label="Instagram" className="w-11 h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-[#9D4EDD] hover:border-[#9D4EDD] transition-colors text-on-surface-variant hover:text-white" href="https://instagram.com/miraiclubdz" target="_blank" rel="noopener noreferrer">
              <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a onMouseEnter={handleSocialEnter} onMouseLeave={handleSocialLeave} aria-label="Facebook" className="w-11 h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-[#9D4EDD] hover:border-[#9D4EDD] transition-colors text-on-surface-variant hover:text-white" href="https://facebook.com/miraiclubdz" target="_blank" rel="noopener noreferrer">
              <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a onMouseEnter={handleSocialEnter} onMouseLeave={handleSocialLeave} aria-label="LinkedIn" className="w-11 h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-[#9D4EDD] hover:border-[#9D4EDD] transition-colors text-on-surface-variant hover:text-white" href="https://linkedin.com/company/mirai-club" target="_blank" rel="noopener noreferrer">
              <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect height="12" width="4" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a onMouseEnter={handleSocialEnter} onMouseLeave={handleSocialLeave} aria-label="GitHub" className="w-11 h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-[#9D4EDD] hover:border-[#9D4EDD] transition-colors text-on-surface-variant hover:text-white" href="#">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
          
          {/* Contact Info */}
          <div ref={addressRef} className="flex flex-col items-center gap-3 mb-10 text-center">
            <div className="text-on-surface-variant max-w-xl">
              <span className="material-symbols-outlined text-[#9D4EDD] text-sm align-middle inline-block mr-1 rtl:ml-1 rtl:mr-0">location_on</span>
              <span className="font-body text-xs sm:text-sm font-medium align-middle">{t('address_val')}</span>
            </div>
            <a className="text-on-surface-variant hover:text-[#9D4EDD] transition-colors font-body font-semibold uppercase tracking-wider text-xs" href="mailto:contact@mirai-club.dz">
              <span className="material-symbols-outlined text-sm align-middle inline-block mr-1 rtl:ml-1 rtl:mr-0">mail</span>
              <span className="align-middle" dir="ltr">contact@mirai-club.dz</span>
            </a>
          </div>
          
          {/* Bottom Bar */}
          <div ref={copyrightRef} className="w-full pt-8 flex flex-col items-center gap-4">
            <p className="font-accent text-[11px] font-medium uppercase tracking-wider text-on-surface-variant text-center leading-relaxed">{t('footer_copy')}</p>
          </div>
        </div>

        {/* Violet Noisy Blob */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div ref={bgGlowRef} className="absolute bottom-[-80px] -left-1/4 dark:left-1/2 dark:-translate-x-1/2 w-[80%] max-w-[800px] h-[300px] bg-[#7b2cbf] opacity-50 dark:opacity-30 blur-[100px] rounded-[100%]" />
          <div 
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat',
              backgroundSize: '256px 256px'
            }}
          />
        </div>
      </footer>
      
      </>
  );
};

export default Footer;
