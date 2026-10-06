# Avaliação crítica do protocolo experimental e dos resultados

**Objeto:** "LLMs reproduzem a avaliação de artefatos científicos?" (slides T7 e relatórios `avaliacao-foremost-ng.pdf` e `avaliacao-mininet-gui.pdf`).

**Pergunta de pesquisa implícita:** três LLMs de provedores distintos (OpenAI GPT-5.6 Sol, Anthropic Claude Sonnet 5, Google Gemini 3.1 Pro), seguindo as instruções oficiais dos comitês de artefatos, chegam às mesmas decisões dos comitês para os selos Funcional (F) e Reprodutível (R)?

---

## 1. Síntese do veredito

| Pergunta | Resposta curta |
|---|---|
| O protocolo está adequado? | **Parcialmente.** O desenho conceitual (critérios oficiais, prompts padronizados, etapa analítica seguida de etapa pós-execução, registro de evidências) é bom. A execução do protocolo, porém, se desviou dele de forma que compromete a comparação: a etapa "execução" só existiu para uma das três LLMs, e as condições de entrada, de interface e de ambiente não foram equivalentes. |
| Os resultados são conclusivos? | **Não.** A amostra é de 12 decisões (2 artefatos × 3 LLMs × 2 selos), sem repetições, sem controles negativos, e o principal fator explicativo (ter ou não executado o artefato) está totalmente confundido com o provedor. Os resultados são exploratórios e servem como estudo-piloto. |
| A conclusão dos slides se sustenta? | **Em parte.** "As LLMs foram úteis para localizar evidências e lacunas" é bem sustentada pelos registros. "Não reproduziram de forma consistente a avaliação oficial" é verdadeira como descrição, mas não pode ser atribuída à capacidade das LLMs: a causa dominante foi a ausência de execução e de insumos (por exemplo, `evidence2.dd`), não o julgamento dos modelos. "A execução aumentou o rigor, não a concordância" se apoia em uma única execução real (n = 1) e é contradita pelos próprios números (ver seção 5.3). |

---

## 2. Aderência à descrição da tarefa

A tarefa pede: no mínimo 3 LLMs de 3 provedores, um artefato do SBSeg ou SBRC, instruções oficiais da edição, **duas avaliações com cada LLM** (analítica e por execução), prompts equivalentes, registro de prompts, resultados e evidências, verificação direta das evidências, tabela comparativa, análise de concordâncias e divergências, confirmação ou contradição da análise pela execução, fluxograma e conclusão.

| Item da tarefa | Situação | Comentário |
|---|---|---|
| 1. Escolher artefato | Atendido (e ampliado) | Dois artefatos, um de cada evento. Bom para generalização, mas dobrou o custo e contribuiu para execuções incompletas. |
| 2. Selos oficiais | Atendido | Transcritos; falta snapshot datado da página de resultados. |
| 3. Instruções oficiais | Atendido | Transcritas e salvas. |
| 4. Três LLMs, três provedores | Atendido | Interfaces muito diferentes entre si (ver 4.4). |
| **5. Duas avaliações com cada LLM** | **Não atendido** | A avaliação por execução só ocorreu com a LLM 1. Nas LLMs 2 e 3 foi substituída por simulação (Prompt 3), que a tarefa não prevê. É o desvio mais grave, porque inviabiliza os itens 10 a 12 e o próprio objetivo ("verificar se a análise é consistente com os resultados obtidos por meio da execução prática"). |
| 6. Prompts equivalentes | Parcial | Prompt 1 do Mininet-GUI omite o artigo; ficha da LLM 2 do Mininet-GUI difere das demais; a LLM 1 do Foremost-NG rodou em conversa-piloto não cega. |
| 7. Registro de prompts e resultados | Parcial | Registro da LLM 3 do Foremost-NG não conferido; caminhos divergentes entre seções. |
| 8. Evidências das LLMs | Atendido | Seção 8 dos relatórios. |
| 9. Verificação direta das evidências | Parcial | Feita de forma qualitativa, sem contagem de evidências corretas, inexistentes ou mal interpretadas. |
| 10. Tabela comparativa | Atendido na forma, comprometido no conteúdo | A coluna "Após execução" mistura execução real e simulação. |
| 11. Concordâncias e divergências | Parcial | As divergências entre provedores são atribuídas ao modelo, quando decorrem da diferença de tratamento. |
| 12. Execução confirma ou contradiz | Não atendido para 2 das 3 LLMs | Sem execução, não há o que confirmar ou contradizer; a seção 11 dos relatórios registra "Parcial" ou "Confirma" com base em simulação. |
| 13. Fluxograma | Atendido | O fluxograma registra o desvio, o que é correto. |
| 14. Conclusão | Atendido na forma | A conclusão é cautelosa, mas os slides generalizam mais do que os dados permitem. |

