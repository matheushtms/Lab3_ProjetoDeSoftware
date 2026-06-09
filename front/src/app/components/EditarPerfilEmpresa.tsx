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
import { ArrowLeft, Save, Trash2, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE } from '../config';

interface EditarPerfilEmpresaProps {
  onVoltar: () => void;
  onDeletarConta: () => void;
  onUpdate: (dados: any) => void;
  dadosIniciais: any;
}

export function EditarPerfilEmpresa({ onVoltar, onDeletarConta, onUpdate, dadosIniciais }: EditarPerfilEmpresaProps) {
  const [formData, setFormData] = useState({
    id: dadosIniciais.id,
    nomeFantasia: dadosIniciais.nomeFantasia || '',
    cnpj: dadosIniciais.cnpj || '',
    email: dadosIniciais.email || '',
    telefone: dadosIniciais.telefone || '',
    endereco: dadosIniciais.endereco || '',
    setor: dadosIniciais.setor || '',
    responsavel: dadosIniciais.responsavel || '',
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
      res = await fetch(`${API_BASE}/api/empresas/${dadosIniciais.id}`, {
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
      const res = await fetch(`${API_BASE}/api/empresas/${dadosIniciais.id}`, {
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
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl text-white">Editar Perfil da Empresa</CardTitle>
                <CardDescription className="text-white/60">Atualize as informações da sua empresa</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nomeFantasia" className={labelClass}>Nome da Empresa</Label>
                  <Input
                    id="nomeFantasia"
                    type="text"
                    value={formData.nomeFantasia}
                    onChange={(e) => handleChange('nomeFantasia', e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className={labelClass}>Email Corporativo</Label>
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
                  <Label htmlFor="cnpj" className={labelClass}>CNPJ</Label>
                  <Input
                    id="cnpj"
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => handleChange('cnpj', e.target.value)}
                    required
                    disabled
                    className="bg-black/20 border-white/5 text-white/50 cursor-not-allowed"
                  />
                  <p className="text-xs text-primary/70">CNPJ não pode ser alterado</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className={labelClass}>Telefone</Label>
                  <Input
                    id="telefone"
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="endereco" className={labelClass}>Endereço Completo</Label>
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
                  <Label htmlFor="setor" className={labelClass}>Setor de Atuação</Label>
                  <Input
                    id="setor"
                    type="text"
                    value={formData.setor}
                    onChange={(e) => handleChange('setor', e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsavel" className={labelClass}>Responsável</Label>
                  <Input
                    id="responsavel"
                    type="text"
                    value={formData.responsavel}
                    onChange={(e) => handleChange('responsavel', e.target.value)}
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
                      Deletar Empresa
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-[#041f10]/95 backdrop-blur-3xl border-white/10 text-white shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription className="text-white/60">
                        Esta ação não pode ser desfeita. Isso irá deletar permanentemente a conta da sua empresa
                        e remover todos os seus dados dos nossos servidores.
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
