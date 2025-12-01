import React from "react";

const SkipToContent: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("main-content");
    if (el) {
      const target = el as HTMLElement;
      target.setAttribute("tabindex", "-1");
      target.focus();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      const removeTabIndex = () => {
        target.removeAttribute("tabindex");
        target.removeEventListener("blur", removeTabIndex);
      };
      target.addEventListener("blur", removeTabIndex);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    // permitir ativação por SPACE (já que é um <a>, Enter funciona por padrão)
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      (e.target as HTMLAnchorElement).click();
    }
  };

  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Pular para o conteúdo principal"
    >
      Pular para o conteúdo principal
    </a>
  );
};

export default SkipToContent;
