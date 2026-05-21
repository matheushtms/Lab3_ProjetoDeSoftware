import { useState, useEffect } from 'react';
import { EditarPerfilEmpresa } from './EditarPerfilEmpresa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { getFallbackImage } from './ui/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

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

  useEffect(() => {
    if (empresaData.id) {
      fetchVantagens();
    }
  }, [empresaData.id]);

  const fetchVantagens = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/vantagens?empresaId=${empresaData.id}`);
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

  // Resgates mockados
  const resgates: Resgate[] = [
    {
      id: 1,
      aluno: 'João Silva',
      email: 'joao.silva@universidade.edu.br',
      vantagem: 'Almoço Grátis',
      data: '2026-05-18',
      cupom: 'RUP-2026-001',
      utilizado: true
    },
    {
      id: 2,
      aluno: 'Maria Santos',
      email: 'maria.santos@universidade.edu.br',
      vantagem: '30% OFF em Combos',
      data: '2026-05-17',
      cupom: 'RUP-2026-002',
      utilizado: false
    },
    {
      id: 3,
      aluno: 'Pedro Costa',
      email: 'pedro.costa@universidade.edu.br',
      vantagem: 'Almoço Grátis',
      data: '2026-05-16',
      cupom: 'RUP-2026-003',
      utilizado: true
    },
    {
      id: 4,
      aluno: 'Ana Paula',
      email: 'ana.paula@universidade.edu.br',
      vantagem: 'Sobremesa Grátis',
      data: '2026-05-15',
      cupom: 'RUP-2026-004',
      utilizado: false
    }
  ];

  const [formVantagem, setFormVantagem] = useState({
    titulo: '',
    descricao: '',
    custo: '',
    foto: ''
  });

  const handleAdicionarVantagem = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/vantagens', {
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
      const res = await fetch(`http://localhost:3001/api/vantagens/${vantagemEditando.id}`, {
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

  const handleDeletarVantagem = (id: number) => {
    setVantagens(vantagens.filter(v => v.id !== id));
    toast.success('Vantagem removida com sucesso!');
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistema de Moedas</h1>
                <p className="text-sm text-gray-500">Portal da Empresa</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{empresaData.nome}</p>
                <p className="text-xs text-gray-500">{empresaData.setor}</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                  {empresaData.nome.substring(0, 2).toUpperCase()}
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
              Minhas Vantagens
            </TabsTrigger>
            <TabsTrigger value="resgates">
              <Users className="w-4 h-4 mr-2" />
              Resgates
            </TabsTrigger>
            <TabsTrigger value="perfil">
              <Building2 className="w-4 h-4 mr-2" />
              Perfil da Empresa
            </TabsTrigger>
          </TabsList>

          {/* Visão Geral Tab */}
          <TabsContent value="visao-geral" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Vantagens</CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vantagens.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {vantagensAtivas} ativas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Resgates</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalResgates}</div>
                  <p className="text-xs text-muted-foreground">
                    Todos os tempos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resgates Este Mês</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +20% em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Vantagens mais populares */}
            <Card>
              <CardHeader>
                <CardTitle>Vantagens Mais Resgatadas</CardTitle>
                <CardDescription>Top 3 vantagens por número de resgates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vantagens
                    .sort((a, b) => b.totalResgates - a.totalResgates)
                    .slice(0, 3)
                    .map((vantagem, index) => (
                      <div key={vantagem.id} className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 text-white font-bold">
                          {index + 1}
                        </div>
                        <img
                          src={vantagem.foto}
                          alt={vantagem.titulo}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = getFallbackImage(vantagem.id);
                          }}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{vantagem.titulo}</p>
                          <p className="text-sm text-gray-500">{vantagem.totalResgates} resgates</p>
                        </div>
                        <Badge variant={vantagem.ativa ? 'default' : 'secondary'}>
                          {vantagem.ativa ? 'Ativa' : 'Inativa'}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vantagens Tab */}
          <TabsContent value="vantagens" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Gerenciar Vantagens</h2>
                <p className="text-sm text-gray-500">Adicione, edite ou remova vantagens</p>
              </div>
              <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
                <DialogTrigger asChild>
                  <Button onClick={abrirDialogAdicionar}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Vantagem
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {vantagemEditando ? 'Editar Vantagem' : 'Nova Vantagem'}
                    </DialogTitle>
                    <DialogDescription>
                      Preencha os dados da vantagem que deseja oferecer
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="titulo">Título da Vantagem</Label>
                      <Input
                        id="titulo"
                        placeholder="Ex: Almoço Grátis"
                        value={formVantagem.titulo}
                        onChange={(e) => setFormVantagem({ ...formVantagem, titulo: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        placeholder="Descreva a vantagem oferecida"
                        value={formVantagem.descricao}
                        onChange={(e) => setFormVantagem({ ...formVantagem, descricao: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custo">Custo em Moedas</Label>
                      <Input
                        id="custo"
                        type="number"
                        placeholder="Ex: 200"
                        value={formVantagem.custo}
                        onChange={(e) => setFormVantagem({ ...formVantagem, custo: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="foto">URL da Foto</Label>
                      <Input
                        id="foto"
                        type="url"
                        placeholder="https://exemplo.com/imagem.jpg"
                        value={formVantagem.foto}
                        onChange={(e) => setFormVantagem({ ...formVantagem, foto: e.target.value })}
                      />
                      <div className="mt-4">
                        <Label className="text-sm text-gray-500 mb-2 block">Ou escolha uma foto pré-pronta:</Label>
                        <div className="flex gap-2 overflow-x-auto pb-2">
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
                              className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all ${
                                formVantagem.foto === url ? 'border-blue-600 scale-105' : 'border-transparent hover:border-gray-300'
                              }`}
                              onClick={() => setFormVantagem({ ...formVantagem, foto: url })}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogAberto(false)}>
                      Cancelar
                    </Button>
                    <Button
                      onClick={vantagemEditando ? handleEditarVantagem : handleAdicionarVantagem}
                    >
                      {vantagemEditando ? 'Salvar Alterações' : 'Adicionar Vantagem'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vantagens.map((vantagem) => (
                <Card key={vantagem.id}>
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    <img
                      src={vantagem.foto}
                      alt={vantagem.titulo}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getFallbackImage(vantagem.id);
                      }}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{vantagem.titulo}</CardTitle>
                      <Badge variant={vantagem.ativa ? 'default' : 'secondary'}>
                        {vantagem.ativa ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </div>
                    <CardDescription>{vantagem.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Custo:</span>
                      <span className="font-semibold">{vantagem.custo} moedas</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total de resgates:</span>
                      <span className="font-semibold">{vantagem.totalResgates}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => abrirDialogEditar(vantagem)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Excluir
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Isso irá deletar permanentemente
                              a vantagem "{vantagem.titulo}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeletarVantagem(vantagem.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resgates Tab */}
          <TabsContent value="resgates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Resgates</CardTitle>
                <CardDescription>Alunos que resgataram suas vantagens</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aluno</TableHead>
                      <TableHead>Vantagem</TableHead>
                      <TableHead>Cupom</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resgates.map((resgate) => (
                      <TableRow key={resgate.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{resgate.aluno}</p>
                            <p className="text-xs text-gray-500">{resgate.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{resgate.vantagem}</TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {resgate.cupom}
                          </code>
                        </TableCell>
                        <TableCell>
                          {new Date(resgate.data).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <Badge variant={resgate.utilizado ? 'secondary' : 'default'}>
                            {resgate.utilizado ? 'Utilizado' : 'Pendente'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Perfil Tab */}
          <TabsContent value="perfil" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>Dados cadastrados no sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Nome da Empresa</p>
                        <p className="text-sm text-gray-900">{empresaData.nome}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">CNPJ</p>
                        <p className="text-sm text-gray-900">{empresaData.cnpj}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-sm text-gray-900">{empresaData.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Telefone</p>
                        <p className="text-sm text-gray-900">{empresaData.telefone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Setor</p>
                        <p className="text-sm text-gray-900">{empresaData.setor}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Endereço</p>
                        <p className="text-sm text-gray-900">{empresaData.endereco}</p>
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
