import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Coins,
  TrendingUp,
  Gift,
  User,
  LogOut,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  Calendar,
  Mail,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { EditarPerfilAluno } from './EditarPerfilAluno';

interface AlunoDashboardProps {
  onLogout: () => void;
  userData?: any;
  onUpdateUser?: (data: any) => void;
}

export function AlunoDashboard({ onLogout, userData }: AlunoDashboardProps) {
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [extrato, setExtrato] = useState<any[]>([]);

  useEffect(() => {
    if (userData && userData.id) {
      fetchExtrato();
    }
  }, [userData]);

  const fetchExtrato = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/transacoes/aluno/${userData.id}`);
      const data = await res.json();
      setExtrato(data);
    } catch (error) {
      console.error('Erro ao buscar extrato do aluno:', error);
    }
  };

  // Usa dados do banco se disponíveis, senão mock
  const alunoData = userData || {
    nome: 'João Silva',
    email: 'joao.silva@universidade.edu.br',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    endereco: 'Rua das Flores, 123, Centro, São Paulo - SP',
    instituicao: 'Universidade Federal de São Paulo',
    curso: 'Engenharia de Software',
    saldo: 1250,
    avatar: ''
  };

  // Histórico de transações mockado
  const transacoes = [
    {
      id: 1,
      tipo: 'recebimento',
      descricao: 'Participação em projeto de pesquisa',
      professor: 'Prof. Dr. Maria Santos',
      valor: 500,
      data: '2026-05-15',
      status: 'concluído'
    },
    {
      id: 2,
      tipo: 'recebimento',
      descricao: 'Apresentação de trabalho na semana acadêmica',
      professor: 'Prof. João Oliveira',
      valor: 300,
      data: '2026-05-10',
      status: 'concluído'
    },
    {
      id: 3,
      tipo: 'resgate',
      descricao: 'Desconto 20% - Restaurante Universitário',
      empresa: 'RU Campus Central',
      valor: -150,
      data: '2026-05-08',
      status: 'concluído'
    },
    {
      id: 4,
      tipo: 'recebimento',
      descricao: 'Monitoria de Algoritmos',
      professor: 'Prof. Carlos Mendes',
      valor: 400,
      data: '2026-05-05',
      status: 'concluído'
    },
    {
      id: 5,
      tipo: 'resgate',
      descricao: 'Desconto em material didático',
      empresa: 'Livraria Acadêmica',
      valor: -200,
      data: '2026-05-01',
      status: 'concluído'
    }
  ];

  // Vantagens disponíveis mockadas
  const vantagensDisponiveis = [
    {
      id: 1,
      titulo: '30% OFF em Livros',
      empresa: 'Livraria Acadêmica',
      custo: 300,
      descricao: 'Desconto de 30% em qualquer livro técnico',
      imagem: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'
    },
    {
      id: 2,
      titulo: 'Almoço Grátis no RU',
      empresa: 'Restaurante Universitário',
      custo: 200,
      descricao: '1 refeição completa gratuita',
      imagem: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'
    },
    {
      id: 3,
      titulo: 'Mensalidade Academia',
      empresa: 'FitCampus',
      custo: 500,
      descricao: '1 mês de academia grátis',
      imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400'
    },
    {
      id: 4,
      titulo: 'Desconto Material Escolar',
      empresa: 'Papelaria Central',
      custo: 150,
      descricao: '25% OFF em materiais escolares',
      imagem: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400'
    }
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (editandoPerfil) {
    return (
      <EditarPerfilAluno
        onVoltar={() => setEditandoPerfil(false)}
        onDeletarConta={onLogout}
        onUpdate={(dados) => {
          if (onUpdateUser) onUpdateUser(dados);
        }}
        dadosIniciais={{
          id: alunoData.id,
          nome: alunoData.nome || '',
          email: alunoData.email || '',
          cpf: alunoData.cpf || '',
          rg: alunoData.rg || '',
          endereco: alunoData.endereco || '',
          instituicao: alunoData.instituicao || '',
          curso: alunoData.curso || '',
          senha: alunoData.senha || ''
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-2 rounded-lg">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistema de Moedas</h1>
                <p className="text-sm text-gray-500">Portal do Aluno</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{alunoData.nome}</p>
                <p className="text-xs text-gray-500">{alunoData.curso}</p>
              </div>
              <Avatar>
                <AvatarImage src={alunoData.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                  {getInitials(alunoData.nome)}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="visao-geral">
              <TrendingUp className="w-4 h-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="vantagens">
              <Gift className="w-4 h-4 mr-2" />
              Vantagens
            </TabsTrigger>
            <TabsTrigger value="perfil">
              <User className="w-4 h-4 mr-2" />
              Meu Perfil
            </TabsTrigger>
          </TabsList>

          {/* Visão Geral Tab */}
          <TabsContent value="visao-geral" className="space-y-6">
            {/* Card de Saldo */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2 bg-gradient-to-br from-blue-600 to-purple-700 text-white border-0">
                <CardHeader>
                  <CardDescription className="text-blue-100">Saldo Disponível</CardDescription>
                  <CardTitle className="text-4xl font-bold flex items-center gap-2">
                    <Coins className="w-10 h-10" />
                    {alunoData.saldo.toLocaleString('pt-BR')} moedas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-100">
                    Continue participando de atividades acadêmicas para ganhar mais moedas!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>Estatísticas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Recebido (mês)</span>
                      <span className="text-sm font-medium text-green-600">+1.200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Gasto (mês)</span>
                      <span className="text-sm font-medium text-red-600">-350</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Histórico de Transações */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Transações</CardTitle>
                <CardDescription>Suas últimas movimentações de moedas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {extrato.length === 0 && (
                    <p className="text-center text-gray-500 py-4">Nenhuma transação encontrada.</p>
                  )}
                  {extrato.map((transacao) => (
                    <div key={transacao.id}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 rounded-full bg-green-100 text-green-600">
                            <ArrowDownLeft className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm">
                              {transacao.motivo}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Enviado por: {transacao.professor?.nome}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {new Date(transacao.data).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            +{transacao.valor.toLocaleString('pt-BR')}
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">
                            recebido
                          </Badge>
                        </div>
                      </div>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vantagens Tab */}
          <TabsContent value="vantagens" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vantagensDisponiveis.map((vantagem) => (
                <Card key={vantagem.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    <img
                      src={vantagem.imagem}
                      alt={vantagem.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{vantagem.titulo}</CardTitle>
                      <Badge variant="secondary" className="shrink-0">
                        <Coins className="w-3 h-3 mr-1" />
                        {vantagem.custo}
                      </Badge>
                    </div>
                    <CardDescription>{vantagem.empresa}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{vantagem.descricao}</p>
                    <Button
                      className="w-full"
                      disabled={alunoData.saldo < vantagem.custo}
                    >
                      {alunoData.saldo >= vantagem.custo ? (
                        <>
                          <Gift className="w-4 h-4 mr-2" />
                          Resgatar
                        </>
                      ) : (
                        'Saldo Insuficiente'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Perfil Tab */}
          <TabsContent value="perfil" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Seus dados cadastrados no sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={alunoData.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700 text-white text-2xl">
                      {getInitials(alunoData.nome)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{alunoData.nome}</h3>
                    <p className="text-sm text-gray-500">Aluno</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-sm text-gray-900">{alunoData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">CPF</p>
                        <p className="text-sm text-gray-900">{alunoData.cpf}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">RG</p>
                        <p className="text-sm text-gray-900">{alunoData.rg}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Instituição</p>
                        <p className="text-sm text-gray-900">{alunoData.instituicao}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Curso</p>
                        <p className="text-sm text-gray-900">{alunoData.curso}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Endereço</p>
                        <p className="text-sm text-gray-900">{alunoData.endereco}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setEditandoPerfil(true)}>
                    Editar Informações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
