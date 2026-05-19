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
            <CardTitle>Editar Perfil</CardTitle>
            <CardDescription>Atualize suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  type="text"
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
                    value={formData.cpf}
                    onChange={(e) => handleChange('cpf', e.target.value)}
                    required
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">CPF não pode ser alterado</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    type="text"
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
                  value={formData.curso}
                  onChange={(e) => handleChange('curso', e.target.value)}
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
                        Esta ação não pode ser desfeita. Isso irá deletar permanentemente sua conta
                        e remover todos os seus dados dos nossos servidores, incluindo seu saldo de moedas.
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
