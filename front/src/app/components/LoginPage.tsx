import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Coins, GraduationCap, BookOpen, Building2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CoinEduLogo } from './CoinEduLogo';
import { API_BASE } from '../config';

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
        const res = await fetch(`${API_BASE}/api/alunos`);
        const alunos = await res.json();
        if (res.ok && Array.isArray(alunos)) {
          const userExists = alunos.find((a: any) => a.email === email && a.senha === senha);
          if (userExists) {
            onLoginSuccess(activeTab, userExists);
          } else {
            alert('Email não encontrado ou senha incorreta!');
          }
        } else {
          alert('Erro ao buscar alunos do servidor.');
        }
      } else if (activeTab === 'empresa') {
        const res = await fetch(`${API_BASE}/api/empresas`);
        const empresas = await res.json();
        if (res.ok && Array.isArray(empresas)) {
          const userExists = empresas.find((e: any) => e.email === email && e.senha === senha);
          if (userExists) {
            onLoginSuccess(activeTab, userExists);
          } else {
            alert('Email não encontrado ou senha incorreta!');
          }
        } else {
          alert('Erro ao buscar empresas do servidor.');
        }
      } else if (activeTab === 'professor') {
        const res = await fetch(`${API_BASE}/api/professores`);
        const professores = await res.json();
        if (res.ok && Array.isArray(professores)) {
          const userExists = professores.find((p: any) => p.email === email && p.senha === senha);
          if (userExists) {
            onLoginSuccess(activeTab, userExists);
          } else {
            alert('Email não encontrado ou senha incorreta!');
          }
        } else {
          alert('Erro ao buscar professores do servidor.');
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
    <div className="min-h-screen flex flex-col p-4 sm:p-8 relative z-10 bg-transparent overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="w-full max-w-6xl grid lg:grid-cols-2 bg-card/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto"
      >
        {/* Lado esquerdo - Imagem e informações */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 relative overflow-hidden border-r border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/40 mix-blend-overlay"></div>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative z-10 max-w-md text-center"
          >
            <div className="flex justify-center mb-6">
              <CoinEduLogo size="lg" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-md">CoinEdu</h1>
            <p className="text-lg mb-8 text-white/80">
              Reconheça o mérito, troque por vantagens e fortaleça o aprendizado
            </p>
            
            <div className="space-y-6 text-left">
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">Para Alunos</h3>
                  <p className="text-sm text-white/70">Receba moedas por mérito e troque por vantagens exclusivas</p>
                </div>
              </motion.div>
              
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">Para Professores</h3>
                  <p className="text-sm text-white/70">Distribua moedas e incentive o desenvolvimento acadêmico</p>
                </div>
              </motion.div>
              
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">Para Empresas</h3>
                  <p className="text-sm text-white/70">Ofereça vantagens e conecte-se com a comunidade universitária</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Lado direito - Formulário de login */}
        <div className="flex items-center justify-center p-8 bg-black/20">
          <div className="w-full max-w-md">
            {/* Logo mobile */}
            <div className="lg:hidden flex justify-center mb-8">
              <CoinEduLogo size="md" />
            </div>

            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-3xl font-bold text-white">Bem-vindo</CardTitle>
                <CardDescription className="text-white/60">
                  Selecione seu tipo de acesso e faça login
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/5 p-1 rounded-xl">
                    <TabsTrigger value="aluno" className="text-xs sm:text-sm rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Aluno
                    </TabsTrigger>
                    <TabsTrigger value="professor" className="text-xs sm:text-sm rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Professor
                    </TabsTrigger>
                    <TabsTrigger value="empresa" className="text-xs sm:text-sm rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Building2 className="w-4 h-4 mr-2" />
                      Empresa
                    </TabsTrigger>
                  </TabsList>

                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="aluno" className="mt-0">
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

                    <TabsContent value="professor" className="mt-0">
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

                    <TabsContent value="empresa" className="mt-0">
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
                  </motion.div>
                </Tabs>
              </CardContent>
            </Card>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm text-white/60 mt-8"
            >
              Não tem uma conta?{' '}
              <button
                onClick={onNavigateToSignup}
                className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
              >
                Cadastre-se aqui
              </button>
            </motion.p>
          </div>
        </div>
      </motion.div>
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
    <form onSubmit={handleLogin} className="space-y-5">
      <div className="space-y-2 mb-6 text-center">
        <h3 className="font-semibold text-xl text-white">Login - {title}</h3>
        <p className="text-sm text-white/60">{description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white/80">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary transition-all"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="senha" className="text-white/80">Senha</Label>
          <button 
            type="button" 
            className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
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
          className="bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary transition-all"
        />
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(74,222,128,0.4)]">
          Entrar
        </Button>
      </motion.div>
    </form>
  );
}
