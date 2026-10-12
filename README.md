# ProjetoPatinhas 🐾

## 1. Integrantes da equipe e instruções de execução e uso

### Integrantes

- Isabelli da Silva Gonçalves
- Kátia Tamaishi Mezete

### Sobre o projeto

O **Patinhas** é um jogo interativo de animais fofos, desenvolvido como projeto acadêmico da disciplina de Tecnologia em Desenvolvimento de Internet II.

O objetivo é permitir que o jogador conheça, adote e cuide de diferentes animais, realize missões, explore locais e participe de atividades dentro do jogo.

O projeto tem como público-alvo crianças de 6 a 12 anos que gostam de animais e jogos interativos. Sua interface utiliza cores alegres, elementos arredondados e botões intuitivos para facilitar a navegação.

O jogo foi inspirado em Animal Jam, mas possui identidade visual, personagens e funcionalidades próprias.

### Tecnologias utilizadas

- **HTML:** estrutura das páginas e dos elementos do jogo.
- **CSS:** cores, estilos, organização e adaptação da interface a diferentes tamanhos de tela.
- **JavaScript:** funcionalidades e interações do jogo.

### Como executar
1.Baixe ou clone o repositório do projeto.
2.Extraia os arquivos, caso tenha baixado uma versão compactada.
3.Abra a pasta do projeto no computador.
4.Localize o arquivo index.html.
5.Abra esse arquivo em um navegador para iniciar o jogo.

### Como utilizar

O jogador pode visualizar e adotar animais disponíveis, realizar ações de cuidado, comprar itens na loja, consultar o inventário, cumprir missões, explorar o mapa e participar de outras atividades.

O jogo também permite favoritar animais, personalizar o nome e o tema do abrigo e acompanhar informações sobre os animais cadastrados e adotados.

## 2. Os cinco desafios escolhidos e suas regras justificadas

### 2.1. Meus Favoritos

**Regra:** permitir que o jogador marque animais como favoritos e filtre a lista para visualizar somente os animais selecionados.

**Justificativa:** esse desafio facilita a localização dos animais preferidos e torna a navegação pelo catálogo mais prática.

### 2.2. Identidade do abrigo

**Regra:** permitir a alteração do nome do abrigo, respeitando o limite de 2 a 32 caracteres, e a escolha entre os temas claro e escuro.

**Justificativa:** esse desafio oferece personalização e permite que o jogador deixe o ambiente do jogo mais próximo de suas preferências.

### 2.3. Hora de cuidar

**Regra:** permitir ações de alimentação, brincadeira, carinho, banho, descanso e treinamento, atualizando os indicadores de cuidado dos animais. A energia deve permanecer entre 0 e 100.

**Justificativa:** esse desafio torna o jogo mais interativo e incentiva o jogador a acompanhar as necessidades dos animais.

### 2.4. Painel do abrigo

**Regra:** apresentar a quantidade total de animais cadastrados, de animais disponíveis para adoção e de animais já adotados.

**Justificativa:** esse desafio facilita o acompanhamento das informações do abrigo e permite visualizar a situação dos animais de maneira organizada.

### 2.5. Conquistas do cuidador

**Regra:** disponibilizar missões com objetivos definidos e recompensas em moedas e pontos de experiência. A recompensa só deve ser liberada quando os requisitos da missão forem cumpridos.

**Justificativa:** esse desafio incentiva o jogador a realizar diferentes atividades, acompanhar seu progresso e continuar interagindo com o jogo.

## 3. Testes esperados e exceções de cada desafio

### 3.1. Meus Favoritos

**Teste esperado:** marcar um animal como favorito e ativar o filtro de favoritos.

**Resultado esperado:** o animal marcado deve aparecer na lista filtrada, enquanto os animais que não são favoritos devem ser ocultados.

**Exceção:** ativar o filtro sem que nenhum animal esteja marcado como favorito.

**Resultado esperado:** a lista não deve apresentar animais que não atendam ao filtro. Caso nenhum animal seja encontrado, deve ser apresentada uma lista vazia ou uma mensagem informativa.

### 3.2. Identidade do abrigo

**Teste esperado:** alterar o nome do abrigo para um nome válido e selecionar o tema escuro.

**Resultado esperado:** o novo nome deve aparecer nos locais correspondentes da interface, e as cores devem mudar conforme o tema selecionado.

**Exceção:** tentar cadastrar um nome com menos de 2 ou mais de 32 caracteres.

**Resultado esperado:** o nome inválido deve ser rejeitado e uma mensagem deve informar que o nome precisa respeitar o limite estabelecido.

### 3.3. Hora de cuidar

**Teste esperado:** alimentar um animal e observar a atualização dos indicadores de cuidado.

**Resultado esperado:** os indicadores correspondentes à ação devem ser atualizados de acordo com as regras do jogo.

**Exceção:** realizar uma ação que faria a energia ficar abaixo de 0 ou acima de 100.

**Resultado esperado:** o valor da energia deve permanecer dentro do intervalo permitido, sem ultrapassar os limites estabelecidos.

### 3.4. Painel do abrigo

**Teste esperado:** verificar os indicadores com 10 animais cadastrados, sendo 9 disponíveis e 1 adotado. Em seguida, adotar mais um animal.

**Resultado esperado:** antes da adoção, o painel deve apresentar 10 animais no total, 9 disponíveis e 1 adotado. Após a adoção, deve apresentar 10 no total, 8 disponíveis e 2 adotados.

**Exceção:** consultar o painel quando não houver animais cadastrados.

**Resultado esperado:** os indicadores devem apresentar zero, sem exibir quantidades incorretas.

### 3.5. Conquistas do cuidador

**Teste esperado:** alimentar um animal para cumprir a missão “Barriguinha feliz” e solicitar a recompensa.

**Resultado esperado:** após o cumprimento dos requisitos, o jogador deve poder resgatar 10 moedas e 10 pontos de experiência, conforme a recompensa definida para essa missão.

**Exceção:** tentar resgatar a recompensa antes de concluir a missão.

**Resultado esperado:** a recompensa não deve ser liberada enquanto os requisitos da missão não forem cumpridos.

## 4. Versões intermediárias do desenvolvimento

O projeto foi desenvolvido em conjunto pelas integrantes da equipe. Durante o desenvolvimento, as funcionalidades foram organizadas e integradas para formar a versão apresentada.

A equipe não registrou versões intermediárias separadas durante esse processo. Por isso, o projeto é identificado como **Versão 1.0**, sem criar registros de etapas que não foram documentadas.

## 5. Erro encontrado, causa e correção

**Erro identificado:** alguns elementos da interface apresentavam movimentos ou tremores indesejados durante a interação, principalmente na seleção dos animais e em outros elementos da tela.

**Causa:** efeitos de animação e movimento aplicados aos elementos da interface.

**Correção:** remoção dos efeitos de movimento indesejados, mantendo os animais, as cores e as funcionalidades do jogo.

**Resultado:** a interface fica mais estável durante a seleção dos animais e a interação com os demais elementos.

## 6. Utilização de inteligência artificial

A inteligência artificial foi utilizada como apoio para esclarecer dúvidas e organizar as ideias.

---
