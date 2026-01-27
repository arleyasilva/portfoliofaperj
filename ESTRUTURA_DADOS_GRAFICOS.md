# 📊 Estrutura de Dados dos Gráficos - Portfolio FAPERJ

**Última atualização:** 27 de janeiro de 2026  
**Objetivo:** Documentar a estrutura dos arquivos JSON para facilitar a análise de dados

---

## 📁 Área de Conhecimento

### grafico1.json
**Arquivo de dados para:** Distribuição de Recursos por Grande Área  
**Localização:** `/public/data/grafico1.json`

**Estrutura:**
```json
[
  { "area": "string", "total": number }
]
```

**Exemplo:**
```json
[
  { "area": "Ciências Agrárias", "total": 195313840 },
  { "area": "Ciências Biológicas", "total": 801275980 },
  { "area": "Ciências da Saúde", "total": 330146017 }
]
```

**Campos:**
- `area` (string): Nome da grande área do conhecimento
- `total` (number): Valor total em reais (R$)

**Total de registros:** 9 áreas

---

### grafico2.json
**Arquivo de dados para:** Distribuição do Valor Total por Microáreas  
**Localização:** `/public/data/grafico2.json`

**Estrutura:**
```json
[
  { "label": "string", "value": number, "color": "string" }
]
```

**Exemplo:**
```json
[
  { "label": "Ciências Agrárias", "value": 171065011, "color": "#f14b61" },
  { "label": "Ciências Biológicas", "value": 695867342, "color": "#f6b343" }
]
```

**Campos:**
- `label` (string): Nome da microárea
- `value` (number): Valor total em reais (R$)
- `color` (string): Código hexadecimal da cor para o gráfico

**Total de registros:** 9 microáreas

---

### grafico3.json
**Arquivo de dados para:** Distribuição de Bolsas, Auxílios e Total  
**Localização:** `/public/data/grafico3.json`

**Estrutura:**
```json
[
  { "label": "string", "bolsas": number, "auxilios": number, "total": number }
]
```

**Exemplo:**
```json
[
  { "label": "UFRJ", "bolsas": 406995018, "auxilios": 563774442, "total": 970769460 },
  { "label": "UERJ", "bolsas": 213345069, "auxilios": 200642373, "total": 413987442 }
]
```

**Campos:**
- `label` (string): Nome da instituição
- `bolsas` (number): Valor total de bolsas em reais (R$)
- `auxilios` (number): Valor total de auxílios em reais (R$)
- `total` (number): Soma de bolsas + auxílios em reais (R$)

**Total de registros:** 10 principais instituições

---

## 💰 Auxílios

### grafico4.json
**Arquivo de dados para:** Distribuição de Bolsas e Auxílios  
**Localização:** `/public/data/grafico4.json`

**Estrutura:**
```json
[
  { "label": "string", "bolsas": number, "auxilios": number }
]
```

**Exemplo:**
```json
[
  { "label": "FIOCRUZ", "bolsas": 81275062, "auxilios": 2718635 },
  { "label": "FAPERJ", "bolsas": 62582874, "auxilios": 677769 }
]
```

**Campos:**
- `label` (string): Nome da instituição
- `bolsas` (number): Valor de bolsas em reais (R$)
- `auxilios` (number): Valor de auxílios em reais (R$)

**Observação:** O gráfico calcula automaticamente o Total (bolsas + auxilios) para a linha laranja

**Total de registros:** 10+ instituições

---

### grafico5.json
**Arquivo de dados para:** Distribuição Geral  
**Localização:** `/public/data/grafico5.json`

**Estrutura:**
```json
[
  { "label": "string", "value": number }
]
```

**Exemplo:**
```json
[
  { "label": "2019", "value": 717 },
  { "label": "2020", "value": 711 },
  { "label": "2021", "value": 2565 }
]
```

**Campos:**
- `label` (string): Ano
- `value` (number): Quantidade de auxílios

**Total de registros:** 7 anos (2019-2025)

---

### grafico6.json
**Arquivo de dados para:** Evolução de Quantidade e Valor  
**Localização:** `/public/data/grafico6.json`

**Estrutura:**
```json
[
  { "label": "string", "quantidade": number, "valor": number }
]
```

**Exemplo:**
```json
[
  { "label": "2019", "quantidade": 717, "valor": 87912777 },
  { "label": "2020", "quantidade": 711, "valor": 156992731 }
]
```

