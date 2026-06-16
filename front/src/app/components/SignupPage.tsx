import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Coins, GraduationCap, BookOpen, Building2 } from 'lucide-react';
import { CoinEduLogo } from './CoinEduLogo';
import { API_BASE } from '../config';

interface SignupPageProps {
  onBackToLogin: () => void;
}

export function SignupPage({ onBackToLogin }: SignupPageProps) {
  const [activeTab, setActiveTab] = useState('aluno');

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
        return 'Crie sua conta e comece a acumular moedas';
      case 'professor':
        return 'Cadastre-se para distribuir moedas aos alunos';
      case 'empresa':
        return 'Registre sua empresa e ofereça vantagens';
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
        className="w-full max-w-6xl grid lg:grid-cols-2 bg-card/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto mx-auto"
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

            <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-md">Junte-se ao CoinEdu</h1>
            <p className="text-lg mb-8 text-white/80">
              Faça parte da comunidade de moedas universitárias
            </p>

            <div className="space-y-6 text-left">
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">Cadastro Rápido</h3>
                  <p className="text-sm text-white/70">Preencha seus dados e comece a usar imediatamente</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">Segurança</h3>
                  <p className="text-sm text-white/70">Seus dados são protegidos com criptografia avançada</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">Acesso Completo</h3>
                  <p className="text-sm text-white/70">Todas as funcionalidades disponíveis após o cadastro</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Lado direito - Formulário de cadastro */}
        <div className="flex items-start justify-center p-8 bg-black/20">
          <div className="w-full max-w-md py-4">
            {/* Logo mobile */}
            <div className="lg:hidden flex justify-center mb-8">
              <CoinEduLogo size="md" />
            </div>

            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="space-y-1 text-center pb-4">
                <CardTitle className="text-3xl font-bold text-white">Criar Conta</CardTitle>
                <CardDescription className="text-white/60">
                  Selecione seu tipo de usuário e preencha os dados
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                      <AlunoSignupForm
                        title={getTitleByTab()}
                        description={getDescriptionByTab()}
                        onSuccess={onBackToLogin}
                      />
                    </TabsContent>

                    <TabsContent value="professor" className="mt-0">
                      <ProfessorSignupForm
                        title={getTitleByTab()}
                        description={getDescriptionByTab()}
                        onSuccess={onBackToLogin}
                      />
                    </TabsContent>

                    <TabsContent value="empresa" className="mt-0">
                      <EmpresaSignupForm
                        title={getTitleByTab()}
                        description={getDescriptionByTab()}
                        onSuccess={onBackToLogin}
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
              Já tem uma conta?{' '}
              <button
                onClick={onBackToLogin}
                className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
              >
                Faça login aqui
              </button>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface FormHeaderProps {
  title: string;
  description: string;
  onSuccess: () => void;
}

