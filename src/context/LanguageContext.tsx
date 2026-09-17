import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';

export type Language = 'es' | 'en' | 'fr';

export interface ProjectItemData {
  num: string;
  title: string;
  tags: string[];
  year: string;
  href: string | null;
  img: string;
  cols: number;
  large: boolean;
}

export interface ExperienceItemTranslation {
  company: string;
  role: string;
  period: string;
}

export interface EducationItemTranslation {
  school: string;
  degree: string;
  year: string;
}

export interface ToolTranslation {
  name: string;
  tag: string;
  focus: string;
}

export interface PillarTranslation {
  num: string;
  title: string;
  role: string;
  tools: ToolTranslation[];
}

export interface CaseStudyBlockTranslation {
  label: string;
  text: string;
}

export interface GalleryCardTranslation {
  src: string;
  alt: string;
  label: string;
  caption: string;
}

export const translations = {
  es: {
    // Nav
    'nav.back': '← Antonio Calero',
    'nav.back_simple': '← Volver',
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'nav.portfolio_year': 'Portfolio 2026',

    // Home
    'home.est': 'Est. 2020',
    'home.discipline': 'UI/UX & Product Designer',
    'home.location': 'Madrid',
    'home.location_full': 'Zona horaria · CET (UTC+1)',
    'home.contact_arrow': 'Contacto →',
    'home.selected_projects': 'PROYECTOS SELECCIONADOS',
    'home.coming_soon': 'Próximamente',
    'home.cta_tag': 'Contacto directo',
    'home.cta_title': 'TRABAJEMOS JUNTOS',
    'home.footer_city': 'Portfolio 2026',
    'home.footer_title': 'Todos los derechos reservados.',

    // About - Hero
    'about.top_tag': 'Sobre mí',
    'about.name': 'Antonio Calero',
    'about.hero_role': 'Dirección de Diseño & Sistemas UI/UX',

    // About - Bio
    'about.bio_label': 'Perfil & Enfoque',
    'about.bio_p1': 'Diseñador especializado en arquitecturas de interacción y sistemas de diseño atómicos. Construyo interfaces complejas y plataformas digitales B2B preparadas para escalar.',
    'about.bio_p2': 'Combino el rigor tipográfico y visual del diseño suizo con flujos ágiles de desarrollo e inteligencia artificial agéntica. Interfaces con criterio, estructura sólida y foco en resolver retos de producto reales.',
    'about.bio_role_label': 'Especialización',
    'about.bio_role_value': 'Diseño de Producto & Sistemas UI',
    'about.bio_status': 'Madrid · Disponible para proyectos',
    'about.languages_label': 'Idiomas',
    'about.lang_es_title': 'Español',
    'about.lang_es_level': 'Nativo',
    'about.lang_en_title': 'Inglés',
    'about.lang_en_level': 'Profesional',
    'about.lang_fr_title': 'Francés',
    'about.lang_fr_level': 'Profesional',

    // About - Experience & Education
    'about.exp_title': 'Experiencia Laboral',
    'about.edu_title': 'Formación Académica',
    'about.channels_title': 'Redes profesionales',

    // About - Stack
    'about.stack_eyebrow': 'Capacidades & Ecosistema',
    'about.stack_title': 'La importancia del stack',
    'about.stack_manifesto_p1': 'El diseño no termina en el lienzo estático: vive en la interacción real, en los tokens y en el código vivo.',
    'about.stack_manifesto_p2': 'Articulo un flujo donde el craft visual, la lógica agéntica y la síntesis generativa multiplican la velocidad y la calidad de entrega de producto.',
    'about.stack_meta': 'Ecosistema activo · 9 herramientas seleccionadas para producción',
    'about.cta_title': 'CREEMOS ALGO JUNTOS',

    // Contact
    'contact.top_tag': 'Contacto',
    'contact.hero_tag': 'Contacto',
    'contact.conversation_prompt': 'Contacto directo & Consultas',
    'contact.hero_title': 'INICIEMOS UN PROYECTO',
    'contact.hero_subtitle': '¿Tienes una idea de producto, necesitas renovar tu sistema de diseño o colaborar en una dirección de arte? Cuéntame los detalles y lo vemos.',
    'contact.channels_eyebrow': '01 / Canales & Disponibilidad',
    'contact.col1_eyebrow': '01 / Canales & Disponibilidad',
    'contact.security_note': 'Para garantizar una comunicación segura y evitar spam automatizado, todas las propuestas iniciales se canalizan a través del formulario o de LinkedIn.',
    'contact.availability_label': 'Disponibilidad',
    'contact.availability_value': 'Disponible para proyectos seleccionados',
    'contact.location_label': 'Ubicación & Horario',
    'contact.location_value': 'Madrid, España · CET (UTC+1)',
    'contact.channels_label': 'Canales profesionales verificados',
    'contact.form_eyebrow': '02 / Formulario de Contacto',
    'contact.col2_eyebrow': '02 / Formulario de Contacto',
    'contact.name_label': 'Nombre / Empresa *',
    'contact.name_placeholder': 'Antonio / Empresa',
    'contact.form_name_label': 'Nombre / Empresa *',
    'contact.form_name_placeholder': 'Antonio / Empresa',
    'contact.email_label': 'Tu Correo / Email *',
    'contact.email_placeholder': 'tu@empresa.com',
    'contact.form_email_label': 'Tu Correo / Email *',
    'contact.form_email_placeholder': 'tu@empresa.com',
    'contact.message_label': 'Detalles del proyecto o consulta *',
    'contact.message_placeholder': 'Cuéntame sobre el alcance, objetivos y plazos del proyecto...',
    'contact.form_message_label': 'Detalles del proyecto o consulta *',
    'contact.form_message_placeholder': 'Cuéntame sobre el alcance, objetivos y plazos del proyecto...',
    'contact.form_reply_note': '* Respuesta directa a tu correo',
    'contact.form_submit_btn': 'Enviar Consulta →',
    'contact.submit_btn': 'Enviar Consulta →',
    'contact.success_banner': '✓ Propuesta recibida correctamente',
    'contact.thanks_title': '¡Gracias por tu mensaje!',
    'contact.success_title': '¡Gracias por tu mensaje!',
    'contact.thanks_desc': 'Tu consulta ha sido registrada. Te responderé directamente a tu correo a la mayor brevedad posible.',
    'contact.success_body': 'Tu consulta ha sido registrada. Te responderé directamente a tu correo a la mayor brevedad posible.',
    'contact.success_linkedin': 'Mensaje directo en LinkedIn ↗',
    'contact.send_another': 'Enviar otra consulta',
    'contact.success_restart': '← Enviar otra consulta',

    // Case Studies - Shared
    'case.role_discipline': 'Rol & Disciplina',
    'case.year_platforms': 'Año & Plataformas',
    'case.deliverables': 'Entregables',
    'case.next_project': 'Siguiente Proyecto',
    'case.back_to_portfolio': 'Volver al Portfolio',

    // Case Study - Agora
    'case.agora.top_tag': 'Diseño de Producto & EdTech',
    'case.agora.headline': 'De una herramienta genérica a un producto a medida: cómo transformamos las necesidades reales de profesores y alumnos de másteres técnicos en un MVP Desktop minimalista centrado en el usuario.',
    'case.agora.video_title': '01 / Vídeo de Presentación de Producto',
    'case.agora.video_meta': 'MP4 / Demostración 16:9',
    'case.agora.video_desc': 'Recorrido audiovisual por los flujos de navegación y la interacción del MVP de Agora.',
    'case.agora.gallery_title': 'Artefactos Visuales & Pantallas',
    'case.agora.gallery_count': '06 Vistas Seleccionadas',

    // Case Study - Lavanderia
    'case.lavanderia.tag': 'Identidad de Marca',
    'case.lavanderia.role': 'Dirección de Marca',

    // Case Study - Night Shift
    'case.nightshift.tag': 'Identidad Visual',
    'case.nightshift.headline': 'Una identidad visual construida para las horas en que la ciudad exhala: sistemática, sobria y deliberadamente contenida. Night Shift redefine cómo un colectivo creativo proyecta su presencia.',
    'case.nightshift.team_title': 'Equipo',
    'case.nightshift.year_title': 'Año',
    'case.nightshift.services_title': 'Servicios',
    'case.nightshift.gallery_title': 'Trabajos Seleccionados',
    'case.nightshift.quote': '«Los mejores sistemas de identidad no gritan. Establecen una presencia tan calculada que todo lo demás se convierte en ruido a su alrededor.»',
    'case.nightshift.quote_role': 'Directora Creativa, Night Shift',

    // Footer
    'footer.rights': 'Todos los derechos reservados.',
  },

  en: {
    // Nav
    'nav.back': '← Antonio Calero',
    'nav.back_simple': '← Back',
    'nav.projects': 'Projects',
    'nav.about': 'About me',
    'nav.contact': 'Contact',
    'nav.portfolio_year': 'Portfolio 2026',

    // Home
    'home.est': 'Est. 2020',
    'home.discipline': 'UI/UX & Product Designer',
    'home.location': 'Madrid',
    'home.location_full': 'Timezone · CET (UTC+1)',
    'home.contact_arrow': 'Contact →',
    'home.selected_projects': 'SELECTED PROJECTS',
    'home.coming_soon': 'Coming Soon',
    'home.cta_tag': 'Direct Inquiries',
    'home.cta_title': "LET'S WORK TOGETHER",
    'home.footer_city': 'Portfolio 2026',
    'home.footer_title': 'All rights reserved.',

    // About - Hero
    'about.top_tag': 'About me',
    'about.name': 'Antonio Calero',
    'about.hero_role': 'Design Direction & UI/UX Systems',

    // About - Bio
    'about.bio_label': 'Profile & Approach',
    'about.bio_p1': 'Designer specialized in interaction architecture and atomic design systems. I build complex interfaces and scalable B2B digital platforms.',
    'about.bio_p2': 'I blend the visual rigor of classic Swiss design with modern development workflows and agentic AI. Principled interfaces with solid architecture that solve real product challenges.',
    'about.bio_role_label': 'Primary Focus',
    'about.bio_role_value': 'Product Design & UI Systems',
    'about.bio_status': 'Madrid · Available for select projects',
    'about.languages_label': 'Languages',
    'about.lang_es_title': 'Spanish',
    'about.lang_es_level': 'Native',
    'about.lang_en_title': 'English',
    'about.lang_en_level': 'Professional',
    'about.lang_fr_title': 'French',
    'about.lang_fr_level': 'Professional',

    // About - Experience & Education
    'about.exp_title': 'Work Experience',
    'about.edu_title': 'Education',
    'about.channels_title': 'Professional Channels',

    // About - Stack
    'about.stack_eyebrow': 'Capabilities & Ecosystem',
    'about.stack_title': 'The Importance of the Stack',
    'about.stack_manifesto_p1': 'Design does not end on the static canvas: it lives in real interaction, tokens, and living code.',
    'about.stack_manifesto_p2': 'I structure a workflow where visual craft, agentic reasoning, and generative synthesis accelerate velocity and elevate product delivery quality.',
    'about.stack_meta': 'Active ecosystem · 9 tools curated for production',
    'about.cta_title': "LET'S BUILD SOMETHING",

    // Contact
    'contact.top_tag': 'Contact',
    'contact.hero_tag': 'Contact',
    'contact.conversation_prompt': 'Direct Contact & Inquiries',
    'contact.hero_title': 'START A PROJECT',
    'contact.hero_subtitle': 'Have a product concept, need to overhaul your design system, or collaborate on art direction? Share the details and let’s explore it.',
    'contact.channels_eyebrow': '01 / Channels & Availability',
    'contact.col1_eyebrow': '01 / Channels & Availability',
    'contact.security_note': 'To ensure secure communication and prevent automated spam, all initial inquiries are handled via this form or LinkedIn.',
    'contact.availability_label': 'Availability',
    'contact.availability_value': 'Available for select projects',
    'contact.location_label': 'Location & Timezone',
    'contact.location_value': 'Madrid, Spain · CET (UTC+1)',
    'contact.channels_label': 'Verified Professional Channels',
    'contact.form_eyebrow': '02 / Contact Form',
    'contact.col2_eyebrow': '02 / Contact Form',
    'contact.name_label': 'Name / Company *',
    'contact.name_placeholder': 'e.g. Alex / Acme Corp',
    'contact.form_name_label': 'Name / Company *',
    'contact.form_name_placeholder': 'e.g. Alex / Acme Corp',
    'contact.email_label': 'Your Email *',
    'contact.email_placeholder': 'alex@company.com',
    'contact.form_email_label': 'Your Email *',
    'contact.form_email_placeholder': 'alex@company.com',
    'contact.message_label': 'Project details or inquiry *',
    'contact.message_placeholder': 'Tell me about the scope, objectives, and timeline of your project...',
    'contact.form_message_label': 'Project details or inquiry *',
    'contact.form_message_placeholder': 'Tell me about the scope, objectives, and timeline of your project...',
    'contact.form_reply_note': '* Direct response to your email',
    'contact.form_submit_btn': 'Send Inquiry →',
    'contact.submit_btn': 'Send Inquiry →',
    'contact.success_banner': '✓ Inquiry received successfully',
    'contact.thanks_title': 'Thank you for your message!',
    'contact.success_title': 'Thank you for your message!',
    'contact.thanks_desc': 'Your inquiry has been recorded. I will reply directly to your email as soon as possible.',
    'contact.success_body': 'Your inquiry has been recorded. I will reply directly to your email as soon as possible.',
    'contact.success_linkedin': 'Direct message on LinkedIn ↗',
    'contact.send_another': 'Send another inquiry',
    'contact.success_restart': '← Send another inquiry',

    // Case Studies - Shared
    'case.role_discipline': 'Role & Discipline',
    'case.year_platforms': 'Year & Platforms',
    'case.deliverables': 'Deliverables',
    'case.next_project': 'Next Project',
    'case.back_to_portfolio': 'Back to Portfolio',

    // Case Study - Agora
    'case.agora.top_tag': 'Product Design & EdTech',
    'case.agora.headline': 'From a generic tool to a tailored product: translating the real needs of technical master’s students and faculty into a clean, distraction-free Desktop MVP.',
    'case.agora.video_title': '01 / Product Presentation Video',
    'case.agora.video_meta': 'MP4 / 16:9 Showcase',
    'case.agora.video_desc': 'Audiovisual walkthrough of Agora’s responsive navigation and interactive learning flows.',
    'case.agora.gallery_title': 'Visual Artifacts & Screens',
    'case.agora.gallery_count': '06 Selected Frames',

    // Case Study - Lavanderia
    'case.lavanderia.tag': 'Brand Identity',
    'case.lavanderia.role': 'Brand Director',

    // Case Study - Night Shift
    'case.nightshift.tag': 'Visual Identity',
    'case.nightshift.headline': 'A visual identity built for the hours when the city exhales — systematic, considered, and deliberately restrained. Night Shift redefines how a creative collective signals its presence.',
    'case.nightshift.team_title': 'Team',
    'case.nightshift.year_title': 'Year',
    'case.nightshift.services_title': 'Services',
    'case.nightshift.gallery_title': 'Selected Work',
    'case.nightshift.quote': '“The best identity systems don’t shout. They establish a presence so considered that everything else becomes noise around them.”',
    'case.nightshift.quote_role': 'Creative Director, Night Shift',

    // Footer
    'footer.rights': 'All rights reserved.',
  },

  fr: {
    // Nav
    'nav.back': '← Antonio Calero',
    'nav.back_simple': '← Retour',
    'nav.projects': 'Projets',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.portfolio_year': 'Portfolio 2026',

    // Home
    'home.est': 'Fondé en 2020',
    'home.discipline': 'Designer UI/UX & Produit',
    'home.location': 'Madrid',
    'home.location_full': 'Fuseau horaire · CET (UTC+1)',
    'home.contact_arrow': 'Contact →',
    'home.selected_projects': 'PROJETS SÉLECTIONNÉS',
    'home.coming_soon': 'Bientôt disponible',
    'home.cta_tag': 'Contact direct',
    'home.cta_title': 'TRAVAILLONS ENSEMBLE',
    'home.footer_city': 'Portfolio 2026',
    'home.footer_title': 'Tous droits réservés.',

    // About - Hero
    'about.top_tag': 'À propos',
    'about.name': 'Antonio Calero',
    'about.hero_role': 'Direction du Design & Systèmes UI/UX',

    // About - Bio
    'about.bio_label': 'Profil & Vision',
    'about.bio_p1': 'Designer spécialisé dans les architectures d’interaction et les design systems atomiques. Je conçois des interfaces complexes et des plateformes B2B prêtes à monter en charge.',
    'about.bio_p2': 'J’associe la rigueur visuelle et typographique du design suisse aux méthodologies agiles du code et de l’IA agentique. Des interfaces soignées et robustes pour répondre aux exigences réelles du produit.',
    'about.bio_role_label': 'Spécialité',
    'about.bio_role_value': 'Design Produit & Systèmes UI',
    'about.bio_status': 'Madrid · Disponible pour projets',
    'about.languages_label': 'Langues',
    'about.lang_es_title': 'Espagnol',
    'about.lang_es_level': 'Natif',
    'about.lang_en_title': 'Anglais',
    'about.lang_en_level': 'Professionnel',
    'about.lang_fr_title': 'Français',
    'about.lang_fr_level': 'Professionnel',

    // About - Experience & Education
    'about.exp_title': 'Expérience Professionnelle',
    'about.edu_title': 'Formation Académique',
    'about.channels_title': 'Canaux Professionnels',

    // About - Stack
    'about.stack_eyebrow': 'Capacités & Écosystème',
    'about.stack_title': 'L’importance de la stack',
    'about.stack_manifesto_p1': 'Le design ne s’arrête pas au canevas statique : il s’anime dans l’interaction réelle, les tokens et le code vivant.',
    'about.stack_manifesto_p2': 'J’articule un workflow où le craft visuel, la logique agentique et la synthèse générative démultiplient la vitesse et la qualité de livraison.',
    'about.stack_meta': 'Écosystème actif · 9 outils sélectionnés pour la production',
    'about.cta_title': 'CRÉONS ENSEMBLE',

    // Contact
    'contact.top_tag': 'Contact',
    'contact.hero_tag': 'Contact',
    'contact.conversation_prompt': 'Contact direct & Demandes',
    'contact.hero_title': 'LANCEZ UN PROJET',
    'contact.hero_subtitle': 'Vous avez un projet de produit, besoin de refondre votre design system ou d’une direction artistique ? Présentez-moi votre projet.',
    'contact.channels_eyebrow': '01 / Canaux & Disponibilité',
    'contact.col1_eyebrow': '01 / Canaux & Disponibilité',
    'contact.security_note': 'Afin de garantir des échanges sécurisés et d’éviter les spams automatisés, toutes les demandes initiales s’effectuent via ce formulaire ou LinkedIn.',
    'contact.availability_label': 'Disponibilité',
    'contact.availability_value': 'Disponible pour projets sélectionnés',
    'contact.location_label': 'Localisation & Fuseau',
    'contact.location_value': 'Madrid, Espagne · CET (UTC+1)',
    'contact.channels_label': 'Canaux professionnels vérifiés',
    'contact.form_eyebrow': '02 / Formulaire de Contact',
    'contact.col2_eyebrow': '02 / Formulaire de Contact',
    'contact.name_label': 'Nom / Entreprise *',
    'contact.name_placeholder': 'ex. Sophie / Entreprise',
    'contact.form_name_label': 'Nom / Entreprise *',
    'contact.form_name_placeholder': 'ex. Sophie / Entreprise',
    'contact.email_label': 'Votre Email *',
    'contact.email_placeholder': 'sophie@entreprise.com',
    'contact.form_email_label': 'Votre Email *',
    'contact.form_email_placeholder': 'sophie@entreprise.com',
    'contact.message_label': 'Détails du projet ou de la demande *',
    'contact.message_placeholder': 'Parlez-moi des objectifs, du périmètre et du calendrier du projet...',
    'contact.form_message_label': 'Détails du projet ou de la demande *',
    'contact.form_message_placeholder': 'Parlez-moi des objectifs, du périmètre et du calendrier du projet...',
    'contact.form_reply_note': '* Réponse directe à votre e-mail',
    'contact.form_submit_btn': 'Envoyer la demande →',
    'contact.submit_btn': 'Envoyer la demande →',
    'contact.success_banner': '✓ Demande reçue avec succès',
    'contact.thanks_title': 'Merci pour votre message !',
    'contact.success_title': 'Merci pour votre message !',
    'contact.thanks_desc': 'Votre demande a bien été enregistrée. Je vous répondrai directement dans les meilleurs délais.',
    'contact.success_body': 'Votre demande a bien été enregistrée. Je vous répondrai directement dans les meilleurs délais.',
    'contact.success_linkedin': 'Message direct sur LinkedIn ↗',
    'contact.send_another': 'Envoyer une autre demande',
    'contact.success_restart': '← Envoyer une autre demande',

    // Case Studies - Shared
    'case.role_discipline': 'Rôle & Discipline',
    'case.year_platforms': 'Année & Plateformes',
    'case.deliverables': 'Livrables',
    'case.next_project': 'Projet Suivant',
    'case.back_to_portfolio': 'Retour au Portfolio',

    // Case Study - Agora
    'case.agora.top_tag': 'Design de Produit & EdTech',
    'case.agora.headline': 'D’un outil générique à une plateforme sur mesure : transformer les besoins d’étudiants et professeurs en un MVP Desktop minimaliste centré sur l’essentiel.',
    'case.agora.video_title': '01 / Vidéo de Présentation du Produit',
    'case.agora.video_meta': 'MP4 / Démonstration 16:9',
    'case.agora.video_desc': 'Parcours audiovisuel de la navigation et des flux interactifs du MVP d’Agora.',
    'case.agora.gallery_title': 'Artéfacts Visuels & Écrans',
    'case.agora.gallery_count': '06 Vues Sélectionnées',

    // Case Study - Lavanderia
    'case.lavanderia.tag': 'Identité de Marque',
    'case.lavanderia.role': 'Direction de Marque',

    // Case Study - Night Shift
    'case.nightshift.tag': 'Identité Visuelle',
    'case.nightshift.headline': 'Une identité visuelle conçue pour les heures où la ville expire : systématique, sobre et délibérément retenue. Night Shift redéfinit la façon dont un collectif créatif affirme sa présence.',
    'case.nightshift.team_title': 'Équipe',
    'case.nightshift.year_title': 'Année',
    'case.nightshift.services_title': 'Services',
    'case.nightshift.gallery_title': 'Travaux Sélectionnés',
    'case.nightshift.quote': '« Les meilleurs systèmes d’identité ne crient pas. Ils installent une présence si maîtrisée que tout le reste devient du bruit autour d’eux. »',
    'case.nightshift.quote_role': 'Directrice de Création, Night Shift',

    // Footer
    'footer.rights': 'Tous droits réservés.',
  },
} as const;

