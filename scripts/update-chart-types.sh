#!/bin/bash

# Script para atualizar tipagens any em gráficos
# Atualiza formatter: (params: any[]) => para formatter: (params: TooltipFormatterParams) =>

CHARTS_DIR="src/components/dashboard/charts"

# Lista de gráficos que precisam ser atualizados
CHARTS=(
  "grafico5.tsx"
  "grafico6.tsx"
  "grafico7.tsx"
  "grafico8.tsx"
  "grafico9.tsx"
  "grafico9_1.tsx"
  "grafico10.tsx"
  "grafico11.tsx"
  "grafico12.tsx"
  "grafico13.tsx"
  "grafico14.tsx"
  "grafico15.tsx"
  "grafico16.tsx"
  "grafico16_1.tsx"
  "grafico17.tsx"
  "grafico18.tsx"
  "GraficoIntPaises.tsx"
  "GraficoIntCidades.tsx"
  "GraficoIntAnos.tsx"
  "GraficoIntAreas.tsx"
)

echo "Iniciando atualização de tipagens..."

for chart in "${CHARTS[@]}"; do
  file="$CHARTS_DIR/$chart"
  
  if [ -f "$file" ]; then
    echo "Processando: $chart"
    
    # Adiciona import do TooltipFormatterParams se não existir
    if ! grep -q "TooltipFormatterParams" "$file"; then
      # Encontra a linha de import do @/types/faperj e adiciona depois
      sed -i '' '/import.*from "@\/types\/faperj";/a\
import { TooltipFormatterParams } from "@/types/echarts";\
' "$file"
    fi
    
    # Substitui formatter: (params: any[]) por formatter: (params: TooltipFormatterParams)
    sed -i '' 's/formatter: (params: any\[\])/formatter: (params: TooltipFormatterParams)/g' "$file"
    
    # Substitui formatter: (p: any) por formatter: (p: TooltipFormatterParams)
    sed -i '' 's/formatter: (p: any)/formatter: (p: TooltipFormatterParams)/g' "$file"
    
    echo "✓ $chart atualizado"
  else
    echo "✗ Arquivo não encontrado: $file"
  fi
done

echo "Atualização concluída!"
