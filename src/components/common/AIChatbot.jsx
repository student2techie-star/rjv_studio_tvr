// src/components/common/AIChatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  X,
  Send,
  Camera,
  User,
  ExternalLink,
  RotateCcw,
  ChevronRight,
  PhoneCall,
} from "lucide-react";
import SocialIcon from "./SocialIcons";
import { createWhatsAppUrl } from "../../utils/whatsapp";

const INITIAL_PROMPTS = [
  { label: "📸 Services", query: "What photography services do you offer?" },
  { label: "🖼️ 3D Custom Frames", query: "Tell me about custom photo frames" },
  { label: "📍 Location & Hours", query: "Where is RJV Studios located?" },
  { label: "📅 How to Book", query: "How can I book a photography shoot?" },
  { label: "💰 Pricing & Quotes", query: "What are your package prices?" },
];

function withNav(suggestions, isHome = false) {
  const navItems = isHome
    ? [{ label: "🏠 Home", query: "🏠 Main Menu" }]
    : [
        { label: "🏠 Home", query: "🏠 Main Menu" },
        { label: "↩️ Back", query: "↩️ Back Options" },
      ];

  const filtered = suggestions.filter(
    (s) => s.query !== "🏠 Main Menu" && s.query !== "↩️ Back Options"
  );

  return [...navItems, ...filtered];
}

