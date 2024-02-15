# Repositório oficial da Plataforma de Exercícios da Formação Typescript

Este repositório será a base da plataforma onde os estudantes irão praticar typescript

## Roadmap

### v0 - Definição - PoC Mock

- [x] Estabelecer modelo de dados.
  - Optamos por: "Trilhas/Jornadas" macro, que dentro tem vários "Tópicos/Temas" menores, cada um com várias "Atividades/Exercícios" mão na massa.
- [x] Renderizar exercícios a partir de arquivos .md (Markdown)
- [x] Renderizar atividades de código usando o Monaco Editor
- [x] Definir sistema de estilização padronizado e customizável
- [x] Definir sistema de roteamento e aninhamento de rotas da aplicação.
  - Optamos por: React Router DOM com no máximo 2 níveis de aninhamento, para evitar problemas com a integração do Monaco Editor. Portando a navegação principal fica: `base-url/journey/ts-pra-iniciantes/topic/tipos-primitivos?activityId=string-e-boolean`
- [x] Estabelecer modelo de dados persistidos do usuário
  - [x] Permitir tracking de quais atividades o usuário já fez
  - [x] Permitir armazenamento de badges/conquistas e XP (estratégias a definir)
  - [x] Implementar armazenamento local (usuários não-autenticados).
- [x] Definir integração utilitária com local storage

### v1 - Lançamento - deploy

- [x] Definir estratégia de indexação e consumo dos exercícios em Markdown a partir do github
- [x] Implementar uso da indexação e metadados do github na plataforma
- [x] Implementar carregamento de Jornadas, Tópicos e Atividades sob demanda
- [x] Implementar renderização de exercícios com base na versão disponibilizada no github
- [ ] Estabelecer modelo de dados persistidos do usuário
  - [x] Consumir dados localmente nas interações do sistema
  - [ ] Salvar dados em nuvem (para usuários autenticados)
  - [ ] Interpolar dados em nuvem com dados locais no login
- [x] Criar script de validação ao inserir exercícios novos que deve:
  - [x] Validar se todos os IDs dos exercícios são únicos
  - [x] Extrair dados do front-matter de atividade e gerar o metadado geral de atividades para cada Tema
  - [x] Reconhecer os diretórios de temas, ler front-matter de cada tema e gerar o metadado geral de cada Jornada
  - [x] Reconhecer os diretórios de jornadas, ler o front-matter de cada jornada e gerar o metadado geral raiz do projeto
- [ ] Implementar deploy no Github Pages
- [ ] Definir estratégias de Login/SSO
- [ ] Definir integração com storage em nuvem (Deno Kv)
- [ ] Ajustar identidade visual de acordo com a Formação TS
- [ ] Adicionar aviso de não compatibilidade com dispositivos móveis (por hora)
- [ ] Criar ao menos 1 trilha com 3 tópicos e 5 atividades cada (15 exercícios)
- [ ] Definir trilhas a ser disponibilizadas a seguir, e adicionar estilos pra isso (assim elas aparecem na listagem)

### v2-vX - Melhorias (escopo a definir)

- [ ] A definir:
  - [ ] Salvar alterações no código localmente em base64?
    - [ ] compensa salvar elas em nuvem?
  - [ ] Adicionar suporte pra dispositivos móveis?
  - [ ] Showcase da comunidade e contribuições dos alunos
    > Brainstorm rápido a ser discutido no futuro: Salvar as soluções de cada aluno pras atividades? Talvez só pras atividades mais complexas no futuro? Permitir que os alunos compartilhem/vejam as soluções, tipo num “fórum stackoverflow de soluções”?

## Sobre o projeto

### Idéia geral

A idéia é construir uma plataforma de resolução de exercícios Typescript que:

- Sirva como um material de apoio direto ao curso (afinal um dos grandes pontos positivos do curso em si é ter a organização do conteúdo e uma estrutura definida pra seguir)
- Seja um projeto open-source da comunidade, Incentivando os alunos a aprender a colaborar em projetos open-source (e, consequentemente, usar o github. Ou seja: forks, issues, PRs. O ideal é documentar esses processos no projeto e na comunidade do discord, trazendo algumas atividades que incentivem os alunos - mais detalhes abaixo)
- Seja aberta à todos (alunos ou não), “free-forever” e 100% código aberto

### Uso da plataforma e funcionalidades

- **Plataforma aberta**:

  - Sem login necessário, porta de entrada da comunidade, simples e rápido, acesso direto ao conteúdo com os exercícios
  - Acesso a todos os exercícios
  - Linkar material de apoio aberto (artigos públicos e/ou do Lucas)
  - Linkar material de apoio extra (links - ou somente menções - pra aulas relevantes da formação pra quem for aluno ter acesso fácil)
  - Organização de conteúdo por módulo
  - Aulas escritas + exercícios. Os exercícios não serão somente um “codepen”, mas sim uma mini-aula voltada a um assunto, possivelmente com várias sessões de exercícios numa mesma “aula”

- **Área persistente**:

  - Login da plataforma
  - Salvar checklist de atividades feitas
  - Contagem arbitrária de pontos (XP)
  - Possibilita estratégias de gamificação e criação de comunidade com a resolução dos exercícios no futuro

- **Showcase da comunidade**:

  - Área(s) onde incentivamos as contribuições open-source dos alunos, trazendo áreas que reflitam atividades passadas pra fomentar a parte da colaboração
  - Exemplo 1: Uma área chamada “membros da comunidade”, onde mostramos um badge com a imagem de cada entusiasta(não aluno)/aluno, e redes como linkedin, discord e github dele, mas o diferencial é que essa é uma atividade “hello world” onde o aluno forka o projeto e submete um PR colocando o card dele na comunidade - ou seja: Só quem aparece na área de membros da comunidade é quem interagiu com o projeto e subiu um PR!
  - Exemplo 2: Seguindo o mesmo conceito de “o aluno cria o próprio card com algumas informação e submete”, podemos ter uma área chamada “projetos da comunidade”, onde o aluno pode expor algum projeto que ele fez (exemplo: pokedex em React com TS), mas pro card estar lá o aluno precisa submeter um PR onde ele mesmo monta o card com algumas imagens do projeto, descrição, um tutorial breve de como foi feito (opcional), e outras informações úteis (deixando tipo uma “steam de projetos dos alunos/não alunos” - que pode ser ótimo pra quem tiver começando e quiser buscar inspirações de projetos pessoais pra fazer)

## Como contribuir?

> TODO: Adicionar tutorial sobre forks/PRs e outras estratégias necessárias pra contribuir com o projeto

## Como executar o projeto?

> TODO: tutorial de como executar o projeto

## FAQ

> TODO: Adicionar FAQ se necessário
