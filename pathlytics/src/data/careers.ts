 import { Code, Database, Cloud, Brain, Shield } from 'lucide-react';
 
 export interface RoadmapStep {
   id: number;
   title: string;
   description: string;
   duration: string;
   skills: string[];
   resources: { name: string; url: string }[];
 }
 
 export interface Roadmap {
   id: string;
   title: string;
   icon: React.ComponentType<{ className?: string }>;
   description: string;
   color: string;
   skills: string[];
   salary: string;
   growth: string;
   demand: 'High' | 'Very High' | 'Growing';
   category: string;
   steps: RoadmapStep[];
 }
 
 export const roadmaps: Roadmap[] = [
   {
     id: 'frontend',
     title: 'Frontend Developer',
     icon: Code,
     description: 'Master modern frontend technologies and build beautiful user interfaces.',
     color: 'bg-blue-500',
     skills: ['JavaScript', 'React', 'TypeScript', 'CSS', 'HTML'],
     salary: '$70k - $130k',
     growth: '+23%',
     demand: 'High',
     category: 'Web Development',
     steps: [
       {
         id: 1,
         title: 'HTML & CSS Fundamentals',
         description: 'Learn the building blocks of web development with semantic HTML and modern CSS.',
         duration: '4-6 weeks',
         skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design'],
         resources: [
           { name: 'MDN Web Docs', url: '#' },
           { name: 'freeCodeCamp', url: '#' },
         ],
       },
       {
         id: 2,
         title: 'JavaScript Essentials',
         description: 'Master JavaScript fundamentals including ES6+ features and DOM manipulation.',
         duration: '6-8 weeks',
         skills: ['JavaScript', 'ES6+', 'DOM', 'Events', 'Async/Await'],
         resources: [
           { name: 'JavaScript.info', url: '#' },
           { name: 'Eloquent JavaScript', url: '#' },
         ],
       },
       {
         id: 3,
         title: 'React Framework',
         description: 'Build dynamic user interfaces with React, hooks, and state management.',
         duration: '8-10 weeks',
         skills: ['React', 'Hooks', 'Context API', 'React Router', 'Redux'],
         resources: [
           { name: 'React Docs', url: '#' },
           { name: 'React Patterns', url: '#' },
         ],
       },
       {
         id: 4,
         title: 'Advanced Topics',
         description: 'Learn TypeScript, testing, and performance optimization techniques.',
         duration: '6-8 weeks',
         skills: ['TypeScript', 'Jest', 'Testing Library', 'Performance', 'Accessibility'],
         resources: [
           { name: 'TypeScript Handbook', url: '#' },
           { name: 'Testing JavaScript', url: '#' },
         ],
       },
     ],
   },
   {
     id: 'backend',
     title: 'Backend Developer',
     icon: Database,
     description: 'Build robust server-side applications and APIs.',
     color: 'bg-green-500',
     skills: ['Python', 'Node.js', 'SQL', 'REST APIs', 'Docker'],
     salary: '$80k - $150k',
     growth: '+25%',
     demand: 'High',
     category: 'Web Development',
     steps: [
       {
         id: 1,
         title: 'Programming Fundamentals',
         description: 'Master a backend language like Python, Node.js, or Java.',
         duration: '6-8 weeks',
         skills: ['Python/Node.js', 'Data Structures', 'Algorithms', 'OOP'],
         resources: [
           { name: 'The Odin Project', url: '#' },
           { name: 'Codecademy', url: '#' },
         ],
       },
       {
         id: 2,
         title: 'Databases & SQL',
         description: 'Learn relational and NoSQL databases for data persistence.',
         duration: '4-6 weeks',
         skills: ['SQL', 'PostgreSQL', 'MongoDB', 'Database Design', 'ORMs'],
         resources: [
           { name: 'SQLZoo', url: '#' },
           { name: 'MongoDB University', url: '#' },
         ],
       },
       {
         id: 3,
         title: 'API Development',
         description: 'Build RESTful APIs and understand API design principles.',
         duration: '6-8 weeks',
         skills: ['REST', 'GraphQL', 'Authentication', 'Rate Limiting', 'Documentation'],
         resources: [
           { name: 'REST API Tutorial', url: '#' },
           { name: 'GraphQL Docs', url: '#' },
         ],
       },
       {
         id: 4,
         title: 'DevOps Basics',
         description: 'Learn deployment, containerization, and CI/CD pipelines.',
         duration: '4-6 weeks',
         skills: ['Docker', 'Linux', 'CI/CD', 'Cloud Basics', 'Monitoring'],
         resources: [
           { name: 'Docker Getting Started', url: '#' },
           { name: 'GitHub Actions', url: '#' },
         ],
       },
     ],
   },
   {
     id: 'cloud',
     title: 'Cloud Engineer',
     icon: Cloud,
     description: 'Design and manage scalable cloud infrastructure.',
     color: 'bg-purple-500',
     skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
     salary: '$100k - $180k',
     growth: '+35%',
     demand: 'Very High',
     category: 'Cloud & DevOps',
     steps: [
       {
         id: 1,
         title: 'Cloud Fundamentals',
         description: 'Understand cloud computing concepts and major cloud providers.',
         duration: '4-6 weeks',
         skills: ['Cloud Concepts', 'AWS/Azure/GCP Basics', 'Networking', 'Security'],
         resources: [
           { name: 'AWS Cloud Practitioner', url: '#' },
           { name: 'Azure Fundamentals', url: '#' },
         ],
       },
       {
         id: 2,
         title: 'Infrastructure as Code',
         description: 'Automate infrastructure provisioning with IaC tools.',
         duration: '6-8 weeks',
         skills: ['Terraform', 'CloudFormation', 'Ansible', 'Pulumi'],
         resources: [
           { name: 'Terraform Learn', url: '#' },
           { name: 'AWS CDK Workshop', url: '#' },
         ],
       },
       {
         id: 3,
         title: 'Containerization & Orchestration',
         description: 'Master Docker and Kubernetes for container management.',
         duration: '8-10 weeks',
         skills: ['Docker', 'Kubernetes', 'Helm', 'Service Mesh', 'Container Security'],
         resources: [
           { name: 'Kubernetes Docs', url: '#' },
           { name: 'KodeKloud', url: '#' },
         ],
       },
       {
         id: 4,
         title: 'Advanced Cloud Architecture',
         description: 'Design resilient, scalable, and cost-effective architectures.',
         duration: '8-10 weeks',
         skills: ['Architecture Patterns', 'High Availability', 'Disaster Recovery', 'Cost Optimization'],
         resources: [
           { name: 'AWS Well-Architected', url: '#' },
           { name: 'Cloud Design Patterns', url: '#' },
         ],
       },
     ],
   },
   {
     id: 'ml',
     title: 'ML Engineer',
     icon: Brain,
     description: 'Build and deploy machine learning models at scale.',
     color: 'bg-pink-500',
     skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning'],
     salary: '$120k - $200k',
     growth: '+40%',
     demand: 'Very High',
     category: 'AI & Data',
     steps: [
       {
         id: 1,
         title: 'Python & Math Foundations',
         description: 'Build strong foundations in Python and mathematics for ML.',
         duration: '6-8 weeks',
         skills: ['Python', 'NumPy', 'Pandas', 'Linear Algebra', 'Statistics'],
         resources: [
           { name: 'Khan Academy Math', url: '#' },
           { name: 'Python for Data Science', url: '#' },
         ],
       },
       {
         id: 2,
         title: 'Machine Learning Basics',
         description: 'Learn core ML algorithms and scikit-learn.',
         duration: '8-10 weeks',
         skills: ['Supervised Learning', 'Unsupervised Learning', 'Scikit-learn', 'Model Evaluation'],
         resources: [
           { name: 'Andrew Ng ML Course', url: '#' },
           { name: 'Scikit-learn Docs', url: '#' },
         ],
       },
       {
         id: 3,
         title: 'Deep Learning',
         description: 'Master neural networks with TensorFlow or PyTorch.',
         duration: '10-12 weeks',
         skills: ['Neural Networks', 'CNNs', 'RNNs', 'Transformers', 'TensorFlow/PyTorch'],
         resources: [
           { name: 'Deep Learning Specialization', url: '#' },
           { name: 'Fast.ai', url: '#' },
         ],
       },
       {
         id: 4,
         title: 'MLOps & Deployment',
         description: 'Deploy and monitor ML models in production.',
         duration: '6-8 weeks',
         skills: ['MLflow', 'Docker', 'Model Serving', 'Monitoring', 'A/B Testing'],
         resources: [
           { name: 'MLOps Zoomcamp', url: '#' },
           { name: 'Full Stack Deep Learning', url: '#' },
         ],
       },
     ],
   },
   {
     id: 'security',
     title: 'Security Engineer',
     icon: Shield,
     description: 'Protect systems and data from cyber threats.',
     color: 'bg-red-500',
     skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Incident Response'],
     salary: '$100k - $160k',
     growth: '+32%',
     demand: 'Very High',
     category: 'Security',
     steps: [
       {
         id: 1,
         title: 'Security Fundamentals',
         description: 'Understand core security concepts and principles.',
         duration: '6-8 weeks',
         skills: ['CIA Triad', 'Risk Assessment', 'Security Controls', 'Compliance'],
         resources: [
           { name: 'CompTIA Security+', url: '#' },
           { name: 'OWASP', url: '#' },
         ],
       },
       {
         id: 2,
         title: 'Network Security',
         description: 'Learn to secure networks and detect threats.',
         duration: '6-8 weeks',
         skills: ['Firewalls', 'IDS/IPS', 'VPN', 'Network Monitoring', 'Wireshark'],
         resources: [
           { name: 'Cybrary', url: '#' },
           { name: 'Network+ Course', url: '#' },
         ],
       },
       {
         id: 3,
         title: 'Penetration Testing',
         description: 'Learn ethical hacking and vulnerability assessment.',
         duration: '8-10 weeks',
         skills: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Web App Testing', 'Reporting'],
         resources: [
           { name: 'HackTheBox', url: '#' },
           { name: 'TryHackMe', url: '#' },
         ],
       },
       {
         id: 4,
         title: 'Security Operations',
         description: 'Master incident response and security monitoring.',
         duration: '6-8 weeks',
         skills: ['SIEM', 'Incident Response', 'Forensics', 'Threat Hunting', 'SOC Operations'],
         resources: [
           { name: 'SANS Courses', url: '#' },
           { name: 'Blue Team Labs', url: '#' },
         ],
       },
     ],
   },
 ];
 
 export const allSkills = [
   'Python',
   'JavaScript',
   'Java',
   'SQL',
   'React',
   'TypeScript',
   'Node.js',
   'Machine Learning',
   'Deep Learning',
   'Cloud Computing',
   'AWS',
   'Azure',
   'Docker',
   'Kubernetes',
   'TensorFlow',
   'PyTorch',
   'REST APIs',
   'Network Security',
   'Penetration Testing',
   'Data Structures',
 ];