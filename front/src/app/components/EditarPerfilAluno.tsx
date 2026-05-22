import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
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
import { ArrowLeft, Save, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';

interface EditarPerfilAlunoProps {
  onVoltar: () => void;
  onDeletarConta: () => void;
  onUpdate: (dados: any) => void;
  dadosIniciais: any;
}

export function EditarPerfilAluno({ onVoltar, onDeletarConta, onUpdate, dadosIniciais }: EditarPerfilAlunoProps) {
  const [formData, setFormData] = useState({
    id: dadosIniciais.id,
    nome: dadosIniciais.nome || '',
    email: dadosIniciais.email || '',
    cpf: dadosIniciais.cpf || '',
    rg: dadosIniciais.rg || '',
    endereco: dadosIniciais.endereco || '',
    instituicao: dadosIniciais.instituicao || '',
    curso: dadosIniciais.curso || '',
    senha: dadosIniciais.senha || ''
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let res;
    let atualizado;
    try {
      res = await fetch(`http://localhost:3001/api/alunos/${dadosIniciais.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        atualizado = await res.json();
      }
    } catch (error) {
      console.error('Erro no handleSubmit:', error);
      toast.error('Erro de conexão.');
      return;
    }

    if (res.ok && atualizado) {
      toast.success('Perfil atualizado com sucesso!');
      onUpdate(atualizado);
      onVoltar();
    } else if (!res.ok) {
      toast.error('Erro ao atualizar perfil.');
    }
  };

  const handleDeletarConta = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/alunos/${dadosIniciais.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        toast.success('Conta deletada com sucesso');
        onDeletarConta();
      } else {
        toast.error('Erro ao deletar conta.');
      }
    } catch (error) {
      toast.error('Erro de conexão.');
    }
  };

  const inputClass = "bg-black/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary transition-all";
  const labelClass = "text-white/80";

  return (
    <div className="min-h-screen bg-transparent py-8 relative z-10 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Button
          variant="outline"
          className="mb-6 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
          onClick={onVoltar}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <Card className="bg-card/40 backdrop-blur-2xl border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
          <CardHeader className="relative z-10 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl text-white">Editar Perfil</CardTitle>
                <CardDescription className="text-white/60">Atualize suas informações pessoais</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className={labelClass}>Nome Completo</Label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className={labelClass}>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf" className={labelClass}>CPF</Label>
                  <Input
                    id="cpf"
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleChange('cpf', e.target.value)}
                    required
                    disabled
                    className="bg-black/20 border-white/5 text-white/50 cursor-not-allowed"
                  />
                  <p className="text-xs text-primary/70">CPF não pode ser alterado</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rg" className={labelClass}>RG</Label>
                  <Input
                    id="rg"
                    type="text"
                    value={formData.rg}
                    onChange={(e) => handleChange('rg', e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="endereco" className={labelClass}>Endereço</Label>
                  <Input
                    id="endereco"
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => handleChange('endereco', e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instituicao" className={labelClass}>Instituição de Ensino</Label>
                  <Input
                    id="instituicao"
                    type="text"
                    value={formData.instituicao}
                    onChange={(e) => handleChange('instituicao', e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="curso" className={labelClass}>Curso</Label>
                  <Input
                    id="curso"
                    type="text"
                    value={formData.curso}
                    onChange={(e) => handleChange('curso', e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/10 gap-4 mt-8">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" type="button" className="w-full sm:w-auto bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Deletar Conta
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-[#041f10]/95 backdrop-blur-3xl border-white/10 text-white shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription className="text-white/60">
                        Esta ação não pode ser desfeita. Isso irá deletar permanentemente sua conta
                        e remover todos os seus dados dos nossos servidores, incluindo seu saldo de moedas.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeletarConta}
                        className="bg-red-500 text-white hover:bg-red-600"
                      >
                        Deletar Conta
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button type="submit" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(74,222,128,0.4)]">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
