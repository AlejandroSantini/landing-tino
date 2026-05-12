import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Settings, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Zap,
  ChevronRight,
  Lock
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-6'}`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold tracking-tighter text-white" style={{ fontFamily: 'var(--font)', textTransform: 'lowercase' }}>tino</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          <a href="#demo" className="hover:text-primary transition-colors">Demo</a>
          <a href="#funcionalidades" className="hover:text-primary transition-colors">Funcionalidades</a>
          <a href="#precios" className="px-5 py-2.5 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary-glow">
            Empezar ahora
          </a>
        </div>
      </div>
    </nav>
  );
};

interface Option {
  id: string;
  label: string;
  response: string;
  next: string;
}

interface Flows {
  [key: string]: Option[];
}

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const InteractiveChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '¡Hola! 👋 Soy Tino. Acá podés probar cómo lo verían tus clientes. ¿Qué flujo te gustaría ver?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const flows: Flows = {
    main: [
      { id: 'turno', label: '📅 Pedir un turno', response: '¡Excelente! Manejo tu agenda automáticamente. ¿Para qué servicio buscás turno?', next: 'servicios' },
      { id: 'compra', label: '🛍️ Hacer una compra', response: '¡Buenísimo! Tengo el catálogo actualizado. ¿Qué producto te interesa?', next: 'productos' },
      { id: 'consulta', label: '❓ Consultas', response: 'Decime, ¿en qué puedo ayudarte? Tengo info sobre locales, pedidos y más.', next: 'consultas_opciones' },
      { id: 'promo', label: '🔥 Promociones', response: '¡Hoy estás de suerte! Tenemos estas promos activas. ¿Te interesa alguna?', next: 'promos' }
    ],
    servicios: [
      { id: 'corte', label: '✂️ Corte de Pelo', response: '¡Excelente elección! ¿Qué horario te queda mejor para tu corte?', next: 'horarios_corte' },
      { id: 'barba', label: '🧔 Recorte de Barba', response: 'Dale, busquemos un hueco para esa barba. ¿Cuál preferís?', next: 'horarios_barba' },
      { id: 'unias', label: '💅 Manicuría', response: 'Perfecto. Decime qué horario te conviene para tus uñas:', next: 'horarios_unias' },
      { id: 'volver', label: '⬅️ Volver', response: 'Claro, ¿qué otra cosa necesitás?', next: 'main' }
    ],
    horarios_corte: [
      { id: 'h1', label: 'Mañana 10:00', response: '¡Okey! Reservado mañana a las 10:00 para tu corte. ¿Confirmamos?', next: 'confirmacion' },
      { id: 'h2', label: 'Mañana 11:30', response: 'Perfecto, mañana a las 11:30 te esperamos. ¿Confirmamos?', next: 'confirmacion' },
      { id: 'h3', label: 'Tarde 16:00', response: '¡Dale! Agendado hoy mismo a las 16:00. ¿Confirmamos?', next: 'confirmacion' },
      { id: 'h4', label: 'Tarde 18:30', response: 'Buenísimo, hoy a última hora (18:30). ¿Confirmamos?', next: 'confirmacion' }
    ],
    horarios_barba: [
      { id: 'b1', label: 'Hoy 14:00', response: 'Agendado hoy a las 14:00. ¿Te sirve?', next: 'confirmacion' },
      { id: 'b2', label: 'Mañana 09:30', response: 'Mañana bien temprano, 09:30. ¿Confirmamos?', next: 'confirmacion' },
      { id: 'b3', label: 'Mañana 17:00', response: 'Mañana a las 17:00, ideal para salir renovado. ¿Confirmamos?', next: 'confirmacion' }
    ],
    horarios_unias: [
      { id: 'u1', label: 'Lunes 10:00', response: 'El lunes a las 10:00 está disponible. ¿Agendamos?', next: 'confirmacion' },
      { id: 'u2', label: 'Martes 15:00', response: 'El martes a las 15:00 tenemos un lugar. ¿Confirmamos?', next: 'confirmacion' }
    ],
    productos: [
      { id: 'prod1', label: '🤖 Bot de WhatsApp', response: 'Nuestra solución estrella. Incluye implementación y soporte. ¿Querés contratarlo?', next: 'pago' },
      { id: 'prod2', label: '📦 Pack 5000 msg', response: 'Ideal para campañas masivas. ¿Te envío el link para activar el pack?', next: 'pago' },
      { id: 'prod3', label: '🛠️ Soporte Premium', response: 'Atención prioritaria y ajustes ilimitados por un mes. ¿Lo sumamos?', next: 'pago' },
      { id: 'volver', label: '⬅️ Volver', response: 'Sin problema. ¿Qué más buscabas?', next: 'main' }
    ],
    consultas_opciones: [
      { id: 'locales', label: '📍 Nuestros Locales', response: 'Tenemos dos sucursales. ¿Cuál te queda más cerca?', next: 'locales' },
      { id: 'pedido', label: '📦 Mi Pedido', response: 'Para ver el estado de tu pedido, por favor elegí una opción:', next: 'tracking' },
      { id: 'horarios', label: '⏰ Horarios', response: 'Atendemos de Lunes a Viernes de 9 a 18hs y Sábados de 9 a 13hs. ¿Algo más?', next: 'consultas_opciones' },
      { id: 'humano', label: '👨‍💻 Hablar con humano', response: 'Entendido. Un agente se unirá a la charla en unos instantes. ✅', next: 'final' },
      { id: 'volver', label: '⬅️ Volver', response: 'Okey, decime en qué más puedo ayudarte.', next: 'main' }
    ],
    locales: [
      { id: 'l1', label: 'Palermo', response: 'Estamos en Av. Santa Fe 1234. Abrimos de 9 a 20hs. ¿Querés el mapa?', next: 'mapa' },
      { id: 'l2', label: 'Belgrano', response: 'Estamos en Av. Cabildo 2500. Abrimos de 10 a 19hs. ¿Querés el mapa?', next: 'mapa' },
      { id: 'v', label: '⬅️ Volver', response: 'Volvamos atrás. ¿Qué otra duda tenés?', next: 'consultas_opciones' }
    ],
    mapa: [
      { id: 'm', label: '📍 Ver en Google Maps', response: '¡Aquí tenés el link! [Google Maps Link]. ¿Te puedo ayudar en algo más?', next: 'main' },
      { id: 'v', label: '⬅️ Volver', response: 'Entendido. ¿Otra consulta?', next: 'consultas_opciones' }
    ],
    tracking: [
      { id: 't1', label: '🔎 Ver Estado', response: 'Tu pedido #4582 está en "Preparación". Estará listo para retirar en 24hs. 🚚', next: 'main' },
      { id: 't2', label: '✏️ Cambiar Retiro', response: 'Entendido. ¿Por qué sucursal preferís retirar ahora?', next: 'locales' },
      { id: 'v', label: '⬅️ Volver', response: 'Okey, ¿qué más necesitás?', next: 'consultas_opciones' }
    ],
    promos: [
      { id: 'p1', label: '2x1 en Cortes', response: '¡Válido solo los Martes! ¿Querés agendar para el próximo Martes?', next: 'horarios_corte' },
      { id: 'p2', label: '15% Off Efectivo', response: 'Aplica a todos nuestros productos y servicios. ¿Querés ver los precios?', next: 'productos' },
      { id: 'v', label: '⬅️ Volver', response: 'Sin problema. ¿Qué flujo querés probar ahora?', next: 'main' }
    ],
    confirmacion: [
      { id: 'si', label: '✅ Sí, confirmar', response: '¡Listo! Turno agendado. Te enviamos un recordatorio por WhatsApp 2hs antes. ¿Querés ver algo más?', next: 'main' },
      { id: 'no', label: '❌ No, ver otro', response: 'Sin problema. ¿Qué otro servicio buscabas?', next: 'servicios' }
    ],
    pago: [
      { id: 'link', label: '💳 Link de pago', response: 'Aquí tenés tu link de pago seguro: [Link]. Una vez abonado, te llegará el comprobante. ¿Algo más?', next: 'main' },
      { id: 'vuelto', label: '⬅️ Volver al inicio', response: 'Entendido. ¿Qué flujo querés probar ahora?', next: 'main' }
    ],
    final: [
      { id: 'reset', label: '🔄 Reiniciar Demo', response: '¡Hola! ¿Qué flujo querés probar hoy?', next: 'main' }
    ]
  };

  const [currentLevel, setCurrentLevel] = useState<keyof Flows>('main');

  const handleOptionClick = (option: Option) => {
    setShowOptions(false);
    setMessages(prev => [...prev, { role: 'user', text: option.label }]);

    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: option.response }]);
      setIsTyping(false);
      setCurrentLevel(option.next);
      setShowOptions(true);
    }, 800);
  };

  return (
    <div 
      className="glass rounded-3xl overflow-hidden shadow-2xl flex flex-col w-full max-w-[400px] border border-border"
      style={{ height: '600px', minHeight: '600px', maxHeight: '600px' }}
    >
      <div className="p-4 bg-surface-light border-b border-border flex items-center gap-3">
        <div className="flex items-center gap-3">
          <h4 className="text-xl font-bold tracking-tighter text-white" style={{ textTransform: 'lowercase' }}>tino</h4>
          <span className="text-[10px] text-secondary flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> En línea
          </span>
        </div>
      </div>

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 bg-surface/50 scroll-smooth"
      >
        {messages.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: m.role === 'bot' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${m.role === 'bot' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              m.role === 'bot' ? 'bg-surface-light text-text rounded-tl-none' : 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20'
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-surface-light p-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-bg/50">
        <AnimatePresence mode="wait">
          {showOptions ? (
            <motion.div 
              key={currentLevel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-row flex-wrap gap-2"
            >
              {flows[currentLevel].map((opt: Option) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt)}
                  className="flex-1 min-w-[120px] py-3 px-4 bg-surface-light hover:bg-surface border border-border rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98] text-center shadow-md"
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          ) : (
            <div className="h-10 flex items-center justify-center text-[10px] text-text-muted uppercase tracking-widest animate-pulse">
              Tino está escribiendo...
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const App = () => {
  const [currentAdminImg, setCurrentAdminImg] = useState(0);
  const adminImages = ["/admin.png", "/admin 2.png", "/admin3.png"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdminImg((prev) => (prev + 1) % adminImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [adminImages.length]);

  return (
    <div className="min-h-screen bg-bg selection:bg-primary/30 relative overflow-hidden">
      {/* Background Glows */}
      <div className="glow-spot -top-20 -left-20 bg-primary" />
      <div className="glow-spot top-1/4 -right-20 bg-secondary" style={{ opacity: 0.1 }} />
      <div className="glow-spot bottom-1/4 -left-20 bg-accent" style={{ opacity: 0.08 }} />
      
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative">
        <div className="container grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Dejá de perder clientes por{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
                no responder a tiempo.
              </span>
            </h1>
            <p className="text-xl text-text-muted mb-10 max-w-lg">
              tino es el bot de WhatsApp que agenda turnos, responde dudas y cierra ventas mientras vos te ocupás de lo que realmente importa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#registro" className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-primary-glow transition-all">
                Empezar Ahora <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute -z-10 w-72 h-72 bg-primary/20 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <InteractiveChat />
          </motion.div>
        </div>
      </section>

      {/* Psychology/Pain Section */}
      <section id="beneficios" className="bg-surface/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Sabés cuánto te cuesta un "Hola, me das info?" no respondido?</h2>
            <p className="text-xl text-text-muted">El 80% de las ventas por WhatsApp se pierden por tardar más de 10 minutos en responder. Tino responde en 2 segundos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Clock className="text-primary" size={32} />, 
                title: "Atención 24/7", 
                desc: "Tus clientes no esperan a que abras el local. Tino agenda turnos y vende mientras dormís o estás de vacaciones." 
              },
              { 
                icon: <TrendingUp className="text-secondary" size={32} />, 
                title: "Aumentá tus Conversiones", 
                desc: "Al responder al instante, el deseo de compra sigue alto. No dejes que tu competencia se lleve a tu cliente." 
              },
              { 
                icon: <CheckCircle2 className="text-accent" size={32} />, 
                title: "Orden Operativo", 
                desc: "Olvidate del caos de mensajes. Tino organiza tu agenda y te avisa cuando un turno se confirma." 
              }
            ].map((card: { icon: ReactNode; title: string; desc: string }, i: number) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 glass rounded-3xl border border-border flex flex-col gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface-light flex items-center justify-center mb-2">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold">{card.title}</h3>
                <p className="text-text-muted">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Feature Section */}
      <section id="funcionalidades" className="relative">
        <div className="glow-spot top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />
        <div className="container grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">Nosotros lo armamos, <span className="text-secondary">vos tenés el control.</span></h2>
            <div className="flex flex-col items-start gap-12">
              <div className="space-y-12 py-4">
                {[
                  { 
                    title: "Implementación 'Llave en Mano'", 
                    desc: "Nosotros configuramos todo tu bot por vos. No tenés que tocar una sola línea de código para empezar." 
                  },
                  { 
                    title: "Editor de flujos intuitivo", 
                    desc: "Una vez activo, podés modificar las respuestas y el camino de tus clientes cuando quieras de forma simple." 
                  },
                  { 
                    title: "Control total y Estadísticas", 
                    desc: "Mirá cuántos turnos agendaste y ajustá horarios o servicios en tiempo real desde tu panel." 
                  }
                ].map((item: { title: string; desc: string }, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-none" style={{ minWidth: '24px' }}>
                      <ChevronRight size={14} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -z-10 w-full h-full bg-secondary/10 blur-[100px] rounded-full" />
            <div className="flex flex-col gap-6">
              <div className="glass rounded-3xl overflow-hidden border border-border shadow-2xl aspect-video relative group p-4 md:p-6 bg-surface/50">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentAdminImg}
                    src={adminImages[currentAdminImg]} 
                    alt="Admin Dashboard" 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </AnimatePresence>
              </div>
              
              <div className="flex justify-center gap-10 py-6">
                {adminImages.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentAdminImg(i)}
                    className={`w-32 aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                      currentAdminImg === i 
                        ? "border-primary scale-110 shadow-lg shadow-primary-glow" 
                        : "border-border opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA / Steps Section */}
      <section id="registro" className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-bg via-primary/5 to-bg" />
        <div className="container relative z-10 text-center max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-12">Empezá a automatizar en <span className="text-primary">5 minutos.</span></h2>
          
          <div className="grid sm:grid-cols-3 gap-8 mb-16">
            {[
              { step: "1", title: "Registrate", icon: <Settings /> },
              { step: "2", title: "Pagá y Activá", icon: <Zap /> },
              { step: "3", title: "Configurá tu bot", icon: <Calendar /> }
            ].map((s: { step: string; title: string; icon: ReactNode }, i: number) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 relative">
                  {s.icon}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center border-2 border-bg">
                    {s.step}
                  </span>
                </div>
                <h4 className="font-bold text-xl">{s.title}</h4>
              </div>
            ))}
          </div>

          <div className="glass p-12 md:p-20 rounded-[60px] border border-primary/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Plan Professional</h3>
            <div className="text-3xl font-bold mb-2">Implementación + <span className="text-5xl">$54.999</span><span className="text-lg text-text-muted">/mes</span></div>
            <p className="text-text-muted mb-8">Ideal para emprendimientos y PyMEs en crecimiento.</p>
            
            <ul className="grid sm:grid-cols-2 gap-4 text-left mb-10 max-w-2xl mx-auto">
              {["Mensajes Ilimitados", "Agendamiento Automático", "Panel de Admin Completo", "Soporte Prioritario", "Analíticas Avanzadas", "Configuración Flexible", ].map((f: string, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-secondary" /> <span>{f}</span>
                </li>
              ))}
            </ul>

            <a 
              href="https://bot-admin-mu.vercel.app/asistente"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-5 bg-primary text-white rounded-2xl font-bold text-xl hover:scale-105 hover:shadow-2xl hover:shadow-primary-glow transition-all flex items-center justify-center gap-3 mx-auto"
            >
              Crear mi cuenta ahora <ArrowRight />
            </a>
            <p className="mt-4 text-sm text-text-muted flex items-center justify-center gap-2">
              <Lock size={14} /> Pago seguro
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-20 border-t border-border bg-surface/30">
        <div className="container flex flex-col items-center text-center gap-10">
          <div className="max-w-md pb-5">
            <h3 className="text-xl font-bold mb-4 tracking-tighter mt-10">tino</h3>
            <p className="text-sm text-text-muted">
              Impulsando la automatización inteligente para negocios que no descansan. 
              Creamos soluciones que escalan tu atención al cliente.
            </p>
          </div>
          
          <a 
            href="https://hyssoftware.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 group"
          >
            <span className="text-sm text-text-muted group-hover:text-white transition-colors">Un producto de</span>
            <img src="/Logo_HyS_reduccion_white.png" alt="HS Software" className="h-10" />
          </a>
          
        </div>
      </footer>
    </div>
  );
};

export default App;
