import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2, Coffee, ExternalLink, Github, Instagram, Mail, MapPin, MessageCircle, ShieldCheck, Sparkles, Wallet, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import "./pages.css";

const contactForm = "https://docs.google.com/forms/d/e/1FAIpQLSfZkSDhpms5V8CwTfZ6/viewform?embedded=true";
const contactExternal = "https://forms.gle/ZkSDhpms5V8CwTfZ6";

const legalPages = {
  "/legal/about": { title: "About Sandy", eyebrow: "THE PERSON BEHIND THE PIXELS", body: <><p>Sandy Coder is an independent frontend developer focused on building thoughtful, responsive and accessible digital experiences.</p><p>From early sketches to the final deployment, the goal is to make the web feel useful, clear and a little more delightful.</p></>, links: [["Services", "/legal/services"], ["Contact", "/legal/contact"]] },
  "/legal/contact": { title: "Contact information", eyebrow: "LET'S TALK", body: <><p>For project enquiries, collaborations, support or general questions, use the contact form.</p><p>Services include website development, frontend development, UI/UX design and website maintenance.</p><a className="page-inline-link" href="/contact">Open contact page <ArrowUpRight size={15}/></a></>, links: [["About", "/legal/about"], ["Services", "/legal/services"]] },
  "/legal/services": { title: "Services", eyebrow: "WHAT I OFFER", body: <ul><li>Responsive website development</li><li>Portfolio and personal-brand websites</li><li>Frontend development and React interfaces</li><li>Landing page design</li><li>UI/UX design and prototyping</li><li>Website maintenance and improvements</li><li>Digital creative services</li></ul>, links: [["Contact", "/contact"], ["About", "/legal/about"]] },
  "/legal/privacy-policy": { title: "Privacy policy", eyebrow: "YOUR INFORMATION MATTERS", body: <><p>Information submitted through contact forms is used to respond to enquiries and discuss requested services. Payment details are processed by the payment provider; this website does not store full card or UPI credentials.</p><p>Information is not sold. Data may be handled by service providers needed to operate forms, hosting, analytics or payment processing. Avoid submitting passwords or other sensitive information through general contact forms.</p><p>For a privacy-related request, use the <a href="/contact">contact page</a>.</p></>, links: [["Terms", "/legal/terms"], ["Refund policy", "/legal/refund-policy"]] },
  "/legal/terms": { title: "Terms & conditions", eyebrow: "PLEASE READ", body: <><p>This website presents development and digital creative services. A project begins only after the scope, deliverables, timeline and price have been agreed in writing.</p><p>Payments made through the support page are intended for website development, UI/UX design and related digital services. Do not submit payment for an unrelated purpose.</p><p>Project materials and third-party assets remain subject to their respective licences. Timelines may change if requirements or feedback are delayed.</p></>, links: [["Services", "/legal/services"], ["Refund policy", "/legal/refund-policy"]] },
  "/legal/refund-policy": { title: "Refund policy", eyebrow: "PAYMENTS & CANCELLATIONS", body: <><p>For a service engagement, request cancellation and a refund before work begins. Requests are reviewed based on the agreed scope and work already completed.</p><p>Once work has started, any refund is assessed against completed work, third-party costs and the written agreement. Completed digital deliverables are generally non-refundable unless required by applicable law.</p><p>To discuss a payment or refund, contact Sandy and include your payment reference. Never share card details or OTPs.</p></>, links: [["Contact", "/contact"], ["Terms", "/legal/terms"]] },
};

const posts = [
  { title: "How I Built My Portfolio", category: "Design · Development", date: "June 15, 2025", read: "8 min", excerpt: "A behind-the-scenes look at designing and coding a personal portfolio, from the first sketch to deployment.", slug: "how-i-built-my-portfolio", featured: true },
  { title: "5 CSS Tricks That Will Level Up Your UI", category: "Development", date: "June 22, 2025", read: "5 min", excerpt: "Five practical CSS techniques for creating cleaner, more expressive interfaces.", soon: true },
  { title: "Designing for India: Why Localisation Matters", category: "Design", date: "July 1, 2025", read: "6 min", excerpt: "Thinking beyond translation when building for India-first audiences.", soon: true },
  { title: "A First Look at Jetpack Compose", category: "Android", date: "July 8, 2025", read: "7 min", excerpt: "Notes from building an early Android app with Jetpack Compose.", soon: true },
  { title: "10 Figma Tips That Save Time", category: "Tips & Tricks", date: "July 14, 2025", read: "4 min", excerpt: "A practical collection of useful Figma workflows and shortcuts.", soon: true },
  { title: "Building with Node.js and MongoDB", category: "Development", date: "July 20, 2025", read: "10 min", excerpt: "A practical overview of building a small full-stack application.", soon: true },
  { title: "Getting Dark Mode Colours Right", category: "Design", date: "July 25, 2025", read: "5 min", excerpt: "How to make dark interfaces readable, balanced and premium.", soon: true },
  { title: "Why Every Developer Needs a Portfolio", category: "Tips & Tricks", date: "July 30, 2025", read: "4 min", excerpt: "A portfolio is more than a resume: it is proof of work and a useful conversation starter.", soon: true },
];

function PageHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sub-header page-shell">
    <a className="sub-brand" href="/"><span className="sub-brand-mark">S<span>.</span></span><span>SANDY<span>CODER</span></span></a>
    <button className="sub-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X/> : <span>☰</span>}</button>
    <nav className={open ? "sub-nav sub-nav-open" : "sub-nav"}>
      <a href="/">Home</a><a href="/#work">Work</a><a href="/#about">About</a><a href="/blog">Blog</a><a href="/contact">Contact</a><a className="sub-nav-cta" href="/support">Support <span>↗</span></a>
    </nav>
  </header>;
}

function PageFooter() {
  return <footer className="sub-footer page-shell">
    <a className="sub-brand" href="/"><span className="sub-brand-mark">S<span>.</span></span><span>SANDY<span>CODER</span></span></a>
    <div className="sub-footer-links"><a href="/legal/about">About</a><a href="/legal/services">Services</a><a href="/legal/privacy-policy">Privacy</a><a href="/legal/terms">Terms</a><a href="/legal/refund-policy">Refunds</a></div>
    <div className="sub-footer-bottom"><span>DESIGNED WITH INTENTION. BUILT WITH CURIOSITY.</span><span>© {new Date().getFullYear()} SANDY CODER</span></div>
  </footer>;
}

function PageFrame({ eyebrow, title, accent, description, children }) {
  return <><PageHeader/><main className="sub-main page-shell"><div className="sub-hero"><div className="sub-eyebrow"><span/> {eyebrow}</div><h1>{title} <em>{accent}</em></h1>{description && <p>{description}</p>}</div>{children}</main><PageFooter/></>;
}

function ContactPage() {
  return <PageFrame eyebrow="OPEN FOR GOOD PROJECTS" title="Let's build something" accent="meaningful." description="Have a project in mind, a collaboration idea, or a question? Send a message and let's start a conversation.">
    <div className="contact-layout">
      <aside className="sub-info-card">
        <div className="sub-info-item"><MapPin/><div><b>Location</b><span>India · Uttar Pradesh · Available remote</span></div></div>
        <div className="sub-info-item"><MessageCircle/><div><b>Response time</b><span>Usually within 24 hours</span></div></div>
        <div className="sub-info-item"><Code2/><div><b>What I can help with</b><span>Web development, frontend, UI/UX and digital experiences</span></div></div>
        <div className="sub-note">A CLEAR BRIEF HELPS ME GIVE YOU A BETTER ANSWER.</div>
        <a className="sub-outline-button" href="https://github.com/SandeepCoder09" target="_blank" rel="noreferrer">View GitHub <Github size={16}/></a>
      </aside>
      <section className="sub-form-card">
        <div className="sub-card-head"><div><span className="sub-card-index">01 / MESSAGE</span><h2>Send a message</h2></div><Mail/></div>
        <p className="sub-muted">The form below is hosted securely by Google Forms. You can also open it in a separate tab.</p>
        <div className="sub-iframe-wrap"><iframe title="Contact form for Sandy Coder" src={contactForm} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>
        <a className="sub-button" href={contactExternal} target="_blank" rel="noreferrer">Open contact form <ExternalLink size={16}/></a>
      </section>
    </div>
  </PageFrame>;
}

