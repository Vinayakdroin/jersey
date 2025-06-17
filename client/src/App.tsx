import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Wishlist from "@/pages/wishlist";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

function Router() {

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
//     const firebaseConfig = {
//   apiKey: "AIzaSyChJQ61MKWtt-UEJ_P7T35Q91G4HaWG9k8",
//   authDomain: "jersydemo.firebaseapp.com",
//   projectId: "jersydemo",
//   storageBucket: "jersydemo.firebasestorage.app",
//   messagingSenderId: "286995242507",
//   appId: "1:286995242507:web:90e47b88c0802e802cf10e",
//   measurementId: "G-NWFPQJ4WDF"
// };
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
