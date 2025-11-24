#!/bin/bash
# =========================================================
# Script: update_branch.sh
# Autor: Árley Alves da Silva
# Função: Atualizar o branch 'att3' com a versão mais recente da 'main'
# =========================================================

BRANCH_DEV="att3"
BRANCH_MAIN="main"

echo "🔹 Atualizando branch '$BRANCH_DEV' com a última versão de '$BRANCH_MAIN'..."
sleep 1

# Confirma o branch atual
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Verifica se o repositório está limpo
if [[ -n $(git status --porcelain) ]]; then
  echo "⚠️  Há alterações não commitadas no branch atual ($CURRENT_BRANCH)."
  echo "💡 Faça commit ou stash antes de rodar este script."
  exit 1
fi

# Atualiza a main
echo "➡️  Mudando para branch '$BRANCH_MAIN'..."
git checkout $BRANCH_MAIN || exit 1

echo "📥 Puxando últimas atualizações da main..."
git pull origin $BRANCH_MAIN || exit 1

# Volta para o branch de desenvolvimento
echo "➡️  Voltando para branch '$BRANCH_DEV'..."
git checkout $BRANCH_DEV || exit 1

echo "🔀 Fazendo merge da main no $BRANCH_DEV..."
git merge $BRANCH_MAIN

# Caso existam conflitos
if [[ $? -ne 0 ]]; then
  echo "⚠️  Existem conflitos. Resolva-os manualmente e depois rode:"
  echo "     git add . && git commit -m 'Merge resolvido' && git push origin $BRANCH_DEV"
  exit 1
fi

# Se tudo certo, envia as atualizações
echo "🚀 Enviando branch '$BRANCH_DEV' atualizado para o GitHub..."
git push origin $BRANCH_DEV || exit 1

echo ""
echo "✅ Branch '$BRANCH_DEV' atualizado e sincronizado com '$BRANCH_MAIN'."
echo "Agora você pode criar o Pull Request no GitHub (att3 → main)."
echo "========================================================="