export type TranslationKey = keyof typeof translations['es'];

/* ─── Projects for Home Grid ────────────────────────────────── */
export const projectsByLang: Record<Language, ProjectItemData[]> = {
  es: [
    {
      num: '001', title: 'Agora',
      tags: ['Diseño de Producto', 'Web & Móvil'], year: '2026',
      href: '/agora',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&h=600&fit=crop&auto=format',
      cols: 7, large: true,
    },
    {
      num: '002', title: 'Lavandería Bizkaia',
      tags: ['Identidad de Marca', 'Rotulación'], year: '2025',
      href: '/lavanderia-bizkaia',
      img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=700&h=600&fit=crop&auto=format',
      cols: 5, large: true,
    },
    {
      num: '003', title: 'Palomar Studio',
      tags: ['Marca', 'Packaging'], year: '2023',
      href: null,
      img: 'https://images.unsplash.com/photo-1759563874672-e7dfb1ca3f73?w=600&h=440&fit=crop&auto=format',
      cols: 4, large: false,
    },
    {
      num: '004', title: 'Módulo App',
      tags: ['Producto', 'UI/UX'], year: '2024',
      href: null,
      img: 'https://images.unsplash.com/photo-1558655146-6c222b05fce4?w=600&h=440&fit=crop&auto=format',
      cols: 4, large: false,
    },
    {
      num: '005', title: 'Tipo Libre',
      tags: ['Editorial', 'Tipografía'], year: '2024',
      href: null,
      img: 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=600&h=440&fit=crop&auto=format',
      cols: 4, large: false,
    },
  ],
  en: [
    {
      num: '001', title: 'Agora',
      tags: ['Product Design', 'Web & Mobile'], year: '2026',
      href: '/agora',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&h=600&fit=crop&auto=format',
      cols: 7, large: true,
    },
    {
      num: '002', title: 'Lavandería Bizkaia',
      tags: ['Brand Identity', 'Signage'], year: '2025',
      href: '/lavanderia-bizkaia',
      img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=700&h=600&fit=crop&auto=format',
      cols: 5, large: true,
    },
    {
      num: '003', title: 'Palomar Studio',
      tags: ['Brand', 'Packaging'], year: '2023',
      href: null,
      img: 'https://images.unsplash.com/photo-1759563874672-e7dfb1ca3f73?w=600&h=440&fit=crop&auto=format',
      cols: 4, large: false,
    },
    {
      num: '004', title: 'Módulo App',
      tags: ['Product', 'UI/UX'], year: '2024',
      href: null,
      img: 'https://images.unsplash.com/photo-1558655146-6c222b05fce4?w=600&h=440&fit=crop&auto=format',
      cols: 4, large: false,
    },
    {
      num: '005', title: 'Tipo Libre',
      tags: ['Editorial', 'Typography'], year: '2024',
      href: null,
      img: 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=600&h=440&fit=crop&auto=format',
      cols: 4, large: false,
    },
  ],
  fr: [
    {
      num: '001', title: 'Agora',
      tags: ['Design de Produit', 'Web & Mobile'], year: '2026',
      href: '/agora',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&h=600&fit=crop&auto=format',
      cols: 7, large: true,
    },
    {
      num: '002', title: 'Lavandería Bizkaia',
      tags: ['Identité de Marque', 'Signalétique'], year: '2025',
      href: '/lavanderia-bizkaia',
      img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=700&h=600&fit=crop&auto=format',
      cols: 5, large: true,
    },
    {
      num: '003', title: 'Palomar Studio',
      tags: ['Marque', 'Packaging'], year: '2023',
      href: null,
      img: 'https://images.unsplash.com/photo-1759563874672-e7dfb1ca3f73?w=600&h=440&fit=crop&auto=format',
      cols: 4, large: false,
    },
    {
      num: '004', title: 'Módulo App',
      tags: ['Produit', 'UI/UX'], year: '2024',
      href: null,
      img: 'https://images.unsplash.com/photo-1558655146-6c222b05fce4?w=600&h=440&fit=crop&auto=format',
      cols: 4, large: false,
    },
    {
      num: '005', title: 'Tipo Libre',
      tags: ['Éditorial', 'Typographie'], year: '2024',
      href: null,
      img: 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=600&h=440&fit=crop&auto=format',
      cols: 4, large: false,
    },
  ],
};

