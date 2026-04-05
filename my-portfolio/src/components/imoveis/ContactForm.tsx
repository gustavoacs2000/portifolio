"use client";

import { motion, useInView } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Phone, MessageCircle } from "lucide-react";
import { buildTelHref, buildWhatsAppHref, contactConfig } from "@/lib/contact-config";
import { submitProposal } from "@/lib/proposals/client";

interface ContactFormProps {
  theme?: "light" | "dark";
  onSubmit?: (data: ContactData) => Promise<void>;
}

interface ContactData {
  name: string;
  phone: string;
  email: string;
  interest: string;
  priceRange: string;
  neighborhoods: string[];
  message: string;
}

const INTERESTS    = [{ value:"comprar",label:"Comprar" },{ value:"vender",label:"Vender" },{ value:"alugar",label:"Alugar" }];
const PRICE_RANGES = ["Até R$ 1.000.000","R$ 1M – R$ 2M","R$ 2M – R$ 4M","R$ 4M – R$ 8M","Acima de R$ 8M"];
const NEIGHBORHOODS= ["Lago Sul","Lago Norte","Park Way","Sudoeste","Noroeste","Asa Sul","Asa Norte","Outros"];

function maskPhone(v: string): string {
  const d = v.replace(/\D/g,"").slice(0,11);
  if (d.length<=2) return "("+d;
  if (d.length<=7) return "("+d.slice(0,2)+") "+d.slice(2);
  if (d.length<=10) return "("+d.slice(0,2)+") "+d.slice(2,6)+"-"+d.slice(6);
  return "("+d.slice(0,2)+") "+d.slice(2,7)+"-"+d.slice(7);
}

function inputCls(isDark: boolean, hasError?: boolean) {
  const base = "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200";
  const t = isDark
    ? `bg-white/4 text-white/88 placeholder:text-white/22 ${hasError?"border-red-500/50 focus:border-red-400":"border-white/8 focus:border-white/25 focus:bg-white/6"}`
    : `bg-white text-stone-800 placeholder:text-stone-300 ${hasError?"border-red-400":"border-stone-200 focus:border-stone-400"}`;
  return `${base} ${t}`;
}