**Campos:**
- `label` (string): Ano
- `quantidade` (number): Quantidade de auxílios
- `valor` (number): Valor total em reais (R$)

**Total de registros:** 7 anos (2019-2025)

---

### grafico7.json
**Arquivo de dados para:** Valor de Auxílios por Ano  
**Localização:** `/public/data/grafico7.json`

**Estrutura:**
```json
[
  { "label": "string", "value": number }
]
```

**Exemplo:**
```json
[
  { "label": "2019", "value": 87912777 },
  { "label": "2020", "value": 156992731 }
]
```

**Campos:**
- `label` (string): Ano
- `value` (number): Valor total de auxílios em reais (R$)

**Total de registros:** 7 anos (2019-2025)

---

### grafico8.json
**Arquivo de dados para:** Valor de Auxílios por Modalidade  
**Localização:** `/public/data/grafico8.json`

**Estrutura:**
```json
[
  { "label": "string", "value": number }
]
```

**Exemplo:**
```json
[
  { "label": "APQ - Auxílio à Pesquisa", "value": 450000000 },
  { "label": "INST - Apoio a Instituições", "value": 250000000 }
]
```

**Campos:**
- `label` (string): Nome da modalidade de auxílio
- `value` (number): Valor total em reais (R$)

**Total de registros:** Variável (modalidades ativas)

---

## 🎓 Bolsas

### grafico9.json
**Arquivo de dados para:** Valor Total de Bolsas por Ano  
**Localização:** `/public/data/grafico9.json`

**Estrutura:**
```json
[
  { "label": "string", "value": number }
]
```

**Exemplo:**
```json
[
  { "label": "2019", "value": 120000000 },
  { "label": "2020", "value": 135000000 }
]
```

**Campos:**
- `label` (string): Ano
- `value` (number): Valor total de bolsas em reais (R$)

**Total de registros:** 7 anos (2019-2025)

---

### grafico9_1.json
**Arquivo de dados para:** Valor de Bolsas de Bancada (BBP) por Ano  
**Localização:** `/public/data/grafico9_1.json`

**Estrutura:**
```json
[
  { "label": "string", "value": number }
]
```

**Exemplo:**
```json
[
  { "label": "2019", "value": 15000000 },
  { "label": "2020", "value": 18000000 }
]
```

**Campos:**
- `label` (string): Ano
- `value` (number): Valor de BBP em reais (R$)

**Total de registros:** 7 anos (2019-2025)

---

## 👥 Sexo

### grafico10.json
**Arquivo de dados para:** Distribuição Total de Fomento por Sexo  
**Localização:** `/public/data/grafico10.json`

**Estrutura:**
```json
[
  { "label": "string", "value": number }
]
```

**Exemplo:**
```json
[
  { "label": "Feminino", "value": 1260825960 },
  { "label": "Masculino", "value": 1540902813 }
]
```

**Campos:**
- `label` (string): Sexo (Feminino/Masculino)
- `value` (number): Valor total em reais (R$)

**Total de registros:** 2 categorias

---

### grafico11.json
**Arquivo de dados para:** Valor de Fomento por Sexo e Ano  
**Localização:** `/public/data/grafico11.json`

**Estrutura:**
```json
[
  { "label": "string", "feminino": number, "masculino": number }
]
```

**Exemplo:**
```json
[
  { "label": "2019", "feminino": 150000000, "masculino": 180000000 },
  { "label": "2020", "feminino": 160000000, "masculino": 190000000 }
]
```

**Campos:**
- `label` (string): Ano
- `feminino` (number): Valor para sexo feminino em reais (R$)
- `masculino` (number): Valor para sexo masculino em reais (R$)

**Total de registros:** 7 anos (2019-2025)

---

### grafico12.json
**Arquivo de dados para:** Valor total de fomentos da FAPERJ por sexo e ano  
**Localização:** `/public/data/grafico12.json`

**Estrutura:**
```json
[
  { "ano": "string", "feminino": number, "masculino": number }
]
```

**Exemplo:**
```json
[
  { "ano": "2019", "feminino": 120000000, "masculino": 145000000 },
  { "ano": "2020", "feminino": 135000000, "masculino": 160000000 }
]
```

**Campos:**
- `ano` (string): Ano
- `feminino` (number): Valor total feminino em reais (R$)
- `masculino` (number): Valor total masculino em reais (R$)

**Total de registros:** 7 anos (2019-2025)

---

### grafico13.json
**Arquivo de dados para:** Quantidade de Bolsas por Sexo e Ano  
**Localização:** `/public/data/grafico13.json`

