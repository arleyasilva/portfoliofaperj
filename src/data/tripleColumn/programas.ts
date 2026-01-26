// src/data/tripleColumn/programas.ts
// Programas da FAPERJ - Atualizado de https://www.faperj.br/?id=31.5.4

export interface ProgramaItem {
  id: string;
  label: string;
  content: string;
}

export const PROGRAMAS_DATA: ProgramaItem[] = [
  {
    id: "pronex",
    label: "Programa de Apoio a Núcleos de Excelência - Pronex",
    content:
      "Destina-se a apoiar a execução de projetos de pesquisa científica, tecnológica e de inovação de grupos de pesquisa de reconhecida excelência no Estado do Rio de Janeiro."
  },
  {
    id: "bolsa-nota-10",
    label: "Programa Bolsa Nota 10",
    content:
      "Destina-se a incentivar os Programas de Pós-Graduação do Estado do Rio de Janeiro de significativa excelência, mediante a concessão de bolsas com valores diferenciados a alunos de mestrado e doutorado com destacado desempenho acadêmico."
  },
  {
    id: "cientista-nosso-estado",
    label: "Cientista do Nosso Estado",
    content:
      "As bolsas destinam-se a apoiar projetos coordenados por pesquisadores de reconhecida liderança em sua área, vinculados a instituições de ensino e pesquisa sediadas no estado do Rio de Janeiro."
  },
  {
    id: "jovem-cientista-nosso-estado",
    label: "Jovem Cientista do Nosso Estado",
    content:
      "As bolsas destinam-se a apoiar projetos coordenados por pesquisadores em fase intermediária da carreira acadêmica, que tenham obtido grau de doutor há menos de 10 anos."
  },
  {
    id: "producao-divulgacao-cientifica",
    label: "Estímulo à produção e divulgação científica e tecnológica",
    content:
      "Destinam-se a apoiar a produção de material didático e de divulgação científica e tecnológica no Estado do Rio de Janeiro, por meio do lançamento de livros, manuais, números especiais de revistas, vídeos, CDs e DVDs."
  },
  {
    id: "faperj-fapesp-mudancas-climaticas",
    label: "Programa FAPERJ/Fapesp sobre Mudanças Climáticas Globais",
    content:
      "Tem por objetivo apoiar projetos de pesquisa conjuntos entre pesquisadores dos Estados do Rio de Janeiro e de São Paulo, visando à produção de conhecimento científico e tecnológico no tema Mudanças Climáticas Globais."
  },
  {
    id: "pappe-subvencao-rio-inovacao",
    label: "PAPPE Subvenção - Rio Inovação (Parceria FAPERJ/Finep)",
    content:
      "Destina-se a apoiar o desenvolvimento de projetos de inovação tecnológica no Estado do Rio de Janeiro por micro e pequenas empresas que se proponham a realizar atividades de desenvolvimento e inovação com potencial de inserção no mercado."
  },
  {
    id: "pensa-rio",
    label: "Pensa Rio - Apoio ao estudo de temas relevantes e estratégicos",
    content:
      "Estímulo à realização de projetos de pesquisa multidisciplinares abrangentes, em áreas relevantes e estratégicas para o Estado do Rio de Janeiro."
  },
  {
    id: "apoio-pos-graduacao-universidades-estaduais",
    label: "Apoio a programas de pós-graduação stricto sensu em Universidades Estaduais",
    content:
      "Destina-se a apoiar a aquisição de materiais de consumo, equipamentos, serviços diversos e a execução de obras de infraestrutura previstos em projetos apresentados por programas de pós-graduação stricto sensu credenciados pela CAPES."
  },
  {
    id: "infraestrutura-universidades-estaduais",
    label: "Apoio à implantação, recuperação e modernização da infraestrutura nas Universidades Estaduais - Uerj, Uenf e Uezo",
    content:
      "Objetiva apoiar a aquisição e manutenção de equipamentos, e a execução de obras de infraestrutura previstas em projetos apresentados por pesquisadores vinculados às Universidades Estaduais do Rio de Janeiro."
  },
  {
    id: "apoio-instituicoes-ensino-pesquisa",
    label: "Apoio às instituições de ensino e pesquisa sediadas no Estado do Rio de Janeiro",
    content:
      "Destina-se a apoiar a aquisição e manutenção de equipamentos, bem como pequenas obras de infraestrutura necessárias para a execução de projetos em diferentes áreas da Ciência e Tecnologia."
  },
  {
    id: "pronem",
    label: "Apoio a núcleos emergentes de pesquisa - PRONEM (parceria FAPERJ-CNPq)",
    content:
      "Programa de apoio a atividades de pesquisa científica, tecnológica e de inovação que visa à consolidação de grupos de pesquisa considerados emergentes em instituições de ensino e pesquisa sediadas no Estado do Rio de Janeiro."
  },
  {
    id: "difusao-popularizacao-ciencia",
    label: "Difusão e Popularização da Ciência e Tecnologia",
    content:
      "Destina-se a incentivar, estimular, promover e a apoiar iniciativas que versem sobre a Difusão e Popularização da Ciência e Tecnologia, visando democratizar o conhecimento científico e tecnológico produzido."
  },
  {
    id: "melhoria-ensino-escolas-publicas",
    label: "Apoio à melhoria do ensino em escolas públicas do Estado do Rio de Janeiro",
    content:
      "Objetiva apoiar iniciativas que visem à melhoria do ensino em escolas públicas, por meio de projetos que abordem temas relevantes ao processo de ensino-aprendizagem e que permitam o aprimoramento da infraestrutura dessas escolas."
  },
  {
    id: "jovens-talentos",
    label: "Jovens Talentos",
    content:
      "Destina-se à concessão de bolsas de pré-iniciação científica para estudantes do ensino médio público que tenham interesse e potencial para atuar em atividades de pesquisa em ciência e tecnologia."
  },
  {
    id: "apoio-faetec-pesagro",
    label: "Apoio a entidades estaduais de Ciência e Tecnologia - Faetec e Pesagro",
    content:
      "Objetiva apoiar a implantação, adequação, modernização e otimização da infraestrutura de laboratórios e demais ambientes tecnológicos destinados à execução de projetos em diferentes áreas da Ciência e Tecnologia."
  },
  {
    id: "transplante-orgaos-tecidos",
    label: "Pesquisa em transplante de órgãos e tecidos no Estado do Rio de Janeiro",
    content:
      "Objetiva estimular a realização de projetos de pesquisa na área de Transplante de Órgãos e Tecidos, mediante apoio à aquisição e manutenção de equipamentos, bem como à realização de pequenas obras de infraestrutura."
  },
  {
    id: "infraestrutura-bioterios",
    label: "Infraestrutura de biotérios em instituições de ensino e pesquisa",
    content:
      "Programa destinado a apoiar a implantação, implementação, modernização, adequação e o funcionamento de biotérios que tenham como finalidade a produção ou manutenção de animais utilizados em projetos de pesquisas científicas."
  },
  {
    id: "pesquisa-clinica-hospitais",
    label: "Pesquisa clínica em Hospitais Universitários sediados no Estado do Rio de Janeiro",
    content:
      "Destina-se a apoiar o desenvolvimento de projetos de pesquisa clínica. Os projetos devem ser apresentados por pesquisadores pertencentes ao corpo clínico de hospitais universitários sediados no Estado do Rio de Janeiro."
  },
  {
    id: "doencas-negligenciadas",
    label: "Apoio ao estudo de doenças negligenciadas e reemergentes",
    content:
      "Objetiva apoiar e estimular projetos de pesquisa sobre doenças reemergentes e negligenciadas que levem ao avanço do conhecimento em prevenção, diagnóstico e tratamento, com possibilidade de aplicabilidade clínica."
  },
  {
    id: "faperj-firjan-sebrae-design",
    label: "Programa FAPERJ/Firjan/Sebrae-RJ de Apoio ao Desenvolvimento do Design",
    content:
      "Objetiva apoiar projetos de inovação na área de design de produtos de empresas sediadas no Estado do Rio de Janeiro, visando à interação entre empresas fluminenses e profissionais com foco no incremento da competitividade."
  },
  {
    id: "pesquisa-sus",
    label: "Pesquisa para o SUS: gestão compartilhada em saúde (Parceria FAPERJ/MS-Decit/CNPq)",
    content:
      "Visa contribuir para o incremento científico e tecnológico no País, e para a redução das desigualdades regionais na área da saúde. O objetivo geral é apoiar pesquisas científicas, tecnológicas e de inovação."
  },
  {
    id: "producao-divulgacao-artes",
    label: "Apoio à produção e divulgação das artes no Estado do Rio de Janeiro",
    content:
      "Objetiva estimular a produção e a divulgação das artes no Estado do Rio de Janeiro, por meio do apoio a projetos de pesquisa nas subáreas: Fundamentos e Críticas das Artes, Artes Plásticas, Música, Dança, Teatro, Ópera, Fotografia, Cinema e Educação Artística."
  },
  {
    id: "cidadania-pessoa-deficiencia",
    label: "Apoio à construção da cidadania da pessoa com deficiência",
    content:
      "Destina-se a estimular a realização de projetos que tenham por objetivo o estudo e o provimento de diagnósticos e soluções em temas relacionados à promoção do direito à cidadania da pessoa com deficiência."
  },
  {
    id: "humanidades",
    label: "Projetos de pesquisa na área de Humanidades",
    content:
      "Destina-se a estimular o fortalecimento de linhas de pesquisa na área de Humanidades e suas subáreas - Ciências Sociais, Sociais Aplicadas, Lingüística e Letras, por meio do financiamento de projetos de pesquisa."
  },
  {
    id: "apoio-inovacao-tecnologica",
    label: "Apoio à Inovação Tecnológica",
    content:
      "Visa apoiar projetos de inovação tecnológica desenvolvido por empresas brasileiras, empresas públicas, produtores rurais, sociedades cooperativas, inventores independentes e empreendedores individuais sediados no Estado do Rio de Janeiro."
  },
  {
    id: "desenvolvimento-regional",
    label: "Apoio ao desenvolvimento científico e tecnológico regional",
    content:
      "Objetiva apoiar o desenvolvimento científico e tecnológico no Estado do Rio de Janeiro, por meio de ações integradas e focadas em vocações e prioridades regionais, com a otimização da competitividade de suas potencialidades."
  },
  {
    id: "manutencao-equipamentos-multiusuarios",
    label: "Manutenção de Equipamentos Multiusuários",
    content:
      "Objetiva propiciar recursos para a manutenção corretiva e/ou preventiva de equipamentos multiusuários de médio e grande porte, visando a mantê-los em bom funcionamento e evitar interrupções nas atividades de pesquisa."
  },
  {
    id: "equipamentos-grande-porte",
    label: "Apoio à aquisição de equipamentos de grande porte",
    content:
      "Destina-se a apoiar a aquisição de equipamentos de grande porte necessários para o desenvolvimento de linhas de pesquisa ativas ou projetos a serem implementados, mediante protocolo de viabilidade técnica-científica."
  },
  {
    id: "tecnologia-informacao",
    label: "Apoio ao desenvolvimento da Tecnologia da Informação",
    content:
      "Destina-se a apoiar projetos de inovação tecnológica para o desenvolvimento da tecnologia da informação, que contribuam para o desenvolvimento científico, tecnológico, econômico, ambiental e social do Estado do Rio de Janeiro."
  },
  {
    id: "inovacao-tecnologica-social",
    label: "Apoio ao desenvolvimento de modelos de inovação tecnológica social",
    content:
      "Destina-se a apoiar o desenvolvimento de modelos de inovação tecnológica de aplicação social por empresas, produtores rurais, inventores independentes, empreendedores individuais ou sociedades cooperativas."
  },
  {
    id: "apoio-engenharias",
    label: "Apoio às Engenharias",
    content:
      "Programa que tem por finalidade estimular a realização de projetos para melhorar e ampliar a formação de engenheiros nas diversas áreas, contribuindo para a criação, o fortalecimento e a ampliação de programas de pós-graduação."
  },
  {
    id: "meio-ambiente",
    label: "Estudo de soluções para problemas relativos ao meio ambiente",
    content:
      "Destina-se a estimular projetos de pesquisa que visem ao estudo de soluções para problemas ambientais, propiciando a efetivação de ações públicas para a melhoria da qualidade de vida da população do Estado do Rio de Janeiro."
  },
  {
    id: "extpesq",
    label: "Projetos de Extensão e Pesquisa - EXTPESQ",
    content:
      "Objetiva incentivar, apoiar e promover projetos de extensão em interface com pesquisa científica e/ou de desenvolvimento tecnológico no Estado do Rio de Janeiro."
  },
  {
    id: "incubadoras-empresas",
    label: "Apoio a incubadoras de empresas de base tecnológica",
    content:
      "Destina-se a apoiar a infraestrutura física e administrativa de Incubadoras de Empresas de base tecnológica sediadas em Instituições de Ciência e Tecnologia do Estado do Rio de Janeiro."
  },
  {
    id: "prioridade-rio",
    label: "Prioridade Rio - Apoio ao estudo de temas prioritários",
    content:
      "Objetiva estimular a realização de projetos que visem ao estudo e provimento de soluções para temas prioritários, de forma a contribuir de maneira efetiva para o desenvolvimento científico, tecnológico, econômico, ambiental e social."
  },
  {
    id: "inovacoes-esporte",
    label: "Apoio a inovações no esporte",
    content:
      "Destina-se a apoiar projetos científicos e/ou tecnológicos inovadores em temas relevantes para o esporte no Estado do Rio de Janeiro, como preparação de atletas, formação de treinadores e desenvolvimento de equipamentos."
  },
  {
    id: "periodicos-cientificos",
    label: "Publicação de periódicos científicos e tecnológicos institucionais",
    content:
      "Tem por objetivo apoiar e incentivar a editoração e publicação de periódicos científicos e tecnológicos brasileiros, impressos e/ou por via eletrônica, em todas as áreas de conhecimento."
  },
  {
    id: "pos-doutorado-capes",
    label: "Apoio ao Pós-Doutorado (Parceria FAPERJ/Capes)",
    content:
      "Este programa conjunto FAPERJ/Capes tem por objetivo o fomento às atividades de pesquisa científica, tecnológica e de inovação que visem a absorção temporária de jovens doutores para atuarem em projetos nas diferentes áreas."
  },
  {
    id: "treinamento-capacitacao-tecnica",
    label: "Treinamento e capacitação técnica (TCT)",
    content:
      "Destina-se a treinar e aperfeiçoar técnicos de nível fundamental, médio e superior que participem de atividades de apoio a projetos financiados pela FAPERJ, visando ao seu posterior ingresso no mercado de trabalho."
  },
  {
    id: "equipamento-solidario",
    label: "Equipamento solidário (Parceria FAPERJ/Capes)",
    content:
      "Parceria FAPERJ/Capes que visa apoiar a aquisição de equipamentos de pequeno e médio portes multiusuários que possam ser utilizados por Programas de Pós-graduação stricto sensu."
  },
  {
    id: "cooperacao-faperj-inria",
    label: "Cooperação bilateral FAPERJ/INRIA",
    content:
      "Programa que visa a apoiar a execução conjunta de projetos de Pesquisa, Desenvolvimento e Inovação (P&D&I) entre pesquisadores de instituições de ensino e pesquisa do Estado do Rio de Janeiro e do INRIA da França."
  },
  {
    id: "biota-rj",
    label: "Biota-RJ - Apoio ao estudo da biodiversidade",
    content:
      "Este Programa visa financiar projetos de pesquisa interdisciplinares sobre o tema da biodiversidade, sua conservação e uso sustentado no Estado do Rio de Janeiro."
  },
  {
    id: "acervos-bibliograficos",
    label: "Atualização de acervos bibliográficos",
    content:
      "A finalidade deste programa é apoiar a aquisição de livros e publicações em outras mídias, destinados à pesquisa científica e tecnológica, visando à atualização do acervo de bibliotecas."
  },
  {
    id: "inovacao-difusao-tecnologica",
    label: "Apoio à inovação e à difusão tecnológica",
    content:
      "Objetiva apoiar o desenvolvimento de projetos de inovação ou de difusão de processos tecnológicos no Estado do Rio de Janeiro por empresários individuais ou micros e pequenas sociedades empresárias."
  },
  {
    id: "equipes-discentes-projetos",
    label: "Apoio a Equipes Discentes em Projetos de Base Tecnológica",
    content:
      "Destina-se a apoiar projetos de iniciação ou pré-iniciação tecnológica que permitam aos discentes aplicarem conhecimentos teóricos na execução de projetos práticos, com a finalidade de participarem em competições educacionais."
  }
];
