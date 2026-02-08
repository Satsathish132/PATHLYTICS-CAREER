import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Career Recommendation', path: '/career-recommendation' },
    { name: 'Career Roadmaps', path: '/roadmaps' },
    { name: 'Career Chatbot', path: '/chatbot' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const resources = [
    { name: 'Blog', path: '#' },
    { name: 'Career Tips', path: '#' },
    { name: 'Industry Insights', path: '#' },
    { name: 'Success Stories', path: '#' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-display font-bold text-xl">
                PATHLYTICS<span className="text-primary">-CAREER</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Empowering Computer Science students and job seekers with AI-powered career guidance, 
              personalized roadmaps, and expert mentorship.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-background/70 group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@pathlytics.career</span>
              </li>
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 7358507075</span>
              </li>
              <li className="flex items-start gap-3 text-background/70 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>peri institute of technology</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {currentYear} PATHLYTICS-CAREER. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-background/50 hover:text-background text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-background/50 hover:text-background text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-background/50 hover:text-background text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
