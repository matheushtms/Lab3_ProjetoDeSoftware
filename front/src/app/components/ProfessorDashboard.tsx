import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { LogOut, Coins, Send, History, User, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CoinEduLogo } from './CoinEduLogo';
import { toast } from 'sonner';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { API_BASE } from '../config';

interface ProfessorDashboardProps {
  onLogout: () => void;
  userData: any;
  onUpdateUser: (dados: any) => void;
}

export function ProfessorDashboard({ onLogout, userData, onUpdateUser }: ProfessorDashboardProps) {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [extrato, setExtrato] = useState<any[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState('');
  const [valorEnvio, setValorEnvio] = useState('');
  const [motivoEnvio, setMotivoEnvio] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('enviar');

  useEffect(() => {
    fetchAlunos();
    fetchExtrato();
  }, []);

  const fetchAlunos = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/alunos`);
      const data = await res.json();
      setAlunos(data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  const fetchExtrato = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/transacoes/professor/${userData.id}`);
      const data = await res.json();
      setExtrato(data);
    } catch (error) {
      console.error('Erro ao buscar extrato:', error);
    }
  };

  const handleEnviarMoedas = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alunoSelecionado || !valorEnvio || !motivoEnvio) {
      toast.error('Preencha todos os campos!');
      return;
    }

    if (Number(valorEnvio) <= 0) {
      toast.error('O valor deve ser maior que zero!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/transacoes/enviar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          professorId: userData.id,
          alunoId: alunoSelecionado,
          valor: Number(valorEnvio),
          motivo: motivoEnvio
        })
      });

      if (res.ok) {
        toast.success('Moedas enviadas com sucesso!');
        setValorEnvio('');
        setMotivoEnvio('');
        setAlunoSelecionado('');
        
        fetchExtrato();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Erro ao enviar moedas.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro de conexão ao enviar moedas.');
    } finally {
      setLoading(false);
    }
  };

  const glassCardClass = "bg-card/40 backdrop-blur-2xl border-white/10 shadow-xl";
  const inputClass = "bg-black/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary transition-all";

  return (
    <div className="min-h-screen bg-transparent text-white relative z-10 flex flex-col">
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
                <p className="text-sm text-white/60">Portal do Professor</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:block text-right">
                <p className="text-sm text-white/60 font-medium mb-1">Saldo Disponível</p>
                <p className="text-xl font-bold text-primary flex items-center justify-end gap-1 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">
                  <span className="text-2xl leading-none">∞</span> <Coins className="w-5 h-5 ml-1" />
                </p>
              </div>
              <div className="hidden sm:block text-right border-l border-white/10 pl-6">
                <p className="text-sm font-medium text-white">{userData?.nome}</p>
                <p className="text-xs text-white/60">Professor</p>
              </div>
              <Avatar className="ring-2 ring-primary/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                <AvatarFallback className="bg-primary/20 text-primary font-bold">
                  {userData?.nome?.substring(0, 2).toUpperCase() || 'PR'}
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
      <main className="flex-1 p-4 sm:p-8 max-w-5xl mx-auto w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 bg-black/20 border border-white/5 p-1 rounded-xl flex">
            <TabsTrigger value="enviar" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
              <Send className="w-4 h-4 mr-2" />
              Enviar Moedas
            </TabsTrigger>
            <TabsTrigger value="extrato" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
              <History className="w-4 h-4 mr-2" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="estatisticas" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">
              <History className="w-4 h-4 mr-2" />
              Estatísticas
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
              {activeTab === 'enviar' && (
                <TabsContent value="enviar" className="mt-0" forceMount>
                  <Card className={`${glassCardClass} max-w-2xl mx-auto relative overflow-hidden`}>
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-[50px]"></div>
                    <CardHeader className="relative z-10 text-center pb-8">
                      <div className="mx-auto bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-primary/30 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                        <Send className="w-8 h-8 text-primary ml-1" />
                      </div>
                      <CardTitle className="text-2xl text-white">Reconheça o Mérito</CardTitle>
                      <CardDescription className="text-white/60">
                        Selecione um aluno e envie moedas para recompensar seu esforço acadêmico.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <form onSubmit={handleEnviarMoedas} className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-white/80">Aluno Destino</Label>
                          <select
                            className={`w-full flex h-10 items-center justify-between rounded-md px-3 py-2 text-sm outline-none ${inputClass}`}
                            value={alunoSelecionado}
                            onChange={(e) => setAlunoSelecionado(e.target.value)}
                            required
                          >
                            <option value="" className="bg-[#041f10] text-white">Selecione um aluno...</option>
                            {alunos.map(aluno => (
                              <option key={aluno.id} value={aluno.id} className="bg-[#041f10] text-white">
                                {aluno.nome} ({aluno.email})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white/80">Quantidade de Moedas</Label>
                          <div className="relative">
                            <Coins className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
                            <Input
                              type="number"
                              min="1"
                              placeholder="Ex: 50"
                              value={valorEnvio}
                              onChange={(e) => setValorEnvio(e.target.value)}
                              required
                              className={`${inputClass} pl-10`}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white/80">Motivo do Reconhecimento</Label>
                          <textarea
                            className={`flex min-h-[100px] w-full rounded-md px-3 py-2 text-sm outline-none resize-none ${inputClass}`}
                            placeholder="Ex: Excelente participação na aula de hoje, desenvolvimento de projeto inovador..."
                            value={motivoEnvio}
                            onChange={(e) => setMotivoEnvio(e.target.value)}
                            required
                          />
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg shadow-[0_0_15px_rgba(74,222,128,0.4)] transition-all hover:scale-[1.02]" 
                          disabled={loading}
                        >
                          {loading ? 'Enviando...' : 'Confirmar Envio'}
                          {!loading && <Send className="w-5 h-5 ml-2" />}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {activeTab === 'extrato' && (
                <TabsContent value="extrato" className="mt-0" forceMount>
                  <Card className={glassCardClass}>
                    <CardHeader>
                      <CardTitle className="text-white">Histórico de Envios</CardTitle>
                      <CardDescription className="text-white/60">
                        Acompanhe todas as moedas que você distribuiu para os alunos.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {extrato.length === 0 ? (
                        <div className="text-center py-16">
                          <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <History className="w-10 h-10 text-white/40" />
                          </div>
                          <p className="text-white/60 text-lg">Você ainda não realizou nenhum envio de moedas.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {extrato.map((transacao: any, index) => (
                            <motion.div 
                              key={transacao.id} 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl hover:bg-black/40 transition-colors gap-4"
                            >
                              <div className="flex items-start sm:items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-xl text-primary border border-primary/20 shadow-[0_0_10px_rgba(74,222,128,0.1)] shrink-0">
                                  <Send className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-medium text-white mb-1">
                                    Enviado para <span className="text-primary">{transacao.aluno?.nome}</span>
                                  </p>
                                  <p className="text-sm text-white/60 bg-white/5 px-3 py-1.5 rounded-lg inline-block">
                                    {transacao.motivo}
                                  </p>
                                </div>
                              </div>
                              <div className="sm:text-right shrink-0 mt-2 sm:mt-0 flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end">
                                <p className="text-xl font-bold text-primary flex items-center gap-1 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">
                                  -{transacao.valor} <Coins className="w-4 h-4" />
                                </p>
                                <p className="text-xs text-white/40 mt-1">
                                  {new Date(transacao.data).toLocaleString('pt-BR')}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {activeTab === 'estatisticas' && (
                <TabsContent value="estatisticas" className="mt-0 space-y-6" forceMount>
                  <Card className={glassCardClass}>
                    <CardHeader>
                      <CardTitle className="text-white">Envio de Moedas (Últimos Meses)</CardTitle>
                      <CardDescription className="text-white/60">Evolução de engajamento do professor</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] w-full pt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { name: 'Fev', enviadas: 200 },
                            { name: 'Mar', enviadas: 450 },
                            { name: 'Abr', enviadas: 300 },
                            { name: 'Mai', enviadas: 600 },
                            { name: 'Jun', enviadas: 800 },
                            { name: 'Jul', enviadas: 500 },
                          ]}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                          <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} 
                            itemStyle={{ color: '#fff' }}
                          />
                          <Line type="monotone" dataKey="enviadas" stroke="#4ade80" strokeWidth={3} dot={{ fill: '#4ade80', strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} animationDuration={2000} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className={glassCardClass}>
                    <CardHeader>
                      <CardTitle className="text-white">Alunos Mais Reconhecidos</CardTitle>
                      <CardDescription className="text-white/60">Top 5 alunos que mais receberam moedas de você</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] w-full pt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'João Silva', moedas: 120 },
                            { name: 'Maria Souza', moedas: 95 },
                            { name: 'Pedro Costa', moedas: 80 },
                            { name: 'Ana Rosa', moedas: 60 },
                            { name: 'Lucas P.', moedas: 50 },
                          ]}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                          <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.5)'}} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} 
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                          />
                          <Bar dataKey="moedas" fill="#4ade80" radius={[4, 4, 0, 0]} animationDuration={2000} />
                        </BarChart>
                      </ResponsiveContainer>
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