Observação importante: a tarefa diz "executar ou utilizar o artefato, **quando possível**". No Mininet-GUI, a execução não era impossível; era impossível **no ambiente escolhido** (Windows sem virtualização). Os autores fornecem uma VM. O "quando possível" não cobre limitações do ambiente do aluno que poderiam ter sido contornadas (VM local, máquina Linux do laboratório, instância em nuvem).

Outra observação: a tarefa diz que a execução deve seguir "as instruções e os procedimentos fornecidos pelos autores". O uso do DFTT #11 no Foremost-NG, escolhido pelo agente, é um procedimento externo aos autores. É defensável como teste mínimo, mas deve ser declarado como desvio.

---

## 3. O que o estudo faz bem

1. **Ancoragem nos critérios oficiais.** As instruções de revisão de cada edição (SBSeg 2025 e SBRC 2025) foram transcritas integralmente no prompt e salvas em arquivo, o que protege contra mudanças nas páginas.
2. **Prompts padronizados e versionados.** Os três prompts (analítico, plano de execução e simulação) estão publicados com o texto exato, e os registros das conversas estão em `github.com/R-ZW/leas-tarefa-7/tree/main/runs/`.
3. **Separação entre análise documental e evidência de execução.** O Prompt 1 proíbe alegar execução sem evidência, e o Prompt 3 proíbe inventar saídas. Isso reduz alucinação de resultados, um risco central nesse tipo de estudo.
4. **Padrão mínimo de evidência.** Exigir arquivo, seção, comando, diretório e saída para cada afirmação torna as decisões auditáveis.
5. **Escala de decisão com três níveis** (Atribuir, Não atribuir, Indeterminado) e pedido de nível de confiança: permite distinguir "não há evidência" de "há evidência contrária".
6. **Transparência sobre desvios.** Os relatórios registram explicitamente que só a LLM 1 executou algo e que as LLMs 2 e 3 simularam. Isso é honesto e permite esta crítica.
7. **Escolha de dois artefatos de naturezas diferentes** (ferramenta de linha de comando em C versus aplicação web com dependência de infraestrutura de rede emulada), o que ajuda a mostrar como a infraestrutura afeta a avaliação.

---

## 4. Problemas no protocolo experimental

### 4.1 Confusão entre o fator "LLM" e o fator "execução" (problema principal)

O protocolo previa quatro etapas por LLM: análise, plano, **execução prática pelo aluno** seguindo o plano daquela LLM, e fechamento com a mesma LLM recebendo o registro factual. Na prática:

| Artefato | LLM 1 (OpenAI) | LLM 2 (Anthropic) | LLM 3 (Google) |
|---|---|---|---|
| Foremost-NG | Execução real feita pelo próprio agente (Codex) em Windows/MSYS2 | Simulação (Prompt 3) | Simulação (Prompt 3) |
| Mininet-GUI | Validação parcial real (`npm ci`, `compileall`); GUI e Pingall não executados | Simulação | Simulação |

<!-- FIG:planejado -->

Consequências:

- A única diferença de resultado relevante (OpenAI atribuiu F no Foremost-NG) coincide exatamente com a única condição em que houve execução. Não é possível saber se o resultado se deve ao modelo ou à execução. Qualquer frase do tipo "OpenAI foi mais conclusivo" ou "Claude adotou cautela" atribui ao provedor um efeito que é do tratamento.
- A seção 13 de ambos os relatórios compara "diferenças entre provedores", mas os provedores não receberam o mesmo tratamento. Essa comparação não é válida.
- A etapa "Fechamento: decisão após execução" nunca ocorreu para as LLMs 2 e 3; o que se registrou como "pós-execução" foi a conclusão de uma simulação. A coluna "Após execução" das tabelas mistura, portanto, duas coisas diferentes.

### 4.2 O Prompt 3 induz o resultado "Indeterminado"