const BOT_KNOWLEDGE = [
  {
    keywords: ["wedding", "muhurtham", "marriage", "reception", "sangeet", "nitchayathartham"],
    response:
      "💍 **Wedding & Reception Photography**\n\nWe provide full-day candid & traditional wedding coverage in Thiruvarur & Tamil Nadu:\n• Engagement & Nitchayathartham\n• Pre-Wedding Scenic Couple Session\n• Sacred Muhurtham & Rituals\n• Reception, Sangeet & Haldi\n• High-Res Albums & Teaser Reels",
    action: { label: "Book Wedding Shoot", to: "/book" },
    suggestions: withNav([
      { label: "💰 Wedding Prices", query: "What are your package prices?" },
      { label: "🖼️ Wedding Albums", query: "Tell me about custom photo frames" },
      { label: "💬 Chat on WhatsApp", query: "How to contact on WhatsApp?" },
    ]),
  },
  {
    keywords: ["baby", "kids", "child", "maternity", "newborn", "kadhukuthu", "birthday", "cake smash"],
    response:
      "👶 **Baby, Kids & Maternity Shoots**\n\nPreserve every sweet milestone with gentle care:\n• Maternity & Pregnancy Glow Sessions\n• Newborn Baby Shoots (0–3 months, safe theme props)\n• Ear Piercing Ceremony (Kadhukuthu Vizha)\n• 1st Birthday & Cake Smash Fun",
    action: { label: "Explore Baby Shoots", to: "/services" },
    suggestions: withNav([
      { label: "🎂 1st Birthday Shoots", query: "Tell me about 1st birthday shoots" },
      { label: "👂 Kadhukuthu Vizha", query: "Tell me about kadhukuthu ear piercing shoots" },
      { label: "📅 Book Baby Session", query: "How can I book a photography shoot?" },
    ]),
  },
  {
    keywords: ["service", "services", "offer", "what do you do"],
    response:
      "✨ **RJV Studios Services**\n\nWe specialize in:\n1. 💍 **Weddings & Pre-Wedding**\n2. 👶 **Baby, Kids & Maternity**\n3. 💛 **Traditional Ceremonies** (Puberty, Housewarming)\n4. 📸 **Studio & Outdoor Portraits**\n5. 🖼️ **3D Custom Photo Frames**",
    action: { label: "View All Services", to: "/services" },
    suggestions: withNav(
      [
        { label: "💍 Wedding Photography", query: "Tell me about wedding photography" },
        { label: "👶 Baby & Maternity", query: "Tell me about baby photography" },
        { label: "💛 Ceremonies (Manjal Neerattu)", query: "Tell me about traditional ceremonies" },
        { label: "🖼️ 3D Photo Frames", query: "Tell me about custom photo frames" },
      ],
      true
    ),
  },
  {
    keywords: ["ceremony", "ceremonies", "manjal", "puberty", "grihapravesam", "housewarming", "temple", "pooja"],
    response:
      "💛 **Traditional Tamil Ceremonies**\n\nVibrant, respectful coverage of family rituals:\n• Manjal Neerattu Vizha (Puberty Ceremony)\n• Grihapravesam (Housewarming)\n• Temple Festivals & Family Poojas\n• Annaprasana & Milestone Rituals",
    action: { label: "View Ceremony Portfolio", to: "/portfolio" },
    suggestions: withNav([
      { label: "💛 Puberty Ceremony (Manjal Neerattu)", query: "Manjal Neerattu Vizha photography" },
      { label: "🏡 Housewarming Shoot", query: "Housewarming ceremony coverage" },
      { label: "📅 Book Ceremony Shoot", query: "How can I book a photography shoot?" },
    ]),
  },
  {
    keywords: ["frame", "frames", "3d", "acrylic", "glass", "wooden", "decor", "gift"],
    response:
      "🖼️ **3D Custom Photo Frames**\n\nHandcrafted photo art for your walls and gifts:\n• 3D Relief & Cutout Frames\n• Premium Glossy Acrylic & Glass Frames\n• Warm Wooden LED Backlight Frames\n\nUpload & preview your own photo on our website live!",
    action: { label: "Try 3D Frame Customizer", to: "/frames" },
    suggestions: withNav([
      { label: "🎨 Frame Preview Tool", query: "Where can I preview custom frames?" },
      { label: "🎁 Photo Frame Gifts", query: "Are frames good for gifts?" },
      { label: "💬 Order on WhatsApp", query: "How to order photo frames?" },
    ]),
  },
  {
    keywords: ["location", "address", "where", "map", "place", "city", "direction", "timing", "hours", "open"],
    response:
      "📍 **RJV Studios & Photo Frames**\n\n• **Address**: Opposite HDFC Bank, Tiruvarur North, Thiruvarur, Tamil Nadu 610001\n• **Working Hours**: Open Daily 9:00 AM – 9:00 PM\n• **Phone/WhatsApp**: +91 90034 30930",
    action: { label: "Open Google Maps", external: "https://maps.google.com/?q=RJV+Studios+Thiruvarur" },
    suggestions: withNav([
      { label: "📅 Book Studio Visit", query: "How can I book a photography shoot?" },
      { label: "💬 Contact on WhatsApp", query: "How to contact on WhatsApp?" },
    ]),
  },
  {
    keywords: ["book", "booking", "reserve", "date", "appointment", "schedule", "contact"],
    response:
      "📅 **Booking Your Shoot**\n\n1. Use our online booking form to choose your date & service.\n2. Or connect with us directly on WhatsApp or Call for instant date availability!",
    actions: [
      {
        label: "Chat on WhatsApp",
        external: createWhatsAppUrl("Hi RJV Studios, I would like to book a photography session."),
        variant: "whatsapp",
      },
      {
        label: "Call Studio (+91 90034 30930)",
        external: "tel:+919003430930",
        variant: "call",
      },
    ],
    suggestions: withNav([
      { label: "📝 Fill Booking Form", query: "How can I book a photography shoot?" },
      { label: "📸 Explore Services First", query: "What photography services do you offer?" },
    ]),
  },
  {
    keywords: ["price", "cost", "pricing", "rate", "quote", "charge", "budget", "amount", "package"],
    response:
      "💰 **Package & Pricing Information**\n\nOur photography rates depend on your event date, shooting hours, location & custom album/frame requirements.\n\nPlease **connect with us directly via WhatsApp or Phone Call** to get an instant customized price quote for your event!",
    actions: [
      {
        label: "Chat on WhatsApp for Quote",
        external: createWhatsAppUrl("Hi RJV Studios, I would like to get a price quote for my event."),
        variant: "whatsapp",
      },
      {
        label: "Call Studio (+91 90034 30930)",
        external: "tel:+919003430930",
        variant: "call",
      },
    ],
    suggestions: withNav([
      { label: "💍 Wedding Photography Info", query: "Tell me about wedding photography" },
      { label: "👶 Baby Shoot Info", query: "Tell me about baby photography" },
      { label: "🖼️ 3D Photo Frames", query: "Tell me about custom photo frames" },
    ]),
  },
  {
    keywords: ["hi", "hello", "hey", "vanakkam", "assistant"],
    response:
      "Vanakkam! 👋 Welcome to RJV Studios AI Assistant. What would you like to know about today?",
    suggestions: withNav(
      [
        { label: "💰 Pricing & Quotes", query: "What are your package prices?" },
        { label: "📸 Services Offered", query: "What photography services do you offer?" },
        { label: "🖼️ 3D Photo Frames", query: "Tell me about custom photo frames" },
      ],
      true
    ),
  },
];

