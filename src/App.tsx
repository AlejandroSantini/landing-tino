import React, { useState, useEffect, useRef } from 'react';
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
  Send,
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

const InteractiveChat = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Hola! 👋 Soy Tino, tu asistente virtual. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const botResponses = [
    { trigger: 'hola', response: '¡Hola! 👋 Soy Tino, tu asistente virtual. ¿En qué puedo ayudarte hoy? Podés preguntarme sobre turnos, precios, nuestra ubicación o cómo funciona la automatización.' },
    { trigger: 'turno', response: '¡Claro! 📅 Para agendar un turno necesito que me digas: \n1. Servicio que necesitás.\n2. Día de preferencia.\n3. Turno (mañana/tarde).\n\nSi querés, podés probar escribiendo "mañana a las 10" para ver cómo lo proceso.' },
    { trigger: 'cita', response: '¡Perfecto! Manejo la agenda de forma automática. Decime qué día te queda bien y te muestro los huecos disponibles.' },
    { trigger: 'agenda', response: 'Mi especialidad es la agenda. Me sincronizo con Google Calendar para que nunca se solape un turno. ¿Querés agendar uno ahora?' },
    { trigger: 'precio', response: 'El servicio de Tino tiene un valor de $29/mes (Plan Professional). Si buscás precios de los servicios de este negocio, decime qué servicio te interesa y te paso la lista.' },
    { trigger: 'costo', response: 'El costo de implementación es cero. Pagás una suscripción mensual de $29 y tenés mensajes ilimitados y agendamiento automático.' },
    { trigger: 'cuanto sale', response: 'Tino sale $29 al mes. Es menos de lo que cuesta perder un solo cliente por no responder a tiempo.' },
    { trigger: 'ubicacion', response: 'Estamos configurados para trabajar de forma remota, pero si este fuera el bot de un local, te diría: "Estamos en Av. Santa Fe 1234, CABA. Atendemos de Lunes a Viernes de 9 a 18hs."' },
    { trigger: 'donde estan', response: 'Nuestras oficinas centrales están en la nube ☁️, pero brindamos soporte a todo el mundo. Si te referís al negocio, atendemos en el centro de la ciudad.' },
    { trigger: 'pago', response: 'Aceptamos todos los medios de pago: Tarjetas de crédito/débito vía Stripe/MercadoPago, transferencia bancaria y efectivo en el local.' },
    { trigger: 'tarjeta', response: '¡Sí! Podés pagar con tarjeta. Tino puede enviar links de pago automáticos para señar turnos o cerrar ventas.' },
    { trigger: 'transferencia', response: 'Claro, te paso el CBU si querés. Tino también puede validar comprobantes de transferencia usando IA.' },
    { trigger: 'cancelar', response: 'No hay problema. Decime el nombre de tu reserva y la cancelamos. Tino se encarga de liberar el hueco en la agenda automáticamente.' },
    { trigger: 'reprogramar', response: '¡Dale! Busquemos otro horario. Decime cuándo te quedaría mejor.' },
    { trigger: 'soporte', response: 'Si necesitás un humano, escribí "HUMANO" y te derivo con un agente de soporte técnico. Atendemos de 9 a 18hs.' },
    { trigger: 'humano', response: 'Entendido. Te estoy derivando con un representante de HS Software. En unos minutos te contactarán por este mismo chat. 👨‍💻' },
    { trigger: 'ayuda', response: '¡Estoy acá para eso! Puedo ayudarte a agendar turnos, pasarte precios, darte nuestra ubicación o explicarte cómo funciona Tino.' },
    { trigger: 'servicios', response: 'Ofrecemos: \n- Automatización de WhatsApp\n- Gestión de turnos inteligente\n- Integración con CRMs\n- Bots con IA personalizada\n\n¿De cuál te gustaría saber más?' },
    { trigger: 'que hacen', response: 'Hacemos que tu negocio nunca deje de atender. Tino responde mientras vos dormís, manejando ventas y turnos sin errores.' },
    { trigger: 'vender', response: 'Tino es un experto cerrando ventas. Puede calificar prospectos, mostrar catálogos y enviar links de pago.' },
    { trigger: 'integracion', response: 'Me integro con WhatsApp, Google Calendar, Stripe, MercadoPago y los principales CRMs del mercado.' },
    { trigger: 'whatsapp', response: 'Me conecto a tu número de WhatsApp actual. Solo tenés que escanear un QR y listo, empiezo a trabajar para vos.' },
    { trigger: 'demo', response: '¡Esta es la demo! Pero si querés ver el panel donde se configura todo esto, hacé clic en el botón de "Explorar el Panel de Admin" que está más abajo.' },
    { trigger: 'funciona', response: 'Tino lee los mensajes, entiende la intención del cliente usando IA, y ejecuta acciones como agendar en el calendario o consultar una base de datos de precios.' },
    { trigger: 'mañana', response: 'Mañana tengo disponible a las 10:00, 11:30 y 15:00. ¿Te sirve alguno de esos horarios?' },
    { trigger: '10', response: '¡Perfecto! Reservado para mañana a las 10:00. Te pedimos un nombre y un mail para confirmar. ✅' },
    { trigger: 'default', response: 'Entiendo. Soy un bot especializado. ¿Te gustaría agendar un TURNO, saber los PRECIOS, o hablar con un HUMANO?' }
  ];

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
    const text = input.value.trim();
    if (!text) return;

    setMessages([...messages, { role: 'user', text }]);
    input.value = '';

    setIsTyping(true);
    setTimeout(() => {
      const response = botResponses.find(r => text.toLowerCase().includes(r.trigger))?.response || botResponses.find(r => r.trigger === 'default')!.response;
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="glass rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[500px] w-full max-w-[400px] border border-border">
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
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.role === 'bot' ? 'bg-surface-light text-text rounded-tl-none' : 'bg-primary text-white rounded-tr-none'
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

      <form onSubmit={handleSend} className="p-4 border-t border-border flex gap-2">
        <input 
          name="message"
          type="text" 
          placeholder="Escribí un mensaje..." 
          className="flex-1 bg-surface-light border border-border rounded-full px-4 py-2 text-base text-white focus:outline-none focus:border-primary transition-colors"
        />
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:scale-105 transition-transform">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const [currentAdminImg, setCurrentAdminImg] = useState(0);
  const adminImages = ['/admin.png', '/admin 2.png', '/admin3.png'];

  return (
    <div className="min-h-screen bg-bg selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Dejá de perder clientes por <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">no responder a tiempo.</span>
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
            ].map((card, i) => (
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
      <section id="funcionalidades">
        <div className="container grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">Un panel de control que te da el <span className="text-secondary">poder absoluto.</span></h2>
            <div className="flex flex-col items-start gap-12">
              <div className="space-y-8">
                {[
                  { title: "Editor de flujos intuitivo", desc: "Modificá las respuestas y el camino de tus clientes sin saber programar." },
                  { title: "Estadísticas en tiempo real", desc: "Mirá cuántos turnos agendaste y cuáles son las dudas más frecuentes." },
                  { title: "Configuración flexible", desc: "Ajustá horarios, servicios y recordatorios automáticos con un clic." },
                  { title: "Capacitación gratuita", desc: "Te enseñamos a usar el panel y optimizar tus flujos para que no pierdas ni un cliente." }
                ].map((item, i) => (
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
              <div className="glass rounded-3xl overflow-hidden border border-border shadow-2xl aspect-video relative group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentAdminImg}
                    src={adminImages[currentAdminImg]} 
                    alt="Admin Dashboard" 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              
              <div className="flex justify-center gap-4">
                {adminImages.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentAdminImg(i)}
                    className={`w-24 aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                      currentAdminImg === i ? 'border-primary scale-110 shadow-lg shadow-primary-glow' : 'border-border opacity-50 hover:opacity-100'
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
            ].map((s, i) => (
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

          <div className="glass p-12 md:p-20 rounded-[60px] border border-primary/20 shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Plan Professional</h3>
            <div className="text-5xl font-bold mb-2">$54.999<span className="text-lg text-text-muted">/mes</span></div>
            <p className="text-text-muted mb-8">Ideal para emprendimientos y PyMEs en crecimiento.</p>
            
            <ul className="grid sm:grid-cols-2 gap-4 text-left mb-10 max-w-2xl mx-auto">
              {["Mensajes Ilimitados", "Agendamiento Automático", "Panel de Admin Completo", "Soporte Prioritario", "Analíticas Avanzadas", "Configuración Flexible", ].map((f, i) => (
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
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-surface/30">
        <div className="container flex flex-col items-center text-center gap-10">
          <div className="max-w-md pb-5">
            <h3 className="text-xl font-bold mb-4 mt-5 tracking-tighter">tino</h3>
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
          
          <div className="pt-8 border-t border-border w-full">
            <p className="text-sm text-text-muted">© 2026 Tino. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
