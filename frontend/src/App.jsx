import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import {
  ArrowUp,
  Award,
  Briefcase,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Music4,
  Phone,
  Send,
  Sun,
  X,
} from 'lucide-react';
import { getProfile } from './services/profileService';
import { getProjects, createProject, updateProject, deleteProject } from './services/projectService';
import { getExperience } from './services/experienceService';
import { getEducation } from './services/educationService';
import { getCertificates } from './services/certificateService';
import { getSkills } from './services/skillService';
import { getMessages, createMessage, updateMessageStatus, deleteMessage } from './services/messageService';
import { getSiteSettings, updateSiteSettings } from './services/settingsService';

const profileImagePath = '/profile-photo.png.jpeg';
const resumePath = '/assets/resume.pdf';

const defaultProfile = {
  name: 'Prakash Chaurasia',
  headline: 'B.Tech CSE | Software Developer',
  bio: 'B.Tech CSE student and software developer focused on Java, Full Stack Development, React, Spring Boot, JavaScript, REST APIs, SQL and modern web technologies.',
  email: 'prakashchaurasia959@gmail.com',
  phone: '9369962154',
  location: 'Kushinagar, Uttar Pradesh, India',
  github: 'https://github.com/PrakashChaurasia959',
  github_url: 'https://github.com/PrakashChaurasia959',
  linkedin: 'https://linkedin.com/in/prakash-chaurasia-a629132a1/',
  linkedin_url: 'https://linkedin.com/in/prakash-chaurasia-a629132a1/',
  profileImage: profileImagePath,
  profile_image_url: profileImagePath,
  avatar: profileImagePath,
  resume_url: resumePath,
};

const defaultProjects = [
  {
    id: 'project-1',
    title: 'Used Car Price Prediction',
    description: 'A real used-car price prediction web app built with a machine learning model and a FastAPI + React stack for practical vehicle valuation.',
    technologies: ['Python', 'Machine Learning', 'FastAPI', 'React', 'Vite'],
    live_url: 'https://used-car-price-prediction-project-4.onrender.com',
    github_url: 'https://github.com/PrakashChaurasia959/Used-Car-Price-Prediction',
    featured: true,
    sort_order: 1,
  },
  {
    id: 'project-2',
    title: 'Shramik-Seva Portal',
    description: 'A service-oriented platform focused on accessible labour and service support journeys, designed with a responsive React experience.',
    technologies: ['React', 'JavaScript', 'Supabase', 'Vite'],
    live_url: 'https://shramik-seva-portal-fqnu.vercel.app',
    github_url: '',
    featured: true,
    sort_order: 2,
  },
];

const defaultExperience = [
  {
    id: 'exp-1',
    role: 'Full Stack MERN Intern',
    company: 'UPTEC',
    start_date: '09 Sep 2025',
    end_date: '29 Nov 2025',
    description: 'Worked on full stack development tasks during the internship period.',
  },
  {
    id: 'exp-2',
    role: 'Summer Internship 2026',
    company: 'Cyvanta',
    start_date: '02 Aug 2026',
    end_date: '02 Aug 2026',
    description: 'Summer internship experience in 2026.',
  },
];

const defaultEducation = [
  {
    id: 'edu-1',
    institution: 'Bansal Institute of Engineering & Technology (BIET), Lucknow',
    degree: 'B.Tech CSE',
    start_year: 2023,
    end_year: 2027,
    location: 'Lucknow, Uttar Pradesh, India',
  },
];

const defaultCertificates = [
  {
    id: 'cert-1',
    title: 'UPTEC Full Stack MERN Internship',
    issuer: 'UPTEC',
    issue_date: '28 Apr 2026',
    description: 'Completed internship training in full stack development.',
  },
  {
    id: 'cert-2',
    title: 'Angels Foundation — 7-Day AI Class',
    issuer: 'Angels Foundation',
    issue_date: '28 Apr 2026',
    description: 'Completed a 7-day AI learning program.',
  },
  {
    id: 'cert-3',
    title: 'Cyvanta Summer Internship 2026',
    issuer: 'Cyvanta',
    issue_date: '02 Aug 2026',
    description: 'Summer internship ceremony and completion.',
  },
];

