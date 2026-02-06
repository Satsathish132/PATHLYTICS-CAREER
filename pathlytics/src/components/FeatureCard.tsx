import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  gradient?: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, path, gradient, delay = 0 }: FeatureCardProps) => {
  return (
    <Link
      to={path}
      className="feature-card group block animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon Container */}
      <div
        className={cn(
          'w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110',
          gradient || 'bg-gradient-primary'
        )}
      >
        <Icon className="w-8 h-8 text-primary-foreground" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Arrow indicator */}
      <div className="mt-6 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Explore</span>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};

export default FeatureCard;