function SupportPage() {
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const currentAmount = amount === "custom" ? Number(custom) : amount;

  async function pay(e) {
    e.preventDefault();
    if (!Number.isInteger(currentAmount) || currentAmount < 1 || currentAmount > 100000) {
      setStatus("Enter a whole amount between ₹1 and ₹1,00,000.");
      return;
    }
    setBusy(true); setStatus("");
    try {
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve; script.onerror = () => reject(new Error("Unable to load secure checkout. Please try again."));
          document.body.appendChild(script);
        });
      }
      const response = await fetch("/api/create-order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount: currentAmount, donorName: name, donorMsg: message }) });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error || "Could not create a payment order.");
      const checkout = new window.Razorpay({
        key: order.key, amount: order.amount, currency: "INR", name: "Sandy Coder",
        description: "Support for digital creative services", order_id: order.id,
        theme: { color: "#a879ff" },
        handler: async (result) => {
          try {
            const verifyResponse = await fetch("/api/verify-payment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result) });
            const verified = await verifyResponse.json();
            if (!verifyResponse.ok || !verified.success) throw new Error("Payment verification could not be completed. Please contact support with your payment ID.");
            setPaymentId(result.razorpay_payment_id); setStatus("Payment verified successfully. Thank you for supporting my work.");
          } catch (error) { setStatus(error.message + " Payment ID: " + (result.razorpay_payment_id || "not available")); }
          setBusy(false);
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      checkout.on("payment.failed", (failure) => { setStatus(failure.error?.description || "Payment failed. Please try again."); setBusy(false); });
      checkout.open();
    } catch (error) { setStatus(error.message || "Something went wrong. Please try again."); setBusy(false); }
  }

  return <PageFrame eyebrow="INDEPENDENT WORK, COMMUNITY SUPPORTED" title="Fuel the" accent="creativity." description="Your support helps make room for more experiments, open-source learning and thoughtful digital projects.">
    <div className="support-layout">
      <div className="support-story">
        <div className="support-feature"><span className="support-icon"><Coffee/></span><div><b>Fuel the next build</b><p>Help cover the time and tools behind new experiments.</p></div></div>
        <div className="support-feature"><span className="support-icon"><Code2/></span><div><b>Keep learning in public</b><p>Support practical projects, tutorials and useful resources.</p></div></div>
        <div className="support-feature"><span className="support-icon"><Sparkles/></span><div><b>Encourage creative work</b><p>Every contribution is appreciated, whatever the amount.</p></div></div>
        <div className="support-security"><ShieldCheck/><span>Payments are processed by Razorpay. Your card, UPI and banking credentials are handled by the payment provider.</span></div>
      </div>
      <form className="sub-form-card support-form" onSubmit={pay}>
        <div className="sub-card-head"><div><span className="sub-card-index">01 / SUPPORT</span><h2>Choose an amount</h2></div><Wallet/></div>
        <div className="amount-grid">{[50,100,250,500,1000].map(value => <button type="button" key={value} className={amount === value ? "amount-option amount-active" : "amount-option"} onClick={() => setAmount(value)}>₹{value}</button>)}<button type="button" className={amount === "custom" ? "amount-option amount-active" : "amount-option"} onClick={() => setAmount("custom")}>Custom</button></div>
        {amount === "custom" && <label className="sub-field">Custom amount (INR)<input type="number" min="1" max="100000" step="1" value={custom} onChange={e => setCustom(e.target.value)} placeholder="Enter amount" required/></label>}
        <label className="sub-field">Your name <span>Optional</span><input value={name} onChange={e => setName(e.target.value)} maxLength="80" placeholder="Name"/></label>
        <label className="sub-field">A note for Sandy <span>Optional</span><textarea value={message} onChange={e => setMessage(e.target.value)} maxLength="300" rows="3" placeholder="Leave a short message…"/></label>
        <div className="support-total"><span>Total contribution</span><strong>₹{Number.isFinite(currentAmount) ? currentAmount.toLocaleString("en-IN") : "0"}</strong></div>
        <button className="sub-button sub-button-full" type="submit" disabled={busy}>{busy ? "Preparing secure checkout…" : <>Continue to secure payment <ArrowUpRight size={16}/></>}</button>
        {status && <p className={paymentId ? "payment-status payment-success" : "payment-status"} role="status">{status}</p>}
        {paymentId && <p className="payment-id">Payment reference: <b>{paymentId}</b></p>}
        <p className="sub-tiny">Please do not share OTPs, PINs or full card details with anyone.</p>
      </form>
    </div>
  </PageFrame>;
}

function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", "Design", "Development", "Android", "Tips & Tricks"];
  const filtered = posts.filter(p => (category === "All" || p.category.toLowerCase().includes(category.toLowerCase())) && (p.title + p.excerpt).toLowerCase().includes(query.toLowerCase()));
  return <PageFrame eyebrow="NOTES FROM THE BUILD PROCESS" title="Thoughts &" accent="stories." description="Project breakdowns, frontend notes, design ideas and lessons collected while building for the web.">
    <div className="blog-tools"><label className="blog-search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search articles…"/></label><div className="blog-filters">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={category === c ? "filter-active" : ""}>{c}</button>)}</div></div>
    <div className="blog-count">{filtered.length} ARTICLES <span>·</span> A GROWING NOTEBOOK</div>
    <div className="blog-grid">{filtered.map((post,i) => <article className={post.featured ? "blog-card blog-featured" : "blog-card"} key={post.title}>
      <div className="blog-card-art"><span>{String(i+1).padStart(2,"0")}</span><div className="blog-art-orb"/><small>{post.category.toUpperCase()}</small></div>
      <div className="blog-card-copy"><div className="blog-meta">{post.date} <span>·</span> {post.read} READ</div><h2>{post.title}</h2><p>{post.excerpt}</p>{post.soon ? <span className="blog-coming">ARTICLE COMING SOON</span> : <a className="page-inline-link" href="/blog/how-i-built-my-portfolio">Read article <ArrowUpRight size={15}/></a>}</div>
    </article>)}</div>
  </PageFrame>;
}