const defaultSkillGroups = [
  { category: 'Programming', items: ['Java', 'JavaScript', 'Python'] },
  { category: 'Frontend', items: ['HTML', 'CSS', 'React', 'Vite'] },
  { category: 'Backend', items: ['Spring Boot', 'Node.js', 'Express.js', 'FastAPI', 'REST API'] },
  { category: 'Database', items: ['SQL', 'MySQL', 'Supabase'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'VS Code'] },
  { category: 'Other', items: ['Machine Learning', 'OpenCV', 'MediaPipe'] },
];

const defaultSiteSettings = {
  site_name: 'Prakash Chaurasia',
  site_description: 'Portfolio of Prakash Chaurasia, B.Tech CSE Software Developer focused on Java, Full Stack Development, React and modern software technologies.',
  hero_title: 'Prakash Chaurasia',
  hero_subtitle: 'B.Tech CSE | Software Developer',
  resume_url: resumePath,
  profile_image_url: profileImagePath,
  email: 'prakashchaurasia959@gmail.com',
  phone: '9369962154',
  linkedin_url: 'https://linkedin.com/in/prakash-chaurasia-a629132a1/',
  github_url: 'https://github.com/PrakashChaurasia959',
};

const roleList = ['Software Developer', 'Java Developer', 'Full Stack Developer', 'Web Developer', 'Software Engineer'];

const profileFallbackImage = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0a0a0a"/>
        <stop offset="100%" stop-color="#3d0a16"/>
      </linearGradient>
    </defs>
    <rect width="640" height="640" fill="url(#bg)" rx="36"/>
    <circle cx="320" cy="228" r="120" fill="#f4f4f5" fill-opacity="0.9"/>
    <path d="M200 520c20-96 92-148 120-148s100 52 120 148" fill="#f4f4f5" fill-opacity="0.9"/>
    <text x="320" y="582" font-size="28" text-anchor="middle" fill="#fca5a5" font-family="Segoe UI, Arial, sans-serif">Profile</text>
  </svg>
`)}`;

function Toast({ toast, onClose }) {
  if (!toast.text) return null;

  return (
    <div className={`toast toast-${toast.type}`} role="status">
      <span>{toast.text}</span>
      <button type="button" onClick={onClose} aria-label="Close notification">×</button>
    </div>
  );
}

