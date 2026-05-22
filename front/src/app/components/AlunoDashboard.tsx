import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { getFallbackImage } from './ui/utils';
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

export function AlunoDashboard({ onLogout, userData, onUpdateUser }: AlunoDashboardProps) {
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [extrato, setExtrato] = useState<any[]>([]);
  const [vantagens, setVantagens] = useState<any[]>([]);
  const [loadingResgate, setLoadingResgate] = useState<number | null>(null);

  useEffect(() => {
    if (userData && userData.id) {
      fetchExtrato();
    }
    fetchVantagens();
  }, [userData]);

  const fetchVantagens = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/vantagens');
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setVantagens(data);
      } else {
        console.error('Erro ao buscar vantagens:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar vantagens:', error);
    }
  };

  const handleResgatar = async (vantagemId: number, custo: number) => {
    if (alunoData.saldo < custo) {
      toast.error('Saldo insuficiente!');
      return;
    }

    setLoadingResgate(vantagemId);
    try {
      const res = await fetch('http://localhost:3001/api/vantagens/resgatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alunoId: alunoData.id,
          vantagemId
        })
      });

      if (res.ok) {
        toast.success('Vantagem resgatada com sucesso! Verifique seu email.');
        if (onUpdateUser) {
          onUpdateUser({ ...alunoData, saldo: alunoData.saldo - custo });
        }
        fetchExtrato();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Erro ao resgatar vantagem.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro de conexão ao resgatar vantagem.');
    } finally {
      setLoadingResgate(null);
    }
  };

  const fetchExtrato = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/transacoes/aluno/${userData.id}`);
      const data = await res.json();
      setExtrato(data);
    } catch (error) {
      console.error('Erro ao buscar extrato do aluno:', error);
    }
  };

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

  const glassCardClass = "bg-card/40 backdrop-blur-2xl border-white/10 shadow-xl";

  return (
    <div className="min-h-screen bg-transparent text-white relative z-10">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-card/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="bg-primary/20 border border-primary/30 shadow-[0_0_15px_rgba(74,222,128,0.2)] p-2 rounded-lg"
              >
                <Coins className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white drop-shadow-sm">Sistema de Moedas</h1>
                <p className="text-sm text-white/60">Portal do Aluno</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white">{alunoData.nome}</p>
                <p className="text-xs text-white/60">{alunoData.curso}</p>
              </div>
              <Avatar className="ring-2 ring-primary/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                <AvatarImage src={alunoData.avatar} />
                <AvatarFallback className="bg-primary/20 text-primary font-bold">
                  {getInitials(alunoData.nome)}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={onLogout} className="border-white/20 text-white hover:bg-white/10 hover:text-white transition-colors bg-white/5">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 bg-black/20 border border-white/5 p-1 rounded-xl">
            <TabsTrigger value="visao-geral" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
              <TrendingUp className="w-4 h-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="vantagens" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
              <Gift className="w-4 h-4 mr-2" />
              Vantagens
            </TabsTrigger>
            <TabsTrigger value="perfil" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
              <User className="w-4 h-4 mr-2" />
              Meu Perfil
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Visão Geral Tab */}
              {activeTab === 'visao-geral' && (
                <TabsContent value="visao-geral" className="space-y-6 mt-0" forceMount>
                  {/* Card de Saldo */}
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2 bg-gradient-to-br from-primary/30 to-secondary/40 border border-primary/20 shadow-[0_0_40px_rgba(74,222,128,0.1)] backdrop-blur-xl relative overflow-hidden">
                      <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                      <CardHeader className="relative z-10">
                        <CardDescription className="text-white/80">Saldo Disponível</CardDescription>
                        <CardTitle className="text-5xl font-bold flex items-center gap-3 text-white drop-shadow-md">
                          <Coins className="w-12 h-12 text-primary" />
                          {alunoData.saldo.toLocaleString('pt-BR')} <span className="text-2xl font-normal opacity-80">moedas</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-sm text-white/70">
                          Continue participando de atividades acadêmicas para ganhar mais moedas!
                        </p>
                      </CardContent>
                    </Card>

                    <Card className={glassCardClass}>
                      <CardHeader>
                        <CardDescription className="text-white/70">Estatísticas Mensais</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-white/60">Recebido (mês)</span>
                            <span className="text-lg font-bold text-primary flex items-center"><ArrowDownLeft className="w-4 h-4 mr-1"/>+1.200</span>
                          </div>
                          <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[80%] rounded-full"></div>
                          </div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-white/60">Gasto (mês)</span>
                            <span className="text-lg font-bold text-red-400 flex items-center"><ArrowUpRight className="w-4 h-4 mr-1"/>-350</span>
                          </div>
                          <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-red-400 h-full w-[30%] rounded-full"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Histórico de Transações */}
                  <Card className={glassCardClass}>
                    <CardHeader>
                      <CardTitle className="text-white">Histórico de Transações</CardTitle>
                      <CardDescription className="text-white/60">Suas últimas movimentações de moedas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {extrato.length === 0 && (
                          <div className="text-center py-12">
                            <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                              <TrendingUp className="w-8 h-8 text-white/40" />
                            </div>
                            <p className="text-white/60">Nenhuma transação encontrada.</p>
                          </div>
                        )}
                        {extrato.map((transacao, index) => (
                          <motion.div 
                            key={transacao.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-black/20 p-4 rounded-xl border border-white/5 hover:bg-black/40 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`p-2.5 rounded-xl border ${transacao.tipo === 'resgate' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]'}`}>
                                  {transacao.tipo === 'resgate' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-white text-sm truncate">
                                    {transacao.motivo}
                                  </p>
                                  <p className="text-xs text-white/60 mt-1">
                                    {transacao.tipo === 'resgate'
                                      ? `Resgatado na empresa: ${transacao.empresa}`
                                      : `Enviado por: ${transacao.professor?.nome}`}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className="text-[10px] bg-black/40 border-white/10 text-white/70">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {new Date(transacao.data).toLocaleDateString('pt-BR')}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`text-lg font-bold ${transacao.tipo === 'resgate' ? 'text-red-400' : 'text-primary drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]'}`}>
                                  {transacao.tipo === 'resgate' ? '-' : '+'}{transacao.valor.toLocaleString('pt-BR')}
                                </p>
                                <Badge variant="outline" className={`text-xs mt-1 border-0 ${transacao.tipo === 'resgate' ? 'bg-red-500/20 text-red-300' : 'bg-primary/20 text-primary-foreground'}`}>
                                  {transacao.tipo === 'resgate' ? 'Resgatado' : 'Recebido'}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Vantagens Tab */}
              {activeTab === 'vantagens' && (
                <TabsContent value="vantagens" className="space-y-6 mt-0" forceMount>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {vantagens.length === 0 && (
                      <div className="col-span-full text-center py-16">
                        <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                          <Gift className="w-10 h-10 text-white/40" />
                        </div>
                        <p className="text-white/60 text-lg">Nenhuma vantagem disponível no momento.</p>
                      </div>
                    )}
                    {vantagens.map((vantagem, index) => {
                      const jaResgatado = extrato.some(item => item.tipo === 'resgate' && item.vantagemId === vantagem.id);
                      return (
                      <motion.div 
                        key={vantagem.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                      >
                        <Card className={`${glassCardClass} overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] hover:border-primary/30 ${jaResgatado ? 'opacity-60 grayscale' : 'hover:-translate-y-2'}`}>
                          <div className="aspect-video w-full overflow-hidden bg-black/40 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                            {vantagem.imagem ? (
                              <img
                                src={vantagem.imagem}
                                alt={vantagem.titulo}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = getFallbackImage(vantagem.id);
                                }}
                              />
                            ) : (
                              <img
                                src={getFallbackImage(vantagem.id)}
                                alt={vantagem.titulo}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              />
                            )}
                            <Badge className="absolute bottom-3 right-3 z-20 bg-primary text-primary-foreground border-0 shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                              <Coins className="w-3 h-3 mr-1" />
                              {vantagem.custo}
                            </Badge>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-white">{vantagem.titulo}</CardTitle>
                            <CardDescription className="text-primary">{vantagem.empresa?.nomeFantasia}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex flex-col flex-1">
                            <p className="text-sm text-white/70 mb-6 flex-1">{vantagem.descricao}</p>
                            <Button
                              className="w-full mt-auto"
                              variant={jaResgatado ? "secondary" : "default"}
                              disabled={jaResgatado || alunoData.saldo < vantagem.custo || loadingResgate === vantagem.id}
                              onClick={() => handleResgatar(vantagem.id, vantagem.custo)}
                            >
                              {jaResgatado ? (
                                <>
                                  <Gift className="w-4 h-4 mr-2" />
                                  Já Resgatado
                                </>
                              ) : loadingResgate === vantagem.id ? (
                                'Processando...'
                              ) : alunoData.saldo >= vantagem.custo ? (
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
                      </motion.div>
                    )})}
                  </div>
                </TabsContent>
              )}

              {/* Perfil Tab */}
              {activeTab === 'perfil' && (
                <TabsContent value="perfil" className="space-y-6 mt-0" forceMount>
                  <Card className={glassCardClass}>
                    <CardHeader>
                      <CardTitle className="text-white">Informações Pessoais</CardTitle>
                      <CardDescription className="text-white/60">Seus dados cadastrados no sistema</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="flex items-center gap-6 pb-8 border-b border-white/10">
                        <Avatar className="w-24 h-24 ring-4 ring-primary/20 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                          <AvatarImage src={alunoData.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-primary/40 to-secondary/40 text-white text-3xl font-bold">
                            {getInitials(alunoData.nome)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-1">{alunoData.nome}</h3>
                          <Badge variant="outline" className="bg-white/5 border-primary/30 text-primary">Aluno</Badge>
                        </div>
                      </div>

                      <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Email</p>
                              <p className="text-sm font-medium text-white">{alunoData.email}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">CPF</p>
                              <p className="text-sm font-medium text-white">{alunoData.cpf}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">RG</p>
                              <p className="text-sm font-medium text-white">{alunoData.rg}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <GraduationCap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Instituição</p>
                              <p className="text-sm font-medium text-white">{alunoData.instituicao}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <GraduationCap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Curso</p>
                              <p className="text-sm font-medium text-white">{alunoData.curso}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Endereço</p>
                              <p className="text-sm font-medium text-white">{alunoData.endereco}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-6 border-t border-white/10">
                        <Button className="bg-white/10 hover:bg-white/20 text-white border-0" onClick={() => setEditandoPerfil(true)}>
                          Editar Informações
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  );
}