function getBotReply(userText) {
  const text = userText.toLowerCase().trim();

  // Special direct handler for pricing / cost queries
  if (["price", "cost", "pricing", "rate", "quote", "charge", "budget", "amount", "package"].some((k) => text.includes(k))) {
    return {
      text: "💰 **Package & Pricing Information**\n\nOur photography rates depend on your event date, shooting hours, location & custom album/frame requirements.\n\nPlease **connect with us directly via WhatsApp or Call** to get an instant customized price quote for your event!",
      actions: [
        {
          label: "Chat on WhatsApp for Quote",
          external: createWhatsAppUrl("Hi RJV Studios, I would like to get a price quote for my event."),
          variant: "whatsapp",
        },
        {
          label: "Call Studio (+91 97893 25969)",
          external: "tel:+919789325969",
          variant: "call",
        },
      ],
      suggestions: withNav([
        { label: "💍 Wedding Photography", query: "Tell me about wedding photography" },
        { label: "👶 Baby Shoots", query: "Tell me about baby photography" },
        { label: "🖼️ 3D Photo Frames", query: "Tell me about custom photo frames" },
      ]),
    };
  }

  for (const item of BOT_KNOWLEDGE) {
    if (item.keywords.some((kw) => text.includes(kw))) {
      return { text: item.response, action: item.action, actions: item.actions, suggestions: item.suggestions };
    }
  }

  return {
    text:
      "I'm here to help with photography shoots, 3D photo frames, booking dates, or studio location! Choose a topic below or connect directly with our team:",
    actions: [
      {
        label: "Chat on WhatsApp",
        external: createWhatsAppUrl(`Hi RJV Studios, I have a question: ${userText}`),
        variant: "whatsapp",
      },
      {
        label: "Call Studio (+91 97893 25969)",
        external: "tel:+919789325969",
        variant: "call",
      },
    ],
    suggestions: withNav(INITIAL_PROMPTS, true),
  };
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState(INITIAL_PROMPTS);
  const [suggestionStack, setSuggestionStack] = useState([INITIAL_PROMPTS]);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Vanakkam! 👋 I am **RJV Assistant**, your AI photography & photo frame guide. Select a topic below to explore!",
      suggestions: INITIAL_PROMPTS,
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Handle Home Navigation
    if (query === "🏠 Main Menu" || query === "Home" || query === "__GO_HOME__") {
      const userMsg = { id: Date.now().toString(), sender: "user", text: "🏠 Main Menu" };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      setTimeout(() => {
        const botMsg = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Vanakkam! 👋 Returned to Main Menu. Select a topic below to explore:",
          suggestions: INITIAL_PROMPTS,
        };
        setMessages((prev) => [...prev, botMsg]);
        setCurrentSuggestions(INITIAL_PROMPTS);
        setSuggestionStack([INITIAL_PROMPTS]);
        setIsTyping(false);
      }, 350);
      return;
    }

    // Handle Back Navigation
    if (query === "↩️ Back Options" || query === "Back" || query === "__GO_BACK__") {
      const userMsg = { id: Date.now().toString(), sender: "user", text: "↩️ Back" };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      setTimeout(() => {
        let prevSug = INITIAL_PROMPTS;
        if (suggestionStack.length > 1) {
          const newStack = suggestionStack.slice(0, -1);
          prevSug = newStack[newStack.length - 1];
          setSuggestionStack(newStack);
        }

        const botMsg = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Returned to previous options. What else would you like to explore?",
          suggestions: prevSug,
        };
        setMessages((prev) => [...prev, botMsg]);
        setCurrentSuggestions(prevSug);
        setIsTyping(false);
      }, 350);
      return;
    }

    // Normal User Query
    const userMsg = { id: Date.now().toString(), sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(query);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply.text,
        action: reply.action,
        actions: reply.actions,
        suggestions: reply.suggestions,
      };
      setMessages((prev) => [...prev, botMsg]);

      if (reply.suggestions) {
        setCurrentSuggestions(reply.suggestions);
        setSuggestionStack((prev) => [...prev, reply.suggestions]);
      }
      setIsTyping(false);
    }, 500);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Vanakkam! 👋 I am **RJV Assistant**, your AI photography & photo frame guide. Select a topic below to explore!",
        suggestions: INITIAL_PROMPTS,
      },
    ]);
    setCurrentSuggestions(INITIAL_PROMPTS);
    setSuggestionStack([INITIAL_PROMPTS]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        aria-label="Open RJV AI Assistant Chat"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white p-3 sm:px-3.5 sm:py-2.5 shadow-xl shadow-brand-900/30 border border-brand-400/40"
      >
        <div className="relative">
          <Camera className="h-4.5 w-4.5 text-amber-300" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>
        <span className="hidden sm:inline text-xs font-bold tracking-wide">AI Assistant</span>
      </motion.button>

      {/* Reduced-Width Chat Window Modal (Compact sm:w-[320px]) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-20 sm:left-5 z-50 w-[calc(100vw-24px)] sm:w-[320px] max-w-[320px] h-[510px] max-h-[80vh] rounded-3xl bg-white shadow-2xl shadow-brand-900/35 border border-brand-200/90 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-900 via-brand-850 to-brand-950 px-3.5 py-3 text-white flex items-center justify-between border-b border-brand-700/50">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-brand-700/60 border border-brand-400/40 text-amber-300 shrink-0">
                  <Camera size={18} />
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-brand-900" />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-wide text-white flex items-center gap-1">
                    RJV AI Assistant
                    <span className="text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1 py-0.1 rounded-full">
                      Online
                    </span>
                  </h3>
                  <p className="text-[10px] text-brand-200">Thiruvarur Photography &amp; Frames</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  onClick={handleReset}
                  title="Clear chat history"
                  className="p-1 text-brand-300 hover:text-white hover:bg-brand-800/80 rounded-lg transition-colors"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  className="p-1 text-brand-300 hover:text-white hover:bg-brand-800/80 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-brand-50/40 via-white to-white text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="h-6 w-6 rounded-lg bg-brand-900 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Camera size={13} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2.5 shadow-2xs whitespace-pre-wrap leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-brand-600 text-white rounded-br-none text-[11px]"
                        : "bg-white text-brand-950 border border-brand-200/70 rounded-bl-none shadow-xs text-[11.5px]"
                    }`}
                  >
                    {msg.text}

                    {/* Multiple Actions (WhatsApp + Call) */}
                    {msg.actions && msg.actions.length > 0 ? (
                      <div className="mt-2.5 pt-2 border-t border-brand-100/80 flex flex-col gap-1.5">
                        {msg.actions.map((act) => (
                          <a
                            key={act.label}
                            href={act.external}
                            target={act.external.startsWith("tel:") ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center gap-1.5 text-[10.5px] font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs ${
                              act.variant === "whatsapp"
                                ? "bg-[#25D366] text-white hover:bg-[#1fb959]"
                                : act.variant === "call"
                                ? "bg-brand-900 text-white hover:bg-brand-800 border border-brand-700"
                                : "bg-brand-100 text-brand-800 hover:bg-brand-200"
                            }`}
                          >
                            {act.variant === "whatsapp" && <SocialIcon name="whatsapp" size={13} />}
                            {act.variant === "call" && <PhoneCall size={12} className="text-amber-300" />}
                            <span>{act.label}</span>
                          </a>
                        ))}
                      </div>
                    ) : msg.action ? (
                      <div className="mt-2 pt-2 border-t border-brand-100/80">
                        {msg.action.to ? (
                          <Link
                            to={msg.action.to}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 text-[10.5px] font-bold text-brand-800 hover:text-brand-950 bg-brand-100 hover:bg-brand-200/80 px-2.5 py-1 rounded-lg transition-colors"
                          >
                            <span>{msg.action.label}</span>
                            <ChevronRight size={11} />
                          </Link>
                        ) : (
                          <a
                            href={msg.action.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200/80 px-2.5 py-1 rounded-lg transition-colors"
                          >
                            <span>{msg.action.label}</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    ) : null}

                    {/* Related Inline Suggestions */}
                    {msg.sender === "bot" && msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-brand-100/70">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-1.5 flex items-center gap-1">
                          <Sparkles size={11} className="text-amber-500" />
                          <span>Related suggestions:</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestions.map((sug) => (
                            <button
                              key={sug.label}
                              onClick={() => handleSend(sug.query)}
                              className={`inline-flex items-center gap-0.5 text-[10.5px] font-semibold px-2 py-0.5 rounded-full transition-colors border ${
                                sug.query === "🏠 Main Menu"
                                  ? "bg-brand-900 text-amber-300 border-brand-800 hover:bg-brand-800"
                                  : sug.query === "↩️ Back Options"
                                  ? "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200"
                                  : "bg-brand-50 text-brand-800 border-brand-200/80 hover:bg-brand-100 hover:border-brand-400"
                              }`}
                            >
                              <span>{sug.label}</span>
                              {sug.query !== "🏠 Main Menu" && sug.query !== "↩️ Back Options" && (
                                <ChevronRight size={10} className="text-brand-500" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="h-6 w-6 rounded-lg bg-brand-200 text-brand-900 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="h-6 w-6 rounded-lg bg-brand-900 text-amber-300 flex items-center justify-center shrink-0">
                    <Camera size={13} />
                  </div>
                  <div className="bg-white text-brand-600 border border-brand-200/70 rounded-2xl rounded-bl-none px-3 py-2 flex items-center gap-1 shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Context-Aware Quick Suggestions Bar (Flex Wrap - No Horizontal Scroll) */}
            <div className="p-2 bg-brand-50/70 border-t border-brand-100 flex flex-wrap gap-1">
              {currentSuggestions.map((qp) => (
                <button
                  key={qp.label}
                  onClick={() => handleSend(qp.query)}
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold shadow-2xs transition-colors flex items-center gap-1 ${
                    qp.query === "🏠 Main Menu"
                      ? "bg-brand-900 text-amber-300 border-brand-800 hover:bg-brand-800"
                      : qp.query === "↩️ Back Options"
                      ? "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200"
                      : "bg-white text-brand-800 border-brand-200 hover:border-brand-400 hover:bg-brand-100"
                  }`}
                >
                  <span>{qp.label}</span>
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-2 bg-white border-t border-brand-200 flex items-center gap-1.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask RJV Assistant..."
                className="flex-1 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs text-brand-900 placeholder-brand-500 border border-brand-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-8 w-8 rounded-full bg-brand-900 text-white flex items-center justify-center shadow-sm hover:bg-brand-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <Send size={14} className="ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
