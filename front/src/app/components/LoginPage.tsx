import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Coins, GraduationCap, BookOpen, Building2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginPageProps {
  onNavigateToSignup: () => void;
  onLoginSuccess: (userType: 'aluno' | 'professor' | 'empresa', userData: any) => void;
}

export function LoginPage({ onNavigateToSignup, onLoginSuccess }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState<'aluno' | 'professor' | 'empresa'>('aluno');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === 'aluno') {
        const res = await fetch('http://localhost:3001/api/alunos');
        const alunos = await res.json();
        const userExists = alunos.find((a: any) => a.email === email && a.senha === senha);
        if (userExists) {
          onLoginSuccess(activeTab, userExists);
        } else {
          alert('Email não encontrado ou senha incorreta!');
        }
      } else if (activeTab === 'empresa') {
        const res = await fetch('http://localhost:3001/api/empresas');
        const empresas = await res.json();
        const userExists = empresas.find((e: any) => e.email === email && e.senha === senha);
        if (userExists) {
          onLoginSuccess(activeTab, userExists);
        } else {
          alert('Email não encontrado ou senha incorreta!');
        }
      } else if (activeTab === 'professor') {
        const res = await fetch('http://localhost:3001/api/professores');
        const professores = await res.json();
        const userExists = professores.find((p: any) => p.email === email && p.senha === senha);
        if (userExists) {
          onLoginSuccess(activeTab, userExists);
        } else {
          alert('Email não encontrado ou senha incorreta!');
        }
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor para fazer login.');
    }
  };

  const getTitleByTab = () => {
    switch (activeTab) {
      case 'aluno':
        return 'Aluno';
      case 'professor':
        return 'Professor';
      case 'empresa':
        return 'Empresa Parceira';
      default:
        return '';
    }
  };

  const getDescriptionByTab = () => {
    switch (activeTab) {
      case 'aluno':
        return 'Acesse sua conta para visualizar e resgatar suas moedas';
      case 'professor':
        return 'Acesse sua conta para distribuir moedas aos alunos';
      case 'empresa':
        return 'Acesse sua conta para gerenciar vantagens e parcerias';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Lado esquerdo - Imagem e informações */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1565372521778-8d8235695f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBjb2luc3xlbnwxfHx8fDE3NzkxNTAwMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="University background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <Coins className="w-16 h-16" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Sistema de Moedas Universitárias</h1>
          <p className="text-lg mb-8 text-white/90">
            Reconheça o mérito, troque por vantagens e fortaleça o aprendizado
          </p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Para Alunos</h3>
                <p className="text-sm text-white/80">Receba moedas por mérito e troque por vantagens exclusivas</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Para Professores</h3>
                <p className="text-sm text-white/80">Distribua moedas e incentive o desenvolvimento acadêmico</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Building2 className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Para Empresas</h3>
                <p className="text-sm text-white/80">Ofereça vantagens e conecte-se com a comunidade universitária</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-4 rounded-full">
              <Coins className="w-12 h-12 text-white" />
            </div>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Bem-vindo</CardTitle>
              <CardDescription>
                Selecione seu tipo de acesso e faça login
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="aluno" className="text-xs sm:text-sm">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    Aluno
                  </TabsTrigger>
                  <TabsTrigger value="professor" className="text-xs sm:text-sm">
                    <BookOpen className="w-4 h-4 mr-1" />
                    Professor
                  </TabsTrigger>
                  <TabsTrigger value="empresa" className="text-xs sm:text-sm">
                    <Building2 className="w-4 h-4 mr-1" />
                    Empresa
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="aluno">
                  <LoginForm
                    title={getTitleByTab()}
                    description={getDescriptionByTab()}
                    email={email}
                    senha={senha}
                    setEmail={setEmail}
                    setSenha={setSenha}
                    handleLogin={handleLogin}
                  />
                </TabsContent>

                <TabsContent value="professor">
                  <LoginForm
                    title={getTitleByTab()}
                    description={getDescriptionByTab()}
                    email={email}
                    senha={senha}
                    setEmail={setEmail}
                    setSenha={setSenha}
                    handleLogin={handleLogin}
                  />
                </TabsContent>

                <TabsContent value="empresa">
                  <LoginForm
                    title={getTitleByTab()}
                    description={getDescriptionByTab()}
                    email={email}
                    senha={senha}
                    setEmail={setEmail}
                    setSenha={setSenha}
                    handleLogin={handleLogin}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-gray-600 mt-6">
            Não tem uma conta?{' '}
            <button
              onClick={onNavigateToSignup}
              className="text-blue-600 hover:underline font-medium"
            >
              Cadastre-se aqui
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

interface LoginFormProps {
  title: string;
  description: string;
  email: string;
  senha: string;
  setEmail: (value: string) => void;
  setSenha: (value: string) => void;
  handleLogin: (e: React.FormEvent) => void;
}

function LoginForm({ 
  title, 
  description, 
  email, 
  senha, 
  setEmail, 
  setSenha, 
  handleLogin 
}: LoginFormProps) {
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2 mb-4">
        <h3 className="font-semibold text-lg">Login - {title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="senha">Senha</Label>
          <button 
            type="button" 
            className="text-sm text-blue-600 hover:underline"
          >
            Esqueceu a senha?
          </button>
        </div>
        <Input
          id="senha"
          type="password"
          placeholder="••••••••"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full mt-6">
        Entrar
      </Button>
    </form>
  );
}
