import { useState } from 'react';
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
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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
      res = await fetch(`http://localhost:3001/api/empresas/${dadosIniciais.id}`, {
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
      const res = await fetch(`http://localhost:3001/api/empresas/${dadosIniciais.id}`, {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={onVoltar}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Editar Perfil da Empresa</CardTitle>
            <CardDescription>Atualize as informações da sua empresa</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nomeFantasia">Nome da Empresa</Label>
                <Input
                  id="nomeFantasia"
                  type="text"
                  value={formData.nomeFantasia}
                  onChange={(e) => handleChange('nomeFantasia', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => handleChange('cnpj', e.target.value)}
                    required
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">CNPJ não pode ser alterado</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  type="text"
                  value={formData.endereco}
                  onChange={(e) => handleChange('endereco', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="setor">Setor</Label>
                <Input
                  id="setor"
                  type="text"
                  value={formData.setor}
                  onChange={(e) => handleChange('setor', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  type="text"
                  value={formData.responsavel}
                  onChange={(e) => handleChange('responsavel', e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" type="button">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Deletar Conta
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá deletar permanentemente a conta da sua empresa
                        e remover todos os seus dados dos nossos servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeletarConta}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Deletar Conta
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
