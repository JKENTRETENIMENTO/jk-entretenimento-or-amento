
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function JKEntretenimentoApp() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    data: '',
    horario: '',
    endereco: '',
    tema: '',
    equipamentos: {
      plataforma360: false,
      totemDigital: false,
      totemRetro: false,
      torresLed: false,
    },
    musica: '',
    observacoes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (equipamento) => {
    setFormData(prev => ({
      ...prev,
      equipamentos: {
        ...prev.equipamentos,
        [equipamento]: !prev.equipamentos[equipamento]
      }
    }));
  };

  const montarMensagem = () => {
    const { nome, telefone, email, data, horario, endereco, tema, equipamentos, musica, observacoes } = formData;
    const equipamentosSelecionados = Object.keys(equipamentos).filter(eq => equipamentos[eq]).map(eq => eq.replace(/([A-Z])/g, ' $1')).join(', ');

    return \`Olá, meu nome é \${nome}. Gostaria de um orçamento para meu evento com os seguintes dados:%0A
Data: \${data}%0A
Horário: \${horario}%0A
Endereço: \${endereco}%0A
Tema: \${tema}%0A
Equipamentos: \${equipamentosSelecionados}%0A
Música: \${musica}%0A
Observações: \${observacoes}%0A
Telefone: \${telefone}%0A
Email: \${email}\`;
  };

  const handleSubmit = () => {
    const mensagem = montarMensagem();
    const whatsappURL = \`https://wa.me/5521986429041?text=\${mensagem}\`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0016] to-[#1a002d] text-white p-4 flex flex-col items-center">
      <img src="/logo-jk.png" alt="JK Entretenimento" className="w-48 mb-6" />
      <h1 className="text-3xl font-bold mb-2 text-center">Monte seu Orçamento - JK Entretenimento</h1>
      <p className="text-center text-purple-400 mb-4">Preencha os dados abaixo para que possamos enviar seu orçamento personalizado pelo WhatsApp!</p>
      <Card className="w-full max-w-xl bg-[#1a002d] border border-purple-800 shadow-lg">
        <CardContent className="space-y-4 p-6">
          <Input name="nome" placeholder="Seu nome" onChange={handleChange} className="bg-[#2b1b3b] text-white placeholder-gray-400" />
          <Input name="telefone" placeholder="Telefone" onChange={handleChange} className="bg-[#2b1b3b] text-white placeholder-gray-400" />
          <Input name="email" placeholder="Email (opcional)" onChange={handleChange} className="bg-[#2b1b3b] text-white placeholder-gray-400" />
          <Input name="data" type="date" onChange={handleChange} className="bg-[#2b1b3b] text-white placeholder-gray-400" />
          <Input name="horario" placeholder="Horário do evento" onChange={handleChange} className="bg-[#2b1b3b] text-white placeholder-gray-400" />
          <Input name="endereco" placeholder="Endereço do evento" onChange={handleChange} className="bg-[#2b1b3b] text-white placeholder-gray-400" />
          <Input name="tema" placeholder="Tema da festa" onChange={handleChange} className="bg-[#2b1b3b] text-white placeholder-gray-400" />
          <div>
            <label className="block font-semibold mb-1">Equipamentos:</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2"><Checkbox checked={formData.equipamentos.plataforma360} onCheckedChange={() => handleCheckbox('plataforma360')} /> Plataforma 360</label>
              <label className="flex items-center gap-2"><Checkbox checked={formData.equipamentos.totemDigital} onCheckedChange={() => handleCheckbox('totemDigital')} /> Totem Digital</label>
              <label className="flex items-center gap-2"><Checkbox checked={formData.equipamentos.totemRetro} onCheckedChange={() => handleCheckbox('totemRetro')} /> Totem Retrô</label>
              <label className="flex items-center gap-2"><Checkbox checked={formData.equipamentos.torresLed} onCheckedChange={() => handleCheckbox('torresLed')} /> Torres de LED</label>
            </div>
          </div>
          <Textarea name="musica" placeholder="Música ou estilo musical para o evento" onChange={handleChange} className="bg-[#2b1b3b] text-white placeholder-gray-400" />
          <Textarea name="observacoes" placeholder="Observações adicionais" onChange={handleChange} className="bg-[#2b1b3b] text-white placeholder-gray-400" />
          <Button className="w-full bg-gradient-to-r from-purple-700 via-fuchsia-600 to-blue-500 hover:from-purple-800 hover:to-blue-600" onClick={handleSubmit}>Enviar Pedido via WhatsApp</Button>
        </CardContent>
      </Card>
    </div>
  );
}
