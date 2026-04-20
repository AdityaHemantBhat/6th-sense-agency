import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Navigation from "./Navigation";

const inputFields = [
  { id: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
  { id: "email", label: "Email Address", type: "email", placeholder: "john@company.com" },
  { id: "company", label: "Company", type: "text", placeholder: "Company Name" },
  { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 9876543210" },
];

const serviceOptions = ["Web Development", "App Development", "Brand Identity", "Motion Graphics", "UI/UX Design", "AI Consulting"];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", phone: "",
    services: [], message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const sideRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(headingRef.current?.children || [],
      { y: 80, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" }
    );
    tl.fromTo(formRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.6"
    );
    tl.fromTo(sideRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <div className="relative z-50">
          <Navigation />
        </div>
        <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto rounded-full border-2 border-[#C8F04D] flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8F04D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display uppercase text-[#F5F0E8] mb-6">
              Message <span className="text-[#C8F04D]">Received</span>
            </h1>
            <p className="text-base sm:text-lg font-body text-[#F5F0E8]/60 max-w-xl">
              We've got your details. Our team will review your project and get back to you within 24 hours.
            </p>
          </div>
          <a
            href="/"
            className="mt-8 px-8 py-4 rounded-full border border-[#C8F04D] text-[#C8F04D] hover:bg-[#C8F04D] hover:text-[#080808] transition-colors font-mono text-sm uppercase tracking-[0.2em] hover-target"
          >
            Back to Home
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative z-50">
        <Navigation />
      </div>

      <main ref={containerRef} className="min-h-screen bg-[#080808] w-full relative overflow-hidden text-[#F5F0E8]">

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10" style={{ background: "radial-gradient(circle, rgba(200,240,77,0.5) 0%, transparent 60%)" }} />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 pt-32 sm:pt-40 pb-20 max-w-7xl">

          {/* Heading */}
          <div ref={headingRef} className="mb-16 sm:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#C8F04D]" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C8F04D]">Get In Touch</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9vw] font-display uppercase leading-[0.9] tracking-tight">
              <span className="block">Let's Build</span>
              <span className="block text-[#C8F04D]">Something</span>
              <span className="block text-transparent" style={{ WebkitTextStroke: "1px #F5F0E8" }}>Extraordinary</span>
            </h1>
          </div>

          {/* Form + Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Form Side */}
            <form ref={formRef} onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {inputFields.map((field) => (
                  <div key={field.id} className="relative">
                    <label className="block text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#F5F0E8]/40 mb-3">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      onFocus={() => setActiveField(field.id)}
                      onBlur={() => setActiveField(null)}
                      placeholder={field.placeholder}
                      required={field.id === "name" || field.id === "email"}
                      className="w-full bg-transparent border-b-2 py-3 text-base sm:text-lg font-body text-[#F5F0E8] placeholder:text-[#F5F0E8]/20 outline-none transition-colors"
                      style={{
                        borderColor: activeField === field.id ? "#C8F04D" : "rgba(245,240,232,0.15)",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Services Selection */}
              <div>
                <label className="block text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#F5F0E8]/40 mb-4">What do you need?</label>
                <div className="flex flex-wrap gap-3">
                  {serviceOptions.map((service) => {
                    const isActive = formData.services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider border transition-colors hover-target"
                        style={{
                          borderColor: isActive ? "#C8F04D" : "rgba(245,240,232,0.15)",
                          backgroundColor: isActive ? "rgba(200,240,77,0.15)" : "transparent",
                          color: isActive ? "#C8F04D" : "rgba(245,240,232,0.6)",
                        }}
                      >
                        {isActive && <span className="mr-1.5">✓</span>}
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>



              {/* Message */}
              <div>
                <label className="block text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#F5F0E8]/40 mb-3">Project Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField("message")}
                  onBlur={() => setActiveField(null)}
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="w-full bg-transparent border-2 rounded-xl py-4 px-4 text-base font-body text-[#F5F0E8] placeholder:text-[#F5F0E8]/20 outline-none resize-none transition-colors"
                  style={{
                    borderColor: activeField === "message" ? "#C8F04D" : "rgba(245,240,232,0.1)",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group w-full sm:w-auto px-12 py-5 rounded-full bg-[#C8F04D] text-[#080808] font-mono text-sm uppercase tracking-[0.2em] font-bold hover:shadow-[0_0_40px_rgba(200,240,77,0.2)] transition-all hover-target flex items-center justify-center sm:justify-start gap-4"
              >
                Send Message
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>

            {/* Info Side */}
            <div ref={sideRef} className="lg:col-span-5 flex flex-col gap-10 lg:pl-8 lg:border-l border-[#F5F0E8]/10">

              {/* Direct Contact */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-[#C8F04D] mb-6">Direct Line</h3>
                <div className="space-y-4">
                  <a href="mailto:hello@6thsenseagency.com" className="block text-lg sm:text-xl font-body text-[#F5F0E8]/80 hover:text-[#C8F04D] transition-colors hover-target">
                    hello@6thsenseagency.com
                  </a>
                  <a href="tel:+919512280710" className="block text-lg sm:text-xl font-body text-[#F5F0E8]/80 hover:text-[#C8F04D] transition-colors hover-target">
                    +91 9512280710
                  </a>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-[#C8F04D] mb-6">Headquarters</h3>
                <p className="text-base sm:text-lg font-body text-[#F5F0E8]/60 leading-relaxed">
                  6th Sense Agency<br />
                  Gujarat, Ahmedabad, Odhav, Ambiklanagar 382415, <br />
                  Near Poonam Bakery Minal Park b/530<br />
                  India
                </p>
              </div>

              {/* Socials */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-[#C8F04D] mb-6">Connect</h3>
                <div className="flex flex-wrap gap-4">
                  {["Instagram", "Twitter (X)", "LinkedIn", "Dribbble"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="px-4 py-2 rounded-full border border-[#F5F0E8]/10 text-xs font-mono uppercase tracking-wider text-[#F5F0E8]/50 hover:border-[#C8F04D] hover:text-[#C8F04D] transition-colors hover-target"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="p-6 sm:p-8 rounded-2xl border border-[#C8F04D]/20 bg-[#C8F04D]/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#C8F04D] animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8F04D]">Response Time</span>
                </div>
                <p className="text-sm font-body text-[#F5F0E8]/60">
                  We typically respond within <span className="text-[#F5F0E8] font-bold">24 hours</span>. For urgent inquiries, call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom marquee */}
        <div className="w-full py-12 sm:py-16 border-t border-[#F5F0E8]/5 overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content gap-12 sm:gap-16 text-[8vw] sm:text-[6vw] font-display uppercase text-[#F5F0E8]/5 tracking-tight whitespace-nowrap">
              <span>GET IN TOUCH //</span>
              <span>LET'S COLLABORATE //</span>
              <span>START A PROJECT //</span>
              <span>GET IN TOUCH //</span>
              <span>LET'S COLLABORATE //</span>
              <span>START A PROJECT //</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
