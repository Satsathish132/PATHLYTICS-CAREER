 import { useEffect, useState } from 'react';
 import { useNavigate, useLocation } from 'react-router-dom';
 import { useToast } from '@/hooks/use-toast';
 
 interface ProtectedRouteProps {
   children: React.ReactNode;
 }
 
 const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
   const navigate = useNavigate();
   const location = useLocation();
   const { toast } = useToast();
 
   useEffect(() => {
     const user = localStorage.getItem('pathlytics_user');
     if (!user) {
       toast({
         title: 'Access Denied',
         description: 'Please log in to continue.',
         variant: 'destructive',
       });
       navigate('/login', { state: { from: location.pathname } });
     } else {
       setIsAuthenticated(true);
     }
   }, [navigate, location.pathname, toast]);
 
   if (isAuthenticated === null) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-background">
         <div className="animate-pulse text-muted-foreground">Loading...</div>
       </div>
     );
   }
 
   return <>{children}</>;
 };
 
 export default ProtectedRoute;