function ArticlePage() {
  const sections = [
    ["Starting with the idea", "I wanted a portfolio that felt like a small digital studio rather than a plain list of skills. The visual direction came first: a focused palette, expressive typography and a clear rhythm between sections."],
    ["Building the structure", "I split the experience into reusable sections for the introduction, selected work, about, services and contact. Keeping the structure predictable made it easier to refine each part."],
    ["Design tokens and contrast", "A small set of colours, spacing values and type styles helps every section feel related. Contrast and readable type matter just as much as visual polish."],
    ["Motion with purpose", "Animations should support hierarchy, not compete with the content. Lightweight transitions and reveal effects make the page feel alive without adding unnecessary work."],
    ["Deployment and iteration", "Deployment is not the finish line. Testing on real devices, checking accessibility and reviewing performance help turn a visual concept into a useful website."],
  ];
  return <PageFrame eyebrow="FIELD NOTES / 01" title="How I built my" accent="portfolio." description="A look at the thinking, structure and iterations behind a personal developer website.">
    <article className="article-layout"><div className="article-main"><div className="article-cover"><div className="article-cover-orb"/><span>DESIGN × DEVELOPMENT</span></div><div className="article-meta">JUNE 15, 2025 <span>·</span> 8 MIN READ <span>·</span> SANDY CODER</div><p className="article-lead">A portfolio is more than a place to put projects. It is a chance to show how you think, what you care about and how you turn ideas into experiences.</p>{sections.map(([title,body],i)=><section className="article-section" id={`article-${i}`} key={title}><span>0{i+1} / NOTE</span><h2>{title}</h2><p>{body}</p></section>)}<div className="article-end"><Sparkles/><p>Thanks for reading. More build notes and practical experiments are on the way.</p><a className="page-inline-link" href="/blog">Back to all articles <ArrowRight size={15}/></a></div></div><aside className="article-aside"><span>IN THIS ARTICLE</span>{sections.map(([title],i)=><a href={`#article-${i}`} key={title}>{String(i+1).padStart(2,"0")} · {title}</a>)}</aside></article>
  </PageFrame>;
}

function LegalPage({ page }) {
  return <PageFrame eyebrow={page.eyebrow} title={page.title} accent=".">
    <section className="legal-content"><div className="legal-copy">{page.body}</div><div className="legal-links">{page.links.map(([label,url])=><a key={url} href={url}>{label}<ArrowUpRight size={15}/></a>)}</div><p className="legal-updated">LAST REVIEWED · NOVEMBER 2026</p></section>
  </PageFrame>;
}

export default function SitePages() {
  const { pathname } = useLocation();
  const rawPath = pathname.replace(/\/$/, "") || "/";
  const aliases = {
    "/legal/about.html": "/legal/about", "/legal/contact.html": "/legal/contact",
    "/legal/services.html": "/legal/services", "/legal/privacy-policy.html": "/legal/privacy-policy",
    "/legal/terms.html": "/legal/terms", "/legal/refund-policy.html": "/legal/refund-policy",
    "/about": "/legal/about", "/services": "/legal/services", "/privacy": "/legal/privacy-policy",
    "/privacy-policy": "/legal/privacy-policy", "/terms": "/legal/terms", "/refund": "/legal/refund-policy",
    "/refund-policy": "/legal/refund-policy", "/legal": "/legal/about"
  };
  const path = aliases[rawPath] || rawPath;
  let page = null;
  if (path === "/contact" || path === "/getintouch" || path === "/getintouch/index.html") page = <ContactPage/>;
  else if (path === "/support" || path === "/support/index.html") page = <SupportPage/>;
  else if (path === "/blog" || path === "/blog/index.html") page = <BlogPage/>;
  else if (path === "/blog/how-i-built-my-portfolio" || path === "/blog/posts/post-1/how-i-built-my-portfolio.html") page = <ArticlePage/>;
  else if (legalPages[path]) page = <LegalPage page={legalPages[path]}/>;
  else if (path.startsWith("/legal/")) page = <LegalPage page={legalPages["/legal/about"]}/>;
  useEffect(() => { if (page) document.title = (path.split("/").filter(Boolean).pop() || "Sandy Coder") + " — Sandy Coder"; }, [path]);
  return page;
}