O Prompt 3 instrui: *"Quando a decisão depender da execução real, marque-a como Indeterminado"*. Como F e R, por definição oficial, **sempre** dependem de execução, esse prompt praticamente obriga a resposta "Indeterminado" (ou "Não atribuir", quando já faltava algo documental). Isso explica:

- Gemini/Mininet-GUI: Atribuir/Atribuir na análise → Indeterminado/Indeterminado na "pós-execução". Os relatórios interpretam isso como "a simulação reduziu as decisões positivas", mas o recuo foi imposto pela instrução, não por evidência nova.
- Claude/Foremost-NG e Claude/Mininet-GUI: F permanece Indeterminado, como o prompt exige.

Ou seja, parte da "mudança" entre etapas é artefato do instrumento de medida. Esse prompt não deveria ser usado como substituto da etapa de execução.

### 4.3 Entradas não equivalentes entre artefatos e entre LLMs

- **Artigo ausente no Mininet-GUI.** O Prompt 1 do Foremost-NG fornece o DOI do artigo; o do Mininet-GUI fornece apenas o repositório, embora as próprias instruções do SBRC 2025 digam "(i) leia o artigo; e (ii) defina as principais contribuições". Mesmo assim, a ficha do Claude cita "artigo, seção de contribuições" e "seis contribuições". Não há como saber se o artigo foi obtido por navegação, inferido do README ou alucinado. Para o selo R, que depende de identificar as "principais reivindicações", essa omissão é crítica.
- **Ficha da LLM 2 no Mininet-GUI** diz "forneça apenas o mesmo artefato e as mesmas instruções", sem o artigo; as fichas das LLMs 1 e 3 citam "o mesmo artigo". O template variou entre LLMs.
- **Modo de acesso ao contexto não controlado.** "Utilize o repositório do GitHub mencionado acima e/ou passado como parâmetro ou anexo" permite que cada LLM leia uma parte diferente do repositório (o Claude admite que "parte de docs/ e código não foi examinada"). Não há registro de qual material exato cada modelo efetivamente leu.

### 4.4 Interfaces e capacidades heterogêneas

- OpenAI rodou no **Codex** (agente com terminal e capacidade de executar comandos), Gemini no **Antigravity** (IDE agêntica) e Claude no **aplicativo desktop** (chat). São ferramentas com capacidades de leitura de arquivos, navegação e execução muito diferentes. O estudo compara, na prática, "produto + modelo", não "modelo".
- O nível de raciocínio foi fixado em "médio" para OpenAI e Anthropic, mas não está registrado para o Gemini.
- A ficha da LLM 1 no Foremost-NG registra "conversa atual no Codex, execução-piloto **não cega**". Se o mesmo contexto foi usado para preparar o estudo, o modelo pode ter recebido informação que os outros não receberam (inclusive sobre selos oficiais ou expectativas). Isso viola a própria regra da ficha ("forneça apenas o mesmo artigo, o mesmo artefato e as mesmas instruções").

### 4.5 Ambiente de execução inadequado ao artefato

- **Mininet-GUI** depende de Linux, Mininet e Open vSwitch; os autores fornecem VM. A validação foi feita em Windows sem Docker, VirtualBox ou Mininet. As instruções oficiais exigem um ambiente "que satisfaça os requisitos mínimos do ambiente de execução esperado para o artefato". O teste central (GUI, Pingall, WebShell) era impossível nesse ambiente, e `python -m compileall` verifica apenas sintaxe, não funcionamento. Os slides apresentam "backend compilou; 143 pacotes instalados" como validação direta, o que superestima a evidência.
- **Foremost-NG** foi executado em Windows com MSYS2, não no Ubuntu sugerido. A saída ELF truncada (1.956 de 2.648 bytes) pode ser defeito do artefato **ou** efeito do ambiente (por exemplo, tratamento de modo texto/binário ou diferenças de `libc` no MSYS2). Sem repetir em Linux, essa observação não pode ser usada como evidência sobre o artefato.

### 4.6 Versão do artefato não alinhada à avaliação oficial

O protocolo pede "manter exatamente a mesma versão em todas as execuções", e o Foremost-NG registra o commit `bb812a22…`. Mas não se verificou se esse commit é o mesmo avaliado pelo comitê em 2025. Repositórios mudam depois da avaliação (arquivos de exemplo removidos, README reescrito, dependências atualizadas). Para Mininet-GUI nem o commit foi registrado. Se a versão difere, a comparação com o selo oficial perde validade.

