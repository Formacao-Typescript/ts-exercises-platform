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
- [ ] Estabelecer modelo de dados persistidos do usuário
  - [ ] Permitir tracking de quais atividades o usuário já fez
  - [ ] Permitir armazenamento de badges/conquistas e XP (estratégias a definir)
  - [ ] Implementar armazenamento local (usuários não-autenticados).
- [ ] Definir integração utilitária com local storage

### v1 - Lançamento - deploy

- [ ] Implementar deploy no Github Pages
- [ ] Definir estratégias de Login/SSO
- [ ] Definir integração com storage em nuvem (Deno Kv)
- [ ] Definir estratégia de indexação e consumo dos exercícios em Markdown a partir do github
- [ ] Estabelecer modelo de dados persistidos do usuário
  - [ ] Em nuvem (usuários autenticados).
- [ ] Ajustar identidade visual de acordo com a Formação TS
- [ ] Adicionar aviso de não compatibilidade com dispositivos móveis (por hora)
- [ ] Criar ao menos 1 trilha com 3 tópicos e 5 atividades cada (15 exercícios)
- [ ] Definir trilhas a ser disponibilizadas a seguir, e adicionar estilos pra isso (assim elas aparecem na listagem)

### v2-vX - Melhorias (escopo a definir)

- [ ] A definir:
  - [ ] Salvar alterações no código localmente em base64?
    - [ ] compensa salvar elas em nuvem?
  - [ ] Adicionar suporte pra dispositivos móveis?

### WIP
