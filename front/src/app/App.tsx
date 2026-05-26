import { useState } from 'react';
import { motion } from 'motion/react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { AlunoDashboard } from './components/AlunoDashboard';
import { EmpresaDashboard } from './components/EmpresaDashboard';
import { ProfessorDashboard } from './components/ProfessorDashboard';
import { ThemeToggle } from './components/ThemeToggle';
import { Toaster } from './components/ui/sonner';

type Screen = 'login' | 'signup' | 'aluno-dashboard' | 'empresa-dashboard' | 'professor-dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<any>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-secondary/30 blur-[120px]"
        />
      </div>

      <div className="relative z-10 size-full min-h-screen">
        <Toaster />
        <ThemeToggle />
      {currentScreen === 'login' && (
        <LoginPage
          onNavigateToSignup={() => setCurrentScreen('signup')}
          onLoginSuccess={(userType, userData) => {
            setCurrentUser(userData);
            if (userType === 'aluno') {
              setCurrentScreen('aluno-dashboard');
            } else if (userType === 'empresa') {
              setCurrentScreen('empresa-dashboard');
            } else if (userType === 'professor') {
              setCurrentScreen('professor-dashboard');
            }
          }}
        />
      )}
      {currentScreen === 'signup' && (
        <SignupPage onBackToLogin={() => setCurrentScreen('login')} />
      )}
      {currentScreen === 'aluno-dashboard' && (
        <AlunoDashboard 
          onLogout={() => { setCurrentScreen('login'); setCurrentUser(null); }} 
          userData={currentUser} 
          onUpdateUser={(dados) => setCurrentUser({ ...dados })}
        />
      )}
      {currentScreen === 'empresa-dashboard' && (
        <EmpresaDashboard 
          onLogout={() => { setCurrentScreen('login'); setCurrentUser(null); }} 
          userData={currentUser} 
          onUpdateUser={(dados) => setCurrentUser({ ...dados })}
        />
      )}
      {currentScreen === 'professor-dashboard' && (
        <ProfessorDashboard 
          onLogout={() => { setCurrentScreen('login'); setCurrentUser(null); }} 
          userData={currentUser} 
          onUpdateUser={(dados) => setCurrentUser({ ...dados })}
        />
      )}
    </div>
    </div>
  );
}
