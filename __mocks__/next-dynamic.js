const React = require("react");

/**
 * Mock para next/dynamic usado em testes.
 * - Se o factory resolver síncronamente, retorna o componente real.
 * - Se o factory retornar uma Promise (import dinâmico), retorna um componente placeholder que renderiza null
 *   (evita updates assíncronos que geram warnings em testes unitários).
 *
 * Aceita:
 *   dynamic(() => import('./Comp'))         // factory function
 *   dynamic({ loader: () => import('./C')}) // object com loader
 */
module.exports = (dynamicImport) => {
  // tenta extrair a "fonte" do dynamic: função (factory) ou objeto { loader }
  let candidate;
  try {
    if (typeof dynamicImport === "function") {
      candidate = dynamicImport();
    } else if (dynamicImport && typeof dynamicImport === "object" && typeof dynamicImport.loader === "function") {
      candidate = dynamicImport.loader();
    } else {
      candidate = dynamicImport;
    }
  } catch (e) {
    candidate = null;
  }

  // se for uma Promise (import dinâmico), retornamos placeholder síncrono
  if (candidate && typeof candidate.then === "function") {
    const DynamicPlaceholder = (props) => null;
    DynamicPlaceholder.displayName = "DynamicPlaceholder";
    return DynamicPlaceholder;
  }

  // se o candidate já for o módulo/Componente, extraímos o default ou o próprio
  const Resolved = candidate && (candidate.default || candidate);
  if (Resolved) {
    const Wrapper = (props) => React.createElement(Resolved, props);
    Wrapper.displayName = `Dynamic(${Resolved.displayName || Resolved.name || "Component"})`;
    return Wrapper;
  }

  // fallback: componente vazio
  return () => null;
};