/* ─── Structured Data for Experience ────────────────────────── */
export const experiencesByLang: Record<Language, ExperienceItemTranslation[]> = {
  es: [
    { company: 'Empresa actual', role: 'Lead Product Designer', period: '2026 al presente' },
    { company: 'Freelance', role: 'UI/UX Designer', period: '2025 a 2026' },
    { company: 'Newlink Spain', role: 'Graphic Designer, Art Director', period: '2021 a 2025' },
  ],
  en: [
    { company: 'Current Company', role: 'Lead Product Designer', period: '2026 to present' },
    { company: 'Freelance', role: 'UI/UX Designer', period: '2025 to 2026' },
    { company: 'Newlink Spain', role: 'Graphic Designer, Art Director', period: '2021 to 2025' },
  ],
  fr: [
    { company: 'Entreprise actuelle', role: 'Lead Designer Produit', period: '2026 à aujourd’hui' },
    { company: 'Freelance', role: 'Designer UI/UX', period: '2025 à 2026' },
    { company: 'Newlink Spain', role: 'Designer Graphique, Directeur Artistique', period: '2021 à 2025' },
  ],
};

/* ─── Structured Data for Education ─────────────────────────── */
export const educationByLang: Record<Language, EducationItemTranslation[]> = {
  es: [
    { school: 'Neoland', degree: 'Bootcamp UI/UX Design', year: '2024' },
    { school: 'Trazos', degree: 'Master en Dirección de Arte', year: '2021' },
    { school: 'CEI Escuela de Diseño', degree: 'Diseño Digital', year: '2020' },
  ],
  en: [
    { school: 'Neoland', degree: 'UI/UX Design Bootcamp', year: '2024' },
    { school: 'Trazos', degree: 'Master in Art Direction', year: '2021' },
    { school: 'CEI Design School', degree: 'Digital Design', year: '2020' },
  ],
  fr: [
    { school: 'Neoland', degree: 'Bootcamp Design UI/UX', year: '2024' },
    { school: 'Trazos', degree: 'Master en Direction Artistique', year: '2021' },
    { school: 'École de Design CEI', degree: 'Design Numérique', year: '2020' },
  ],
};

