 import { Link } from 'react-router-dom';
 import { TrendingUp, DollarSign, ChevronRight } from 'lucide-react';
 import Layout from '@/components/Layout';
 import { Badge } from '@/components/ui/badge';
 import { roadmaps } from '@/data/careers';
 
 const CareerRoadmaps = () => {
   const getDemandColor = (demand: string) => {
     switch (demand) {
       case 'Very High':
         return 'bg-success/10 text-success border-success/20';
       case 'High':
         return 'bg-primary/10 text-primary border-primary/20';
       default:
         return 'bg-accent/10 text-accent border-accent/20';
     }
   };
 
   return (
     <Layout>
       <div className="container mx-auto px-4 py-8">
         {/* Header */}
         <div className="mb-8">
           <h1 className="text-3xl font-bold text-foreground mb-2">Career Roadmaps</h1>
           <p className="text-muted-foreground">
             Choose a career path and follow the step-by-step guide to achieve your goals.
           </p>
         </div>
 
         {/* Career Cards Grid */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {roadmaps.map((roadmap, index) => {
             const IconComponent = roadmap.icon;
             return (
               <Link
                 key={roadmap.id}
                 to={`/roadmaps/${roadmap.id}`}
                 className="group bg-card rounded-2xl border border-border p-6 card-hover animate-fade-in-up block"
                 style={{ animationDelay: `${index * 100}ms` }}
               >
                 <div className="flex items-start gap-4 mb-4">
                   <div className={`w-14 h-14 rounded-2xl ${roadmap.color} flex items-center justify-center text-white shrink-0`}>
                     <IconComponent className="w-7 h-7" />
                   </div>
                   <div className="flex-1">
                     <Badge variant="outline" className={getDemandColor(roadmap.demand)}>
                       {roadmap.demand} Demand
                     </Badge>
                   </div>
                 </div>
 
                 <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                   {roadmap.title}
                 </h3>
                 <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                   {roadmap.description}
                 </p>
 
                 {/* Skills */}
                 <div className="flex flex-wrap gap-2 mb-4">
                   {roadmap.skills.slice(0, 3).map((skill) => (
                     <Badge key={skill} variant="secondary" className="text-xs">
                       {skill}
                     </Badge>
                   ))}
                   {roadmap.skills.length > 3 && (
                     <Badge variant="secondary" className="text-xs">
                       +{roadmap.skills.length - 3} more
                     </Badge>
                   )}
                 </div>
 
                 {/* Stats */}
                 <div className="flex items-center gap-4 pt-4 border-t border-border">
                   <div className="flex items-center gap-1 text-sm">
                     <DollarSign className="w-4 h-4 text-success" />
                     <span className="text-muted-foreground">{roadmap.salary}</span>
                   </div>
                   <div className="flex items-center gap-1 text-sm">
                     <TrendingUp className="w-4 h-4 text-primary" />
                     <span className="text-muted-foreground">{roadmap.growth}</span>
                   </div>
                   <div className="ml-auto">
                     <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                   </div>
                 </div>
               </Link>
             );
           })}
         </div>
       </div>
     </Layout>
   );
 };
 
 export default CareerRoadmaps;