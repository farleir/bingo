import React from 'react';

export const Instructions: React.FC = () => {
  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-center text-gray-700 mb-4">Como Jogar e Dicas</h3>
      <div className="grid md:grid-cols-2 gap-8 text-gray-600">
        <div>
          <h4 className="font-bold text-lg text-blue-600 mb-2">Instruções</h4>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Configuração:</strong> Antes de começar, escolha o total de números no sorteio (50, 75 ou 90) e ajuste a velocidade desejada.</li>
            <li><strong>Iniciar:</strong> Clique em "Iniciar" para começar o sorteio. Os números serão chamados um a um.</li>
            <li><strong>Pausar/Continuar:</strong> Você pode pausar o sorteio a qualquer momento e continuar de onde parou.</li>
            <li><strong>Reiniciar:</strong> O botão "Reiniciar" limpa o painel e prepara um novo jogo com as mesmas configurações.</li>
            <li><strong>Som:</strong> Ative ou desative a locução dos números e frases no painel de configurações.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg text-green-600 mb-2">Dicas para a Festa</h4>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Use um Telão:</strong> Conecte seu computador a uma TV ou projetor. Deixe o "Cantador da Sorte" em tela cheia (F11 no teclado) para que todos possam ver!</li>
            <li><strong>Caixa de Som:</strong> Para festas maiores, conecte uma caixa de som para que a voz do cantador seja ouvida por todos.</li>
            <li><strong>Prêmios:</strong> Prepare prêmios divertidos para os vencedores para deixar a brincadeira ainda mais emocionante.</li>
            <li><strong>Interaja:</strong> Incentive os jogadores a gritarem as frases junto com o cantador para criar um ambiente mais animado!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
