// scripts/cleanLogs.ts
// Script utilitário para remover arquivos .log da pasta "logs" do projeto.
// Tipado para não quebrar o TypeScript/Next no build.

/* eslint-disable no-console */

import fs from "fs";
import path from "path";

/**
 * Remove arquivos .log recursivamente a partir de um diretório base.
 */
function deleteLogs(dir: string): void {
  if (!fs.existsSync(dir)) {
    return;
  }

  const files: string[] = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      // Chamada recursiva para subpastas
      deleteLogs(filePath);
    } else if (file.endsWith(".log")) {
      try {
        fs.unlinkSync(filePath);
        console.log(`Removed log file: ${filePath}`);
      } catch (error) {
        console.error(`Failed to remove log file: ${filePath}`, error);
      }
    }
  }
}

// Diretório padrão de logs na raiz do projeto
const logsDir: string = path.join(process.cwd(), "logs");
deleteLogs(logsDir);
