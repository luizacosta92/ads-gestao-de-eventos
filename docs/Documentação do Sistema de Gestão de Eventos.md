**CENTRO UNIVERSITÁRIO SENAI SANTA CATARINA**  
**UNIDADE CURRICULAR: PROJETO APLICADO II**  
**PROFESSOR: JANICE DETERS**

**Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas**

![Uma imagem contendo relógio, placar, desenho, placaDescrição gerada automaticamente][image1]

**DOCUMENTO DO SISTEMA DE GESTÃO DE EVENTOS**

EQUIPE 10  
Ana Clara Chiacchio Cordeiro Carneiro  
Daniel Barrili Dal Piva  
Danieli Patricia Marcon Fuhr  
Luiza Mylena Costa Silva  
Matheus Henrique da Rosa

Florianópolis/SC  
2026

**Histórico de Versões** 

| Data | Versão | Descrição | Autor | Revisor |
| :---- | :---- | :---- | :---- | :---- |
| 01/03/2026 | 1.0 | Elaboração inicial do documento  | Ana Clara Chiacchio | Luiza Costa Danieli Fuhr |
| 22/03/2026 | 2.0 | Elaboração dos Requisitos funcionais e não funcionais | Luiza Costa Danieli Fuhr | Ana Clara Chiacchio |
| 03/04/2026 | 3.0 | Ajuste dos requisitos funcionais e não funcionais | Luiza Costa | Ana Clara Chiacchio |
|  |  |  |  |  |
|  |  |  |  |  |

*\<Esse documento será preenchido ao longo  dos semestres conforme o cronograma de entregas\> \<Para cada entrega, atualizar o histórico\>* 

**Objetivos de cada projeto aplicado:** 

* **Projeto aplicado I**  – protótipo da solução   
* **Projeto Aplicado II**  –  aplicação integrando com banco de dados   
* **Projeto Aplicado III** –  aplicação CLIENTE /SERVIDOR (web)   
* **Projeto Aplicado IV**  –  aplicação CLIENTE /SERVIDOR ou mobile (web e mobile) com testes unitários

  **1\. Escopo** 

O presente projeto tem como escopo o desenvolvimento de uma solução tecnológica voltada ao apoio às atividades de cerimonialistas, considerando a crescente complexidade e o nível de exigência do mercado de eventos e casamentos. A solução deverá centralizar informações relacionadas a fornecedores, orçamentos, contratos e prazos, bem como automatizar processos operacionais, com o objetivo de reduzir erros, evitar retrabalho e melhorar o controle das atividades. Dessa forma, busca-se aumentar a eficiência na gestão dos eventos e contribuir para a melhoria da experiência e da satisfação dos clientes.

