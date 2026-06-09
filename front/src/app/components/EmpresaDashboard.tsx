import { useState, useEffect } from 'react';
import { EditarPerfilEmpresa } from './EditarPerfilEmpresa';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { getFallbackImage } from './ui/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CoinEduLogo } from './CoinEduLogo';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Building2,
  Gift,
  Users,
  TrendingUp,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { API_BASE } from '../config';

interface EmpresaDashboardProps {
  onLogout: () => void;
  userData?: any;
  onUpdateUser?: (data: any) => void;
}

interface Vantagem {
  id: number;
  titulo: string;
  descricao: string;
  custo: number;
  foto: string;
  ativa: boolean;
  totalResgates: number;
}

interface Resgate {
  id: number;
  aluno: string;
  email: string;
  vantagem: string;
  data: string;
  cupom: string;
  utilizado: boolean;
}

export function EmpresaDashboard({ onLogout, userData, onUpdateUser }: EmpresaDashboardProps) {
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [vantagemEditando, setVantagemEditando] = useState<Vantagem | null>(null);
  const [editandoPerfil, setEditandoPerfil] = useState(false);

  // Dados mockados da empresa
  const empresaData = userData ? {
    id: userData.id,
    nome: userData.nomeFantasia || 'Empresa Parceira',
    cnpj: userData.cnpj || 'Não informado',
    email: userData.email,
    telefone: userData.telefone || 'Não informado',
    endereco: userData.endereco || 'Não informado',
    setor: userData.setor || 'Não informado',
    responsavel: userData.responsavel || 'Não informado',
    senha: userData.senha || '',
  } : {
    id: 1,
    nome: 'Restaurante Universitário Premium',
    cnpj: '12.345.678/0001-90',
    email: 'contato@rupremium.com.br',
    telefone: '(11) 98765-4321',
    endereco: 'Av. Universitária, 1000, Campus Central',
    setor: 'Alimentação',
    responsavel: 'Maria Oliveira'
  };

  const [vantagens, setVantagens] = useState<any[]>([]);
  const [resgates, setResgates] = useState<Resgate[]>([]);

  useEffect(() => {
    if (empresaData.id) {
      fetchVantagens();
      fetchResgates();
    }
  }, [empresaData.id]);

  const fetchVantagens = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/vantagens?empresaId=${empresaData.id}`);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setVantagens(data.map((v: any) => ({
          ...v,
          foto: v.imagem || getFallbackImage(v.id),
          ativa: true,
          totalResgates: v.resgates?.length || 0
        })));
      } else {
        console.error('Erro ao buscar vantagens:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar vantagens:', error);
    }
  };

  const fetchResgates = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/empresas/${empresaData.id}/resgates`);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setResgates(data);
      } else {
        console.error('Erro ao buscar resgates da empresa:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar resgates da empresa:', error);
    }
  };

  const [formVantagem, setFormVantagem] = useState({
    titulo: '',
    descricao: '',
    custo: '',
    foto: ''
  });

  const handleAdicionarVantagem = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/vantagens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empresaId: empresaData.id,
          titulo: formVantagem.titulo,
          descricao: formVantagem.descricao,
          custo: parseInt(formVantagem.custo),
          imagem: formVantagem.foto
        })
      });

      if (res.ok) {
        toast.success('Vantagem adicionada com sucesso!');
        setFormVantagem({ titulo: '', descricao: '', custo: '', foto: '' });
        setDialogAberto(false);
        fetchVantagens();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Erro ao adicionar vantagem.');
      }
    } catch (error) {
      toast.error('Erro de conexão ao adicionar vantagem.');
    }
  };

  const handleEditarVantagem = async () => {
    if (!vantagemEditando) return;

    try {
      const res = await fetch(`${API_BASE}/api/vantagens/${vantagemEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: formVantagem.titulo,
          descricao: formVantagem.descricao,
          custo: parseInt(formVantagem.custo),
          imagem: formVantagem.foto
        })
      });

      if (res.ok) {
        toast.success('Vantagem atualizada com sucesso!');
        setFormVantagem({ titulo: '', descricao: '', custo: '', foto: '' });
        setVantagemEditando(null);
        setDialogAberto(false);
        fetchVantagens();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Erro ao atualizar vantagem.');
      }
    } catch (error) {
      toast.error('Erro de conexão ao atualizar vantagem.');
    }
  };

  const handleDeletarVantagem = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/vantagens/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success('Vantagem removida com sucesso!');
        fetchVantagens();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Erro ao remover vantagem.');
      }
    } catch (error) {
      toast.error('Erro de conexão ao remover vantagem.');
    }
  };

  const abrirDialogAdicionar = () => {
    setFormVantagem({ titulo: '', descricao: '', custo: '', foto: '' });
    setVantagemEditando(null);
    setDialogAberto(true);
  };

  const abrirDialogEditar = (vantagem: Vantagem) => {
    setFormVantagem({
      titulo: vantagem.titulo,
      descricao: vantagem.descricao,
      custo: vantagem.custo.toString(),
      foto: vantagem.foto
    });
    setVantagemEditando(vantagem);
    setDialogAberto(true);
  };

  const totalResgates = vantagens.reduce((acc, v) => acc + v.totalResgates, 0);
  const vantagensAtivas = vantagens.filter(v => v.ativa).length;

  if (editandoPerfil) {
    return (
      <EditarPerfilEmpresa
        onVoltar={() => setEditandoPerfil(false)}
        onDeletarConta={onLogout}
        onUpdate={(dadosAtualizados) => {
          if (onUpdateUser) onUpdateUser(dadosAtualizados);
        }}
        dadosIniciais={{
          id: empresaData.id,
          nomeFantasia: empresaData.nome,
          cnpj: empresaData.cnpj,
          email: empresaData.email,
          telefone: empresaData.telefone,
          endereco: empresaData.endereco,
          setor: empresaData.setor,
          responsavel: empresaData.responsavel,
          senha: (empresaData as any).senha || ''
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
              <CoinEduLogo size="sm" />
              <div>
                <h1 className="text-xl font-bold text-white drop-shadow-sm">CoinEdu</h1>
                <p className="text-sm text-white/60">Portal da Empresa</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white">{empresaData.nome}</p>
                <p className="text-xs text-white/60">{empresaData.setor}</p>
              </div>
              <Avatar className="ring-2 ring-primary/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                <AvatarFallback className="bg-primary/20 text-primary font-bold">
                  {empresaData.nome.substring(0, 2).toUpperCase()}
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
              Minhas Vantagens
            </TabsTrigger>
            <TabsTrigger value="resgates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
              <Users className="w-4 h-4 mr-2" />
              Resgates
            </TabsTrigger>
            <TabsTrigger value="perfil" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
              <Building2 className="w-4 h-4 mr-2" />
              Perfil da Empresa
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
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card className={`${glassCardClass} relative overflow-hidden bg-gradient-to-br from-primary/20 to-transparent`}>
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 rounded-full blur-[40px]"></div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-white/80">Total de Vantagens</CardTitle>
                        <Gift className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="text-3xl font-bold text-white">{vantagens.length}</div>
                        <p className="text-xs text-white/60">
                          {vantagensAtivas} ativas
                        </p>
                      </CardContent>
                    </Card>

                    <Card className={`${glassCardClass} relative overflow-hidden bg-gradient-to-br from-secondary/20 to-transparent`}>
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary/20 rounded-full blur-[40px]"></div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-white/80">Total de Resgates</CardTitle>
                        <Users className="h-4 w-4 text-secondary-foreground" />
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="text-3xl font-bold text-white">{totalResgates}</div>
                        <p className="text-xs text-white/60">
                          Todos os tempos
                        </p>
                      </CardContent>
                    </Card>

                    <Card className={`${glassCardClass} relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-transparent`}>
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px]"></div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-white/80">Resgates Este Mês</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-400" />
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="text-3xl font-bold text-white">12</div>
                        <p className="text-xs text-blue-300">
                          +20% em relação ao mês anterior
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Gráficos */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className={glassCardClass}>
                      <CardHeader>
                        <CardTitle className="text-white">Popularidade das Vantagens</CardTitle>
                        <CardDescription className="text-white/60">Distribuição de resgates por vantagem</CardDescription>
                      </CardHeader>
                      <CardContent className="h-[300px] w-full pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={vantagens.length > 0 ? vantagens.map(v => ({ name: v.titulo, value: v.totalResgates })) : [{ name: 'Nenhuma', value: 1 }]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                              animationDuration={2000}
                            >
                              {(vantagens.length > 0 ? vantagens : [{}]).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#4ade80', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'][index % 5]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} 
                              itemStyle={{ color: '#fff' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className={glassCardClass}>
                      <CardHeader>
                        <CardTitle className="text-white">Evolução de Resgates</CardTitle>
                        <CardDescription className="text-white/60">Resgates realizados nos últimos meses</CardDescription>
                      </CardHeader>
                      <CardContent className="h-[300px] w-full pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={[
                              { name: 'Fev', resgates: 5 },
                              { name: 'Mar', resgates: 12 },
                              { name: 'Abr', resgates: 8 },
                              { name: 'Mai', resgates: 25 },
                              { name: 'Jun', resgates: 40 },
                              { name: 'Jul', resgates: 30 },
                            ]}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorResgates" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                            <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} 
                              itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="resgates" stroke="#3b82f6" fillOpacity={1} fill="url(#colorResgates)" animationDuration={2000} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Vantagens mais populares */}
                  <Card className={glassCardClass}>
                    <CardHeader>
                      <CardTitle className="text-white">Vantagens Mais Resgatadas</CardTitle>
                      <CardDescription className="text-white/60">Top 3 vantagens por número de resgates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {vantagens.length === 0 ? (
                           <div className="text-center py-8">
                             <p className="text-white/60">Nenhuma vantagem encontrada.</p>
                           </div>
                        ) : (
                          vantagens
                            .sort((a, b) => b.totalResgates - a.totalResgates)
                            .slice(0, 3)
                            .map((vantagem, index) => (
                              <motion.div 
                                key={vantagem.id} 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4 bg-black/20 p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                                  {index + 1}
                                </div>
                                <img
                                  src={vantagem.foto}
                                  alt={vantagem.titulo}
                                  className="w-16 h-16 rounded-lg object-cover border border-white/10"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = getFallbackImage(vantagem.id);
                                  }}
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-white">{vantagem.titulo}</p>
                                  <p className="text-sm text-primary">{vantagem.totalResgates} resgates</p>
                                </div>
                                <Badge variant="outline" className={`border-0 ${vantagem.ativa ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/60'}`}>
                                  {vantagem.ativa ? 'Ativa' : 'Inativa'}
                                </Badge>
                              </motion.div>
                            ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Vantagens Tab */}
              {activeTab === 'vantagens' && (
                <TabsContent value="vantagens" className="space-y-6 mt-0" forceMount>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Gerenciar Vantagens</h2>
                      <p className="text-sm text-white/60">Adicione, edite ou remova vantagens</p>
                    </div>
                    <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
                      <DialogTrigger asChild>
                        <Button onClick={abrirDialogAdicionar} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(74,222,128,0.4)]">
                          <Plus className="w-4 h-4 mr-2" />
                          Nova Vantagem
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-[#041f10]/95 backdrop-blur-3xl border-white/10 text-white shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <DialogHeader>
                          <DialogTitle className="text-white">
                            {vantagemEditando ? 'Editar Vantagem' : 'Nova Vantagem'}
                          </DialogTitle>
                          <DialogDescription className="text-white/60">
                            Preencha os dados da vantagem que deseja oferecer
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="titulo" className="text-white/80">Título da Vantagem</Label>
                            <Input
                              id="titulo"
                              placeholder="Ex: Almoço Grátis"
                              value={formVantagem.titulo}
                              onChange={(e) => setFormVantagem({ ...formVantagem, titulo: e.target.value })}
                              className="bg-black/40 border-white/10 text-white focus-visible:ring-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="descricao" className="text-white/80">Descrição</Label>
                            <Textarea
                              id="descricao"
                              placeholder="Descreva a vantagem oferecida"
                              value={formVantagem.descricao}
                              onChange={(e) => setFormVantagem({ ...formVantagem, descricao: e.target.value })}
                              className="bg-black/40 border-white/10 text-white focus-visible:ring-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="custo" className="text-white/80">Custo em Moedas</Label>
                            <Input
                              id="custo"
                              type="number"
                              placeholder="Ex: 200"
                              value={formVantagem.custo}
                              onChange={(e) => setFormVantagem({ ...formVantagem, custo: e.target.value })}
                              className="bg-black/40 border-white/10 text-white focus-visible:ring-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="foto" className="text-white/80">URL da Foto</Label>
                            <Input
                              id="foto"
                              type="url"
                              placeholder="https://exemplo.com/imagem.jpg"
                              value={formVantagem.foto}
                              onChange={(e) => setFormVantagem({ ...formVantagem, foto: e.target.value })}
                              className="bg-black/40 border-white/10 text-white focus-visible:ring-primary"
                            />
                            <div className="mt-4">
                              <Label className="text-sm text-white/50 mb-2 block">Ou escolha uma foto pré-pronta:</Label>
                              <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                {[
                                  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
                                  'https://images.unsplash.com/photo-1543168256-418811576931?w=400&q=80',
                                  'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400&q=80',
                                  'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=400&q=80',
                                  'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&q=80'
                                ].map((url, i) => (
                                  <img
                                    key={i}
                                    src={url}
                                    alt={`Opção ${i + 1}`}
                                    className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all flex-shrink-0 ${
                                      formVantagem.foto === url ? 'border-primary scale-105 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'border-transparent hover:border-white/30'
                                    }`}
                                    onClick={() => setFormVantagem({ ...formVantagem, foto: url })}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDialogAberto(false)} className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                            Cancelar
                          </Button>
                          <Button
                            onClick={vantagemEditando ? handleEditarVantagem : handleAdicionarVantagem}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            {vantagemEditando ? 'Salvar Alterações' : 'Adicionar Vantagem'}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {vantagens.length === 0 && (
                      <div className="col-span-full text-center py-16">
                        <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                          <Gift className="w-10 h-10 text-white/40" />
                        </div>
                        <p className="text-white/60 text-lg">Nenhuma vantagem cadastrada.</p>
                      </div>
                    )}
                    {vantagens.map((vantagem, index) => (
                      <motion.div 
                        key={vantagem.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                      >
                        <Card className={`${glassCardClass} overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] hover:border-primary/30 hover:-translate-y-1`}>
                          <div className="aspect-video w-full overflow-hidden bg-black/40 relative">
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                            <img
                              src={vantagem.foto}
                              alt={vantagem.titulo}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = getFallbackImage(vantagem.id);
                              }}
                            />
                            <Badge className="absolute top-3 right-3 z-20" variant={vantagem.ativa ? 'default' : 'secondary'}>
                              {vantagem.ativa ? 'Ativa' : 'Inativa'}
                            </Badge>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-white">{vantagem.titulo}</CardTitle>
                            <CardDescription className="text-white/60 line-clamp-2">{vantagem.descricao}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex flex-col flex-1 space-y-4">
                            <div className="bg-black/20 p-3 rounded-lg border border-white/5 mt-auto">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-white/60">Custo:</span>
                                <span className="font-bold text-primary">{vantagem.custo} moedas</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-white/60">Resgates:</span>
                                <span className="font-medium text-white">{vantagem.totalResgates}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                                onClick={() => abrirDialogEditar(vantagem)}
                              >
                                <Edit className="w-4 h-4 mr-1 text-white/70" />
                                Editar
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="flex-1 bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300">
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Excluir
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-[#041f10]/95 backdrop-blur-3xl border-white/10 text-white">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-white">Tem certeza?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-white/60">
                                      Esta ação não pode ser desfeita. Isso irá deletar permanentemente
                                      a vantagem "{vantagem.titulo}".
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeletarVantagem(vantagem.id)}
                                      className="bg-red-500 text-white hover:bg-red-600"
                                    >
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              )}

              {/* Resgates Tab */}
              {activeTab === 'resgates' && (
                <TabsContent value="resgates" className="space-y-6 mt-0" forceMount>
                  <Card className={glassCardClass}>
                    <CardHeader>
                      <CardTitle className="text-white">Histórico de Resgates</CardTitle>
                      <CardDescription className="text-white/60">Alunos que resgataram suas vantagens</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20">
                        <Table>
                          <TableHeader className="bg-white/5">
                            <TableRow className="border-white/10 hover:bg-transparent">
                              <TableHead className="text-white/80">Aluno</TableHead>
                              <TableHead className="text-white/80">Vantagem</TableHead>
                              <TableHead className="text-white/80">Cupom</TableHead>
                              <TableHead className="text-white/80">Data</TableHead>
                              <TableHead className="text-white/80">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {resgates.map((resgate) => (
                              <TableRow key={resgate.id} className="border-white/10 hover:bg-white/5 transition-colors">
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-white">{resgate.aluno}</p>
                                    <p className="text-xs text-white/50">{resgate.email}</p>
                                  </div>
                                </TableCell>
                                <TableCell className="text-white/80">{resgate.vantagem}</TableCell>
                                <TableCell>
                                  <code className="bg-black/40 border border-white/10 px-2 py-1 rounded text-xs text-primary font-mono">
                                    {resgate.cupom}
                                  </code>
                                </TableCell>
                                <TableCell className="text-white/80">
                                  {new Date(resgate.data).toLocaleDateString('pt-BR')}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className={`border-0 ${resgate.utilizado ? 'bg-white/10 text-white/60' : 'bg-primary/20 text-primary shadow-[0_0_10px_rgba(74,222,128,0.2)]'}`}>
                                    {resgate.utilizado ? 'Utilizado' : 'Pendente'}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Perfil Tab */}
              {activeTab === 'perfil' && (
                <TabsContent value="perfil" className="space-y-6 mt-0" forceMount>
                  <Card className={glassCardClass}>
                    <CardHeader>
                      <CardTitle className="text-white">Informações da Empresa</CardTitle>
                      <CardDescription className="text-white/60">Dados cadastrados no sistema</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                       <div className="flex items-center gap-6 pb-8 border-b border-white/10">
                        <Avatar className="w-24 h-24 ring-4 ring-primary/20 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                          <AvatarFallback className="bg-gradient-to-br from-primary/40 to-secondary/40 text-white text-3xl font-bold">
                            {empresaData.nome.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-1">{empresaData.nome}</h3>
                          <Badge variant="outline" className="bg-white/5 border-primary/30 text-primary">Empresa Parceira</Badge>
                        </div>
                      </div>

                      <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">CNPJ</p>
                              <p className="text-sm font-medium text-white">{empresaData.cnpj}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Email</p>
                              <p className="text-sm font-medium text-white">{empresaData.email}</p>
                            </div>
                          </div>
                          
                           <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Responsável</p>
                              <p className="text-sm font-medium text-white">{empresaData.responsavel}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <Phone className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Telefone</p>
                              <p className="text-sm font-medium text-white">{empresaData.telefone}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Setor</p>
                              <p className="text-sm font-medium text-white">{empresaData.setor}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Endereço</p>
                              <p className="text-sm font-medium text-white">{empresaData.endereco}</p>
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