/* ─── Structured Data for Stack Pillars ─────────────────────── */
export const pillarsByLang: Record<Language, PillarTranslation[]> = {
  es: [
    {
      num: '01',
      title: 'Craft & Sistemas',
      role: 'Arquitectura Atómica & UI',
      tools: [
        { name: 'Figma', tag: 'Tokens & Vars', focus: 'Tokens, librerías y componentes' },
        { name: 'Photoshop', tag: 'Adobe CC', focus: 'Retoque digital y key visuals' },
        { name: 'Illustrator', tag: 'Adobe CC', focus: 'Construcción vectorial e iconografía' },
        { name: 'Stitch', tag: 'Rapid UI', focus: 'Exploración conceptual acelerada' },
      ],
    },
    {
      num: '02',
      title: 'Lógica & Código IA',
      role: 'Agentes & Prototipos Vivos',
      tools: [
        { name: 'Claude Code', tag: 'CLI Agent', focus: 'Agente autónomo en terminal' },
        { name: 'Claude 3.7 Sonnet', tag: 'Reasoning', focus: 'Heurísticas UX y arquitectura' },
        { name: 'Google Gemini & Nano', tag: 'Multimodal', focus: 'Inferencia contextual on-device' },
      ],
    },
    {
      num: '03',
      title: 'Síntesis & Motion',
      role: 'Dirección de Arte Sintética',
      tools: [
        { name: 'Magnific AI', tag: 'Hiper-res', focus: 'Upscaling e hiper-detalle' },
        { name: 'SeaDance', tag: 'Motion AI', focus: 'Vídeo cinematográfico por prompt' },
      ],
    },
  ],
  en: [
    {
      num: '01',
      title: 'Craft & Systems',
      role: 'Atomic Architecture & UI',
      tools: [
        { name: 'Figma', tag: 'Tokens & Vars', focus: 'Tokens, libraries, and design components' },
        { name: 'Photoshop', tag: 'Adobe CC', focus: 'Digital retouching and key visuals' },
        { name: 'Illustrator', tag: 'Adobe CC', focus: 'Vector construction and iconography' },
        { name: 'Stitch', tag: 'Rapid UI', focus: 'Accelerated conceptual exploration' },
      ],
    },
    {
      num: '02',
      title: 'Logic & AI Code',
      role: 'Agents & Living Prototypes',
      tools: [
        { name: 'Claude Code', tag: 'CLI Agent', focus: 'Autonomous terminal agent' },
        { name: 'Claude 3.7 Sonnet', tag: 'Reasoning', focus: 'UX heuristics and system architecture' },
        { name: 'Google Gemini & Nano', tag: 'Multimodal', focus: 'Contextual on-device inference' },
      ],
    },
    {
      num: '03',
      title: 'Synthesis & Motion',
      role: 'Synthetic Art Direction',
      tools: [
        { name: 'Magnific AI', tag: 'Hi-Res', focus: 'Generative upscaling and hyper-detail' },
        { name: 'SeaDance', tag: 'Motion AI', focus: 'Cinematic video generation via prompt' },
      ],
    },
  ],
  fr: [
    {
      num: '01',
      title: 'Craft & Systèmes',
      role: 'Architecture Atomique & UI',
      tools: [
        { name: 'Figma', tag: 'Tokens & Vars', focus: 'Design tokens, bibliothèques et composants' },
        { name: 'Photoshop', tag: 'Adobe CC', focus: 'Retouche numérique et visuels clés' },
        { name: 'Illustrator', tag: 'Adobe CC', focus: 'Construction vectorielle et iconographie' },
        { name: 'Stitch', tag: 'Rapid UI', focus: 'Exploration conceptuelle accélérée' },
      ],
    },
    {
      num: '02',
      title: 'Logique & Code IA',
      role: 'Agents & Prototypes Vivants',
      tools: [
        { name: 'Claude Code', tag: 'CLI Agent', focus: 'Agent autonome dans le terminal' },
        { name: 'Claude 3.7 Sonnet', tag: 'Raisonnement', focus: 'Heuristiques UX et architecture' },
        { name: 'Google Gemini & Nano', tag: 'Multimodal', focus: 'Inférence contextuelle sur appareil' },
      ],
    },
    {
      num: '03',
      title: 'Synthèse & Motion',
      role: 'Direction Artistique Synthétique',
      tools: [
        { name: 'Magnific AI', tag: 'Haute-Rég.', focus: 'Suréchantillonnage et hyper-détail' },
        { name: 'SeaDance', tag: 'Motion IA', focus: 'Génération vidéo cinématographique' },
      ],
    },
  ],
};