### 4.7 Assimetria entre o processo oficial e o processo com LLM

A avaliação oficial do SBSeg 2025 e do SBRC 2025 ocorre em duas rodadas, com **rebuttal** dos autores, discussão entre revisores e possibilidade de os autores fornecerem material adicional (por exemplo, o arquivo `evidence2.dd` necessário para a Figura 2 do Foremost-NG pode ter sido enviado durante o processo). As LLMs tiveram uma única rodada, sem interação com autores. A divergência em R pode refletir essa diferença de processo e não um erro de julgamento. O estudo não investigou se o material faltante esteve disponível para os revisores oficiais.

### 4.8 Variável de referência sem variância (ausência de controles negativos)

Os dois artefatos receberam **todos os quatro selos** oficialmente. Logo:

- Um "avaliador" trivial que sempre responde "Atribuir" teria 12/12 de concordância; um que sempre responde "Não atribuir" teria 0/12. A métrica de concordância não distingue um bom avaliador de um avaliador enviesado para o positivo.
- Não é possível medir especificidade (capacidade de negar corretamente um selo) nem calcular estatísticas de concordância corrigidas pelo acaso (kappa de Cohen ou Fleiss), porque a referência é constante.
- É preciso incluir artefatos com F e/ou R **negados** oficialmente.

### 4.9 Ausência de repetição e de medida de variabilidade

LLMs são não determinísticas. Cada célula da tabela é uma única amostra. Não se sabe se o Gemini atribuiria F e R ao Mininet-GUI de novo, nem se o Claude manteria "Indeterminado". Sem repetição (por exemplo, 3 a 5 execuções por condição), não há como separar diferença entre modelos de ruído de amostragem.

### 4.10 Definição de "principais reivindicações" deixada a cargo de cada LLM

No Mininet-GUI, OpenAI e Claude negaram R porque o README cobre 2 das 6 contribuições do artigo; o Gemini aceitou as 2 reivindicações documentadas como suficientes. As instruções oficiais permitem explicitamente que os autores escolham "as principais reivindicações" quando reproduzir tudo é inviável. A divergência é, portanto, de interpretação do critério, e o protocolo não fixou essa interpretação. Uma lista de reivindicações definida previamente por humanos e fornecida a todas as LLMs eliminaria essa fonte de variância.

### 4.11 Métrica de comparação pobre

"Correspondência final exata" trata "Indeterminado" como erro igual a "Não atribuir". Isso mistura duas falhas diferentes: abstenção (o modelo reconhece que falta evidência) e erro (o modelo nega algo que deveria atribuir). Seria mais informativo reportar separadamente cobertura (proporção de decisões não indeterminadas) e acurácia entre as decisões tomadas, além da qualidade das evidências citadas.

### 4.12 Verificação das evidências citadas não sistemática

O protocolo prevê "verificar diretamente as evidências no artefato", e a seção 8 lista algumas. Mas não há medida de quantas evidências citadas por cada LLM eram corretas, inexistentes ou mal interpretadas (taxa de alucinação de evidência), que é justamente um dos resultados mais úteis e mais fáceis de medir nesse tipo de estudo.

### 4.13 Teste mínimo improvisado

No Foremost-NG, a LLM 1 escolheu o DFTT #11 como entrada, algo não documentado pelos autores. O Prompt 2 pede "não improvisar correções não documentadas". O uso de um benchmark público é razoável e provavelmente seria aceito por um revisor humano, mas é um desvio que deveria ser declarado como tal e aplicado igualmente a todas as LLMs. Além disso, "14 arquivos recuperados" não foi comparado com o gabarito do DFTT #11 (quantos arquivos deveriam ser recuperados); apenas a contagem foi relatada.

---

## 5. Avaliação dos resultados, experimento por experimento

<!-- FIG:matriz -->

### 5.1 Foremost-NG (SBSeg 2025; oficial: F e R atribuídos)

| LLM | Analítica F/R | Final F/R | Coincide F | Coincide R | Condição real |
|---|---|---|---|---|---|
| OpenAI | Indet. / Não | Atribuir / Não | Sim | Não | Execução real (agente, Windows/MSYS2) |
| Anthropic | Indet. / Não | Indet. / Não | Não | Não | Simulação |
| Google | Não / Não | Não / Não | Não | Não | Simulação |

