import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { LogOut, Coins, Send, History, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

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

  useEffect(() => {
    fetchAlunos();
    fetchExtrato();
  }, []);

  const fetchAlunos = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/alunos');
      const data = await res.json();
      setAlunos(data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  const fetchExtrato = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/transacoes/professor/${userData.id}`);
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

    if (Number(valorEnvio) > userData.saldo) {
      toast.error('Saldo insuficiente!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/transacoes/enviar', {
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
        
        // Atualiza saldo local
        onUpdateUser({ ...userData, saldo: userData.saldo - Number(valorEnvio) });
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-full">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">Portal do Professor</h1>
            <p className="text-sm text-gray-500">Olá, {userData?.nome}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-gray-500 font-medium">Saldo Disponível</p>
            <p className="text-2xl font-bold text-blue-600 flex items-center justify-end gap-1">
              {userData?.saldo} <Coins className="w-5 h-5" />
            </p>
          </div>
          <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <Tabs defaultValue="enviar" className="w-full">
          <TabsList className="mb-8 bg-white border shadow-sm p-1">
            <TabsTrigger value="enviar" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Enviar Moedas
            </TabsTrigger>
            <TabsTrigger value="extrato" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Extrato
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enviar">
            <Card className="shadow-md border-0 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Reconheça o Mérito</CardTitle>
                <CardDescription>
                  Selecione um aluno e envie moedas para recompensar seu esforço.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEnviarMoedas} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Aluno Destino</Label>
                    <select
                      className="w-full flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={alunoSelecionado}
                      onChange={(e) => setAlunoSelecionado(e.target.value)}
                      required
                    >
                      <option value="">Selecione um aluno...</option>
                      {alunos.map(aluno => (
                        <option key={aluno.id} value={aluno.id}>
                          {aluno.nome} ({aluno.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Quantidade de Moedas</Label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Ex: 50"
                      value={valorEnvio}
                      onChange={(e) => setValorEnvio(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Motivo do Reconhecimento</Label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Ex: Excelente participação na aula de hoje..."
                      value={motivoEnvio}
                      onChange={(e) => setMotivoEnvio(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Enviando...' : 'Confirmar Envio'}
                    {!loading && <Send className="w-4 h-4 ml-2" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="extrato">
            <Card className="shadow-md border-0">
              <CardHeader>
                <CardTitle>Histórico de Envios</CardTitle>
                <CardDescription>
                  Acompanhe todas as moedas que você distribuiu.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {extrato.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <History className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>Você ainda não realizou nenhum envio de moedas.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {extrato.map((transacao: any) => (
                      <div key={transacao.id} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="bg-red-100 p-3 rounded-full text-red-600">
                            <Send className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Enviado para {transacao.aluno?.nome}</p>
                            <p className="text-sm text-gray-500">{transacao.motivo}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(transacao.data).toLocaleString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-red-600 flex items-center justify-end gap-1">
                            -{transacao.valor} <Coins className="w-4 h-4" />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
