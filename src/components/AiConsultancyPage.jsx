import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./Navigation";

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    id: "01",
    title: "Workflow Automation",
    subtitle: "Eliminate The Manual Trap",
    what: "We engineer bespoke automation pipelines tailored precisely to your operational bottlenecks.",
    pricing: "Custom CRM integrations, LLM-powered chatbots, and zero-touch data routing.",
    pros: ["Instantly reduce operational costs by 20–30%", "Eliminate human error in repetitive tasks", "Regain hundreds of hours per month"],
    cons: ["Only the beginning of your scaling journey"],
    insight: "Stop trading time for money. If a process requires zero creative thought, an AI should be executing it."
  },
  {
    id: "02",
    title: "System Productization",
    subtitle: "Standardized Scale",
    what: "We analyze your chaotic, custom client-delivery methods and architect them into highly repeatable, productized systems.",
    pricing: "Fixed-scope deliverables & extreme efficiency.",
    pros: ["Drastically cuts decision fatigue", "Allows you to delegate fulfillment completely", "Multiplies your client capacity effortlessly"],
    cons: ["Requires a commitment to niche specialization"],
    insight: "Scale is impossible when every client gets a custom solution. We help you build the machine that builds the product."
  },
  {
    id: "03",
    title: "SaaS Hybrid Systems",
    subtitle: "Enterprise Valuation",
    what: "The ultimate evolution. We transform your newly automated systems into proprietary, subscription-based software dashboards for your clients.",
    pricing: "Turn isolated services into recurring MRR.",
    pros: ["Unlock high-margin recurring revenue", "Decouple your income entirely from your time", "Exponentially higher business valuation"],
    cons: ["Requires sophisticated technical infrastructure (which we build for you)"],
    insight: "The most successful agencies don't stay service-based. They evolve into system-driven software hybrids."
  },
  {
    id: "04",
    title: "Predictive Intelligence",
    subtitle: "Data-Driven Dominance",
    what: "We deploy advanced machine learning models that analyze your historical data to forecast trends, customer churn, and revenue opportunities.",
    pricing: "Identify the invisible patterns that drive growth.",
    pros: ["Anticipate market shifts before competitors", "Hyper-personalize customer interactions", "Make mathematically backed strategic decisions"],
    cons: ["Requires clean, structured historical data"],
    insight: "Don't just react to the market. Let our custom predictive architectures map the future for you."
  }
];