**Link do SAGA SENAI:**  [https://plataforma.gpinovacao.senai.br/plataforma/demandas-da-industria/interna/10856](https://plataforma.gpinovacao.senai.br/plataforma/demandas-da-industria/interna/10856) 

**2\. Descrição da Solução** 

Apesar da importância e do alto valor agregado do seu trabalho, os cerimonialistas frequentemente operam em um ambiente de gestão fragmentada. A rotina profissional envolve o uso de inúmeras ferramentas desconexas, como planilhas, e-mails, aplicativos de mensagens instantâneas e anotações físicas. A ausência de um sistema unificado para centralizar informações essenciais de cada evento, como dados dos noivos, detalhes de fornecedores, cláusulas contratuais, cronogramas e movimentações financeiras, gera uma série de ineficiências e riscos.

Essa fragmentação se manifesta em desafios que comprometem a qualidade do serviço. Gerenciar o orçamento do casamento é um dos problemas mais comuns, com despesas imprevistas e mudanças de última hora que podem devastar um planejamento financeiro cuidadoso. A falta de uma visão clara e em tempo real sobre orçamentos e parcelamentos pode levar a erros de cálculo e à necessidade de revalidação de dados, consumindo tempo precioso do profissional. 

Outro desafio é a gestão de pessoas e fornecedores, uma vez que o setor é caracterizado por uma alta informalidade e a predominância de pequenas empresas, o que exige um esforço adicional na coordenação e no acompanhamento das atividades. A ausência de uma ferramenta centralizada de gestão torna o profissional vulnerável a falhas humanas, retrabalho e, em última análise, a um alto nível de estresse que pode prejudicar a experiência do cliente final.  

**2.1 Justificativa e relevância**

A relevância do desenvolvimento de um software de gestão de casamentos para o cerimonialista e para o mercado é multifacetada e se baseia na premissa de que a tecnologia pode contribuir com a profissionalização e escalabilidade. 

A solução proposta atende a uma necessidade de otimizar o fluxo de trabalho, permitindo que o profissional minimize tarefas operacionais repetitivas e se concentre em atividades de maior valor, como o atendimento ao cliente, a criatividade na personalização dos eventos e a resolução de imprevistos. 

A visibilidade dos dados e a centralização das informações, que são benefícios esperados do software, permitem que o cerimonialista gerencie um número maior de eventos simultaneamente, aumentando a produtividade e lucratividade.  

Para o cliente final, o casal de noivos, a contratação de um cerimonialista já é uma decisão tomada com o objetivo de ter um casamento "zero estresse". 

O software se apresenta como a infraestrutura de apoio que garante a entrega dessa promessa, minimizando o risco de erros de planejamento e assegurando que cada detalhe do evento seja executado de forma impecável.

Em um mercado onde a individualidade e as experiências únicas são  valorizadas, a ferramenta possibilita ao cerimonialista focar no relacionamento e na visão do cliente, em vez de se perder em burocracias. A solução tecnológica é, portanto, um investimento na qualidade e na reputação do profissional e do evento.


**3\. Partes Interessadas**

3.1.Coordenação do Curso de Análise de Sistemas 

* Aline Antonelli


3.2 Professor da UC Projeto Aplicado II

* Janice Peters


3.3 Cliente da aplicação 

* Jani do Vale Cerimonial

  **4\. Atores**  

**4.1 Cerimonialista (usuário principal)**

Responsável pelo gerenciamento completo dos eventos. Tem acesso total ao sistema, podendo cadastrar casamentos, gerenciar fornecedores, controlar o financeiro, acompanhar checklists e visualizar o dashboard geral.

**4.2 Assistente**

Usuário com acesso limitado, podendo visualizar e atualizar tarefas e informações dos eventos, mas sem permissão para ações críticas como exclusão de contratos ou lançamentos financeiros.

**4.3 Noivos (cliente)**

Acessam apenas a página exclusiva do seu casamento, podendo visualizar o resumo do evento e a linha do tempo. Não têm acesso ao sistema interno.

**4.4 Convidado**

Interage exclusivamente com o link de RSVP para confirmar ou recusar presença no evento. Não possui login no sistema.

**4.5 Fornecedor**

Entidade cadastrada no sistema pela cerimonialista. Não acessa o sistema diretamente, mas suas informações são gerenciadas internamente.

**4.6 Administrador**

Responsável pela gestão de usuários e permissões de acesso ao sistema, podendo criar, editar e remover contas de cerimonialistas e assistentes.

**5\. Requisitos** 

Aqui serão listados os requisitos funcionais e não funcionais identificados a partir da visão do cliente via portal inovação.

**5.1 Requisitos Funcionais**

 

| RF01: O sistema deve permitir o cadastro de projetos de casamentos, incluindo dados dos noivos, data, local e orçamento total previsto. |
| :---- |
| **RF02:** O sistema deve permitir a visualização de um dashboard com contagem regressiva para os eventos e percentual de progresso das tarefas. |
| **RF03**: O sistema deve permitir o cadastro de tarefas (checklists), com definição de prazos e status de conclusão. |
| **RF04:** O sistema deve permitir a geração automática de um checklist padrão de atividades no momento da criação de um novo evento. |
| **RF05:** O sistema deve permitir o cadastro de fornecedores, incluindo categoria de serviço, CNPJ, WhatsApp, telefone, endereço, link para redes sociais e site e imagens de porftólio |
| **RF06**: O sistema deve permitir o registro de contratos firmados com fornecedores e o armazenamento de cópias digitais dos documentos. |
| **RF07**: O sistema deve permitir o lançamento e controle de parcelas de pagamentos, com alertas de datas de vencimento. |
| **RF08:** O sistema deve permitir a gestão de convidados, com campos para nome, categoria, mesa e restrições alimentares. |
| **RF09**: O sistema deve permitir a confirmação de presença (RSVP) online através de links exclusivos enviados aos convidados. |
| **RF10**: O sistema deve permitir a criação de usuários com diferentes níveis de acesso (Administrador, Cerimonialista e Assistente). |
| **RF11:** O sistema deve permitir o envio de notificações automáticas via e-mail sobre tarefas pendentes e prazos de contratos. |
| **RF12:** O sistema deve permitir a geração de uma página exclusiva de consulta para os noivos com o resumo atualizado do evento. |

**5.2 Requisitos Não Funcionais**

 

| Requisito Não Funcional | Categoria |
| :---- | ----- |
| **RNF01** \- O sistema deve ser compatível com diferentes navegadores (Chrome, Edge, Safari) e dispositivos (Desktop, Tablet e Smartphone). | Compatibilidade |
| **RNF02 \-** O sistema deve garantir um tempo de resposta inferior a 2 segundos para consultas na lista de convidados e fornecedores. | Desempenho |
| **RNF03** \-  O sistema deve estar disponível para uso 24 horas por dia, 7 dias por semana, com uptime projetado de 99.9%. | Disponibilidade |
| **RNF04** \- O sistema deve ser fácil de usar e possuir interface intuitiva para usuários sem experiência técnica avançada. | Usabilidade |
| **RNF05** \- O sistema deve garantir a segurança e a privacidade dos dados pessoais em conformidade com a LGPD. | Segurança |
| **RNF06** \- O sistema deve realizar backups automáticos diários de todas as informações armazenadas no banco de dados. | Confiabilidade |
| **RNF07** \- O sistema deve manter logs de auditoria de todas as operações de criação, edição e exclusão de dados financeiros. | Rastreabilidade |
| **RNF08** \- O sistema deve garantir a integridade transacional em operações financeiras e de confirmação de presença. | Confiabiliadde |
| **RNF09** \- O sistema deve ser capaz de crescer e suportar o aumento de transações sem perda de desempenho. | Escalabiliade |
| **RNF10** \- O sistema deve utilizar autenticação segura via tokens JWT para controle de sessões de usuários. | Segurança |

**6\. Diagrama de Modelo Entidade e Relacionamento** 

*\<aqui a equipe deve inserir o MER da solução proposta \>*

**7\. Diagrama de UML**  

\<serão informados de acordo a evolução dos projetos aplicados\> 

**7.1 Diagrama de Use-Case** 

*\<essa seção deverá ser preenchido nos **Projeto Aplicado II e III e IV\>***  
***\<i**nserir o diagrama de Use-case da solução conforme orientação da UC Arquitetura e Modelagem de Sistemas* *. Caso a apresentação não fique legível mudar a orientação da página para paisagem\>* 

**7.2 Diagrama de Sequência** 

*\<essa seção deverá ser preenchido nos Projeto Aplicado III e IV\>*  
*\<inserir o diagrama de sequência da solução conforme orientação da UC Arquitetura e Modelagem de Sistemas* *. Caso a apresentação não fique legível mudar a orientação da página para paisagem\>* 

**7.3 Diagrama de Atividades**   
*\<essa seção deverá ser preenchido nos Projeto Aplicado III e IV\>*  
*\<inserir o diagrama de atividades da solução proposta conforme orientação da UC Arquitetura e Modelagem de Sistemas* *. Caso a apresentação não fique legível mudar a orientação da página para paisagem\>* 

**7.3 Diagrama de Classes**   
*\<essa seção deverá ser preenchido nos Projeto Aplicado IV\>*  
*\<inserir o diagrama de classes da solução proposta conforme orientação da UC Arquitetura e Modelagem de Sistema*

**7.4 Diagrama de Componentes**   
*\<essa seção deverá ser preenchido nos Projeto Aplicado III e  IV\>*  
*\<inserir o diagrama de componentes da solução proposta conforme orientação da UC Arquitetura e Modelagem de Sistema*

**7.4 Diagrama de Implantação**   
*\<essa seção deverá ser preenchido nos Projeto Aplicado  III e IV\>*  
*\<inserir o diagrama de implantação da solução proposta conforme orientação da UC Arquitetura e Modelagem de Sistema*

**8\. Proposta de Solução Tecnológica Escolhida** 

Como proposta, vamos utilizar React.js no frontend, Node.js com Express.js no backend e PostgreSQL como banco de dados. A sugestão parte do conhecimento prévio principalmente com React e Node.js, que são tecnologias bem documentadas e amplamente utilizadas no mercado, o que facilitará o aprendizado do restante da equipe ao longo do desenvolvimento.

O React facilita a criação de telas dinâmicas e organizadas, o Node.js com Express permite construir a API de forma simples, e o PostgreSQL é um banco robusto que suporta transações, importante para garantir a consistência dos dados financeiros e das confirmações de presença do sistema.

Para hospedagem, a ideia é publicar o frontend na Vercel e o backend com o banco de dados no Railway, ambas gratuitas e com integração fácil ao GitHub

**8.1 Topologia da Solução**

Essa seção é optativo inserir o diagrama da topologia da arquitetura da solução.

**9\. Recursos Adicionais**

**9.1 Planejamento do Projeto Aplicado**

**Trello**: [Gerenciamento de atividades do Sistema de Gestão de Eventos](https://trello.com/invite/b/69a4a65254c99016e33f07fe/ATTI21aca5946e55cbd14d64005e3df645b6899FABFC/ads-sistema-de-gestao-de-eventos) 

**9.2 Repositório da Aplicação** 

**GitHub:** [https://github.com/luizacosta92/software-casamento](https://github.com/luizacosta92/software-casamento) 

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ0AAABFCAYAAABQbrO9AAAJwklEQVR4Xu3dzZHrxg6GYWSiRJyHNw7CWTgJR+CNU2AGTsB7L73zxlWeK1maY9XbYAPoRpOcW1g8mz6ND+D8SBTF0RH54ZePUkpxaxZKKaWnWSillJ5moZRSepqFUkrpaRZKKaWnWSillJ5moZRSepqFUkrpaRau7fe7Hz8+PsRy3/erUl9KmcVftogmLN9P7DnqkaXkD2P+FXBG4v4ZzB5wY2bPff/3SkYq9oy6Z/zDzGzs6cGMF9eTr6ZZiFAGyZD2QKG553+n9Axj7hVwRviD+2co+SHMs9xr/mJGJvYbcc/5mbnJhr6HSs7D+IOGEnYKDnYEzhDBrCvgjCvnZX4U8yysT/Yr+41SstOwl8e97sacac3C8b7ngR5Jmcdj6dnQCHle7+Gc33D/LJl7Vv2HeRYlIw17zWB2JvbyuNf9yZxpzcKBeIBn4VwW1l8BZyTuz8AeAeFTYyUjBfvMYn4m9vJgRopm4Tg3HuBZlNm6WH8FnJG4PwN7eDHHcq/5jRlJ/mavWUqPLOGzs2XzNAvHuPHgziTBi6OsvwLOSNyfgT28mGNhfRb2yXDP3dgnSfjs7DUPc+Y1C4vxoK6Cc3b8xtqziX19Ie1C3zsZfBubORbWZ2CPTOyVgT08ZNUDWLOw1p88sBH3nB/l+QXZ+G+jlFlVrLsCzkjcn4m9HDZmWJSMaeyRib0ysIcHM9I0CwvxoCLEfgkxdQag5KlY5yHPG5MeD3SrNHO+4zyZ2MvCeovYZ1EjbuyTSek3jT08mJGmWVhn40F5if9Ou+ELW0qWinUezDga58nEXhbWW1ifgT16ZODsmP0SbOzhoeTkaBYW4QF5iX2GkdWnydKwzoMZBxt+IPWQ4N/4sN7C+lnM7xmpedVt7DuD+V7MScNGEU1YB2u9mOOwMcNDydEM3Yim5ByGs1hGa7xYa2H9pBvzez7ruO6h9B7GbC/mwNC7Mf/myvOOsVEcZM/ws52SZRn6Yig5DdZ4MedInMUyWuPF2h4JnmVamN8zWqfVz2K2h9hnO4+/5eHvs88rYLWhX+TXwTPL0h6kD3ManM2LOUfiLJZX3c9c72HPjo21PeL8vngw2zJTy/pZzPZgRqpmYQEeUASzzsTZPO51fzDnSJzHMlInznc4WGdh/YSN2T2s5797MGMGsz2YkapZWIAHFMW8k/zOuTyUnCNtnMfyWct1i9K7wRoL60cxt0eUl0Tc48GMCRuzPZScPM3CAjygEaJ8M4/EebyYcyTOYpG3v5Tlv1nYW8MaC+sHhV4aK/Uf3OMh/tsEupjrIY57d6Y0CwvwoGbJ4O3LMziDF3OOxFksqM++rhG630HsC3kuzO257/+b9S/fca9FnC/ZLMz1kKQHrF3NwhpDb1V6ifFZEhnY00OC9zBk4zyWmXqxn91urOlR6sOYaWH9m6G/3VFywpjpwYx0zcIaQ3/WO0Ken1S094wxjH3OxNl2hJ7ZtVz+u4X1q7KcQscv/Ze/oay3TOZEZX68X55mYREe2BGk/4MQwuwzcbYdN9b1iPLBvdxjYf2qLA/mWVhP3O/BjAE3ZnooObmahXVCF6SyPforM3mFXt+vJM63cFlnYf3IcSv1n8JnmkqGG7Ms4jgzZY0HM6KY5yHOn48p0t7kFNEGdvAAz8CZPJhxJs62h3UW1o/ksPZN+DNVlQyv8EsJJaPBGg+ZvJjLPA9mdIzfEcqmEa/mUTfmHE2ZqYv1Z+Jse1hnYf1Ijuz8knCfRSY+3o9ZFtbvYZ0XcwLCZ2fBfsNn/o8m7SOJHwfxCj8bZFNm2sXaM3G2PayzsD4zh3ssrA8I/6IpGSrWeTEnIHx2Fuw3fqbxCjhL6DVzJvH/5zt/sfZMynya0FV36T+zh94uV+o/uMfCei/mWFjfw1ov5ngxx0Pmrtv5NQvnuvELsZLSv8GaMz2+PpxPwzoL64n7e1grA7dBKxkmZlgeczGjh/VezPFijgczlmkWriP0DDdC6dlgzZnEeWWcdRbWE/f3CO6E5L9bZOxu32UvS96E7wp99Qk9OH1ijgczlmkWril0uu0l/dPyf7HGgxlH4zwW1hP3W7JqvZjhwQyHobtCB3ttzPBQctZoFr6GoUd9EsdrQNZ4MONgoWddcTyzs8aSVet02nUxL2XmLtZ7MWeZZuEL4RctSuwHjaFnFyXnSKG30pT6BmssWbUerL8izmxhvRdzlmkWvp7QLwm+yJuS9w33e4jjmXslzmNh/Y7QW+Ty39cgdEYozgu9n1h/VZzbwnoPMX6WUzUL8x5/ccr/l8ODOW78AnrJ833nJm8mlxlH4zwW1u9hnWWwpvv9INZflcT+Cjv0AP3WgznrNAuTeDBezIlglhdziPs9mHE0ztMjgWd21lpGa7xYe2US+DpL8OzsrQdz1mkWJvFgvJgTwSwv5sD//cf7SeCZnbWW0Rqnoe/NmZRjULHOizlLsXlEE/bDKQcderfA25N7vZhzJM5iYb1hY32PDFxEVnqqWPcV8Bj2sM5DYmcyn8avBSphU9jAizlezPFiDnG/F3OOxFksrLewPpM4L+Sx7qvgcexhnYc4/rQ/VbMwiQcUwSwL6yOYRdzvIUmfCzmK81hYb2F9JvbaMfWffJ9JnC8FWefBjOWahUk8oCjm7Zi6Q1TJa7DGgxkHC191VzK6WJ+JvTSs8ZDnGUwa5nuJ8sloivD38JXNnLWahUk8oFHS3uKd8iwjzo8AZN0VcEYIXXV/7FcyLBtzsii9KPxfe4rz2T2CPSKYpbixxkPJWatZmDd1FrCaMq8m5QEqkxg3jXG/RQZ/oZiTQRwX8ljjwYwM7BHBLOJ+DznjE++bhQQ8sKvgnHtYdwWckbjfwnov5mQQ40Ie93swIwv7RDCLuN+DGYdoFnJc7n10ZcZdrL0Czkjcb2G9F3MysAeEPwRJJu8w7mGvCGYR93sw4xDNQhIe3Jk4m4X1V8AZIfyXnkqG18asWUqPb7jXgxmZ2CuCWbD64/3yNAt5hm+6yiLPK96cyxJ+ZltNjIuW3G+Rsa/LcD8L89+EP4hJJo/NYfymqM51JO71eMzCnEM0C7lOe+B49Fbm8Qj/oK4mnR+2B+63sD6KebOYP9OHGQts7OklnbdduddDjGtBy3CQiCZsX/jtshES+2tCFTOvgDMS91tYH8W8GbLzrhD3eexlZWPfCGbNZDIjaPyMiQsRyiCW9LdjxTh1j2L+FXBG4n4L6wdszBwlO2eE3OfBjFXYN4JZL0Nv8Ss5EeMPGkrYkcIXf+T5Oq57ul5KWahZKKWUnmahlFJ6moVSSulpFkoppadZKKWUnmahlFJ6moVSSulpFkoppadZKKWUjv8BjjCPoLq8GqQAAAAASUVORK5CYII=>