export default function ContactForm({ theme = "dark", onSubmit }: ContactFormProps) {
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [data, setData] = useState<ContactData>({ name:"",phone:"",email:"",interest:"",priceRange:"",neighborhoods:[],message:"" });
  const [errors, setErrors]       = useState<Record<string,string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = useCallback(<K extends keyof ContactData>(field: K, value: ContactData[K]) => {
    setData(p=>({...p,[field]:value}));
    setErrors(p=>{ const n={...p}; delete n[field as string]; return n; });
  },[]);

  const toggleNeighborhood = useCallback((n:string)=>{
    setData(p=>({...p,neighborhoods:p.neighborhoods.includes(n)?p.neighborhoods.filter(x=>x!==n):[...p.neighborhoods,n]}));
  },[]);

  const validate = useCallback(() => {
    const e:Record<string,string>={};
    if(!data.name.trim()) e.name="Informe seu nome";
    if(data.phone.replace(/\D/g,"").length<10) e.phone="Telefone inválido";
    if(!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email="E-mail inválido";
    if(!data.interest) e.interest="Selecione";
    if(!data.priceRange) e.priceRange="Selecione";
    setErrors(e); return Object.keys(e).length===0;
  }, [data]);

  const handleSubmit=useCallback(async()=>{
    if(!validate()) return;
    setSubmitting(true);
    try { if(onSubmit) await onSubmit(data); else await submitProposal({ source: "imoveis", payload: data }); setSubmitted(true); }
    finally { setSubmitting(false); }
  },[data,onSubmit,validate]);

  const sectionBg    = isDark?"bg-[#0F0F10]":"bg-[#FAF8F4]";
  const cardBg       = isDark?"bg-[#111214] border-white/6":"bg-white border-stone-200";
  const eyebrowColor = isDark?"text-amber-400/60":"text-amber-700/70";
  const headingColor = isDark?"text-white":"text-stone-900";
  const subColor     = isDark?"text-white/42":"text-stone-500";
  const labelColor   = isDark?"text-white/62":"text-stone-600";
  const divider      = isDark?"border-white/5":"border-stone-100";
  const sectionLabel = isDark?"text-white/28":"text-stone-400";
  const directWhatsAppHref = buildWhatsAppHref(contactConfig.imoveis.floatingCta.whatsappNumber);
  const directPhoneHref = buildTelHref(contactConfig.imoveis.heroPhone.telHref);

  const pill=(active:boolean)=>active
    ? isDark ? "bg-amber-500/12 border-amber-500/25 text-amber-300" : "bg-stone-900 border-stone-900 text-white"
    : isDark ? "bg-white/3 border-white/7 text-white/50 hover:bg-white/6 hover:border-white/14"
             : "bg-white border-stone-200 text-stone-500 hover:border-stone-300";

  return (
    <section ref={ref} className={`relative w-full ${sectionBg} py-24 lg:py-32`} aria-label="Formulário de contato" id="contato">
      <div className="mx-auto max-w-2xl px-6 lg:px-0">

        <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7,ease:[.22,1,.36,1]}} className="mb-10 text-center">
          <p className={`text-[10px] font-medium tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-2 ${eyebrowColor}`} style={{fontFamily:"'Inter', sans-serif"}}>
            <span className="w-5 h-px bg-current inline-block" />Vamos conversar<span className="w-5 h-px bg-current inline-block" />
          </p>
          <h2 className={`font-light leading-tight mb-3 ${headingColor}`} style={{fontFamily:"'Fraunces', serif",fontSize:"clamp(1.8rem,3vw,2.5rem)"}}>
            Encontre o imóvel{" "}
            <em className={`italic font-light ${isDark?"text-amber-400/70":"text-amber-700/75"}`} style={{fontFamily:"'Fraunces', serif"}}>ideal</em>
          </h2>
          <p className={`text-sm leading-relaxed ${subColor}`} style={{fontFamily:"'Inter', sans-serif"}}>Preencha o formulário e entro em contato em até 2 horas.</p>
        </motion.div>

        <motion.div initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.75,delay:.1,ease:[.22,1,.36,1]}} className={`rounded-2xl border overflow-hidden ${cardBg}`}>
          <div className="px-7 py-7">
            {submitted ? (
              <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{duration:.5,ease:[.22,1,.36,1]}}
                className="flex flex-col items-center text-center gap-5 py-10">
                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:.1,type:"spring",stiffness:300,damping:18}}
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark?"bg-amber-500/10 border border-amber-500/20":"bg-amber-50 border border-amber-200"}`}>
                  <CheckCircle2 size={32} className={isDark?"text-amber-400":"text-amber-600"} />
                </motion.div>
                <div>
                  <h3 className={`font-light mb-2 ${headingColor}`} style={{fontFamily:"'Fraunces', serif",fontSize:"1.5rem"}}>Mensagem recebida!</h3>
                  <p className={`text-sm leading-relaxed max-w-xs ${subColor}`} style={{fontFamily:"'Inter', sans-serif"}}>
                    Entrarei em contato em até <strong className={isDark?"text-white/80":"text-stone-700"}>2 horas</strong> pelo WhatsApp ou telefone.
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap justify-center">
                  <a href={directWhatsAppHref} target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium ${isDark?"bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/20":"bg-[#25D366]/10 text-[#1a8f4a] border border-[#25D366]/30"}`}
                    style={{fontFamily:"'Inter', sans-serif"}}>
                    <MessageCircle size={14} />WhatsApp direto
                  </a>
                  <a href={directPhoneHref} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border ${isDark?"border-white/10 text-white/60":"border-stone-200 text-stone-500"}`} style={{fontFamily:"'Inter', sans-serif"}}>
                    <Phone size={14} />Ligar agora
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={`text-xs font-medium ${labelColor}`} style={{fontFamily:"'Inter', sans-serif"}}>Seu nome <span className="text-amber-500">*</span></label>
                    <input type="text" placeholder="Nome completo" value={data.name} onChange={e=>set("name",e.target.value)} className={inputCls(isDark,!!errors.name)} style={{fontFamily:"'Inter', sans-serif"}} />
                    {errors.name && <p className="text-[10px] text-red-400 flex items-center gap-1" style={{fontFamily:"'Inter', sans-serif"}}><AlertCircle size={10}/>{errors.name}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={`text-xs font-medium ${labelColor}`} style={{fontFamily:"'Inter', sans-serif"}}>WhatsApp <span className="text-amber-500">*</span></label>
                    <input type="tel" placeholder="(61) 9 9999-9999" value={data.phone} maxLength={15} onChange={e=>set("phone",maskPhone(e.target.value))} className={inputCls(isDark,!!errors.phone)} style={{fontFamily:"'Inter', sans-serif"}} />
                    {errors.phone && <p className="text-[10px] text-red-400 flex items-center gap-1" style={{fontFamily:"'Inter', sans-serif"}}><AlertCircle size={10}/>{errors.phone}</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-medium ${labelColor}`} style={{fontFamily:"'Inter', sans-serif"}}>E-mail <span className="text-amber-500">*</span></label>
                  <input type="email" placeholder="seu@email.com" value={data.email} onChange={e=>set("email",e.target.value)} className={inputCls(isDark,!!errors.email)} style={{fontFamily:"'Inter', sans-serif"}} />
                  {errors.email && <p className="text-[10px] text-red-400 flex items-center gap-1" style={{fontFamily:"'Inter', sans-serif"}}><AlertCircle size={10}/>{errors.email}</p>}
                </div>

                <div className={`h-px border-t ${divider}`} />

                <div className="flex flex-col gap-2">
                  <label className={`text-[9px] font-semibold tracking-widest uppercase ${sectionLabel}`} style={{fontFamily:"'Inter', sans-serif"}}>Quero <span className="text-amber-500">*</span></label>
                  <div className="flex gap-2 flex-wrap">
                    {INTERESTS.map(opt=>(
                      <button key={opt.value} type="button" onClick={()=>set("interest",opt.value)}
                        className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${pill(data.interest===opt.value)}`} style={{fontFamily:"'Inter', sans-serif"}}>{opt.label}</button>
                    ))}
                  </div>
                  {errors.interest && <p className="text-[10px] text-red-400 flex items-center gap-1" style={{fontFamily:"'Inter', sans-serif"}}><AlertCircle size={10}/>Selecione uma opção</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className={`text-[9px] font-semibold tracking-widest uppercase ${sectionLabel}`} style={{fontFamily:"'Inter', sans-serif"}}>Faixa de valor <span className="text-amber-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {PRICE_RANGES.map(range=>(
                      <button key={range} type="button" onClick={()=>set("priceRange",range)}
                        className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200 ${pill(data.priceRange===range)}`} style={{fontFamily:"'Inter', sans-serif"}}>{range}</button>
                    ))}
                  </div>
                  {errors.priceRange && <p className="text-[10px] text-red-400 flex items-center gap-1" style={{fontFamily:"'Inter', sans-serif"}}><AlertCircle size={10}/>Selecione uma faixa</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className={`text-[9px] font-semibold tracking-widest uppercase ${sectionLabel}`} style={{fontFamily:"'Inter', sans-serif"}}>Bairros de interesse</label>
                  <div className="flex flex-wrap gap-2">
                    {NEIGHBORHOODS.map(n=>(
                      <button key={n} type="button" onClick={()=>toggleNeighborhood(n)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${pill(data.neighborhoods.includes(n))}`} style={{fontFamily:"'Inter', sans-serif"}}>{n}</button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={`text-xs font-medium ${labelColor}`} style={{fontFamily:"'Inter', sans-serif"}}>Conte mais sobre o que procura</label>
                  <textarea rows={3} placeholder="Descreva o imóvel ideal, necessidades especiais, prazo..." value={data.message} onChange={e=>set("message",e.target.value)}
                    className={`${inputCls(isDark)} resize-none`} style={{fontFamily:"'Inter', sans-serif"}} />
                </div>

                <div className={`pt-4 border-t flex items-center justify-between gap-4 ${divider}`}>
                  <p className={`text-[10px] ${isDark?"text-white/25":"text-stone-400"}`} style={{fontFamily:"'Inter', sans-serif"}}>Resposta garantida em até 2 horas</p>
                  <motion.button type="button" onClick={handleSubmit} disabled={submitting}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 ${
                      submitting ? isDark?"bg-white/30 text-stone-900/50 cursor-wait":"bg-stone-400 text-white cursor-wait"
                                 : isDark?"bg-white text-stone-900 hover:bg-stone-100":"bg-stone-900 text-white hover:bg-stone-700"
                    }`} style={{fontFamily:"'Inter', sans-serif"}} whileHover={submitting?{}:{scale:1.02}} whileTap={submitting?{}:{scale:.97}}>
                    {submitting?"Enviando...":"Enviar mensagem"}
                    {!submitting && <ArrowRight size={14}/>}
                  </motion.button>
                </div>

              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
