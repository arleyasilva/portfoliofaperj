// scripts/cleanLogs.js
const fs = require("fs");
const path = require("path");

function deleteLogs(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      deleteLogs(fullPath);
    } else if (file.endsWith(".log")) {
      console.log("🧹 Removendo:", fullPath);
      fs.unlinkSync(fullPath);
    }
  }
}

// Pastas onde procurar logs
const targets = [
  path.join(__dirname, "..", "logs"),
  path.join(__dirname, "..", "src"),
];

console.log("🚀 Limpando arquivos .log...");

targets.forEach(deleteLogs);

console.log("✅ Limpeza concluída!");