**Selo F.** O resultado da OpenAI é o mais sólido de todo o estudo: build e CLI com código de saída 0, MD5 do DFTT conferido, três JPEGs com hash correto, `audit.txt` gerado. Isso é prova de execução no sentido das instruções oficiais. Ressalvas: ambiente diferente do sugerido, teste escolhido pelo agente e sem comparação com o gabarito completo do DFTT. As decisões de Claude (Indeterminado) e Gemini (Não atribuir) não são comparáveis, pois nenhuma execução lhes foi apresentada. A negativa do Gemini já na etapa analítica ("não existe teste mínimo reproduzível nem imagem .dd de exemplo") é uma leitura estrita mas defensável dos requisitos do README; é a única divergência genuína de julgamento entre modelos nesse selo.

**Selo R.** Aqui há **concordância unânime entre as três LLMs** (Não atribuir), com a mesma justificativa: falta `evidence2.dd` e o protocolo da Figura 2. Isso é um resultado positivo sobre consistência entre modelos, que os slides tratam apenas como "divergência com o oficial". A pergunta relevante passa a ser: por que o comitê atribuiu R? Hipóteses não investigadas: (a) o material foi fornecido no rebuttal ou em canal privado; (b) o repositório mudou depois da avaliação; (c) o comitê adotou critério mais brando para R; (d) o comitê errou. Sem resolver isso, a "falha" das LLMs em R pode ser um acerto.

**Inconsistências internas no relatório:**

- Ficha da LLM 3: "Confirma a análise" marcado como **Não** para F e R, mas a seção 11 marca **Confirma** para ambos. Como as decisões não mudaram (Não → Não), o correto é "Confirma".
- Ficha da LLM 2: o campo "Execução mínima" descreve passos (clonar, `make`, `sudo make install`) como se fossem registro, mas são o plano; não houve execução.
- Seção 7: registro da LLM 3 não conferido ("[ ]"), e o caminho do registro da LLM 1 (`outputs/llm1-openai-…md`) difere do citado na seção 8 (`runs/sbseg25--foremost-ng/chat-gpt/registro-prompts.md`). Rastreabilidade incompleta.

### 5.2 Mininet-GUI (SBRC 2025; oficial: F e R atribuídos)

| LLM | Analítica F/R | Final F/R | Coincide F | Coincide R | Condição real |
|---|---|---|---|---|---|
| OpenAI | Indet. / Não | Indet. / Não | Não | Não | Validação parcial (npm ci, compileall) em Windows |
| Anthropic | Indet. / Não | Indet. / Não | Não | Não | Simulação |
| Google | Atribuir / Atribuir | Indet. / Indet. | Não | Não | Simulação |

**Selo F.** Nenhuma LLM pôde observar o artefato funcionando, porque nenhum ambiente adequado (VM dos autores, Linux com Mininet/OVS) foi usado. Esse resultado mede a falta de infraestrutura do experimento, não a capacidade de avaliação. O próprio README, segundo as três LLMs, tem rotas de instalação (VM, Docker, código-fonte) e um teste mínimo de nove passos: um revisor humano com a VM provavelmente conseguiria atribuir F. O experimento perdeu a oportunidade de verificar isso.

**Selo R.** A divergência OpenAI/Claude (Não) versus Gemini (Atribuir, na análise) é a única divergência substantiva de julgamento do estudo, e decorre da interpretação de "principais reivindicações" (ver 4.10). O comitê oficial ficou do lado do Gemini. Esse é um achado interessante: o modelo mais "permissivo" coincidiu com o oficial, e os mais "rigorosos" divergiram, o que sugere que comitês humanos aceitam que os autores escolham um subconjunto de reivindicações. O estudo, porém, apaga esse achado ao reportar só a decisão final, que foi forçada a "Indeterminado" pelo Prompt 3.

**Observação sobre o artigo:** como o Prompt 1 do Mininet-GUI não forneceu o artigo, a contagem de "seis contribuições" citada pelo Claude precisa ser verificada contra o texto publicado.

### 5.3 Resultados agregados (slides 05 e 07)

| Medida | Etapa analítica | Etapa final |
|---|---|---|
| Correspondência exata em F | 1/6 (Gemini, Mininet-GUI) | 1/6 (OpenAI, Foremost-NG) |
| Correspondência exata em R | 1/6 (Gemini, Mininet-GUI) | 0/6 |
| Total | **2/12** | **1/12** |