function SectionTitle({ eyebrow, title, align = 'left' }) {
  return (
    <div className={`section-heading ${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

function Navbar({ theme, onToggleTheme, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navLinks = [
    { label: 'Home', to: '#home' },
    { label: 'About', to: '#about' },
    { label: 'Skills', to: '#skills' },
    { label: 'Projects', to: '#projects' },
    { label: 'Experience', to: '#experience' },
    { label: 'Education', to: '#education' },
    { label: 'Certificates', to: '#certificates' },
    { label: 'Resume', to: '#resume' },
    { label: 'Contact', to: '#contact' },
  ];

  return (
    <header className="topbar">
      <nav className="nav container" aria-label="Main navigation">
        <a href="#home" className="brand" aria-label="Prakash Chaurasia home">
          Prakash Chaurasia
        </a>

        <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.to} onClick={() => setIsMobileMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a href={defaultProfile.github} target="_blank" rel="noreferrer" className="icon-button" aria-label="GitHub profile">
            <Github size={16} />
          </a>
          <a href={defaultProfile.linkedin} target="_blank" rel="noreferrer" className="icon-button" aria-label="LinkedIn profile">
            <Linkedin size={16} />
          </a>
          <a href="https://www.instagram.com/prakashchaurasia.dev?stkn=MWc2cWMzdG1pejk4Yg==" target="_blank" rel="noreferrer" className="icon-button" aria-label="Instagram profile">
            <Instagram size={16} />
          </a>
          <button type="button" className="icon-button" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button type="button" className="menu-button" onClick={() => setIsMobileMenuOpen((value) => !value)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>Prakash Chaurasia</h3>
          <p>B.Tech CSE | Software Developer</p>
        </div>
        <div className="footer-links">
          <a href={defaultProfile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={defaultProfile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/prakashchaurasia.dev?stkn=MWc2cWMzdG1pejk4Yg==" target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <p>© 2026 Prakash Chaurasia. All rights reserved.</p>
      </div>
    </footer>
  );
}

function PublicPortfolioPage({ profile, projects, experience, education, certificates, skills, siteSettings, theme, onToggleTheme, setToast }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 220);

      const sections = document.querySelectorAll('section[id]');
      let current = 'home';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setToast({ type: 'error', text: 'Please complete name, email and message fields.' });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setToast({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (formData.message.trim().length < 10) {
      setToast({ type: 'error', text: 'Message should be at least 10 characters long.' });
      return;
    }

    try {
      setSubmitting(true);
      await createMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: 'Portfolio inquiry',
        message: formData.message.trim(),
      });
      setFormData({ name: '', email: '', message: '' });
      setToast({ type: 'success', text: 'Your message has been sent successfully.' });
    } catch (error) {
      setToast({ type: 'error', text: error.message || 'Unable to send message.' });
    } finally {
      setSubmitting(false);
    }
  };

  const resumeUrl = siteSettings?.resume_url || resumePath;
  const techBadges = ['Java', 'React', 'Spring Boot', 'JavaScript', 'SQL', 'Git', 'GitHub'];

  return (
    <>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="scroll-progress-bar" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      <main className="page-shell">
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="hero-badge">Open to Software Developer Opportunities</span>
              <p className="hero-intro">Hi, I&apos;m</p>
              <h1>{profile.name}</h1>
              <h2>{profile.headline}</h2>
              <div className="role-tags" aria-live="polite">
                {roleList.map((role, index) => (
                  <span key={role} className={index === 0 ? 'role-tag active' : 'role-tag'}>{role}</span>
                ))}
              </div>
              <p className="hero-description">{profile.bio}</p>

              <div className="hero-actions">
                <a href="#projects" className="button primary">
                  View My Projects <ArrowUp size={16} className="rotate-up" />
                </a>
                <a href={resumeUrl} target="_blank" rel="noreferrer" className="button secondary" download="Prakash-Chaurasia-Resume.pdf">
                  <Download size={16} /> Download Resume
                </a>
                <a href="#contact" className="button ghost">
                  Contact Me
                </a>
              </div>

              <div className="hero-socials">
                <a href={profile.github_url || profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github size={18} />
                </a>
                <a href={profile.linkedin_url || profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.instagram.com/prakashchaurasia.dev?stkn=MWc2cWMzdG1pejk4Yg==" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="glow-ring ring-one" aria-hidden="true" />
              <div className="glow-ring ring-two" aria-hidden="true" />
              <div className="portrait-frame">
                <div className="portrait-wrap">
                  <img
                    src={profile.profile_image_url || profile.profileImage || profile.avatar || profileImagePath}
                    alt="Prakash Chaurasia - Software Developer"
                    className="profile-portrait"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = profileFallbackImage;
                    }}
                  />
                </div>
              </div>

              <div className="tech-badges" aria-label="Technology stack badges">
                {techBadges.map((item, index) => (
                  <span key={item} className={`floating-badge badge-${index + 1}`}>{item}</span>
                ))}
              </div>

              <div className="floating-card stat-one">
                <Code2 size={18} />
                <div>
                  <strong>Java</strong>
                  <span>Core backend</span>
                </div>
              </div>

              <div className="floating-card stat-two">
                <Briefcase size={18} />
                <div>
                  <strong>Full Stack</strong>
                  <span>React + Spring Boot</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section alt-section">
          <div className="container">
            <SectionTitle eyebrow="About" title="About Me" />
            <div className="about-grid">
              <div className="about-copy">
                <div className="about-photo-frame">
                  <img
                    src={profile.profile_image_url || profile.profileImage || profile.avatar || profileImagePath}
                    alt="Prakash Chaurasia"
                    className="about-portrait"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = profileFallbackImage;
                    }}
                  />
                </div>
                <p>
                  I am a <strong>B.Tech CSE</strong> student and <strong>Software Developer</strong> focused on <strong>Java</strong>, <strong>Full Stack Development</strong>, <strong>React</strong>, <strong>Spring Boot</strong>, <strong>JavaScript</strong>, <strong>REST APIs</strong>, <strong>SQL</strong>, and <strong>Supabase</strong>.
                </p>
                <p>
                  I enjoy building practical, responsive and scalable web applications with modern tools and a strong focus on clean engineering.
                </p>
              </div>

              <div className="info-grid">
                <div className="mini-card">
                  <span className="label">Education</span>
                  <strong>B.Tech CSE</strong>
                </div>
                <div className="mini-card">
                  <span className="label">College</span>
                  <strong>BIET Lucknow</strong>
                </div>
                <div className="mini-card">
                  <span className="label">Graduation</span>
                  <strong>2027</strong>
                </div>
                <div className="mini-card">
                  <span className="label">Location</span>
                  <strong>{profile.location}</strong>
                </div>
                <div className="mini-card wide">
                  <span className="label">Focus</span>
                  <strong>Java • Full Stack • React • Spring Boot</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <SectionTitle eyebrow="Skills" title="Technologies I work with" />
            <div className="skills-grid">
              {skills.map((group) => (
                <div className="skill-card" key={group.category || group.name}>
                  <h3>{group.category}</h3>
                  <ul>
                    {group.items.map((skill) => (
                      <li key={skill} className={skill === 'Java' ? 'java-highlight' : ''}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section alt-section">
          <div className="container">
            <SectionTitle eyebrow="Projects" title="Selected Work" />
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.id || project.title}>
                  <div className="project-visual">
                    <span className="project-badge">Featured</span>
                    <span className="project-visual-label">{project.title}</span>
                  </div>
                  <div className="project-body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tag-list">
                      {(project.technologies || []).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.live_url ? (
                        <a href={project.live_url} target="_blank" rel="noreferrer">
                          Live Demo <ExternalLink size={14} />
                        </a>
                      ) : null}
                      {project.github_url ? (
                        <a href={project.github_url} target="_blank" rel="noreferrer">
                          GitHub <Github size={14} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <SectionTitle eyebrow="Experience" title="Professional Journey" />
            <div className="timeline">
              {experience.map((item) => (
                <div className="timeline-item" key={item.id || item.company || item.role}>
                  <span className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-content">
                    <h3>{item.role}</h3>
                    <p className="timeline-company">{item.company}</p>
                    <p className="timeline-date">{item.start_date} – {item.end_date}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section alt-section">
          <div className="container">
            <SectionTitle eyebrow="Education" title="Academic Background" />
            <div className="education-box">
              {education.map((item) => (
                <div key={item.id || item.degree} className="edu-card">
                  <GraduationCap size={28} />
                  <h3>{item.degree}</h3>
                  <p>{item.institution}</p>
                  <p><strong>Expected Graduation:</strong> {item.end_year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="certificates" className="section">
          <div className="container">
            <SectionTitle eyebrow="Certificates" title="Recognitions & Learning" />
            <div className="certificate-grid">
              {certificates.map((certificate) => (
                <article className="certificate-card" key={certificate.id || certificate.title}>
                  <Award size={24} />
                  <h3>{certificate.title}</h3>
                  <p>{certificate.issue_date}</p>
                  <span>{certificate.description}</span>
                  <button type="button" className="certificate-button" onClick={() => setSelectedCertificate(certificate)}>
                    Preview <ChevronRight size={14} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt-section">
          <div className="container">
            <div className="favorite-song-card">
              <div className="song-badge">
                <Music4 size={18} />
              </div>
              <div>
                <span className="eyebrow">Favorite Song</span>
                <h3>Mera Intkam Dekhegi</h3>
              </div>
            </div>
          </div>
        </section>

        <section id="resume" className="section">
          <div className="container center-box">
            <SectionTitle eyebrow="Resume" title="My Resume" align="center" />
            <div className="resume-summary">
              <p>Download my latest resume to learn more about my education, technical skills, project work and professional journey.</p>
              <div className="resume-actions">
                <a href={resumeUrl} target="_blank" rel="noreferrer" className="button primary">
                  <FileText size={18} /> View Resume
                </a>
                <a href={resumeUrl} className="button secondary" download="Prakash-Chaurasia-Resume.pdf">
                  <Download size={18} /> Download Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contact-grid">
            <div>
              <SectionTitle eyebrow="Contact" title="Let&apos;s Connect" />
              <div className="contact-list">
                <p><Mail size={16} /> <a href={`mailto:${profile.email || 'prakashchaurasia959@gmail.com'}`}>{profile.email || 'prakashchaurasia959@gmail.com'}</a></p>
                <p><Phone size={16} /> <a href={`tel:${(profile.phone || '9369962154').replace(/\D/g, '')}`}>{profile.phone || '9369962154'}</a></p>
                <p><MapPin size={16} /> {profile.location}</p>
                <div className="contact-socials">
                  <a href={profile.github_url || profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
                  <a href={profile.linkedin_url || profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
                  <a href="https://www.instagram.com/prakashchaurasia.dev?stkn=MWc2cWMzdG1pejk4Yg==" target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="field-group">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required aria-label="Name" />
              </div>
              <div className="field-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required aria-label="Email" />
              </div>
              <div className="field-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} required aria-label="Message" />
              </div>
              <button type="submit" className="button primary" disabled={submitting}>
                <Send size={16} /> {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <button type="button" className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        <ArrowUp size={18} />
      </button>

      {selectedCertificate ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedCertificate.title} onClick={() => setSelectedCertificate(null)}>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox-close" onClick={() => setSelectedCertificate(null)} aria-label="Close preview">
              <X size={18} />
            </button>
            <span className="eyebrow">Certificate</span>
            <h3>{selectedCertificate.title}</h3>
            <p>{selectedCertificate.issuer}</p>
            <p><strong>Issue Date:</strong> {selectedCertificate.issue_date}</p>
            <p>{selectedCertificate.description}</p>
          </div>
        </div>
      ) : null}

      <Footer />
    </>
  );
}

function AdminLoginPage({ setIsAuthenticated, setToast, navigate }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { supabase } = await import('./lib/supabase');
      if (!supabase) throw new Error('Supabase is not configured. Add the env values first.');
      const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
      if (error) throw error;
      setIsAuthenticated(true);
      setToast({ type: 'success', text: 'Admin login successful.' });
      navigate('/admin/dashboard');
    } catch (error) {
      setToast({ type: 'error', text: error.message || 'Login failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-shell">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit} className="stack-form">
          <div className="field-group">
            <label htmlFor="admin-email">Email</label>
            <input id="admin-email" type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="field-group">
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="button primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

function AdminDashboardPage({ setIsAuthenticated, setToast }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState(defaultSiteSettings);
  const [resumeUrl, setResumeUrl] = useState('');
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    live_url: '',
    github_url: '',
    featured: false,
    sort_order: 0,
  });
  const [editingProjectId, setEditingProjectId] = useState('');
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const [profileData, projectData, certificateData, messageData, settingsData] = await Promise.all([
        getProfile().catch(() => defaultProfile),
        getProjects().catch(() => defaultProjects),
        getCertificates().catch(() => defaultCertificates),
        getMessages().catch(() => []),
        getSiteSettings().catch(() => defaultSiteSettings),
      ]);

      setProjects(projectData || defaultProjects);
      setCertificates(certificateData || defaultCertificates);
      setMessages(messageData || []);
      setSettings(settingsData || defaultSiteSettings);
      setResumeUrl(settingsData?.resume_url || profileData?.resume_url || '');
    } catch (error) {
      setToast({ type: 'error', text: error.message || 'Unable to load dashboard data.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleProjectInput = (event) => {
    const { name, value, type, checked } = event.target;
    setProjectForm((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        title: projectForm.title,
        description: projectForm.description,
        technologies: projectForm.technologies.split(',').map((item) => item.trim()).filter(Boolean),
        live_url: projectForm.live_url,
        github_url: projectForm.github_url,
        featured: projectForm.featured,
        sort_order: Number(projectForm.sort_order) || 0,
      };

      if (editingProjectId) {
        await updateProject(editingProjectId, payload);
        setToast({ type: 'success', text: 'Project updated successfully.' });
      } else {
        await createProject(payload);
        setToast({ type: 'success', text: 'Project created successfully.' });
      }

      setProjectForm({ title: '', description: '', technologies: '', live_url: '', github_url: '', featured: false, sort_order: 0 });
      setEditingProjectId('');
      loadDashboard();
    } catch (error) {
      setToast({ type: 'error', text: error.message || 'Unable to save project.' });
    }
  };

  const handleEditProject = (project) => {
    setEditingProjectId(project.id || project._id);
    setProjectForm({
      title: project.title,
      description: project.description || project.short_description,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      live_url: project.live_url || project.liveUrl || '',
      github_url: project.github_url || project.githubUrl || '',
      featured: Boolean(project.featured),
      sort_order: project.sort_order || project.order || 0,
    });
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setToast({ type: 'success', text: 'Project deleted.' });
      loadDashboard();
    } catch (error) {
      setToast({ type: 'error', text: error.message || 'Unable to delete project.' });
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateMessageStatus(id, status);
      setToast({ type: 'success', text: 'Message status updated.' });
      loadDashboard();
    } catch (error) {
      setToast({ type: 'error', text: error.message || 'Unable to update status.' });
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await deleteMessage(id);
      setToast({ type: 'success', text: 'Message deleted.' });
      loadDashboard();
    } catch (error) {
      setToast({ type: 'error', text: error.message || 'Unable to delete message.' });
    }
  };

  const handleSettingsChange = async (event) => {
    event.preventDefault();
    try {
      const update = await updateSiteSettings(settings);
      setSettings(update || settings);
      setToast({ type: 'success', text: 'Site settings updated.' });
    } catch (error) {
      setToast({ type: 'error', text: error.message || 'Unable to update settings.' });
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setToast({ type: 'error', text: 'Upload a valid PDF resume file.' });
      return;
    }

    try {
      const { supabase } = await import('./lib/supabase');
      if (!supabase) throw new Error('Supabase is not configured.');
      const fileName = `resume-${Date.now()}.pdf`;
      const { data, error } = await supabase.storage.from('resumes').upload(fileName, file, { upsert: true });
      if (error) throw error;
      const publicUrl = supabase.storage.from('resumes').getPublicUrl(data.path).data.publicUrl;
      const updatedSettings = await updateSiteSettings({ ...settings, resume_url: publicUrl });
      setSettings(updatedSettings || { ...settings, resume_url: publicUrl });
      setResumeUrl(publicUrl);
      setToast({ type: 'success', text: 'Resume uploaded successfully.' });
    } catch (error) {
      setToast({ type: 'error', text: error.message || 'Unable to upload resume.' });
    }
  };

  const handleLogout = async () => {
    try {
      const { supabase } = await import('./lib/supabase');
      if (supabase) {
        await supabase.auth.signOut();
      }
      setIsAuthenticated(false);
      setToast({ type: 'success', text: 'Logged out successfully.' });
      navigate('/admin/login');
    } catch (error) {
      setToast({ type: 'error', text: error.message || 'Logout failed.' });
    }
  };

  if (loading) return <div className="loading-grid">Loading dashboard...</div>;

  const unreadCount = messages.filter((message) => message.status === 'new').length;

  return (
    <div className="admin-shell dashboard-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Prakash Portfolio</div>
        <nav className="admin-nav">
          <a href="#dashboard">Dashboard</a>
          <a href="#projects-admin">Projects</a>
          <a href="#messages-admin">Messages</a>
          <a href="#resume-admin">Resume</a>
          <a href="#settings-admin">Settings</a>
        </nav>
        <button type="button" className="button ghost" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="admin-content">
        <section id="dashboard" className="stats-grid">
          <div className="stat-box">
            <span>Total Projects</span>
            <strong>{projects.length}</strong>
          </div>
          <div className="stat-box">
            <span>Total Certificates</span>
            <strong>{certificates.length}</strong>
          </div>
          <div className="stat-box">
            <span>Total Messages</span>
            <strong>{messages.length}</strong>
          </div>
          <div className="stat-box accent">
            <span>Unread Messages</span>
            <strong>{unreadCount}</strong>
          </div>
        </section>

        <section id="projects-admin" className="admin-panel">
          <div className="panel-header">
            <h2>Projects</h2>
          </div>
          <form className="stack-form" onSubmit={handleProjectSubmit}>
            <div className="field-row">
              <div className="field-group">
                <label>Project Title</label>
                <input name="title" value={projectForm.title} onChange={handleProjectInput} required />
              </div>
              <div className="field-group">
                <label>Sort Order</label>
                <input type="number" name="sort_order" value={projectForm.sort_order} onChange={handleProjectInput} />
              </div>
            </div>
            <div className="field-group">
              <label>Description</label>
              <textarea name="description" rows="4" value={projectForm.description} onChange={handleProjectInput} required />
            </div>
            <div className="field-group">
              <label>Technologies</label>
              <input name="technologies" value={projectForm.technologies} onChange={handleProjectInput} placeholder="React, JavaScript, Supabase" />
            </div>
            <div className="field-row">
              <div className="field-group">
                <label>Live URL</label>
                <input name="live_url" value={projectForm.live_url} onChange={handleProjectInput} />
              </div>
              <div className="field-group">
                <label>GitHub URL</label>
                <input name="github_url" value={projectForm.github_url} onChange={handleProjectInput} />
              </div>
            </div>
            <div className="field-group checkbox-row">
              <label>
                <input type="checkbox" name="featured" checked={projectForm.featured} onChange={handleProjectInput} />
                Featured project
              </label>
            </div>
            <button type="submit" className="button primary">{editingProjectId ? 'Update Project' : 'Create Project'}</button>
          </form>

          <div className="list-stack">
            {projects.map((project) => (
              <div className="row-card" key={project.id || project._id || project.title}>
                <div>
                  <h3>{project.title}</h3>
                  <p>{(project.description || project.short_description || '').slice(0, 80)}...</p>
                </div>
                <div className="row-actions">
                  <button type="button" onClick={() => handleEditProject(project)}>Edit</button>
                  <button type="button" className="danger" onClick={() => handleDeleteProject(project.id || project._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="messages-admin" className="admin-panel">
          <div className="panel-header">
            <h2>Messages</h2>
          </div>
          <div className="list-stack">
            {messages.map((message) => (
              <div className="message-card" key={message.id || message._id}>
                <div>
                  <strong>{message.name}</strong>
                  <p>{message.email}</p>
                  <p>{message.message}</p>
                  <small>{new Date(message.created_at || message.createdAt).toLocaleString()}</small>
                </div>
                <div className="row-actions vertical">
                  <select value={message.status} onChange={(event) => handleStatusChange(message.id || message._id, event.target.value)}>
                    <option value="new">new</option>
                    <option value="read">read</option>
                    <option value="replied">replied</option>
                  </select>
                  <button type="button" className="danger" onClick={() => handleDeleteMessage(message.id || message._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="resume-admin" className="admin-panel">
          <div className="panel-header">
            <h2>Resume</h2>
          </div>
          <input type="file" accept="application/pdf" onChange={handleResumeUpload} />
          {resumeUrl ? (
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="resume-link">
              View current resume
            </a>
          ) : null}
        </section>

        <section id="settings-admin" className="admin-panel">
          <div className="panel-header">
            <h2>Site Settings</h2>
          </div>
          <form className="stack-form" onSubmit={handleSettingsChange}>
            <div className="field-row">
              <div className="field-group">
                <label>Site Name</label>
                <input value={settings.site_name || ''} onChange={(event) => setSettings({ ...settings, site_name: event.target.value })} />
              </div>
              <div className="field-group">
                <label>Hero Title</label>
                <input value={settings.hero_title || ''} onChange={(event) => setSettings({ ...settings, hero_title: event.target.value })} />
              </div>
            </div>
            <div className="field-group">
              <label>Hero Subtitle</label>
              <textarea rows="3" value={settings.hero_subtitle || ''} onChange={(event) => setSettings({ ...settings, hero_subtitle: event.target.value })} />
            </div>
            <div className="field-row">
              <div className="field-group">
                <label>Email</label>
                <input value={settings.email || ''} onChange={(event) => setSettings({ ...settings, email: event.target.value })} />
              </div>
              <div className="field-group">
                <label>Phone</label>
                <input value={settings.phone || ''} onChange={(event) => setSettings({ ...settings, phone: event.target.value })} />
              </div>
            </div>
            <div className="field-row">
              <div className="field-group">
                <label>GitHub</label>
                <input value={settings.github_url || settings.github || ''} onChange={(event) => setSettings({ ...settings, github_url: event.target.value })} />
              </div>
              <div className="field-group">
                <label>LinkedIn</label>
                <input value={settings.linkedin_url || settings.linkedin || ''} onChange={(event) => setSettings({ ...settings, linkedin_url: event.target.value })} />
              </div>
            </div>
            <button type="submit" className="button primary">Save Settings</button>
          </form>
        </section>
      </main>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('portfolio-theme') || 'dark' : 'dark'));
  const [toast, setToast] = useState({ type: 'success', text: '' });
  const [profile, setProfile] = useState(defaultProfile);
  const [projects, setProjects] = useState(defaultProjects);
  const [experience, setExperience] = useState(defaultExperience);
  const [education, setEducation] = useState(defaultEducation);
  const [certificates, setCertificates] = useState(defaultCertificates);
  const [skills, setSkills] = useState(defaultSkillGroups);
  const [siteSettings, setSiteSettings] = useState(defaultSiteSettings);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dataset.theme = theme;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('portfolio-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    const loadPublicData = async () => {
      try {
        const [profileResponse, projectResponse, experienceResponse, educationResponse, certificateResponse, skillsResponse, settingsResponse] = await Promise.all([
          getProfile().catch(() => defaultProfile),
          getProjects().catch(() => defaultProjects),
          getExperience().catch(() => defaultExperience),
          getEducation().catch(() => defaultEducation),
          getCertificates().catch(() => defaultCertificates),
          getSkills().catch(() => defaultSkillGroups),
          getSiteSettings().catch(() => defaultSiteSettings),
        ]);

        setProfile({ ...defaultProfile, ...(profileResponse || {}) });
        setProjects(projectResponse && projectResponse.length ? projectResponse : defaultProjects);
        setExperience(experienceResponse && experienceResponse.length ? experienceResponse : defaultExperience);
        setEducation(educationResponse && educationResponse.length ? educationResponse : defaultEducation);
        setCertificates(certificateResponse && certificateResponse.length ? certificateResponse : defaultCertificates);
        setSkills(skillsResponse && skillsResponse.length ? skillsResponse : defaultSkillGroups);
        setSiteSettings({ ...defaultSiteSettings, ...(settingsResponse || {}) });
      } catch {
        setToast({ type: 'error', text: 'Supabase is not configured yet. Using portfolio defaults until it is connected.' });
      } finally {
        setIsReady(true);
      }
    };

    loadPublicData();
  }, []);

  useEffect(() => {
    if (!toast.text) return undefined;
    const timer = setTimeout(() => setToast({ type: 'success', text: '' }), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { supabase } = await import('./lib/supabase');
        if (!supabase) {
          setIsAuthenticated(false);
          return;
        }
        const { data } = await supabase.auth.getSession();
        setIsAuthenticated(Boolean(data.session));
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const onToggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  if (!isReady) {
    return <div className="loading-grid">Loading portfolio...</div>;
  }

  return (
    <>
      <Toast toast={toast} onClose={() => setToast({ type: 'success', text: '' })} />
      <Routes>
        <Route
          path="/"
          element={
            <PublicPortfolioPage
              profile={profile}
              projects={projects}
              experience={experience}
              education={education}
              certificates={certificates}
              skills={skills}
              siteSettings={siteSettings}
              theme={theme}
              onToggleTheme={onToggleTheme}
              setToast={setToast}
            />
          }
        />
        <Route
          path="/admin/login"
          element={<AdminLoginPage setIsAuthenticated={setIsAuthenticated} setToast={setToast} navigate={navigate} />}
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdminDashboardPage setIsAuthenticated={setIsAuthenticated} setToast={setToast} />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
