// Dados dos Editais FAPERJ - Atualizados de https://www.faperj.br/?id=28.5.7
// Última atualização: Dezembro 2025

export interface EditalItem {
  id: string;
  numero: string;
  titulo: string;
  publicacao: string;
  submissao: string;
  resultadoPrevisao?: string;
  linkEdital: string;
  linkResultado?: string;
  status: "aberto" | "encerrado" | "resultado" | "em-avaliacao";
  // rótulo amigável (preenchido pela API quando disponível)
  statusLabel?: string;
  observacoes?: string;
}

export const EDITAIS_DATA: EditalItem[] = [
  {
    id: "edital-45-2025",
    numero: "Nº 45/2025",
    titulo: "Programa de Apoio à Estruturação e Consolidação de Indicações Geográficas (IGs)",
    publicacao: "15/12/2025",
    submissao: "15/12/2025 a 15/01/2026 (encerrado)",
    resultadoPrevisao: "Resultado Preliminar: 28/02/2026",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_45_2025.pdf",
    status: "em-avaliacao"
  },
  {
    id: "edital-44-2025",
    numero: "Nº 44/2025",
    titulo: "Pesquisador na Empresa",
    publicacao: "10/12/2025",
    submissao: "10/12/2025 a 10/01/2026 (encerrado)",
    resultadoPrevisao: "Resultado Preliminar: 20/02/2026",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_44_2025.pdf",
    status: "em-avaliacao"
  },
  {
    id: "edital-43-2025",
    numero: "Nº 43/2025",
    titulo: "Programa Básico Especial para Cursos Emergentes, Mestrado e Doutorado 2025",
    publicacao: "05/12/2025",
    submissao: "05/12/2025 a 05/01/2026 (encerrado)",
    resultadoPrevisao: "Resultado Preliminar: 15/02/2026",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_43_2025.pdf",
    status: "em-avaliacao"
  },
  {
    id: "edital-42-2025",
    numero: "Nº 42/2025",
    titulo: "Programa de Apoio Emergencial para Programas de Pós-Graduação Stricto Sensu 6 e 7 – CAPES",
    publicacao: "01/12/2025",
    submissao: "01/12/2025 a 31/12/2025 (encerrado)",
    resultadoPrevisao: "Resultado Preliminar: 10/02/2026",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_42_2025.pdf",
    status: "em-avaliacao"
  },
  {
    id: "edital-41-2025",
    numero: "Nº 41/2025",
    titulo: "Programa Luiz Pinguelli Rosa de Apoio à Mobilidade e Instalação de Pesquisadores Originários de Regiões em Conflito em ICTs do Estado do Rio de Janeiro – 3ª Edição",
    publicacao: "25/11/2025",
    submissao: "25/11/2025 a 25/12/2025 (encerrado)",
    resultadoPrevisao: "Resultado Preliminar: 05/02/2026",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_41_2025.pdf",
    status: "em-avaliacao",
    observacoes: "⚠️ Edital destinado a pesquisadores de regiões em conflito"
  },
  {
    id: "edital-37-2025",
    numero: "Nº 37/2025",
    titulo: "Bolsa de Pós-Doutorado Sênior (PDS)",
    publicacao: "27/11/2025",
    submissao: "27/11/2025 a 27/02/2026",
    resultadoPrevisao: "Resultado Preliminar: 09/04/2026",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_37_2025_-_P%C3%B3s-Doutorado_S%C3%AAnior_(PDS).pdf",
    status: "aberto"
  },
  {
    id: "edital-34-2025",
    numero: "Nº 34/2025",
    titulo: "Programa Prioridade Rio",
    publicacao: "07/11/2025",
    submissao: "07/11/2025 a 01/12/2025",
    resultadoPrevisao: "Resultado Preliminar: 05/01/2026",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_34_2025_%E2%80%93_Programa_Prioridade_Rio.pdf",
    status: "aberto"
  },
  {
    id: "edital-33-2025",
    numero: "Nº 33/2025",
    titulo: "Bolsa de Iniciação Científica (IC)",
    publicacao: "30/10/2025",
    submissao: "30/10/2025 a 12/12/2025",
    resultadoPrevisao: "Resultado Preliminar: 12/03/2026",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_33_2025_%E2%80%93_Bolsa_de_Inicia%C3%A7%C3%A3o_Cient%C3%ADfica_(IC).pdf",
    status: "aberto"
  },
  {
    id: "edital-32-2025",
    numero: "Nº 32/2025",
    titulo: "Programa Nacional de Apoio à Inovação Tecnológica – TECNOVA III",
    publicacao: "09/10/2025",
    submissao: "06/11/2025 a 19/12/2025",
    resultadoPrevisao: "Resultado Preliminar: 12/02/2026",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_32_2025_%E2%80%93_Programa_Nacional_de_Apoio_%C3%A0_Inova%C3%A7%C3%A3o_Tecnol%C3%B3gica_%E2%80%93_TECNOVA_III.pdf",
    status: "aberto"
  },
  {
    id: "edital-31-2025",
    numero: "Nº 31/2025",
    titulo: "Líder de Inovação do Nosso Estado – LINE",
    publicacao: "02/10/2025",
    submissao: "03/11/2025 a 05/12/2025",
    resultadoPrevisao: "Resultado Preliminar: 29/01/2026",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_31_2025_%E2%80%93_Programa_L%C3%ADder_de_Inova%C3%A7%C3%A3o_do_Nosso_Estado_%E2%80%93_LINE.pdf",
    status: "aberto"
  },
  {
    id: "edital-09-2025",
    numero: "Nº 09/2025",
    titulo: "Programa Jovem Cientista do Nosso Estado",
    publicacao: "10/04/2025",
    submissao: "10/04/2025 a 13/06/2025 (encerrado)",
    resultadoPrevisao: "Resultado Final divulgado (07/11/2025)",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_09_2025_-_Programa_Jovem_Cientista_do_Nosso_Estado.pdf",
    linkResultado: "https://www.faperj.br/rp/downloads/Resultado_Final_Edital_FAPERJ_N%C2%BA_9_2025_JCNE.pdf",
    status: "resultado"
  },
  {
    id: "edital-08-2025",
    numero: "Nº 08/2025",
    titulo: "Programa Cientista do Nosso Estado",
    publicacao: "10/04/2025",
    submissao: "10/04/2025 a 13/06/2025 (encerrado)",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_08_2025_-_Programa_Cientista_do_Nosso_Estado.pdf",
    linkResultado: "https://www.faperj.br/rp/downloads/Resultado_Preliminar_Edital_FAPERJ_N%C2%BA_08_2025_%E2%80%93_Programa_Cientista_do_Nosso_Estado.pdf",
    status: "encerrado",
    observacoes: "⚠️ Resultado suspenso por decisão judicial (Processo nº 3023701-57.2025.8.19.0001)"
  },
  {
    id: "edital-22-2025",
    numero: "Nº 22/2025",
    titulo: "Programa Pensa Rio – Apoio ao Estudo de Temas Relevantes e Estratégicos",
    publicacao: "07/08/2025",
    submissao: "07/08/2025 a 12/09/2025 (encerrado)",
    resultadoPrevisao: "Resultado Final divulgado (28/11/2025)",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_22_2025_%E2%80%93_Programa_Pensa_Rio_%E2%80%93_Apoio_ao_Estudo_de_Temas_Relevantes_e_Estrat%C3%A9gicos_Para_o_Estado_do_Rio_de_Janeiro.pdf",
    linkResultado: "https://www.faperj.br/rp/downloads/Resultado_Final_EDITAL_FAPERJ_N%C2%BA_22_2025_-_PENSA_RIO_-_Apoio_ao_Estudo_de_Temas_Relevantes_e_Estrat%C3%A9gicos_Para_o_Estado_do_Rio_de_Janeiro.pdf",
    status: "resultado"
  },
  {
    id: "edital-10-2025",
    numero: "Nº 10/2025",
    titulo: "Programa Doutor Empreendedor – Fase 2: Acelerando Negócios de Base Tecnológica",
    publicacao: "08/05/2025",
    submissao: "09/06/2025 a 11/07/2025 (encerrado)",
    resultadoPrevisao: "Resultado Preliminar divulgado (18/09/2025)",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_10_2025_%E2%80%93_Programa_Doutor_Empreendedor_%E2%80%93_Fase_2_Acelerando_Neg%C3%B3cios_de_Base_Tecnol%C3%B3gica.pdf",
    linkResultado: "https://www.faperj.br/rp/downloads/Resultado_Preliminar_Edital_FAPERJ_N%C2%BA_10_2025_-_Doutor_Empreendedor_Fase_2_Acelerando_Neg%C3%B3cios_de_Base_Tecnol%C3%B3gica.pdf",
    status: "resultado"
  },
  {
    id: "edital-05-2025",
    numero: "Nº 05/2025",
    titulo: "Programa Jovens Talentos",
    publicacao: "13/03/2025",
    submissao: "13/03/2025 a 15/04/2025 (encerrado)",
    resultadoPrevisao: "Resultado Final divulgado (01/07/2025)",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%B005_2025_%E2%80%93_Programa_Jovens_Talentos.pdf",
    linkResultado: "https://www.faperj.br/rp/downloads/Resultado_Final_Edital_FAPERJ_N%C2%BA_05_2025_%E2%80%93_Programa_Jovens_Talentos.pdf",
    status: "resultado"
  },
  {
    id: "edital-04-2025",
    numero: "Nº 04/2025",
    titulo: "Programa Startup RJ 2025 – Apoio à Difusão de Ambiente de Inovação",
    publicacao: "27/02/2025",
    submissao: "31/03/2025 a 30/05/2025 (encerrado)",
    resultadoPrevisao: "Resultado Final divulgado (11/07/2025)",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_04_2025_%E2%80%93_Programa_Startup_RJ_2025_Apoio_%C3%A0_Difus%C3%A3o_de_Ambiente_de_Inova%C3%A7%C3%A3o_em_Tecnologia_Digital_no_Estado_do_Rio_de_Janeiro.pdf",
    linkResultado: "https://www.faperj.br/rp/downloads/Resultado_final_Edital_FAPERJ_N%C2%BA_04_2025_%E2%80%93_Programa_HUB_RJ_Startup_2025.pdf",
    status: "resultado"
  },
  {
    id: "edital-03-2025",
    numero: "Nº 03/2025",
    titulo: "Pesquisador Visitante Emérito (PVE)",
    publicacao: "20/02/2025",
    submissao: "20/02/2025 a 27/03/2025 (encerrado)",
    resultadoPrevisao: "Resultado Final divulgado (18/07/2025)",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_03_2025_Pesquisador_Visitante_Em%C3%A9rito_(PV).pdf",
    linkResultado: "https://www.faperj.br/rp/downloads/Resultado_Final_Edital_FAPERJ_N%C2%BA_03_2025_%E2%80%93_Programa_Pesquisador_Visitante_Em%C3%A9rito_(PVE).pdf",
    status: "resultado"
  },
  {
    id: "edital-02-2025",
    numero: "Nº 02/2025",
    titulo: "Pesquisador Visitante (PV)",
    publicacao: "20/02/2025",
    submissao: "20/02/2025 a 27/03/2025 (encerrado)",
    resultadoPrevisao: "Resultado Final divulgado (18/07/2025)",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_FAPERJ_N%C2%BA_02_2025_Pesquisador_Visitante_(PV).pdf",
    linkResultado: "https://www.faperj.br/rp/downloads/Resultado_Final_Edital_FAPERJ_N%C2%BA_02_2025_%E2%80%93_Programa_Pesquisador_Visitante_(PV).pdf",
    status: "resultado"
  },
  {
    id: "edital-01-2025",
    numero: "Nº 01/2025",
    titulo: "Programa Bolsa Mestrado e Doutorado Nota 10",
    publicacao: "13/02/2025",
    submissao: "13/02/2025 a 13/03/2025 (encerrado)",
    resultadoPrevisao: "Resultados divulgados (Mestrado e Doutorado)",
    linkEdital: "https://www.faperj.br/rp/downloads/Edital_N%C2%BA_01_2025_Bolsa_NOTA10_Mestrado_e_Doutorado.pdf",
    linkResultado: "https://www.faperj.br/?id=28.5.7",
    status: "resultado"
  }
];