**Estrutura:**
```json
[
  { "ano": "string", "feminino": number, "masculino": number }
]
```

**Exemplo:**
```json
[
  { "ano": "2019", "feminino": 1500, "masculino": 1800 },
  { "ano": "2020", "feminino": 1600, "masculino": 1900 }
]
```

**Campos:**
- `ano` (string): Ano
- `feminino` (number): Quantidade de bolsas para sexo feminino
- `masculino` (number): Quantidade de bolsas para sexo masculino

**Total de registros:** 7 anos (2019-2025)

---

### grafico14.json
**Arquivo de dados para:** Valor de Auxílios por Sexo e Ano  
**Localização:** `/public/data/grafico14.json`

**Estrutura:**
```json
[
  { "ano": "string", "feminino": number, "masculino": number }
]
```

**Exemplo:**
```json
[
  { "ano": "2019", "feminino": 35000000, "masculino": 52000000 },
  { "ano": "2020", "feminino": 42000000, "masculino": 58000000 }
]
```

**Campos:**
- `ano` (string): Ano
- `feminino` (number): Valor de auxílios para sexo feminino em reais (R$)
- `masculino` (number): Valor de auxílios para sexo masculino em reais (R$)

**Total de registros:** 7 anos (2019-2025)

---

### grafico15.json
**Arquivo de dados para:** Quantidade de Auxílios por Sexo e Ano  
**Localização:** `/public/data/grafico15.json`

**Estrutura:**
```json
[
  { "ano": "string", "feminino": number, "masculino": number }
]
```

**Exemplo:**
```json
[
  { "ano": "2019", "feminino": 250, "masculino": 467 },
  { "ano": "2020", "feminino": 280, "masculino": 431 }
]
```

**Campos:**
- `ano` (string): Ano
- `feminino` (number): Quantidade de auxílios para sexo feminino
- `masculino` (number): Quantidade de auxílios para sexo masculino

**Total de registros:** 7 anos (2019-2025)

---

### grafico16.json
**Arquivo de dados para:** Valor Total de Bolsas por Sexo e Ano  
**Localização:** `/public/data/grafico16.json`

**Estrutura:**
```json
[
  { "ano": "string", "feminino": number, "masculino": number }
]
```

**Exemplo:**
```json
[
  { "ano": "2019", "feminino": 85000000, "masculino": 93000000 },
  { "ano": "2020", "feminino": 93000000, "masculino": 102000000 }
]
```

**Campos:**
- `ano` (string): Ano
- `feminino` (number): Valor de bolsas para sexo feminino em reais (R$)
- `masculino` (number): Valor de bolsas para sexo masculino em reais (R$)

**Total de registros:** 7 anos (2019-2025)

---

### grafico16_1.json
**Arquivo de dados para:** Valor das Bolsas de Bancada (BBP) por Sexo e Ano  
**Localização:** `/public/data/grafico16_1.json`

**Estrutura:**
```json
[
  { "ano": "string", "feminino": number, "masculino": number }
]
```

**Exemplo:**
```json
[
  { "ano": "2019", "feminino": 12000000, "masculino": 15000000 },
  { "ano": "2020", "feminino": 14000000, "masculino": 17000000 }
]
```

**Campos:**
- `ano` (string): Ano
- `feminino` (number): Valor de BBP para sexo feminino em reais (R$)
- `masculino` (number): Valor de BBP para sexo masculino em reais (R$)

**Total de registros:** 7 anos (2019-2025)

---

### grafico17.json
**Arquivo de dados para:** Quantidade de Fomentos por Sexo e Ano  
**Localização:** `/public/data/grafico17.json`

**Estrutura:**
```json
[
  { "ano": "string", "feminino": number, "masculino": number }
]
```

**Exemplo:**
```json
[
  { "ano": "2019", "feminino": 1750, "masculino": 2267 },
  { "ano": "2020", "feminino": 1880, "masculino": 2331 }
]
```

**Campos:**
- `ano` (string): Ano
- `feminino` (number): Quantidade total de fomentos para sexo feminino
- `masculino` (number): Quantidade total de fomentos para sexo masculino

**Total de registros:** 7 anos (2019-2025)

---

## 🗺️ Regionalização

### grafico18.json
**Arquivo de dados para:** Regionalização – Evolução Anual por Região (2019–2024)  
**Localização:** `/public/data/grafico18.json`