export default function AiConsultancyPage() {
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const brainRef = useRef(null);
  const horizontalRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Entrance Animation
    const tl = gsap.timeline();
    
    tl.fromTo(".ai-nav", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.5);
    tl.fromTo(brainRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: "expo.out" }, 0.8);
    tl.fromTo(heroTextRef.current.children, 
      { y: 50, opacity: 0, rotateX: -45 }, 
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "back.out(1.2)" }, 
      1
    );

    // Scroll Animations for Brain — use transform only, no filter
    gsap.to(brainRef.current, {
      y: 400,
      rotate: 45,
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Horizontal Scroll Logic for Cards
    if (cardsRef.current && horizontalRef.current) {
      const cards = cardsRef.current;
      const totalWidth = cards.scrollWidth - window.innerWidth;

      gsap.to(cards, {
        x: -totalWidth,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: horizontalRef.current,
          start: "top top",
          end: () => `+=${totalWidth * (window.innerWidth < 768 ? 3.5 : 2)}`,
          pin: true,
          scrub: window.innerWidth < 768 ? 2.5 : 1,
          anticipatePin: 1
        }
      });
      
      // Simple opacity reveal — no scale animation per card during scrub
      gsap.utils.toArray('.model-card').forEach((card) => {
         gsap.fromTo(card, 
           { opacity: 0.3 },
           { 
             opacity: 1, 
             scrollTrigger: {
               trigger: horizontalRef.current,
               start: "top top",
               end: `+=${window.innerWidth * 0.5}`,
               scrub: 1,
             }
           }
         );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <div className="ai-nav relative z-50">
        <Navigation />
      </div>
      
      <main ref={containerRef} className="bg-[#080808] w-full relative overflow-hidden text-[#F5F0E8]">
        
        {/* Ambient background — static gradient, no fixed compositing */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: "radial-gradient(circle at 50% 30%, rgba(200,240,77,0.5) 0%, transparent 40%)" }} />
        
        {/* Holographic brain/sphere — NO animate-spin, NO animate-pulse, NO mix-blend */}
        <div 
           ref={brainRef}
           className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] rounded-full border border-[#C8F04D]/30 pointer-events-none z-0"
           style={{
             background: "radial-gradient(circle at center, rgba(200,240,77,0.1) 0%, transparent 60%)",
             willChange: "transform",
             transform: "translateZ(0)",
           }}
        >
           <div className="absolute inset-0 rounded-full border border-[#C8F04D]/10 transform scale-75 rotate-45" />
           <div className="absolute inset-0 rounded-full border border-[#C8F04D]/20 transform scale-50 -rotate-45" />
           <div className="absolute inset-0 rounded-full border border-[#C8F04D]/30 transform scale-100 rotate-90" />
        </div>

        {/* HERO SECTION */}
        <section className="min-h-screen w-full flex flex-col justify-center items-center relative z-10 pt-24 sm:pt-20">
          <div className="text-center max-w-5xl mx-auto px-4 sm:px-6">
            <div className="inline-block border border-[#C8F04D]/30 bg-[#C8F04D]/10 text-[#C8F04D] px-6 py-2 rounded-full font-mono text-xs uppercase tracking-[0.3em] mb-10">
              Strategic AI Implementation
            </div>
            <h1 ref={heroTextRef} className="text-[14vw] sm:text-[12vw] md:text-[8vw] font-display uppercase tracking-[-0.02em] leading-none mb-6 sm:mb-8">
              <div className="text-transparent" style={{ WebkitTextStroke: "1px #F5F0E8" }}>Scale Beyond</div>
              <div className="text-[#C8F04D]">Human Limits</div>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl font-body max-w-3xl mx-auto text-[#F5F0E8]/70 leading-relaxed border-l-2 border-[#C8F04D] pl-4 sm:pl-6 text-left">
              Most businesses are trapped in manual operations, hard-capping their revenue to their time. We provide enterprise-tier consulting and hands-on technical execution to systematically automate, productize, and evolve your agency.
            </p>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50">
             <span className="font-mono text-xs tracking-widest uppercase mb-2 text-[#C8F04D]">Discover the Architecture</span>
             <div className="w-px h-16 bg-gradient-to-b from-[#C8F04D] to-transparent" />
          </div>
        </section>

        {/* HORIZONTAL SCROLL SECTION FOR SOLUTIONS */}
        <section ref={horizontalRef} className="h-screen w-full bg-[#050505] relative z-20 flex items-center overflow-hidden border-y border-[#F5F0E8]/10">
           {/* Section Label */}
           <div className="absolute top-10 left-10 md:top-20 md:left-20 z-30 pointer-events-none">
              <h2 className="text-3xl md:text-5xl font-display uppercase text-[#F5F0E8]/20">
                 Our Engineering<br/>Vectors
              </h2>
           </div>

           {/* Cards Track */}
           <div ref={cardsRef} className="flex px-[10vw] md:px-[20vw] gap-10 items-center w-max" style={{ willChange: "transform", transform: "translateZ(0)" }}>
              {solutions.map((model) => (
                <div key={model.id} className="model-card w-[85vw] sm:w-[75vw] md:w-[600px] h-[65vh] sm:h-[70vh] bg-[#080808] border border-[#F5F0E8]/10 rounded-xl sm:rounded-[2rem] p-5 sm:p-8 md:p-12 flex flex-col shrink-0 relative overflow-hidden group hover:border-[#C8F04D]/50 transition-colors duration-500">
                   {/* Background element */}
                   <div className="absolute -top-40 -right-40 text-[300px] font-display font-bold text-[#F5F0E8]/5 leading-none pointer-events-none">
                     {model.id}
                   </div>
                   
                   <div className="relative z-10 flex-1 flex flex-col">
                     <div className="flex items-center gap-4 mb-6">
                        <span className="text-[#C8F04D] font-mono text-lg sm:text-2xl">{model.id} //</span>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase tracking-tight">{model.title}</h3>
                     </div>
                     <p className="text-sm font-mono tracking-widest text-[#F5F0E8]/40 uppercase mb-8 pb-4 border-b border-[#F5F0E8]/10">
                        {model.subtitle}
                     </p>
                     
                     <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide">
                        <div className="mb-6">
                           <h4 className="text-xs font-mono uppercase text-[#C8F04D] mb-2">The Architecture</h4>
                           <p className="font-body text-[#F5F0E8]/80 leading-relaxed text-sm md:text-base">{model.what}</p>
                        </div>
                        
                        <div className="mb-6 p-4 bg-[#111] rounded-xl border border-[#F5F0E8]/5">
                           <h4 className="text-xs font-mono uppercase text-[#C8F04D] mb-2">The Result</h4>
                           <p className="font-mono text-[#F5F0E8]/80 text-sm">{model.pricing}</p>
                        </div>
                        
                        <div className="mb-6">
                           <h4 className="text-xs font-mono uppercase text-emerald-400 mb-3">System Benefits</h4>
                           <ul className="space-y-2">
                             {model.pros.map((pro, i) => (
                               <li key={i} className="text-sm font-body text-[#F5F0E8]/70 flex items-start gap-2">
                                  <span className="text-emerald-400 mt-1">+</span> {pro}
                               </li>
                             ))}
                           </ul>
                        </div>
                     </div>
                     
                     <div className="mt-6 pt-6 border-t border-[#F5F0E8]/10">
                        <h4 className="text-[10px] font-mono uppercase text-[#C8F04D] mb-2 tracking-widest">Crucial Insight</h4>
                        <p className="font-body text-[#F5F0E8] text-sm leading-snug italic border-l-2 border-[#C8F04D] pl-4">
                          "{model.insight}"
                        </p>
                     </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* CONCLUSION & SCALABILITY DATA */}
        <section className="w-full relative z-10 py-32 md:py-48 bg-[#080808]">
           <div className="container mx-auto px-6 md:px-12 max-w-6xl">
              <div className="text-center mb-24">
                 <h2 className="text-4xl md:text-6xl font-display uppercase mb-6">
                    Our Consulting <span className="text-[#C8F04D]">Evolution Matrix</span>
                 </h2>
                 <p className="font-mono text-[#F5F0E8]/60 uppercase tracking-widest text-sm">How we scale your business over time</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-32">
                 <div className="bg-[#111] border border-[#F5F0E8]/10 p-6 sm:p-8 rounded-xl sm:rounded-2xl hover:border-[#C8F04D] transition-colors group">
                    <div className="text-[#C8F04D] font-mono text-xs uppercase mb-4 tracking-widest">Phase 1: Stabilization</div>
                    <h3 className="text-2xl font-display uppercase mb-4 group-hover:text-[#C8F04D] transition-colors">Core Automation</h3>
                    <p className="text-[#F5F0E8]/60 text-sm font-body">We audit your current tech stack and immediately deploy intelligent workflows. This drastically cuts overhead and gives you the breathing room required to think strategically.</p>
                 </div>

                 <div className="bg-[#111] border border-[#F5F0E8]/10 p-6 sm:p-8 rounded-xl sm:rounded-2xl hover:border-[#C8F04D] transition-colors group md:-translate-y-8">
                    <div className="text-[#C8F04D] font-mono text-xs uppercase mb-4 tracking-widest">Phase 2: Standardization</div>
                    <h3 className="text-2xl font-display uppercase mb-4 group-hover:text-[#C8F04D] transition-colors">Productized Systems</h3>
                    <p className="text-[#F5F0E8]/60 text-sm font-body">We help you strip down complex, custom deliverables into highly profitable, fixed-scope systems that can be entirely fulfilled by AI agents and streamlined staff.</p>
                 </div>

                 <div className="bg-[#111] border border-[#C8F04D]/30 p-6 sm:p-8 rounded-xl sm:rounded-2xl hover:border-[#C8F04D] transition-colors group md:-translate-y-16">
                    <div className="text-[#C8F04D] font-mono text-xs uppercase mb-4 tracking-widest">Phase 3: Market Dominance</div>
                    <h3 className="text-2xl font-display uppercase mb-4 group-hover:text-[#C8F04D] transition-colors">SaaS Integration</h3>
                    <p className="text-[#F5F0E8]/60 text-sm font-body">We transform your operational IP into proprietary client-facing software. You stop selling hours entirely, and start selling access to a high-margin algorithmic ecosystem.</p>
                 </div>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#F5F0E8]/20 to-transparent mb-32" />

              <div className="text-center max-w-4xl mx-auto">
                 <h3 className="text-4xl font-display uppercase mb-10 text-[#C8F04D]">Executive Implementation</h3>
                 <p className="font-body text-xl md:text-3xl leading-snug mb-8">
                   We don’t just build—we think, plan, and deliver with <span className="text-[#C8F04D] italic underline decoration-[#C8F04D]/50 underline-offset-8">speed that actually moves the needle.</span>
                 </p>
                 <p className="font-mono text-sm text-[#F5F0E8]/60 uppercase tracking-widest mb-16">
                    Stop letting manual labor throttle your revenue.
                 </p>
                 
                 <button 
                  onClick={() => window.navigateTo("/booking")}
                  className="px-10 py-5 border border-[#C8F04D] text-[#C8F04D] bg-[#080808] hover:bg-[#C8F04D] hover:text-[#080808] rounded-full font-mono text-sm uppercase tracking-[0.2em] font-bold transition-colors hover-target"
                 >
                    Secure An Audit Call
                 </button>
              </div>
           </div>
        </section>

      </main>
    </>
  );
}
