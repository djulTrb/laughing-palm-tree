import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    motivation: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}/`);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-16 font-body">
        <p>Loading event...</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-16 font-body">
        <h1 className="text-4xl font-display font-bold text-black mb-4">Event Not Found</h1>
        <button onClick={() => navigate('/events')} className="text-[#9D4EDD] hover:underline">
          Return to Events
        </button>
      </main>
    );
  }

  const isEnded = new Date(event.realDate) < new Date();
  const isClosed = new Date(event.deadline) < new Date();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted for event:", event?.title, formData);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <main className="flex-grow flex flex-col justify-start relative w-full pt-24 font-body">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 md:px-12 py-12">
        <button 
          onClick={() => navigate('/events')}
          className="flex items-center gap-2 text-on-surface-variant hover:text-[#9D4EDD] mb-8 transition-colors text-sm font-semibold uppercase tracking-wider"
        >
          <span className="material-symbols-outlined text-lg rtl:rotate-180">arrow_back</span>
          Go Back
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Event Details */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="w-full aspect-video rounded-3xl overflow-hidden relative shadow-sm border border-outline-variant/30">
              <img src={event.image || event.image_url} alt={event.title || event.titre} loading="lazy" className="w-full h-full object-cover" />
              {isEnded && (
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-[#9D4EDD] text-white px-3 py-1.5 rounded-lg font-bold uppercase tracking-widest text-xs shadow-md">
                  Ended
                </div>
              )}
            </div>
            
            <div>
              <p className="font-accent font-semibold text-xs text-[#9D4EDD] tracking-wide uppercase mb-2">{event.date || event.date_event}</p>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight mb-4">{event.title || event.titre}</h1>
              
              <div className="flex items-center gap-2 text-on-surface-variant text-sm font-body mb-8 bg-surface-variant/40 p-4 rounded-2xl border border-outline-variant/20">
                <span className="material-symbols-outlined text-[#9D4EDD] shrink-0">location_on</span>
                <p className="font-medium">{event.location || event.lieu}</p>
              </div>

              <div className="prose prose-sm sm:prose-base max-w-none font-body text-on-surface-variant leading-relaxed">
                <h3 className="font-semibold text-black text-xl mb-4 font-display">About this event</h3>
                <p>{event.details || event.description}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-sm p-8 sm:p-10 sticky top-32">
              <h2 className="text-2xl font-display font-bold text-black mb-2 tracking-tight">
                Register for Event
              </h2>
              <p className="text-on-surface-variant text-sm mb-8">
                Fill out the form below to secure your spot.
              </p>

              {isClosed ? (
                <div className="bg-error-container/20 border border-error/30 text-error p-6 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-3xl mb-2">event_busy</span>
                  <p className="font-bold">Registration is closed</p>
                  <p className="text-sm mt-1">The deadline for this event has passed.</p>
                </div>
              ) : submitted ? (
                <div className="bg-[#9D4EDD]/10 border border-[#9D4EDD]/30 text-[#9D4EDD] p-6 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                  <h3 className="font-display font-bold text-xl mb-2">Registration Successful!</h3>
                  <p className="text-sm text-on-surface-variant">We have received your application. See you there!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] focus:ring-1 focus:ring-[#9D4EDD] transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] focus:ring-1 focus:ring-[#9D4EDD] transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Motivation</label>
                    <textarea 
                      name="motivation"
                      required
                      rows="4"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9D4EDD] focus:ring-1 focus:ring-[#9D4EDD] transition-all resize-none"
                      placeholder="Why do you want to attend this event?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full bg-[#9D4EDD] text-white rounded-xl py-4 font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    <span className="material-symbols-outlined text-sm rtl:rotate-180">arrow_forward</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetails;