/* ─── Structured Data for Agora Case Study ──────────────────── */
export const agoraBlocksByLang: Record<Language, CaseStudyBlockTranslation[]> = {
  es: [
    {
      label: '01 / El Problema & Contexto',
      text: 'En Evolve impartimos másteres de alta exigencia técnica (Data Science, IA, Ciberseguridad, People Analytics). Hasta el momento nos apoyábamos en Circle, pero al tratarse de una herramienta de comunidad genérica se quedaba corta para las dinámicas pedagógicas reales: gestión de entregas, seguimiento académico y flujos profesor-alumno. Ante estas limitaciones, la compañía decidió diseñar y desarrollar su propia plataforma a medida.',
    },
    {
      label: '02 / Investigación & Encuestas',
      text: 'Lideré la investigación previa realizando una auditoría heurística de la plataforma existente y un análisis exhaustivo de la competencia directa e indirecta. Diseñamos y lanzamos encuestas tanto a profesores como a estudiantes para mapear fricciones: qué aspectos funcionaban, qué generaba frustración diaria y qué herramientas críticas echaban en falta para el seguimiento de sus clases y proyectos.',
    },
    {
      label: '03 / Estrategia MVP Desktop',
      text: 'Con los insights consolidados, estructuramos toda la arquitectura de información y la experiencia de usuario (UX), definiendo con rigor qué funcionalidades eran indispensables para el primer MVP y cuáles debían posponerse. Priorizamos la versión Web Desktop bajo una premisa estética y funcional clara: un estilo estrictamente minimalista y centrado en el usuario, eliminando cualquier distracción visual para que el alumno conserve el foco en materias de alta densidad técnica.',
    },
    {
      label: '04 / Aprendizajes & Roadmap v2',
      text: 'El lanzamiento del MVP validó la hipótesis de que simplificar la interfaz mejora radicalmente la experiencia educativa. Con el producto ya en manos de usuarios reales, detectamos oportunidades clave de mejora que están guiando la siguiente versión: optimización del flujo de entregas de proyectos, métricas de progreso más profundas para docentes y la futura adaptación como aplicación móvil de apoyo.',
    },
  ],
  en: [
    {
      label: '01 / Context & Problem',
      text: 'At Evolve, we deliver high-intensity technical master’s programs (Data Science, AI, Cybersecurity, People Analytics). We previously relied on Circle, but as a generic community platform, it fell short of real pedagogical demands: project hand-ins, academic tracking, and teacher-student workflows. Confronted with these bottlenecks, the company decided to build its own tailored platform.',
    },
    {
      label: '02 / Research & Dual Discovery',
      text: 'I led the upfront research phase, conducting a heuristic audit of our existing tool and a comprehensive competitive benchmark. We designed and deployed dual surveys to both faculty and students to map real friction points: what worked, daily frustrations, and critical capabilities missing for coursework and project follow-up.',
    },
    {
      label: '03 / Desktop MVP Strategy',
      text: 'Synthesizing these insights, we defined the full information architecture and UX, rigorously prioritizing what was essential for the first MVP versus what should be deferred. We prioritized the Web Desktop platform with an intentional design philosophy: a strictly minimalist, user-centered interface that eliminates visual clutter, allowing students to preserve deep focus on dense, complex technical subjects.',
    },
    {
      label: '04 / Learnings & Roadmap v2',
      text: 'Deploying the MVP validated that stripping away unnecessary noise dramatically improves the technical learning experience. With real students and faculty using the product, we uncovered high-value opportunities currently driving version 2.0: refining project submission and grading workflows, richer progress analytics for instructors, and a future mobile companion app.',
    },
  ],
  fr: [
    {
      label: '01 / Contexte & Problématique',
      text: 'Chez Evolve, nous dispensons des mastères techniques exigeants (Data Science, IA, Cybersécurité, People Analytics). Nous utilisions auparavant Circle, mais en tant que plateforme communautaire générique, elle montrait vite ses limites face aux exigences pédagogiques : gestion des livrables, suivi académique et flux enseignant-étudiant. L’entreprise a donc décidé de concevoir sa propre plateforme sur mesure.',
    },
    {
      label: '02 / Recherche & Enquêtes Mixtes',
      text: 'J’ai piloté la phase de recherche amont, associant un audit heuristique de l’outil existant à un benchmark concurrentiel approfondi. Nous avons déployé des enquêtes auprès du corps professoral et des étudiants pour identifier les points de friction : ce qui fonctionnait, les irritants du quotidien et les fonctionnalités clés manquantes pour le suivi des cours et des projets.',
    },
    {
      label: '03 / Stratégie MVP Desktop',
      text: 'En synthétisant ces enseignements, nous avons structuré l’architecture de l’information et l’UX globale, en priorisant rigoureusement ce qui devait intégrer le premier MVP et ce qui devait être reporté. Nous avons concentré nos efforts sur la version Web Desktop avec une ligne directrice claire : un minimalisme fonctionnel centré sur l’utilisateur, éliminant tout bruit visuel pour favoriser la concentration sur des matières techniques denses.',
    },
    {
      label: '04 / Retours & Roadmap v2',
      text: 'Le déploiement du MVP a confirmé que simplifier l’interface transforme radicalement l’expérience d’apprentissage technique. En conditions réelles d’utilisation, nous avons identifié les axes majeurs qui guident la version 2.0 : perfectionnement du parcours de dépôt et correction des projets, métriques d’avancement approfondies pour les formateurs et future déclinaison mobile d’accompagnement.',
    },
  ],
};