function AlunoSignupForm({ title, description, onSuccess }: FormHeaderProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cpf: '',
    rg: '',
    endereco: '',
    instituicao: '',
    curso: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/api/alunos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          cpf: formData.cpf,
          senha: formData.senha,
          rg: formData.rg,
          endereco: formData.endereco,
          instituicao: formData.instituicao,
          curso: formData.curso,
        }),
      });

      if (response.ok) {
        alert('Conta de aluno criada com sucesso!');
        onSuccess();
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputClass = "bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary transition-all";
  const labelClass = "text-white/80";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2 mb-6 text-center">
        <h3 className="font-semibold text-xl text-white">Cadastro - {title}</h3>
        <p className="text-sm text-white/60">{description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nome" className={labelClass}>Nome Completo</Label>
        <Input id="nome" type="text" placeholder="Seu nome completo" value={formData.nome} onChange={(e) => handleChange('nome', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className={labelClass}>Email</Label>
        <Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cpf" className={labelClass}>CPF</Label>
          <Input id="cpf" type="text" placeholder="000.000.000-00" value={formData.cpf} onChange={(e) => handleChange('cpf', e.target.value)} required className={inputClass} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rg" className={labelClass}>RG</Label>
          <Input id="rg" type="text" placeholder="00.000.000-0" value={formData.rg} onChange={(e) => handleChange('rg', e.target.value)} required className={inputClass} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="endereco" className={labelClass}>Endereço</Label>
        <Input id="endereco" type="text" placeholder="Rua, número, bairro, cidade" value={formData.endereco} onChange={(e) => handleChange('endereco', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instituicao" className={labelClass}>Instituição de Ensino</Label>
        <Input id="instituicao" type="text" placeholder="Nome da universidade" value={formData.instituicao} onChange={(e) => handleChange('instituicao', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="curso" className={labelClass}>Curso</Label>
        <Input id="curso" type="text" placeholder="Nome do curso" value={formData.curso} onChange={(e) => handleChange('curso', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha" className={labelClass}>Senha</Label>
        <Input id="senha" type="password" placeholder="Mínimo 8 caracteres" value={formData.senha} onChange={(e) => handleChange('senha', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmarSenha" className={labelClass}>Confirmar Senha</Label>
        <Input id="confirmarSenha" type="password" placeholder="Digite a senha novamente" value={formData.confirmarSenha} onChange={(e) => handleChange('confirmarSenha', e.target.value)} required className={inputClass} />
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(74,222,128,0.4)]">
          Criar Conta
        </Button>
      </motion.div>
    </form>
  );
}

function ProfessorSignupForm({ title, description, onSuccess }: FormHeaderProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cpf: '',
    departamento: '',
    instituicao: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/api/professores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          cpf: formData.cpf,
          departamento: formData.departamento,
          instituicao: formData.instituicao,
          senha: formData.senha,
        }),
      });

      if (response.ok) {
        alert('Conta de professor criada com sucesso!');
        onSuccess();
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputClass = "bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary transition-all";
  const labelClass = "text-white/80";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2 mb-6 text-center">
        <h3 className="font-semibold text-xl text-white">Cadastro - {title}</h3>
        <p className="text-sm text-white/60">{description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nome" className={labelClass}>Nome Completo</Label>
        <Input id="nome" type="text" placeholder="Seu nome completo" value={formData.nome} onChange={(e) => handleChange('nome', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className={labelClass}>Email Institucional</Label>
        <Input id="email" type="email" placeholder="professor@instituicao.edu.br" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpf" className={labelClass}>CPF</Label>
        <Input id="cpf" type="text" placeholder="000.000.000-00" value={formData.cpf} onChange={(e) => handleChange('cpf', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instituicao" className={labelClass}>Instituição de Ensino</Label>
        <Input id="instituicao" type="text" placeholder="Nome da universidade" value={formData.instituicao} onChange={(e) => handleChange('instituicao', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="departamento" className={labelClass}>Departamento</Label>
        <Input id="departamento" type="text" placeholder="Ex: Ciência da Computação" value={formData.departamento} onChange={(e) => handleChange('departamento', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha" className={labelClass}>Senha</Label>
        <Input id="senha" type="password" placeholder="Mínimo 8 caracteres" value={formData.senha} onChange={(e) => handleChange('senha', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmarSenha" className={labelClass}>Confirmar Senha</Label>
        <Input id="confirmarSenha" type="password" placeholder="Digite a senha novamente" value={formData.confirmarSenha} onChange={(e) => handleChange('confirmarSenha', e.target.value)} required className={inputClass} />
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(74,222,128,0.4)]">
          Criar Conta
        </Button>
      </motion.div>
    </form>
  );
}

function EmpresaSignupForm({ title, description, onSuccess }: FormHeaderProps) {
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    cnpj: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    setor: '',
    responsavel: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/api/empresas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeFantasia: formData.nomeEmpresa,
          cnpj: formData.cnpj,
          email: formData.email,
          telefone: null,
          senha: formData.senha,
          setor: formData.setor,
          responsavel: formData.responsavel,
        }),
      });

      if (response.ok) {
        alert('Conta de empresa criada com sucesso!');
        onSuccess();
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputClass = "bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary transition-all";
  const labelClass = "text-white/80";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2 mb-6 text-center">
        <h3 className="font-semibold text-xl text-white">Cadastro - {title}</h3>
        <p className="text-sm text-white/60">{description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nomeEmpresa" className={labelClass}>Nome da Empresa</Label>
        <Input id="nomeEmpresa" type="text" placeholder="Razão social ou nome fantasia" value={formData.nomeEmpresa} onChange={(e) => handleChange('nomeEmpresa', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cnpj" className={labelClass}>CNPJ</Label>
        <Input id="cnpj" type="text" placeholder="00.000.000/0000-00" value={formData.cnpj} onChange={(e) => handleChange('cnpj', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="responsavel" className={labelClass}>Nome do Responsável</Label>
        <Input id="responsavel" type="text" placeholder="Nome completo do responsável" value={formData.responsavel} onChange={(e) => handleChange('responsavel', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className={labelClass}>Email Corporativo</Label>
        <Input id="email" type="email" placeholder="contato@empresa.com.br" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="setor" className={labelClass}>Setor de Atuação</Label>
        <Input id="setor" type="text" placeholder="Ex: Alimentação, Educação, Tecnologia" value={formData.setor} onChange={(e) => handleChange('setor', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha" className={labelClass}>Senha</Label>
        <Input id="senha" type="password" placeholder="Mínimo 8 caracteres" value={formData.senha} onChange={(e) => handleChange('senha', e.target.value)} required className={inputClass} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmarSenha" className={labelClass}>Confirmar Senha</Label>
        <Input id="confirmarSenha" type="password" placeholder="Digite a senha novamente" value={formData.confirmarSenha} onChange={(e) => handleChange('confirmarSenha', e.target.value)} required className={inputClass} />
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(74,222,128,0.4)]">
          Criar Conta
        </Button>
      </motion.div>
    </form>
  );
}