<!-- FIG:barras -->

<!-- FIG:transicoes -->

Os slides reportam apenas a coluna final. Considerando as duas, a concordância **caiu** da análise para a etapa final. A frase "a execução aumentou o rigor, não a concordância" é compatível com isso, mas a queda foi produzida pelo Prompt 3 (Gemini, Mininet-GUI) e não por execução. O único caso de execução real (OpenAI, Foremost-NG, F) **aumentou** a concordância. Com n = 1, nenhuma das duas afirmações é generalizável.

Outros pontos sobre os agregados:

- Nenhuma estatística inferencial é possível com 12 decisões dependentes e referência constante; os números devem ser apresentados como descritivos de um piloto.
- A conclusão "nenhuma LLM reproduziu R" omite que, no Foremost-NG, as três concordaram entre si e tinham justificativa verificável (arquivo ausente).
- O slide 01 diz "Execução: teste mínimo e experimento principal, quando viável"; o Apêndice A diz que o terceiro prompt é "avaliação pós-execução", mas o prompt real é "Simulação de execução". A nomenclatura dos slides esconde o desvio.

---

## 6. O que os dados permitem e não permitem concluir

**Permitem concluir (com evidência razoável, como piloto):**

1. As três LLMs identificam de forma consistente lacunas documentais objetivas (ausência de dataset, de protocolo experimental, de versões fixadas).
2. Sem execução, as LLMs tendem a "Indeterminado" ou "Não atribuir" para F e R, o que é coerente com as instruções oficiais que exigem prova de execução.
3. Um agente com capacidade de execução conseguiu produzir prova de funcionamento suficiente para F em um artefato de linha de comando simples.
4. Artefatos que dependem de infraestrutura pesada (VM, emulação de rede) não podem ser avaliados em ambientes improvisados, seja por humanos ou por LLMs.

**Não permitem concluir:**

1. Que algum provedor seja melhor, mais rigoroso ou mais cauteloso que outro (tratamento confundido com provedor, n = 1 por célula, sem repetição).
2. Que a execução aumente ou não a concordância com o oficial (uma única execução real).
3. Que as LLMs "não reproduzem" a avaliação oficial em geral (dois artefatos, ambos com todos os selos, sem controles negativos, versões possivelmente diferentes, processo oficial com rebuttal).
4. Que a divergência em R seja erro das LLMs (hipótese alternativa de material fornecido fora do repositório não investigada).

---

## 7. Recomendações prioritárias

Em ordem de impacto (o novo protocolo em `novo_protocolo.md` detalha cada uma):

1. **Cumprir o item 5 da tarefa:** realizar a avaliação por execução com cada uma das três LLMs, em ambiente que atenda aos requisitos dos autores.
2. **Desacoplar execução e julgamento:** executar o artefato uma vez, por humano, no ambiente indicado pelos autores, seguindo um roteiro único consolidado, e entregar o **mesmo** registro de execução às três LLMs. Opcionalmente, acrescentar uma condição agêntica em que cada LLM executa em um sandbox idêntico.
3. **Remover o Prompt 3 como substituto da execução**; se mantido, que seja uma etapa auxiliar e nomeada como tal, sem instrução que force "Indeterminado".
4. **Concentrar o esforço em um artefato executável de ponta a ponta** (a tarefa exige um), escolhido por viabilidade de execução. Se o objetivo for generalizar além da tarefa, incluir artefatos com selos negados oficialmente (controles negativos).
5. **Fixar a versão avaliada pelo comitê** (commit, tag ou DOI do Zenodo da data da avaliação) e um pacote de entrada idêntico (artigo em PDF, repositório em ZIP, instruções).
6. **Fixar a lista de reivindicações principais** antes do experimento, por humanos, e fornecê-la a todas as LLMs.
7. **Repetir cada etapa 3 vezes por LLM** em conversas novas, com memória desativada, para medir estabilidade.
8. **Usar métricas adequadas:** decisão modal e estabilidade por LLM, cobertura (decisões não indeterminadas), concordância com o oficial e entre LLMs, taxa de evidências corretas.
9. **Incluir uma linha de base humana:** o aluno (ou cada membro da dupla) faz sua própria decisão F/R antes de ver as respostas das LLMs.
10. **Corrigir as inconsistências de registro** (seções 7, 11 e fichas) e padronizar caminhos dos registros.
