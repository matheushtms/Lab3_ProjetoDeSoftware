import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { AlunoDashboard } from './components/AlunoDashboard';
import { EmpresaDashboard } from './components/EmpresaDashboard';
import { ProfessorDashboard } from './components/ProfessorDashboard';
import { Toaster } from './components/ui/sonner';

type Screen = 'login' | 'signup' | 'aluno-dashboard' | 'empresa-dashboard' | 'professor-dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<any>(null);

  return (
    <div className="size-full">
      <Toaster />
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
  );
}