**Estrutura:**
```json
[
  { 
    "ano": "string", 
    "metropolitana": number, 
    "norte": number, 
    "sul": number, 
    "serrana": number, 
    "lagos": number,
    "noroeste": number,
    "centro_sul": number
  }
]
```

**Exemplo:**
```json
[
  { 
    "ano": "2019", 
    "metropolitana": 450000000, 
    "norte": 35000000, 
    "sul": 28000000,
    "serrana": 22000000,
    "lagos": 15000000,
    "noroeste": 12000000,
    "centro_sul": 18000000
  }
]
```

**Campos:**
- `ano` (string): Ano
- `metropolitana` (number): Valor região metropolitana em reais (R$)
- `norte` (number): Valor região norte em reais (R$)
- `sul` (number): Valor região sul em reais (R$)
- `serrana` (number): Valor região serrana em reais (R$)
- `lagos` (number): Valor região dos lagos em reais (R$)
- `noroeste` (number): Valor região noroeste em reais (R$)
- `centro_sul` (number): Valor região centro-sul em reais (R$)

**Total de registros:** 6 anos (2019-2024)

---

### GraficoLineRace - Dados dinâmicos
**Arquivo de dados para:** Fomento por Região (Line Race Animado)  
**Localização:** Utiliza os mesmos dados de `grafico18.json` processados dinamicamente

**Observação:** Este gráfico processa os dados em frames animados para criar o efeito de corrida de linhas ao longo do tempo.

---

## 🌍 Internacionalização

### int_anos.json
**Arquivo de dados para:** Evolução das Colaborações Internacionais por Ano  
**Localização:** `/public/data/int_anos.json`

**Estrutura:**
```json
[
  { "label": "string", "value": number }
]
```

**Exemplo:**
```json
[
  { "label": "2018", "value": 11 },
  { "label": "2019", "value": 22 },
  { "label": "2020", "value": 6 },
  { "label": "2021", "value": 5 },
  { "label": "2022", "value": 40 },
  { "label": "2023", "value": 18 },
  { "label": "2024", "value": 10 },
  { "label": "2025", "value": 79 }
]
```

**Campos:**
- `label` (string): Ano
- `value` (number): Quantidade de colaborações internacionais

**Total de registros:** 8 anos (2018-2025)

---

### int_paises.json
**Arquivo de dados para:** Instituições por País  
**Localização:** `/public/data/int_paises.json`

**Estrutura:**
```json
[
  { "label": "string", "value": number }
]
```

**Exemplo:**
```json
[
  { "label": "França", "value": 45 },
  { "label": "Reino Unido", "value": 24 },
  { "label": "Itália", "value": 19 },
  { "label": "Bélgica", "value": 15 },
  { "label": "Estados Unidos", "value": 11 },
  { "label": "Outros países", "value": 40 }
]
```

**Campos:**
- `label` (string): Nome do país
- `value` (number): Quantidade de instituições colaboradoras

**Total de registros:** ~13 países + categoria "Outros"

---

### int_cidades.json
**Arquivo de dados para:** Instituições por Cidade  
**Localização:** `/public/data/int_cidades.json`

**Estrutura:**
```json
[
  { "label": "string", "value": number }
]
```

**Exemplo:**
```json
[
  { "label": "Paris", "value": 25 },
  { "label": "Londres", "value": 18 },
  { "label": "Roma", "value": 12 }
]
```

**Campos:**
- `label` (string): Nome da cidade
- `value` (number): Quantidade de instituições

**Total de registros:** Variável (principais cidades)

---

### int_areas.json
**Arquivo de dados para:** Instituições por Grande Área  
**Localização:** `/public/data/int_areas.json`

**Estrutura:**
```json
[
  { "label": "string", "value": number }
]
```

**Exemplo:**
```json
[
  { "label": "Engenharias", "value": 45 },
  { "label": "Ciências Biológicas", "value": 38 },
  { "label": "Ciências Humanas", "value": 32 }
]
```

**Campos:**
- `label` (string): Nome da grande área
- `value` (number): Quantidade de colaborações

**Total de registros:** ~9 grandes áreas

---

### int_sankey.json
**Arquivo de dados para:** Fluxo de Colaboração Internacional – País ↔ Grande Área  
**Localização:** `/public/data/int_sankey.json`

**Estrutura:**
```json
{
  "nodes": [
    { "name": "string" }
  ],
  "links": [
    { "source": "string", "target": "string", "value": number }
  ]
}
```

