import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  List,
  ListItemIcon,
  Collapse,
  Container,
  Link as MuiLink,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import React from 'react';
import type { BoxProps } from '@mui/material';

// Interfaces para tipar a estrutura de dados
interface NavItem {
  id: string;
  label: string;
  link?: string;
}

interface NavItemExpandable extends NavItem {
  content: string;
}

interface ColumnData {
  title: string;
  items: (NavItem | NavItemExpandable)[];
}

interface BannerHeaderProps extends BoxProps {
  image: string;
}

const BannerHeader = styled(Box)<BannerHeaderProps>(({ theme, image }) => ({
  height: 150,
  width: '100%',
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
  flex: '1 1 30%',
}));

const CardHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#00264d',
  padding: theme.spacing(2),
  borderTopLeftRadius: theme.shape.borderRadius * 2,
  borderTopRightRadius: theme.shape.borderRadius * 2,
}));

const images = {
  banner: '/images/banner-faperj.jpeg',
};

// Componente de Botão 'Ver mais' estilizado
const MoreButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  padding: theme.spacing(1),
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const TripleColumnNav = (): JSX.Element => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [showAllItems, setShowAllItems] = useState<Record<string, boolean>>({});

  const handleItemClick = (itemId: string) => {
    setOpenItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const toggleShowAll = (colTitle: string) => {
    setShowAllItems(prev => ({ ...prev, [colTitle]: !prev[colTitle] }));
  };

  const columnsData: ColumnData[] = [
    {
      title: 'Bolsas e Auxílios',
      items: [
        { id: 'ic', label: 'Iniciação Científica (IC)' },
        { id: 'mestrado-doutorado', label: 'Mestrado e Doutorado (cursos emergentes)' },
        { id: 'msc-dsc-10', label: 'Mestrado (MSC-10) e Doutorado (DSC-10) Nota 10' },
        { id: 'doutorado-sanduiche-exterior', label: 'Doutorado Sanduíche - Estágio de Doutorando no Exterior' },
        { id: 'doutorado-sanduiche-reverso', label: 'Doutorado Sanduíche Reverso - Estágio de Doutorando do Exterior' },
        { id: 'bolsas-pos-doutorado', label: 'Bolsas de Pós-Doutorado (PDR, PDR-10 e PDS)' },
        { id: 'bolsas-bancada', label: 'Bolsas de Bancada para Projetos - BBPs' },
        { id: 'bapv', label: 'Bolsa de Bancada para Apoio a Pesquisador Visitante - BAPV' },
        { id: 'pesquisador-visitante-pv', label: 'Pesquisador Visitante (PV)' },
        { id: 'pesquisador-visitante-emerito', label: 'Pesquisador Visitante Emérito (PVE)' },
        { id: 'tct', label: 'Treinamento e Capacitação Técnica (TCT)' },
        { id: 'it', label: 'Iniciação Tecnológica (IT)' },
        { id: 'int', label: 'Inovação Tecnológica (INT)' },
        { id: 'apq-1', label: 'Auxílio à Pesquisa (APQ 1)' },
        { id: 'apq-2', label: 'Auxílio à Organização de Evento Científico (APQ 2)' },
        { id: 'apq-3', label: 'Auxílio à Editoração (APQ 3)' },
        { id: 'apq-4', label: 'Auxílio à Conservação e Infraestrutura de Acervo (APQ 4)' },
        { id: 'apq-5', label: 'Auxílio à Participação em Reunião Científica (APQ 5)' },
        { id: 'arc', label: 'Auxílio ao Pesquisador Recém-Contratado (ARC)' },
        { id: 'adt-1', label: 'Auxílio ao Desenvolvimento e à Inovação Tecnológica (ADT 1)' },
        { id: 'adt-2', label: 'Auxílio à Inserção de Novas Tecnologias no Mercado (ADT 2)' },
        { id: 'adt-3', label: 'Auxílio à criação, reforço e modernização de infraestrutura (ADT 3)' },
        { id: 'adt-4', label: 'Auxílio à Inovação Tecnológica no Setor Rural (ADT 4)' },
      ],
    },
    {
      title: 'Programas',
      items: [
        { 
          id: 'cooperacoes-bilaterais', 
          label: 'Auxílio à Pesquisa para Cooperações Bilaterais/Multilaterais', 
          content: 'Apoia projetos conjuntos entre pesquisadores do RJ e do exterior, com excelência reconhecida. O financiamento é compartilhado entre a FAPERJ e agências internacionais de fomento.' 
        },
        { 
          id: 'bolsas-mobilidade-internacional', 
          label: 'Bolsas de Mobilidade Internacional (I, II ou III)', 
          content: 'Financia o intercâmbio de pesquisadores fluminenses para instituições no exterior e a vinda de estrangeiros ao RJ. A seleção ocorre por chamadas públicas em parcerias internacionais.' 
        },
        { 
          id: 'bolsa-pesquisador-visitante', 
          label: 'Bolsa de Pesquisador Visitante', 
          content: 'Concede apoio a pesquisadores de excelência, prioritariamente estrangeiros, para desenvolver atividades de ensino e pesquisa em instituições do RJ.' 
        },
        { 
          id: 'doutorado-sanduiche-exterior', 
          label: 'Bolsa Doutorado Sanduíche – Estágio de Doutorando no Exterior', 
          content: 'Destinada a doutorandos com bom desempenho que precisem realizar parte da pesquisa de tese no exterior, mantendo a defesa no Brasil.' 
        },
        { 
          id: 'doutorado-sanduiche-reverso', 
          label: 'Bolsa Doutorado Sanduíche Reverso – Estágio de Doutorando do Exterior', 
          content: 'Oferecida a doutorandos de universidades estrangeiras, em diversas áreas do conhecimento, visando complementar a internacionalização dos programas de pós-graduação do RJ.' 
        },
        { 
          id: 'pronex', 
          label: 'Programa de Apoio a Núcleos de Excelência – Pronex', 
          content: 'Apoia grupos de pesquisa de excelência no RJ em projetos científicos, tecnológicos e de inovação. A proposta deve ser liderada por bolsista de produtividade 1A ou 1B do CNPq, vinculado a ICTs do Estado.' 
        },
        { 
          id: 'bolsa-nota-10', 
          label: 'Programa Bolsa Nota 10', 
          content: 'Concede bolsas diferenciadas a alunos de mestrado e doutorado de destaque em PPGs do RJ avaliados com conceitos 5, 6 ou 7 pela Capes.' 
        },
        {
          id: 'apoio-pesquisa-sus',
          label: 'Apoio à Pesquisa para o Sistema Único de Saúde (PPSUS)',
          content: 'Incentiva projetos de pesquisa aplicada em saúde, com foco em doenças endêmicas no RJ.'
        },
        {
          id: 'faperj-finep-tic',
          label: 'FAPERJ/FINEP de Apoio à Tecnologia da Informação e Comunicação em Empresas (TIC)',
          content: 'Apoia projetos de P&D em TICs em empresas do RJ, visando o desenvolvimento de produtos e processos inovadores.'
        },
        {
          id: 'faperj-embrapa',
          label: 'FAPERJ/EMBRAPA de Apoio a Projetos de Pesquisa Agropecuária',
          content: 'Financia projetos em agropecuária no RJ, com foco em desenvolvimento sustentável, biotecnologia e segurança alimentar.'
        },
        {
          id: 'apoio-pos-graduacao',
          label: 'Apoio à Pós-Graduação Stricto Sensu (APG)',
          content: 'Financia aprimoramento de PPGs, com foco em infraestrutura, equipamentos e material de consumo, visando qualificação acadêmica.'
        },
        {
          id: 'inovacao-rio-inovacao',
          label: 'Inovação Rio Inovação (FAPERJ/Finep)',
          content: 'Apoia inovação tecnológica em micro e pequenas empresas do RJ em áreas estratégicas, como energia, saneamento, segurança pública e polo gás-químico (Não existe mais, agora é tecnova e centelha).'
        },
        {
          id: 'faperj-firjan-sebrae',
          label: 'Programa FAPERJ/Firjan/Sebrae-RJ de Apoio ao Design',
          content: 'Financia inovação em design de produtos em setores como metalmecânico, moveleiro, náutico, moda e eletroeletrônicos, ampliando competitividade.'
        },
        {
          id: 'apoio-inovacao-tecnologica',
          label: 'Apoio à Inovação Tecnológica',
          content: 'Apoia projetos de inovação desenvolvidos por empresas, cooperativas, inventores independentes e empreendedores, com potencial de impacto científico e social.'
        },
        {
          id: 'desenvolvimento-ti',
          label: 'Desenvolvimento da Tecnologia da Informação',
          content: 'Incentiva inovação em TI, com propostas submetidas por inventores, empreendedores ou empresas em cooperação com ICTs.'
        },
        {
          id: 'modelos-inovacao-social',
          label: 'Modelos de Inovação Tecnológica Social',
          content: 'Apoia soluções simples, inclusivas e sustentáveis, voltadas a agricultura familiar, segurança alimentar e desenvolvimento comunitário.'
        },
        {
          id: 'apoio-incubadoras',
          label: 'Apoio a Incubadoras de Empresas de Base Tecnológica',
          content: 'Fortalece incubadoras em ICTs do RJ, ampliando infraestrutura, capacidade de operação e impacto comunitário.'
        },
        {
          id: 'apoio-inovacoes-esporte',
          label: 'Apoio a Inovações no Esporte',
          content: 'Apoia projetos em treinamento, infraestrutura e desenvolvimento de equipamentos, visando excelência esportiva no RJ.'
        },
        {
          id: 'apoio-equipes-discentes',
          label: 'Apoio a Equipes Discentes em Projetos Tecnológicos Educacionais',
          content: 'Apoia projetos de iniciação tecnológica de discentes para participação em competições educacionais de inovação e empreendedorismo.'
        },
        {
          id: 'apoio-projetos-autores-fluminenses',
          label: 'Apoio a Projetos de Pesquisa de Autores Fluminenses',
          content: 'Financia pesquisas sobre a história, cultura e sociedade do RJ, com foco na produção de conhecimento sobre a região.'
        },
        {
          id: 'inovacao-ensino-cie-exatas',
          label: 'Inovação no Ensino de Ciências Exatas e da Terra (INCT-CE)',
          content: 'Apoia projetos de pesquisa e ensino em ciências exatas e da terra, com foco em formação de novos pesquisadores e divulgação científica.'
        },
        {
          id: 'apoio-projetos-temas-especificos',
          label: 'Apoio a Projetos de Pesquisa em Temas Específicos',
          content: 'Financia projetos de pesquisa em temas específicos, como saúde, meio ambiente e desenvolvimento social, com foco em soluções para problemas locais.'
        },
        {
          id: 'apoio-projetos-areas-estrategicas',
          label: 'Apoio a Projetos de Pesquisa em Áreas Estratégicas',
          content: 'Financia projetos de pesquisa em áreas estratégicas, como energia, saneamento e segurança pública, com foco em soluções para problemas do RJ.'
        },
        {
          id: 'apoio-projetos-fronteira-conhecimento',
          label: 'Apoio a Projetos de Pesquisa em Áreas de Fronteira do Conhecimento',
          content: 'Financia projetos de pesquisa em áreas de fronteira do conhecimento, com foco em temas inovadores e de alto impacto.'
        },
        {
          id: 'apoio-projetos-biotecnologia',
          label: 'Apoio a Projetos de Pesquisa em Biotecnologia',
          content: 'Financia projetos de pesquisa em biotecnologia, com foco em desenvolvimento de produtos e processos inovadores.'
        },
        {
          id: 'apoio-projetos-nanotecnologia',
          label: 'Apoio a Projetos de Pesquisa em Nanotecnologia',
          content: 'Financia projetos de pesquisa em nanotecnologia, com foco em desenvolvimento de novos materiais e dispositivos.'
        },
        {
          id: 'apoio-projetos-saude',
          label: 'Apoio a Projetos de Pesquisa em Saúde',
          content: 'Financia projetos de pesquisa em saúde, com foco em doenças crônicas, infecto-contagiosas e saúde mental.'
        },
        {
          id: 'apoio-projetos-meio-ambiente',
          label: 'Apoio a Projetos de Pesquisa em Meio Ambiente',
          content: 'Financia projetos de pesquisa em meio ambiente, com foco em conservação, poluição e desenvolvimento sustentável.'
        },
        {
          id: 'apoio-projetos-desenvolvimento-social',
          label: 'Apoio a Projetos de Pesquisa em Desenvolvimento Social',
          content: 'Financia projetos de pesquisa em desenvolvimento social, com foco em inclusão social, pobreza e desigualdade.'
        },
        {
          id: 'apoio-projetos-educacao',
          label: 'Apoio a Projetos de Pesquisa em Educação',
          content: 'Financia projetos de pesquisa em educação, com foco em formação de professores, políticas educacionais e novas tecnologias de ensino.'
        },
        {
          id: 'apoio-projetos-cultura',
          label: 'Apoio a Projetos de Pesquisa em Cultura',
          content: 'Financia projetos de pesquisa em cultura, com foco em patrimônio cultural, artes e diversidade cultural.'
        },
        {
          id: 'apoio-projetos-tecnologia-social',
          label: 'Apoio a Projetos de Pesquisa em Tecnologia Social',
          content: 'Financia projetos de pesquisa em tecnologia social, com foco em soluções inovadoras para problemas sociais.'
        },
        {
          id: 'apoio-projetos-fronteira-tecnologica',
          label: 'Apoio a Projetos de Pesquisa em Áreas de Fronteira Tecnológica',
          content: 'Financia projetos de pesquisa em áreas de fronteira tecnológica, com foco em temas inovadores e de alto impacto.'
        },
        {
          id: 'apoio-projetos-fronteira-conhecimento-2',
          label: 'Apoio a Projetos de Pesquisa em Áreas de Fronteira do Conhecimento',
          content: 'Financia projetos de pesquisa em áreas de fronteira do conhecimento, com foco em temas inovadores e de alto impacto.'
        },
        {
          id: 'apoio-projetos-engenharia',
          label: 'Apoio a Projetos de Pesquisa em Engenharia',
          content: 'Financia projetos de pesquisa em engenharia, com foco em temas como desenvolvimento de novos produtos, processos e sistemas.'
        },
        {
          id: 'apoio-projetos-agricultura',
          label: 'Apoio a Projetos de Pesquisa em Agricultura',
          content: 'Financia projetos de pesquisa em agricultura, com foco em temas como desenvolvimento sustentável, biotecnologia e segurança alimentar.'
        },
        {
          id: 'apoio-projetos-ciencias-humanas',
          label: 'Apoio a Projetos de Pesquisa em Ciências Humanas e Sociais',
          content: 'Financia projetos de pesquisa em ciências humanas e sociais, com foco em temas como história, cultura, sociedade e política.'
        },
        {
          id: 'apoio-projetos-ciencias-vida',
          label: 'Apoio a Projetos de Pesquisa em Ciências da Vida',
          content: 'Financia projetos de pesquisa em ciências da vida, com foco em temas como biologia, medicina, saúde e meio ambiente.'
        },
        {
          id: 'apoio-projetos-ciencias-exatas',
          label: 'Apoio a Projetos de Pesquisa em Ciências Exatas e da Terra',
          content: 'Financia projetos de pesquisa em ciências exatas e da terra, com foco em temas como matemática, física, química e geologia.'
        },
        {
          id: 'apoio-projetos-artes',
          label: 'Apoio a Projetos de Pesquisa em Artes',
          content: 'Financia projetos de pesquisa em artes, com foco em temas como artes visuais, música, teatro e dança.'
        },
        {
          id: 'apoio-projetos-comunicacao',
          label: 'Apoio a Projetos de Pesquisa em Comunicação',
          content: 'Financia projetos de pesquisa em comunicação, com foco em temas como jornalismo, publicidade, relações públicas e novas mídias.'
        },
        {
          id: 'apoio-projetos-esporte',
          label: 'Apoio a Projetos de Pesquisa em Esporte',
          content: 'Financia projetos de pesquisa em esporte, com foco em temas como treinamento, infraestrutura e desenvolvimento de equipamentos.'
        },
        {
          id: 'apoio-projetos-turismo',
          label: 'Apoio a Projetos de Pesquisa em Turismo',
          content: 'Financia projetos de pesquisa em turismo, com foco em temas como desenvolvimento sustentável, marketing e gestão.'
        },
        {
          id: 'apoio-projetos-meio-ambiente-2',
          label: 'Apoio a Projetos de Pesquisa em Meio Ambiente',
          content: 'Financia projetos de pesquisa em meio ambiente, com foco em temas como conservação, poluição e desenvolvimento sustentável.'
        },
        {
          id: 'apoio-projetos-saude-2',
          label: 'Apoio a Projetos de Pesquisa em Saúde',
          content: 'Financia projetos de pesquisa em saúde, com foco em temas como doenças crônicas, infecto-contagiosas e saúde mental.'
        },
        {
          id: 'apoio-projetos-desenvolvimento-social-2',
          label: 'Apoio a Projetos de Pesquisa em Desenvolvimento Social',
          content: 'Financia projetos de pesquisa em desenvolvimento social, com foco em temas como inclusão social, pobreza e desigualdade.'
        },
        {
          id: 'apoio-projetos-educacao-2',
          label: 'Apoio a Projetos de Pesquisa em Educação',
          content: 'Financia projetos de pesquisa em educação, com foco em temas como formação de professores, políticas educacionais e novas tecnologias de ensino.'
        },
        {
          id: 'apoio-projetos-cultura-2',
          label: 'Apoio a Projetos de Pesquisa em Cultura',
          content: 'Financia projetos de pesquisa em cultura, com foco em temas como patrimônio cultural, artes e diversidade cultural.'
        },
        {
          id: 'apoio-projetos-tecnologia-social-2',
          label: 'Apoio a Projetos de Pesquisa em Tecnologia Social',
          content: 'Financia projetos de pesquisa em tecnologia social, com foco em soluções inovadoras para problemas sociais.'
        },
        {
          id: 'apoio-projetos-fronteira-tecnologica-2',
          label: 'Apoio a Projetos de Pesquisa em Áreas de Fronteira Tecnológica',
          content: 'Financia projetos de pesquisa em áreas de fronteira tecnológica, com foco em temas inovadores e de alto impacto.'
        },
        {
          id: 'apoio-projetos-fronteira-conhecimento-3',
          label: 'Apoio a Projetos de Pesquisa em Áreas de Fronteira do Conhecimento',
          content: 'Financia projetos de pesquisa em áreas de fronteira do conhecimento, com foco em temas inovadores e de alto impacto.'
        },
        {
          id: 'apoio-projetos-engenharia-2',
          label: 'Apoio a Projetos de Pesquisa em Engenharia',
          content: 'Financia projetos de pesquisa em engenharia, com foco em temas como desenvolvimento de novos produtos, processos e sistemas.'
        },
        {
          id: 'apoio-projetos-agricultura-2',
          label: 'Apoio a Projetos de Pesquisa em Agricultura',
          content: 'Financia projetos de pesquisa em agricultura, com foco em temas como desenvolvimento sustentável, biotecnologia e segurança alimentar.'
        },
        {
          id: 'apoio-projetos-ciencias-humanas-2',
          label: 'Apoio a Projetos de Pesquisa em Ciências Humanas e Sociais',
          content: 'Financia projetos de pesquisa em ciências humanas e sociais, com foco em temas como história, cultura, sociedade e política.'
        },
        {
          id: 'apoio-projetos-ciencias-vida-2',
          label: 'Apoio a Projetos de Pesquisa em Ciências da Vida',
          content: 'Financia projetos de pesquisa em ciências da vida, com foco em temas como biologia, medicina, saúde e meio ambiente.'
        },
        {
          id: 'apoio-projetos-ciencias-exatas-2',
          label: 'Apoio a Projetos de Pesquisa em Ciências Exatas e da Terra',
          content: 'Financia projetos de pesquisa em ciências exatas e da terra, com foco em temas como matemática, física, química e geologia.'
        },
        {
          id: 'apoio-projetos-artes-2',
          label: 'Apoio a Projetos de Pesquisa em Artes',
          content: 'Financia projetos de pesquisa em artes, com foco em temas como artes visuais, música, teatro e dança.'
        },
        {
          id: 'apoio-projetos-comunicacao-2',
          label: 'Apoio a Projetos de Pesquisa em Comunicação',
          content: 'Financia projetos de pesquisa em comunicação, com foco em temas como jornalismo, publicidade, relações públicas e novas mídias.'
        },
        {
          id: 'apoio-projetos-esporte-2',
          label: 'Apoio a Projetos de Pesquisa em Esporte',
          content: 'Financia projetos de pesquisa em esporte, com foco em temas como treinamento, infraestrutura e desenvolvimento de equipamentos.'
        },
        {
          id: 'apoio-projetos-turismo-2',
          label: 'Apoio a Projetos de Pesquisa em Turismo',
          content: 'Financia projetos de pesquisa em turismo, com foco em temas como desenvolvimento sustentável, marketing e gestão.'
        },
      ],
    },
    {
      title: 'Destaques FAPERJ',
      items: [
        { id: 'enf-na-dose-certa', label: 'Aplicativo ‘Enf na Dose Certa’ auxilia enfermagem a administrar medicamentos', link: 'https://www.youtube.com/watch?v=CNnnSvWRmvA&list=PLGsPUEsEmHP3vAYXv4mH5aT54DIk6K93f&index=2' },
        { id: 'uff-molecula-glaucoma', label: 'UFF identifica molécula ligada ao glaucoma e abre caminho para novos fármacos', link: 'https://www.youtube.com/watch?v=-1hdMYUkcV8&list=PLGsPUEsEmHP3vAYXv4mH5aT54DIk6K93f&index=3' },
        { id: 'ufrj-figados', label: 'UFRJ busca recuperar fígados doentes para reduzir a fila de transplantes', link: 'https://www.youtube.com/watch?v=W-LBGHzTmd0&list=PLGsPUEsEmHP3vAYXv4mH5aT54DIk6K93f&index=4' },
        { id: 'ien-taurina', label: 'IEN estuda taurina nanoencapsulada para bloquear placas beta-amiloide', link: 'https://www.youtube.com/watch?v=xP4ZfhF9EGo&list=PLGsPUEsEmHP3vAYXv4mH5aT54DIk6K93f&index=5' },
        { id: 'needier-diagnostico-cancer', label: 'Needier/UFRJ desenvolve diagnóstico inovador para pacientes de câncer', link: 'https://www.youtube.com/watch?v=qTj8K1d70eU&list=PLGsPUEsEmHP3vAYXv4mH5aT54DIk6K93f&index=6' },
        { id: 'museu-da-vida-microorganismos', label: 'Museu da Vida busca vida em microorganismos em lugares inusitados', link: 'https://www.youtube.com/watch?v=yWzYJ8K0gXo&list=PLGsPUEsEmHP3vAYXv4mH5aT54DIk6K93f&index=7' },
        { id: 'instituto-vital-brasil', label: 'Instituto Vital Brazil integra rede de 21 laboratórios oficiais', link: 'https://www.youtube.com/watch?v=THgq3usGt18&list=PLGsPUEsEmHP3chbzqaQT2wfFL9aSKuq08&index=6' },
        { id: 'navio-laboratorio', label: 'Navio-laboratório forma alunos e impulsiona pesquisa no mar', link: 'https://www.youtube.com/watch?v=gYWbqxIH9GI&list=PLGsPUEsEmHP3chbzqaQT2wfFL9aSKuq08&index=8' },
        { id: 'arquivo-geral-rj', label: 'Arquivo Geral evidencia papel do RJ na Independência do Brasil', link: 'https://www.youtube.com/watch?v=3aodM9Yx4H8' },
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6, backgroundColor: 'transparent' }}>
      <BannerHeader image={images.banner}>
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 600 }}>
          FAPERJ EM PAUTA
        </Typography>
      </BannerHeader>
      <Box
        sx={{
          display: 'flex',
          gap: 4, 
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        {columnsData.map((column, colIndex) => {
          const isExpandable = column.title === 'Programas';
          const limitedItems = showAllItems[column.title] ? column.items : column.items.slice(0, 10);
          const hasMore = column.items.length > 10;

          return (
            <Box key={colIndex} sx={{ width: '33.33%', p: 0 }}>
              <StyledCard>
                <CardHeader>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                    {column.title}
                  </Typography>
                </CardHeader>
                <List sx={{ p: 0, flexGrow: 1, backgroundColor: 'transparent', }}>
                  {limitedItems.map((item) => (
                    <Box key={item.id}>
                      {isExpandable ? (
                        <>
                          <MuiLink
                            component="button"
                            color="inherit"
                            underline="none"
                            onClick={() => handleItemClick(item.id)}
                            sx={{
                              width: '100%',
                              textAlign: 'left',
                              padding: (theme) => theme.spacing(1),
                              paddingLeft: (theme) => theme.spacing(2),
                              display: 'flex',
                              alignItems: 'center',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: '32px' }}>
                              <Box sx={{
                                color: 'black',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'transform 0.3s',
                                transform: openItems[item.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                                fontSize: '20px',
                              }}>
                                +
                              </Box>
                            </ListItemIcon>
                            <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'justify' }}>
                              {item.label}
                            </Typography>
                          </MuiLink>
                          <Collapse in={openItems[item.id]} timeout="auto" unmountOnExit>
                            <Box sx={{ pl: 4, pr: 2, pb: 2, pt: 1, color: 'text.secondary' }}>
                              <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                                {(item as NavItemExpandable).content}
                              </Typography>
                            </Box>
                          </Collapse>
                        </>
                      ) : (
                        <Box
                          sx={{
                            padding: (theme) => theme.spacing(1),
                            paddingLeft: (theme) => theme.spacing(2),
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: '32px' }}>
                            <ArrowRightIcon />
                          </ListItemIcon>
                          <Typography variant="body1">
                            {item.label}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))}
                </List>
                {hasMore && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <MoreButton variant="text" onClick={() => toggleShowAll(column.title)}>
                      {showAllItems[column.title] ? 'Ver menos' : 'Ver mais'}
                    </MoreButton>
                  </Box>
                )}
              </StyledCard>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default TripleColumnNav;