export const agoraCardsByLang: Record<Language, GalleryCardTranslation[]> = {
  es: [
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Web Platform — Desktop Dashboard & Workspace',
      label: '001',
      caption: 'Espacio de Trabajo Web Desktop',
    },
    {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Platform — UX Architecture & Project Workflow',
      label: '002',
      caption: 'Arquitectura UX & Flujo de Entregas',
    },
    {
      src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Design System — Components & Typography Hierarchy',
      label: '003',
      caption: 'Tokens de Diseño & UI Kit Minimalista',
    },
    {
      src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Study Analytics — Progress & Focus Tracking',
      label: '004',
      caption: 'Panel de Concentración y Métricas',
    },
    {
      src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Peer Mentoring — Real-time Discussion Forums',
      label: '005',
      caption: 'Espacios de Consulta & Foro Docente',
    },
    {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Curriculum Architecture — Interactive Course Modules',
      label: '006',
      caption: 'Arquitectura del Plan de Estudios',
    },
  ],
  en: [
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Web Platform — Desktop Dashboard & Workspace',
      label: '001',
      caption: 'Web Desktop Workspace',
    },
    {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Platform — UX Architecture & Project Workflow',
      label: '002',
      caption: 'UX Architecture & Project Flow',
    },
    {
      src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Design System — Components & Typography Hierarchy',
      label: '003',
      caption: 'Design Tokens & Minimalist UI Kit',
    },
    {
      src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Study Analytics — Progress & Focus Tracking',
      label: '004',
      caption: 'Focus & Analytics Dashboard',
    },
    {
      src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Peer Mentoring — Real-time Discussion Forums',
      label: '005',
      caption: 'Faculty Q&A & Discussion Forums',
    },
    {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Curriculum Architecture — Interactive Course Modules',
      label: '006',
      caption: 'Curriculum Architecture',
    },
  ],
  fr: [
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Web Platform — Desktop Dashboard & Workspace',
      label: '001',
      caption: 'Espace Bureau Web Desktop',
    },
    {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Platform — UX Architecture & Project Workflow',
      label: '002',
      caption: 'Architecture UX & Flux des Projets',
    },
    {
      src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Design System — Components & Typography Hierarchy',
      label: '003',
      caption: 'Tokens de Design & UI Kit Minimaliste',
    },
    {
      src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Study Analytics — Progress & Focus Tracking',
      label: '004',
      caption: 'Tableau de Bord & Métriques',
    },
    {
      src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Peer Mentoring — Real-time Discussion Forums',
      label: '005',
      caption: 'Espaces d’Échange & Forum Enseignant',
    },
    {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=1200&fit=crop&auto=format',
      alt: 'Agora Curriculum Architecture — Interactive Course Modules',
      label: '006',
      caption: 'Architecture du Programme',
    },
  ],
};

