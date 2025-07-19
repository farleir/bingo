
const bingoCalls: Record<number, string[]> = {
    1: ["Começou o jogo!", "Número um!", "O primeiro de todos!"],
    2: ["Dois patinhos na lagoa!", "É o segundo!", "Par de vasos!"],
    3: ["A idade de Cristo!", "Santíssima Trindade!", "Olha o três!"],
    4: ["A cadeira do Rei!", "Quatro pernas da mesa!", "Pés da cama!"],
    5: ["É de chorar por mais!", "Cinco dedos de uma mão!", "Boa, garoto!"],
    6: ["Meia dúzia!", "É falar ao contrário!", "Seis da tarde!"],
    7: ["Sete maravilhas do mundo!", "Número de mentiroso!", "Sete pecados!"],
    8: ["Oito, o biscoito!", "O infinito de pé!", "Praia!"],
    9: ["Pingo no i!", "Tá novo!", "Nove fora nada!"],
    10: ["Nota dez!", "Dez mandamentos!", "Pés juntinhos!"],
    11: ["Um atrás do outro!", "Time de futebol sem o goleiro!", "Pernas de saracura!"],
    12: ["Dúzia!", "Doze apóstolos!", "Meio-dia!"],
    13: ["Deu azar!", "Número do galo!", "Sexta-feira treze!"],
    14: ["A-cata-rose!", "Catorze!", "Duas semanas!"],
    15: ["A menina dos meus olhos!", "Quinze anos!", "Debuteen!"],
    16: ["O leão e o caçador!", "Dezesseis!", "Doce dezesseis!"],
    17: ["A desgraça!", "Dezessete!", "Nunca mais!"],
    18: ["A maioridade!", "Dezoito!", "Finalmente pode ser preso!"],
    19: ["Dia de São José!", "Quase vinte!", "Dezenove!"],
    20: ["O vintém!", "Dinheiro no bolso!", "Vinte!"],
    21: ["O primeiro do I!", "Vinte e um!", "A maioridade americana!"],
    22: ["Dois patinhos na lagoa!", "Vinte e dois!", "Louco, louco!"],
    23: ["A faca e o queijo!", "Vinte e três!", "O policial!"],
    24: ["Véspera de Natal!", "São João!", "Vinte e quatro!"],
    25: ["É Natal!", "Vinte e cinco!", "Um quarto de século!"],
    30: ["Trinta!", "Acabou a coluna I!", "Trintou!"],
    31: ["Começou a coluna N!", "Trinta e um!", "Ano novo!"],
    33: ["A idade de Cristo, de novo!", "Trinta e três!", "Dois três!"],
    40: ["Quarentou!", "No meio do caminho!", "A idade do lobo!"],
    44: ["Dois cachorros na corrida!", "Quarenta e quatro!", "Par de quatro!"],
    45: ["Fim do primeiro tempo!", "Quarenta e cinco!", "Metade do jogo!"],
    46: ["Começou o segundo tempo!", "Quarenta e seis!", "Início do G!"],
    50: ["Cinquenta!", "Meio século!", "A boa!"],
    51: ["Uma boa ideia!", "Cinquenta e um!", "A cachaça famosa!"],
    55: ["Dois cachorros do padre!", "Cinquenta e cinco!", "Dois cincos!"],
    60: ["Sessenta!", "Fim da coluna G!", "A hora do café!"],
    61: ["O primeiro do O!", "Sessenta e um!", "Aquele da espingarda!"],
    66: ["Uma escada para o céu!", "Sessenta e seis!", "A caminho do fim!"],
    69: ["Um pra lá, outro pra cá!", "Sessenta e nove!", "Não pode rir!"],
    70: ["Setenta!", "Aposentadoria!", "Chegando lá!"],
    75: ["Acabou!", "O último número!", "Quem vai gritar BINGO?"],
};
  
  // Helper to get a phrase, with fallbacks for numbers without specific entries
export function getBingoPhrase(number: number): string {
    if (bingoCalls[number]) {
      const phrases = bingoCalls[number];
      return phrases[Math.floor(Math.random() * phrases.length)];
    }
  
    const columnLetters = "BINGO";
    const columnIndex = Math.floor((number - 1) / 15);
    const letter = columnLetters[columnIndex];
    return `${letter}, ${number}!`;
}
