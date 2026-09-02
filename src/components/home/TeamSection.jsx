import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import api from '../../lib/api';

gsap.registerPlugin(ScrollTrigger);

// TEAM_MEMBERS fetched from API

const MemberRow = ({ member, elRef, avatarRef }) => {
  const { t } = useTranslation();
  
  return (
    <div 
      ref={elRef}
      className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 w-full h-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-surface-container-low hover:translate-x-1 transition-all duration-200 ease-[cubic-bezier(0,0,0.2,1)]"
    >
      {/* MOBILE LAYOUT */}
      <div className="flex flex-col w-full sm:hidden">
        <div className="flex flex-row justify-between items-start w-full mb-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-display font-bold leading-tight text-on-surface tracking-tight">{member.name}</h3>
            <span className="w-fit font-accent text-[10px] font-bold bg-white dark:bg-surface-variant/20 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider border border-outline-variant/30">{member.role}</span>
          </div>
          <div ref={avatarRef} className="w-14 h-14 rounded-2xl overflow-hidden bg-surface-variant/50 shrink-0 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-display font-bold">
            {member.image ? <img alt={member.name} className="w-full h-full object-cover" loading="lazy" src={member.image} /> : member.name?.charAt(0)}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center mb-5">
          <span className="font-body text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">{t('team_skills')}:</span>
          {member.skills.map((skill, sIdx) => (
            <React.Fragment key={sIdx}>
              <span className="font-body text-[10px] font-bold text-[#9D4EDD] uppercase tracking-wide">{skill}</span>
              {sIdx < member.skills.length - 1 && <span className="font-body text-[10px] font-black text-[#9D4EDD]/50">|</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-row gap-4 items-center">
          {member.linkedin && member.linkedin !== '#' && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="group/link font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-[#9D4EDD] flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-sm group-hover/link:translate-x-[2px] group-hover/link:-translate-y-[2px] transition-transform duration-150 ease-out">arrow_outward</span> LinkedIn
            </a>
          )}
          {member.github && member.github !== '#' && (
            <a href={member.github} target="_blank" rel="noopener noreferrer" className="group/link font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-[#9D4EDD] flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-sm group-hover/link:translate-x-[2px] group-hover/link:-translate-y-[2px] transition-transform duration-150 ease-out">arrow_outward</span> GitHub
            </a>
          )}
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden sm:flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-6 flex-1">
          <div ref={avatarRef} className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-variant/50 shrink-0 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-display text-xl font-bold">
            {member.image ? <img alt={member.name} className="w-full h-full object-cover" loading="lazy" src={member.image} /> : member.name?.charAt(0)}
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row items-center gap-3 mb-3">
              <h3 className="text-2xl font-display font-bold leading-tight text-on-surface tracking-tight">{member.name}</h3>
              <span className="font-accent text-[10px] font-bold bg-white dark:bg-surface-variant/20 px-3 py-1 rounded-full text-on-surface-variant uppercase tracking-wider border border-outline-variant/30">{member.role}</span>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-body text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">{t('team_skills')}:</span>
              {member.skills.map((skill, sIdx) => (
                <React.Fragment key={sIdx}>
                  <span className="font-body text-[10px] font-bold text-[#9D4EDD] uppercase tracking-wide">{skill}</span>
                  {sIdx < member.skills.length - 1 && <span className="font-body text-[10px] font-black text-[#9D4EDD]/50">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 shrink-0 items-end pr-4">
          {member.linkedin && member.linkedin !== '#' && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="group/link font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-[#9D4EDD] flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-sm group-hover/link:translate-x-[2px] group-hover/link:-translate-y-[2px] transition-transform duration-150 ease-out">arrow_outward</span> LinkedIn
            </a>
          )}
          {member.github && member.github !== '#' && (
            <a href={member.github} target="_blank" rel="noopener noreferrer" className="group/link font-body font-bold text-xs uppercase tracking-wider text-on-surface hover:text-[#9D4EDD] flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-sm group-hover/link:translate-x-[2px] group-hover/link:-translate-y-[2px] transition-transform duration-150 ease-out">arrow_outward</span> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  
  const sectionRef = useRef(null);
  const headerTagRef = useRef(null);
  const headerTitleRef = useRef(null);
  
  const initialRowsRefs = useRef([]);
  const initialAvatarRefs = useRef([]);
  
  const hiddenRowsRefs = useRef([]);
  const hiddenAvatarRefs = useRef([]);
  
  const hiddenContainerRef = useRef(null);
  const hiddenInnerRef = useRef(null);
  const arrowRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get('/team/');
        const parsedMembers = response.data.map(member => ({
          id: member.id || member.uuid,
          name: `${member.prenom || ''} ${member.nom || ''}`.trim(),
          role: member.poste || '',
          image: member.photo_url || '',
          linkedin: member.linkedin || '#',
          github: member.github || '#',
          skills: member.skills ? member.skills.split(',').map(s => s.trim()) : []
        }));
        setTeamMembers(parsedMembers);
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      }
    };
    fetchTeam();
  }, []);

  const initialMembers = teamMembers.slice(0, 4);
  const hiddenMembers = teamMembers.slice(4);

  useEffect(() => {
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 1px)", () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Init states
      gsap.set([headerTagRef.current, headerTitleRef.current], { opacity: 0, y: prefersReducedMotion ? 0 : 20 });
      if (!prefersReducedMotion) {
        gsap.set(headerTagRef.current, { y: 10 });
      }
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Header
      tl.to(headerTagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        .to(headerTitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "<0.1");
        
      // Initial Rows
      const initialRows = initialRowsRefs.current.filter(Boolean);
      const initialAvatars = initialAvatarRefs.current.filter(Boolean);
      
      if (initialRows.length > 0) {
        gsap.set(initialRows, { opacity: 0, y: prefersReducedMotion ? 0 : 20 });
        if (!prefersReducedMotion) gsap.set(initialAvatars, { scale: 0.9 });
        
        tl.to(initialRows, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }, "<0.1");
        
        if (!prefersReducedMotion) {
          tl.to(initialAvatars, {
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
          }, "<");
        }
      }

      // Idle Bounce on CTA arrow
      if (!prefersReducedMotion && arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 4,
          duration: 0.6, // half of 1.2s for one way
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      }
      
      // Hide the hidden container initially
      gsap.set(hiddenContainerRef.current, { height: 0, overflow: 'hidden' });
      const hRows = hiddenRowsRefs.current.filter(Boolean);
      const hAvatars = hiddenAvatarRefs.current.filter(Boolean);
      if (hRows.length > 0) {
          gsap.set(hRows, { opacity: 0, y: prefersReducedMotion ? 0 : 20 });
          if (!prefersReducedMotion) gsap.set(hAvatars, { scale: 0.9 });
      }
    });

    return () => mm.revert();
  }, []);

  const handleToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = hiddenContainerRef.current;
    const inner = hiddenInnerRef.current;
    const arrow = arrowRef.current;
    const hRows = hiddenRowsRefs.current.filter(Boolean);
    const hAvatars = hiddenAvatarRefs.current.filter(Boolean);

    if (!isExpanded) {
      // EXPAND
      const targetHeight = inner.scrollHeight;
      
      if (prefersReducedMotion) {
        gsap.to(arrow, { rotation: 180, duration: 0.2 });
        gsap.to(container, { height: 'auto', duration: 0 });
        gsap.to(hRows, { opacity: 1, duration: 0.2, onComplete: () => {
            setIsExpanded(true);
            setIsAnimating(false);
        }});
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsExpanded(true);
            setIsAnimating(false);
            // gsap.set(container, { overflow: 'visible', height: 'auto' });
          }
        });
        
        tl.to(arrow, { rotation: 180, duration: 0.3, ease: "power2.out" }, 0);
        tl.to(container, { height: targetHeight, duration: 0.5, ease: "power2.inOut" }, 0);
        
        tl.to(hRows, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out"
        }, 0.5); // Starts immediately after height animation
        
        tl.to(hAvatars, {
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out"
        }, 0.5);
      }
    } else {
      // COLLAPSE
      if (prefersReducedMotion) {
        gsap.to(arrow, { rotation: 0, duration: 0.2 });
        gsap.to(hRows, { opacity: 0, duration: 0.2, onComplete: () => {
            gsap.to(container, { height: 0, duration: 0 });
            setIsExpanded(false);
            setIsAnimating(false);
        }});
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsExpanded(false);
            setIsAnimating(false);
          }
        });
        
        // Rows fade out first
        tl.to(hRows, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in"
        }, 0);
        
        tl.to(hAvatars, {
          scale: 0.9,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in"
        }, 0);
        
        // After fade out, collapse height and rotate back
        const fadeOutDuration = 0.3 + (hRows.length * 0.05);
        
        // Scroll window up simultaneously with the height collapse
        tl.add(() => {
          const rect = sectionRef.current.getBoundingClientRect();
          if (rect.top < 0) {
              window.scrollTo({ top: window.scrollY + rect.top - 100, behavior: 'smooth' });
          }
        }, fadeOutDuration);
        
        tl.to(container, { height: 0, duration: 0.5, ease: "power2.inOut" }, fadeOutDuration);
        tl.to(arrow, { rotation: 0, duration: 0.3, ease: "power2.out" }, fadeOutDuration);
      }
    }
  };

  return (
    <section id="team-section" ref={sectionRef} className="px-6 md:px-24 bg-surface py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="w-full flex flex-col items-center mb-16">
          <span ref={headerTagRef} className="font-accent font-semibold text-xs text-[#9D4EDD] uppercase tracking-wider mb-4">
            {t('team_tag')}
          </span>
          <h2 ref={headerTitleRef} className="text-black mb-2 text-center font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            {t('team_title')}
          </h2>
        </div>
        
        <div className="relative">
          {/* Main List Container */}
          <div className="flex flex-col">
            
            {/* INITIAL ROWS */}
            <div className="flex flex-col gap-4">
              {initialMembers.map((member, idx) => (
                <MemberRow 
                  key={`init-${idx}`} 
                  member={member} 
                  elRef={(el) => initialRowsRefs.current[idx] = el}
                  avatarRef={(el) => initialAvatarRefs.current[idx] = el}
                />
              ))}
            </div>

            {/* HIDDEN ROWS CONTAINER */}
            <div ref={hiddenContainerRef} className="overflow-hidden" style={{ height: 0 }}>
              <div ref={hiddenInnerRef} className="flex flex-col gap-4 pt-4 pb-4">
                {hiddenMembers.map((member, idx) => (
                  <MemberRow 
                    key={`hidden-${idx}`} 
                    member={member} 
                    elRef={(el) => hiddenRowsRefs.current[idx] = el}
                    avatarRef={(el) => hiddenAvatarRefs.current[idx] = el}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Static Fade Mask */}
          <div className="absolute bottom-[60px] left-0 w-full h-[200px] pointer-events-none z-10 transition-opacity duration-300" style={{ opacity: isExpanded ? 0 : 1, maskImage: 'linear-gradient(to top, black, transparent)', WebkitMaskImage: 'linear-gradient(to top, black, transparent)', backgroundColor: 'var(--color-surface, #F8F6FC)' }} />
          
          <div className="w-full flex justify-center relative z-20 mt-8">
            <button 
              ref={ctaRef}
              onClick={handleToggle}
              className="group flex flex-col items-center justify-center gap-2 text-on-surface hover:text-[#9D4EDD] transition-colors"
            >
              <span className="font-body font-bold text-sm uppercase tracking-[0.2em] bg-surface px-4 z-10">
                {isExpanded ? t('team_collapse') : t('team_meet_all')}
              </span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <span ref={arrowRef} className="material-symbols-outlined text-2xl">
                  arrow_downward
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