/* ─── Structured Data for Lavanderia Case Study ──────────────── */
export const lavanderiaBlocksByLang: Record<Language, { intro: string; blocks: CaseStudyBlockTranslation[]; quote: string }> = {
  es: {
    intro: 'Identidad visual para una lavandería de barrio en Bilbao con más de 40 años de historia — un proyecto de marca que preserva la autenticidad sin renunciar al diseño contemporáneo.',
    blocks: [
      { label: 'Overview', text: 'Lavandería Bizkaia requería una identidad visual que honrara sus décadas de arraigo vecinal y la posicionara con contundencia en un entorno urbano competitivo. El encargo exigía cercanía sin caer en la nostalgia.' },
      { label: 'Challenge', text: 'Los negocios familiares suelen resistirse al cambio. La identidad debía sentirse como una evolución natural, no como una imposición ajena — algo que los propietarios sintieran plenamente propio.' },
      { label: 'Solution', text: 'Un sistema tipográfico anclado en una gótica condensada, acompañado de una paleta neutra y un isotipo sintético y rotundo. Funcional en rotulación exterior, uniformes y recibos.' },
    ],
    quote: '«Un barrio que te lava la ropa merece una marca que lo represente con orgullo.»',
  },
  en: {
    intro: 'Visual identity for a neighborhood laundromat in Bilbao with over 40 years of history — a brand project that preserves authentic heritage without sacrificing contemporary design.',
    blocks: [
      { label: 'Overview', text: 'Lavandería Bizkaia needed a visual identity that honored its decades of local presence while positioning it clearly in a competitive urban market. The brief demanded warmth without nostalgia.' },
      { label: 'Challenge', text: 'Family-run businesses often resist change. The identity had to feel evolved, not imposed — something the owners could truly own without feeling alienated from their brand.' },
      { label: 'Solution', text: 'A typographic system anchored in a condensed gothic, paired with a warm neutral palette and a single gesture mark. Functional across signage, uniforms, and receipts.' },
    ],
    quote: '“A neighborhood that does your laundry deserves a brand that represents it with pride.”',
  },
  fr: {
    intro: 'Identité visuelle pour une blanchisserie de quartier à Bilbao forte de plus de 40 ans d’histoire — un projet d’image de marque préservant l’authenticité tout en embrassant le design contemporain.',
    blocks: [
      { label: 'Vue d’ensemble', text: 'Lavandería Bizkaia avait besoin d’une identité visuelle qui honore ses décennies d’ancrage local tout en la positionnant clairement sur un marché urbain concurrentiel. Le brief exigeait de la chaleur sans nostalgie.' },
      { label: 'Défi', text: 'Les entreprises familiales résistent souvent au changement. L’identité devait être perçue comme une évolution naturelle et non imposée, afin que les propriétaires se l’approprient immédiatement.' },
      { label: 'Solution', text: 'Un système typographique ancré dans une gothique condensée, associé à une palette neutre et un logotype gestuel épuré. Parfaitement adapté aux enseignes, uniformes et reçus.' },
    ],
    quote: '« Un quartier qui prend soin de votre linge mérite une marque qui l’incarne avec fierté. »',
  },
};

