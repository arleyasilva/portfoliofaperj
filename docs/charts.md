# Gráficos

Localização: `src/components/dashboard/charts/`

Cada arquivo é um componente React que monta as opções do ECharts e recebe dados via `useFaperjData`.

Como remover/ocultar uma série específica (ex.: "Não definido") apenas em um gráfico

1. Abra o arquivo do gráfico, por exemplo: `src/components/dashboard/charts/grafico14.tsx`.
2. Remova a entrada correspondente na propriedade `legend.data`.
3. Remova a série correspondente do array `series` (o objeto onde `name: "Não definido"`).
4. Ajuste o `tooltip.formatter` para não procurar pela série removida.

Exemplo rápido (remover 'Não definido'):

- Antes:

```ts
legend: { data: ["Feminino", "Masculino", "Não definido"] },
series: [ ..., { name: "Não definido", data: ... } ]
```

- Depois:

```ts
legend: { data: ["Feminino", "Masculino"] },
series: [ ... /* sem a série de não definido */ ]
```

Se preferir remover globalmente a categoria (ou transformar os dados), filtre os dados no hook `useFaperjData` antes de retorná-los aos componentes.

Colors / Estilos
- Cada série define `itemStyle.color` ou `lineStyle.color` — ajuste para personalizar o visual.

Tooltip
- O `formatter` costuma buscar a série por `seriesName`. Se a série for opcional, verifique a existência do objeto antes de acessar `value`.
