import ctaImg1 from '../assets/cta_img_1.webp';
import ctaImg2 from '../assets/cta_img_2.webp';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import MarqueeSection from '../components/home/MarqueeSection';
import MissionSection from '../components/home/MissionSection';
import TeamSection from '../components/home/TeamSection';
import api from '../lib/api';

const Home = () => {
  const { t, i18n } = useTranslation();

  const ctaComponents = useMemo(() => ({
    pill1: (
      <span className="cta-pill inline-block align-middle -top-1 md:-top-2 w-24 md:w-36 h-12 md:h-16 lg:h-[72px] bg-[#c87fff] rounded-[3rem] mx-2 md:mx-4 relative shadow-inner">
        <img src={ctaImg1} alt="" loading="eager" fetchPriority="high" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[80%] h-auto pointer-events-none z-10" style={{ clipPath: 'inset(0 0 20% 0)' }} />
        <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
          <img src={ctaImg1} alt="" loading="eager" fetchPriority="high" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[80%] h-auto" />
        </div>
      </span>
    ),
    pill2: (
      <span className="cta-pill inline-block align-middle -top-1 md:-top-2 w-24 md:w-36 h-12 md:h-16 lg:h-[72px] bg-[#9D4EDD] rounded-[3rem] mx-2 md:mx-4 relative shadow-inner">
        <img src={ctaImg2} alt="" loading="eager" fetchPriority="high" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[85%] h-auto pointer-events-none z-10" style={{ clipPath: 'inset(0 0 20% 0)' }} />
        <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
          <img src={ctaImg2} alt="" loading="eager" fetchPriority="high" className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[85%] h-auto" />
        </div>
      </span>
    ),
    br: <br />,
    brDesktop: <br className="hidden md:block" />,
    nowrap: <span className="inline-block whitespace-nowrap" />
  }), []);

  const scrollRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const ctaTitleRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const projectsHeaderTagRef = useRef(null);
  const projectsHeaderTitleRef = useRef(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/website/projects/');
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  const handleProjectScroll = (e) => {
    if (!e.target || e.target.children.length === 0) return;
    const container = e.target;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestIdx = 0;
    let minDiff = Infinity;
    
    Array.from(container.children).forEach((child, idx) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const diff = Math.abs(containerCenter - childCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    
    if (closestIdx !== activeProjectIdx && closestIdx >= 0 && closestIdx < projects.length) {
      setActiveProjectIdx(closestIdx);
    }
  };

  useEffect(() => {
    let timeoutId = null;
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1280) setVisibleCards(3);
      else if (window.innerWidth >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateVisibleCards, 150);
    };
    updateVisibleCards();
    window.addEventListener('resize', debouncedUpdate);
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx = gsap.context(() => {
      gsap.set([projectsHeaderTagRef.current, projectsHeaderTitleRef.current], { opacity: 0, y: prefersReducedMotion ? 0 : 20 });
      if (!prefersReducedMotion) {
        gsap.set(projectsHeaderTagRef.current, { y: 10 });
      }
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectsSectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
      
      tl.to(projectsHeaderTagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        .to(projectsHeaderTitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "<0.1");
    }, projectsSectionRef);
    return () => ctx.revert();
  }, []);


  useEffect(() => {
    const section = ctaSectionRef.current;
    const h2 = ctaTitleRef.current;
    const btn = ctaButtonRef.current;
    
    if (!section || !h2 || !btn) return;

    let ctx = gsap.context(() => {

    const splitNodes = (node) => {
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent;
          if (!text.trim()) return;
          
          const frag = document.createDocumentFragment();
          const isArabic = i18n.language?.startsWith('ar');
          
          if (isArabic) {
            // Split by words for Arabic to preserve cursive ligatures
            const tokens = text.split(/(\s+)/);
            for (const token of tokens) {
               if (!token) continue;
               if (token.trim() === '') {
                  frag.appendChild(document.createTextNode(token));
               } else {
                  const span = document.createElement('span');
                  span.textContent = token;
                  span.className = `cta-char inline-block`;
                  frag.appendChild(span);
               }
            }
          } else {
            // Split by letters for English/French
            const chars = text.split('');
            for (const char of chars) {
               if (char === ' ') {
                  frag.appendChild(document.createTextNode(' '));
               } else {
                  const span = document.createElement('span');
                  span.textContent = char;
                  span.className = `cta-char inline-block`;
                  frag.appendChild(span);
               }
            }
          }
          
          node.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.classList.contains('cta-char')) {
            // Already split.
          } else {
            splitNodes(child);
          }
        }
      });
    };

    splitNodes(h2);

    // Build the exact DOM visual sequence (Text -> Pill -> Text -> Pill...)
    const sequence = [];
    const collectItems = (node) => {
       Array.from(node.childNodes).forEach(child => {
         if (child.nodeType === Node.ELEMENT_NODE) {
           if (child.classList.contains('cta-char')) {
              sequence.push(child);
           } else if (child.classList.contains('cta-pill')) {
              sequence.push(child);
           } else {
              collectItems(child);
           }
         }
       });
    };
    collectItems(h2);

    // Group adjacent words into arrays so we can stagger them!
    const groupedSequence = [];
    let currentCharGroup = [];
    sequence.forEach(item => {
       if (item.classList.contains('cta-char')) {
          currentCharGroup.push(item);
       } else {
          if (currentCharGroup.length) {
             groupedSequence.push(currentCharGroup);
             currentCharGroup = [];
          }
          groupedSequence.push(item); // The pill element
       }
    });
    if (currentCharGroup.length) {
       groupedSequence.push(currentCharGroup);
    }

    // Apply starting states programmatically so GSAP perfectly registers them
    const allChars = h2.querySelectorAll('.cta-char');
    const allPills = h2.querySelectorAll('.cta-pill');
    
    if (allChars.length) gsap.set(allChars, { opacity: 0, y: 20 });
    if (allPills.length) gsap.set(allPills, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
      }
    });

    // Animate exactly as they appear in the DOM! No hardcoded indexes.
    groupedSequence.forEach((group, index) => {
       if (Array.isArray(group)) {
           const isArabic = i18n.language?.startsWith('ar');
           const dur = index === 0 ? 0.6 : 0.4; // First half text is slightly slower
           // Use tighter stagger for letters (non-Arabic), wider for words (Arabic)
           const stag = isArabic 
              ? (index === 0 ? 0.08 : 0.04) 
              : (index === 0 ? 0.04 : 0.02);
              
           tl.to(group, { opacity: 1, y: 0, duration: dur, stagger: stag, ease: "power2.out" }, ">");
       } else {
           // Pill
           tl.to(group, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, ">");
       }
    });

    }); // end ctx

    return () => {
      ctx.revert();
    };
  }, [i18n.language, t("home_cta_title")]);

  return (
    <main className="w-full min-h-screen bg-surface flex flex-col pt-20">
      <Helmet>
        <title>Home | Mirai Club</title>
      </Helmet>

      
      {/* Hero Section */}
      <HeroSection />

      {/* Infinite Marquee */}
      <MarqueeSection />

      {/* Mission & Objectives */}
      <MissionSection />

      {/* Meet the members */}
      <TeamSection />


      {/* Current projects */}
      <section ref={projectsSectionRef} className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center relative">
        
        {/* Decorative Noisy Blob */}
        <div className="absolute top-[5%] md:top-[10%] left-[50%] -translate-x-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] pointer-events-none z-0">
          <div className="absolute inset-0 bg-[#c87fff] opacity-40 dark:opacity-15 blur-[50px] md:blur-[80px] rounded-full"></div>
          <div className="absolute inset-0 mix-blend-overlay opacity-60 dark:opacity-30" style={{ WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)' }}>
            <svg className="w-full h-full">
              <filter id="projBlobNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#projBlobNoise)"></rect>
            </svg>
          </div>
        </div>
        <div className="w-full max-w-[1400px] mx-auto relative z-10 group">
          <div className="w-full flex flex-col items-center mb-16">
            <span ref={projectsHeaderTagRef} className="font-accent font-semibold text-xs text-[#9D4EDD] uppercase tracking-wider mb-4">{t('proj_tag')}</span>
            <h2 ref={projectsHeaderTitleRef} className="text-black mb-2 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">{t('proj_title')}</h2>
          </div>
          
          <div className="w-full relative z-10">
              {projects.length === 0 ? (
                <div className="w-full flex justify-center items-center py-16">
                  <p className="text-on-surface-variant font-body text-lg italic">No projects for the moment.</p>
                </div>
              ) : (
                <div className="w-full flex flex-col">
                  <div className="relative group/carousel">
                  <div 
                    ref={scrollRef}
                    onScroll={handleProjectScroll}
                    className={`flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 w-full px-4 md:px-8 pb-8 scrollbar-hide [&::-webkit-scrollbar]:hidden ${projects.length === 1 ? 'md:justify-center' : (projects.length === 2 ? 'xl:justify-center' : '')}`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {projects.map(proj => (
                      <div key={proj.id} className="w-full min-w-full md:min-w-[calc(50%-16px)] md:w-[calc(50%-16px)] xl:min-w-[calc(33.3333%-21.33px)] xl:w-[calc(33.3333%-21.33px)] h-auto snap-start shrink-0 bg-white border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col p-8 transition-all hover:shadow-md group/card">
                        <p className="font-accent font-semibold uppercase tracking-wider text-xs text-[#9D4EDD] mb-4">{proj.category || proj.categorie}</p>
                        <h3 className="text-black font-display font-bold text-2xl mb-4 tracking-tight">{proj.title || proj.titre}</h3>
                        <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-8 line-clamp-3">{proj.description}</p>
                          {(proj.link || proj.lien) ? (
                            <a href={proj.link || proj.lien} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center gap-1 text-[#9D4EDD] font-body font-semibold text-xs uppercase tracking-wider w-fit hover:opacity-80">
                              {t('proj_explore')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                          ) : (
                            <span className="mt-auto flex items-center gap-1 text-[#9D4EDD] font-body font-semibold text-xs uppercase tracking-wider w-fit">
                              {t('proj_in_process', 'In process')} <span className="material-symbols-outlined text-sm">pending</span>
                            </span>
                          )}
                      </div>
                    ))}
                  </div>

                  {/* Left Button */}
                  <button 
                      onClick={() => scroll('left')}
                      className={`absolute top-1/2 -left-4 md:-left-6 lg:-left-12 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-transparent flex items-center justify-center text-[#c87fff] dark:text-[#e0aaff] opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:opacity-70 z-20 ${
                        i18n.language?.startsWith('ar')
                          ? (activeProjectIdx >= projects.length - 1 ? 'hidden' : '')
                          : (activeProjectIdx === 0 ? 'hidden' : '')
                      }`}
                      aria-label="Scroll left"
                    >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>

                  {/* Right Button */}
                    <button 
                      onClick={() => scroll('right')}
                      className={`absolute top-1/2 -right-4 md:-right-6 lg:-right-12 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-transparent flex items-center justify-center text-[#c87fff] dark:text-[#e0aaff] opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:opacity-70 z-20 ${
                        i18n.language?.startsWith('ar')
                          ? (activeProjectIdx === 0 ? 'hidden' : '')
                          : (activeProjectIdx >= projects.length - 1 ? 'hidden' : '')
                      }`}
                      aria-label="Scroll right"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                  
                  {/* Dots Indicator */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                    {Array.from({ length: Math.ceil(projects.length / visibleCards) }).map((_, pageIdx) => {
                      const isActive = Math.floor(activeProjectIdx / visibleCards) === pageIdx;
                      return (
                        <button 
                          key={pageIdx}
                          onClick={() => {
                            const container = scrollRef.current;
                            const targetProjectIdx = pageIdx * visibleCards;
                            if (container && container.children[targetProjectIdx]) {
                              container.children[targetProjectIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                            }
                          }}
                          className={`h-2 rounded-full transition-all duration-300 ${isActive ? 'w-6 bg-[#c87fff]' : 'w-2 border-[1.5px] border-outline-variant/50 bg-transparent hover:border-outline-variant'}`}
                          aria-label={`Go to page ${pageIdx + 1}`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>


      {/* Final CTA Section */}
      <section ref={ctaSectionRef} className="w-full py-24 px-6 md:px-24 bg-surface flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Noise overlay specific to CTA section */}
          <div className="absolute inset-0 mix-blend-overlay opacity-[0.4] z-0">
            <svg className="w-full h-full">
              <filter id="ctaNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#ctaNoise)"></rect>
            </svg>
          </div>
          
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] bg-[#c87fff] rounded-full blur-[120px] opacity-10 z-0"></div>
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[120%] bg-[#5a189a] rounded-full blur-[100px] opacity-[0.07] z-0"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-16 md:gap-8 text-center md:text-left rtl:md:text-right">
          <h2 key={i18n.language + t("home_cta_title")} ref={ctaTitleRef} className={`md:col-span-2 font-display font-bold tracking-tighter whitespace-pre-line text-on-surface ${i18n.language?.startsWith('ar') ? 'text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4.5rem] leading-[1.6] sm:leading-[1.7] md:leading-[1.5]' : 'text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.4] sm:leading-[1.5] md:leading-[1.1]'}`}>
            <Trans 
              i18nKey="home_cta_title"
              components={ctaComponents}
            />
          </h2>
          
          <div className="md:col-span-1 flex justify-center md:justify-start rtl:md:justify-end w-full">
            <Link ref={ctaButtonRef} to="/registration" aria-label="Join MIRAI Club" className="group relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-[100%] overflow-hidden shrink-0 bg-[#240046] dark:bg-[#c87fff] shadow-xl">
             {/* The Spinning Circular Text */}
             <svg className="absolute inset-0 w-full h-full p-4 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
               <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
               <text dir="ltr" className={`font-accent font-black fill-[#c87fff] dark:fill-white ${i18n.language?.startsWith('fr') ? 'text-[9.5px] tracking-widest' : 'text-[10px] tracking-widest'}`} style={{ direction: 'ltr', fontFamily: 'Sora, sans-serif' }}>
                 <textPath href="#circlePath" startOffset="0%">
                   {t('home_join_circle')}
                 </textPath>
                 <textPath href="#circlePath" startOffset="50%">
                   {t('home_join_circle')}
                 </textPath>
               </text>
             </svg>
             
             {/* The Static Arrow in the Middle */}
             <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-[#c87fff] dark:text-white z-10">
               <span className="material-symbols-outlined text-5xl md:text-7xl">
                 arrow_outward
               </span>
             </div>
          </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