**Exemplo:**
```json
{
  "nodes": [
    { "name": "França" },
    { "name": "Reino Unido" },
    { "name": "Engenharias" },
    { "name": "Ciências Humanas" }
  ],
  "links": [
    { "source": "França", "target": "Engenharias", "value": 15 },
    { "source": "França", "target": "Ciências Humanas", "value": 12 },
    { "source": "Reino Unido", "target": "Engenharias", "value": 8 }
  ]
}
```

**Campos:**
- `nodes` (array): Lista de nós (países e áreas)
  - `name` (string): Nome do nó
- `links` (array): Conexões entre países e áreas
  - `source` (string): País de origem
  - `target` (string): Área de destino
  - `value` (number): Quantidade de colaborações

**Total de nós:** ~23 nós (12 países + 11 áreas)  
**Total de links:** Variável (conexões entre países e áreas)

---

## 📊 Arquivo Adicional

### faperj-stats.json
**Arquivo de dados para:** Cards Estatísticos da Homepage  
**Localização:** `/public/data/faperj-stats.json`

**Estrutura:**
```json
{
  "statsData": {
    "cardData": [
      {
        "title": "string",
        "value": "string",
        "icon": "string",
        "color": "string"
      }
    ]
  }
}
```

**Exemplo:**
```json
{
  "statsData": {
    "cardData": [
      {
        "title": "Investimento Total",
        "value": "R$ 2,85 Bi",
        "icon": "AttachMoney",
        "color": "#1976d2"
      },
      {
        "title": "Quantidade de Auxílios",
        "value": "9.349",
        "icon": "Assignment",
        "color": "#388e3c"
      }
    ]
  }
}
```

**Campos:**
- `title` (string): Título do card
- `value` (string): Valor formatado para exibição
- `icon` (string): Nome do ícone Material-UI
- `color` (string): Cor do card (hexadecimal)

**Total de registros:** 5 cards estatísticos

---

## 🔧 Convenções e Padrões

### Formatos de Dados

1. **Valores Monetários**
   - Armazenados como `number` (inteiros)
   - Representam valores em centavos ou reais inteiros
   - Exemplo: `195313840` = R$ 195.313.840,00

2. **Quantidades**
   - Armazenados como `number` (inteiros)
   - Representam contagens absolutas
   - Exemplo: `717` = 717 auxílios/bolsas

3. **Anos**
   - Armazenados como `string`
   - Formato: "YYYY"
   - Exemplo: `"2025"`

4. **Categorias**
   - Armazenados como `string`
   - Capitalização consistente
   - Exemplo: `"Ciências Biológicas"`

### Cores (Gráficos)

- **Cor primária FAPERJ:** `#124b6c` (azul institucional)
- **Cores de categorias:** Paleta personalizada por área
- **Formato:** Hexadecimal (`#RRGGBB`)

### Padrões de Nomenclatura

- **Arquivos de gráficos gerais:** `graficoN.json` (N = 1-18)
- **Arquivos de gráficos variantes:** `graficoN_X.json` (X = variação)
- **Arquivos de internacionalização:** `int_TIPO.json`
- **Uso de underscores** para separar palavras em nomes de arquivos

---

## 📝 Notas para Analistas de Dados

### Atualização de Dados

1. **Periodicidade:** Os dados devem ser atualizados conforme disponibilidade do sistema SBA/FAPERJ
2. **Integridade:** Manter consistência entre campos relacionados (ex: total = bolsas + auxilios)
3. **Formato:** Seguir rigorosamente a estrutura JSON documentada
4. **Validação:** Verificar tipos de dados e valores antes do deploy

### Processamento

- Os gráficos processam os dados no lado do cliente (browser)
- Valores monetários são formatados em tempo de execução
- Cálculos derivados (como totais e percentuais) são feitos automaticamente
- Cores podem ser customizadas por arquivo ou por categoria

### Fontes de Dados

- **SBA/FAPERJ:** Sistema de Bolsas e Auxílios (gráficos 1-18)
- **ASSINT/FAPERJ:** Assessoria Internacional (gráficos de internacionalização)
- **Período predominante:** 2019-2025
- **Dados de internacionalização:** 2018-2025

---

## 📊 Total de Arquivos de Dados: **26**

- Gráficos gerais: 18 arquivos
- Internacionalização: 5 arquivos
- Variantes: 2 arquivos (grafico9_1, grafico16_1)
- Estatísticas: 1 arquivo (faperj-stats)
