import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Coins, GraduationCap, BookOpen, Building2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Lado esquerdo - Imagem e informações */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHN8ZW58MXx8fHwxNzc5MTUwMDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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

          <h1 className="text-4xl font-bold mb-4">Junte-se ao Sistema</h1>
          <p className="text-lg mb-8 text-white/90">
            Faça parte da comunidade de moedas universitárias
          </p>

          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Cadastro Rápido</h3>
                <p className="text-sm text-white/80">Preencha seus dados e comece a usar imediatamente</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Segurança</h3>
                <p className="text-sm text-white/80">Seus dados são protegidos com criptografia avançada</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Acesso Completo</h3>
                <p className="text-sm text-white/80">Todas as funcionalidades disponíveis após o cadastro</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário de cadastro */}
      <div className="flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Logo mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-4 rounded-full">
              <Coins className="w-12 h-12 text-white" />
            </div>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Criar Conta</CardTitle>
              <CardDescription>
                Selecione seu tipo de usuário e preencha os dados
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
                  <AlunoSignupForm
                    title={getTitleByTab()}
                    description={getDescriptionByTab()}
                    onSuccess={onBackToLogin}
                  />
                </TabsContent>

                <TabsContent value="professor">
                  <ProfessorSignupForm
                    title={getTitleByTab()}
                    description={getDescriptionByTab()}
                    onSuccess={onBackToLogin}
                  />
                </TabsContent>

                <TabsContent value="empresa">
                  <EmpresaSignupForm
                    title={getTitleByTab()}
                    description={getDescriptionByTab()}
                    onSuccess={onBackToLogin}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-gray-600 mt-6">
            Já tem uma conta?{' '}
            <button
              onClick={onBackToLogin}
              className="text-blue-600 hover:underline font-medium"
            >
              Faça login aqui
            </button>
          </p>
        </div>
      </div>
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
      const response = await fetch('http://localhost:3001/api/alunos', {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2 mb-4">
        <h3 className="font-semibold text-lg">Cadastro - {title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nome">Nome Completo</Label>
        <Input
          id="nome"
          type="text"
          placeholder="Seu nome completo"
          value={formData.nome}
          onChange={(e) => handleChange('nome', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => handleChange('cpf', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rg">RG</Label>
          <Input
            id="rg"
            type="text"
            placeholder="00.000.000-0"
            value={formData.rg}
            onChange={(e) => handleChange('rg', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="endereco">Endereço</Label>
        <Input
          id="endereco"
          type="text"
          placeholder="Rua, número, bairro, cidade"
          value={formData.endereco}
          onChange={(e) => handleChange('endereco', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instituicao">Instituição de Ensino</Label>
        <Input
          id="instituicao"
          type="text"
          placeholder="Nome da universidade"
          value={formData.instituicao}
          onChange={(e) => handleChange('instituicao', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="curso">Curso</Label>
        <Input
          id="curso"
          type="text"
          placeholder="Nome do curso"
          value={formData.curso}
          onChange={(e) => handleChange('curso', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha">Senha</Label>
        <Input
          id="senha"
          type="password"
          placeholder="Mínimo 8 caracteres"
          value={formData.senha}
          onChange={(e) => handleChange('senha', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
        <Input
          id="confirmarSenha"
          type="password"
          placeholder="Digite a senha novamente"
          value={formData.confirmarSenha}
          onChange={(e) => handleChange('confirmarSenha', e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full mt-6">
        Criar Conta
      </Button>
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
      const response = await fetch('http://localhost:3001/api/professores', {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2 mb-4">
        <h3 className="font-semibold text-lg">Cadastro - {title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nome">Nome Completo</Label>
        <Input
          id="nome"
          type="text"
          placeholder="Seu nome completo"
          value={formData.nome}
          onChange={(e) => handleChange('nome', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Institucional</Label>
        <Input
          id="email"
          type="email"
          placeholder="professor@instituicao.edu.br"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          type="text"
          placeholder="000.000.000-00"
          value={formData.cpf}
          onChange={(e) => handleChange('cpf', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instituicao">Instituição de Ensino</Label>
        <Input
          id="instituicao"
          type="text"
          placeholder="Nome da universidade"
          value={formData.instituicao}
          onChange={(e) => handleChange('instituicao', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="departamento">Departamento</Label>
        <Input
          id="departamento"
          type="text"
          placeholder="Ex: Ciência da Computação"
          value={formData.departamento}
          onChange={(e) => handleChange('departamento', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha">Senha</Label>
        <Input
          id="senha"
          type="password"
          placeholder="Mínimo 8 caracteres"
          value={formData.senha}
          onChange={(e) => handleChange('senha', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
        <Input
          id="confirmarSenha"
          type="password"
          placeholder="Digite a senha novamente"
          value={formData.confirmarSenha}
          onChange={(e) => handleChange('confirmarSenha', e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full mt-6">
        Criar Conta
      </Button>
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
      const response = await fetch('http://localhost:3001/api/empresas', {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2 mb-4">
        <h3 className="font-semibold text-lg">Cadastro - {title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
        <Input
          id="nomeEmpresa"
          type="text"
          placeholder="Razão social ou nome fantasia"
          value={formData.nomeEmpresa}
          onChange={(e) => handleChange('nomeEmpresa', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input
          id="cnpj"
          type="text"
          placeholder="00.000.000/0000-00"
          value={formData.cnpj}
          onChange={(e) => handleChange('cnpj', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="responsavel">Nome do Responsável</Label>
        <Input
          id="responsavel"
          type="text"
          placeholder="Nome completo do responsável"
          value={formData.responsavel}
          onChange={(e) => handleChange('responsavel', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Corporativo</Label>
        <Input
          id="email"
          type="email"
          placeholder="contato@empresa.com.br"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="setor">Setor de Atuação</Label>
        <Input
          id="setor"
          type="text"
          placeholder="Ex: Alimentação, Educação, Tecnologia"
          value={formData.setor}
          onChange={(e) => handleChange('setor', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="senha">Senha</Label>
        <Input
          id="senha"
          type="password"
          placeholder="Mínimo 8 caracteres"
          value={formData.senha}
          onChange={(e) => handleChange('senha', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
        <Input
          id="confirmarSenha"
          type="password"
          placeholder="Digite a senha novamente"
          value={formData.confirmarSenha}
          onChange={(e) => handleChange('confirmarSenha', e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full mt-6">
        Criar Conta
      </Button>
    </form>
  );
}