/* ─── Structured Data for NightShift Case Study ─────────────── */
export const nightShiftBlocksByLang: Record<Language, {
  disciplines: string[];
  deliverables: string[];
  blocks: CaseStudyBlockTranslation[];
  cards: GalleryCardTranslation[];
}> = {
  es: {
    disciplines: ['Dirección Creativa', 'Dirección de Arte', 'Tipografía', 'Motion'],
    deliverables: ['Identidad de Marca', 'Sistema Tipográfico', 'Dirección de Arte'],
    blocks: [
      {
        label: 'Overview',
        text: 'Night Shift es un sistema de identidad visual para un colectivo creativo nocturno con base en Berlín. El proyecto exigía un lenguaje vivo en la oscuridad: táctil, sobrio y profundamente tipográfico.',
      },
      {
        label: 'Challenge',
        text: 'El colectivo opera en música, fotografía y cine. Una sola identidad debía articularse en portadas de vinilo, carteles digitales y espacios físicos sin perder coherencia ni carácter.',
      },
      {
        label: 'Approach',
        text: 'Despojamos el sistema hasta sus elementos esenciales: una tipografía a escala extrema, una paleta a dos tintas anclada en el casi-negro y una retícula estricta que solo se quiebra cuando la obra lo pide.',
      },
    ],
    cards: [
      {
        src: 'https://images.unsplash.com/photo-1568607184887-647b905c0966?w=700&h=1050&fit=crop&auto=format',
        alt: 'Composición geométrica minimalista',
        label: '001',
        caption: 'Signos de Marca',
      },
      {
        src: 'https://images.unsplash.com/photo-1617927066118-241d4406a82c?w=700&h=1050&fit=crop&auto=format',
        alt: 'Estudio de textura orgánica y superficies',
        label: '002',
        caption: 'Estudios de Textura',
      },
      {
        src: 'https://images.unsplash.com/photo-1548089450-0808d0d9880c?w=700&h=1050&fit=crop&auto=format',
        alt: 'Visual atmosférico oscuro para espacios',
        label: '003',
        caption: 'Aplicación Espacial',
      },
    ],
  },
  en: {
    disciplines: ['Creative Direction', 'Art Direction', 'Typography', 'Motion'],
    deliverables: ['Brand Identity', 'Type System', 'Art Direction'],
    blocks: [
      {
        label: 'Overview',
        text: 'Night Shift is a visual identity system for a late-night creative collective based in Berlin. The project demanded a language that felt alive after dark — tactile, restrained, and deeply typographic.',
      },
      {
        label: 'Challenge',
        text: 'The collective operates across music, photography, and film. A single identity had to hold across vinyl sleeves, digital posters, and physical spaces without losing coherence or voice.',
      },
      {
        label: 'Approach',
        text: 'We stripped the system to its essentials: one typeface at extreme scale, a two-tone palette anchored in near-black, and a strict grid that breaks only when the work demands it.',
      },
    ],
    cards: [
      {
        src: 'https://images.unsplash.com/photo-1568607184887-647b905c0966?w=700&h=1050&fit=crop&auto=format',
        alt: 'Minimalist geometric composition',
        label: '001',
        caption: 'Brand Marks',
      },
      {
        src: 'https://images.unsplash.com/photo-1617927066118-241d4406a82c?w=700&h=1050&fit=crop&auto=format',
        alt: 'Organic texture study and surfaces',
        label: '002',
        caption: 'Texture Studies',
      },
      {
        src: 'https://images.unsplash.com/photo-1548089450-0808d0d9880c?w=700&h=1050&fit=crop&auto=format',
        alt: 'Dark atmospheric visual for environments',
        label: '003',
        caption: 'Environmental',
      },
    ],
  },
  fr: {
    disciplines: ['Direction Créative', 'Direction Artistique', 'Typographie', 'Motion'],
    deliverables: ['Identité de Marque', 'Système Typographique', 'Direction Artistique'],
    blocks: [
      {
        label: 'Vue d’ensemble',
        text: 'Night Shift est un système d’identité visuelle conçu pour un collectif créatif nocturne basé à Berlin. Le projet exigeait un langage vivant dans la pénombre : tactile, sobre et résolument typographique.',
      },
      {
        label: 'Défi',
        text: 'Le collectif œuvre dans la musique, la photographie et le cinéma. Une identité unique devait fonctionner sur pochettes vinyles, affiches numériques et espaces physiques sans perdre en force ni cohérence.',
      },
      {
        label: 'Approche',
        text: 'Nous avons épuré le système jusqu’à l’essentiel : une typographie à échelle monumentale, une palette bicolore proche du noir et une grille rigoureuse qui ne se rompt que lorsque l’œuvre le réclame.',
      },
    ],
    cards: [
      {
        src: 'https://images.unsplash.com/photo-1568607184887-647b905c0966?w=700&h=1050&fit=crop&auto=format',
        alt: 'Composition géométrique minimaliste',
        label: '001',
        caption: 'Signes de Marque',
      },
      {
        src: 'https://images.unsplash.com/photo-1617927066118-241d4406a82c?w=700&h=1050&fit=crop&auto=format',
        alt: 'Étude de texture organique et matériaux',
        label: '002',
        caption: 'Études de Texture',
      },
      {
        src: 'https://images.unsplash.com/photo-1548089450-0808d0d9880c?w=700&h=1050&fit=crop&auto=format',
        alt: 'Visuel sombre et atmosphérique pour installations',
        label: '003',
        caption: 'Application Spatiale',
      },
    ],
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  getProjects: () => ProjectItemData[];
  getExperiences: () => ExperienceItemTranslation[];
  getEducation: () => EducationItemTranslation[];
  getPillars: () => PillarTranslation[];
  getAgoraBlocks: () => CaseStudyBlockTranslation[];
  getAgoraCards: () => GalleryCardTranslation[];
  getLavanderiaData: () => { intro: string; blocks: CaseStudyBlockTranslation[]; quote: string };
  getNightShiftData: () => {
    disciplines: string[];
    deliverables: string[];
    blocks: CaseStudyBlockTranslation[];
    cards: GalleryCardTranslation[];
  };
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  t: (key) => translations.es[key] || key,
  getProjects: () => projectsByLang.es,
  getExperiences: () => experiencesByLang.es,
  getEducation: () => educationByLang.es,
  getPillars: () => pillarsByLang.es,
  getAgoraBlocks: () => agoraBlocksByLang.es,
  getAgoraCards: () => agoraCardsByLang.es,
  getLavanderiaData: () => lavanderiaBlocksByLang.es,
  getNightShiftData: () => nightShiftBlocksByLang.es,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('ac_portfolio_lang');
      if (saved === 'en' || saved === 'fr' || saved === 'es') {
        return saved;
      }
      return 'es';
    } catch {
      return 'es';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ac_portfolio_lang', language);
    } catch {
      // ignore
    }
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    const langDict = translations[language] as Record<string, string>;
    return langDict[key] || (translations.es as Record<string, string>)[key] || key;
  }, [language]);

  const getProjects = useCallback(() => projectsByLang[language] || projectsByLang.es, [language]);
  const getExperiences = useCallback(() => experiencesByLang[language] || experiencesByLang.es, [language]);
  const getEducation = useCallback(() => educationByLang[language] || educationByLang.es, [language]);
  const getPillars = useCallback(() => pillarsByLang[language] || pillarsByLang.es, [language]);
  const getAgoraBlocks = useCallback(() => agoraBlocksByLang[language] || agoraBlocksByLang.es, [language]);
  const getAgoraCards = useCallback(() => agoraCardsByLang[language] || agoraCardsByLang.es, [language]);
  const getLavanderiaData = useCallback(() => lavanderiaBlocksByLang[language] || lavanderiaBlocksByLang.es, [language]);
  const getNightShiftData = useCallback(() => nightShiftBlocksByLang[language] || nightShiftBlocksByLang.es, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    getProjects,
    getExperiences,
    getEducation,
    getPillars,
    getAgoraBlocks,
    getAgoraCards,
    getLavanderiaData,
    getNightShiftData,
  }), [
    language,
    setLanguage,
    t,
    getProjects,
    getExperiences,
    getEducation,
    getPillars,
    getAgoraBlocks,
    getAgoraCards,
    getLavanderiaData,
    getNightShiftData,
  ]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
