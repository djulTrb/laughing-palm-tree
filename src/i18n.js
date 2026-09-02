import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      "home": "home", "events": "events",
      "events_eyebrow": "Our Events",
      "events_title": "Upcoming Events",
      "events_desc": "Join us for exciting workshops, seminars, and networking sessions.", "gallery": "gallery", "resources": "resources", "contact": "contact", "recruitment": "Registration",
      
      // Home
      "home_subtitle": "AI CLUB • MOULOUD MAMMERI UNIVERSITY • TIZI OUZOU",
      "home_build": "Build the Future with",
      "home_desc": "Join Tizi Ouzou's student AI community. Practical workshops, real-world projects, hackathons and inspiring talks with industry experts.",
      "home_hero_desc": "Join Tizi Ouzou's student AI community, <br> where you'll take part in practical workshops,<br>real-world projects.",
      "home_join": "JOIN MIRAI",
      "home_explore": "EXPLORE ACTIVITIES",
      "marquee_heritage": "Heritage", "marquee_intelligence": "Intelligence", "marquee_future": "Future",
      "mission_tag": "Core Values", "mission_title": "Mission & objectives",
      "mission_ed_title": "Educate", "mission_ed_desc": "Practical workshops and training on machine learning, deep learning, and essential toolchains.",
      "mission_in_title": "Inspire", "mission_in_desc": "Representing Tizi Ouzou in national hackathons and innovative AI competitions.",
      "mission_co_title": "Connect", "mission_co_desc": "An active community of passionate university students, open to all skill levels.",
      "mission_ex_title": "Experiment", "mission_ex_desc": "Concrete projects, from prototyping to deployment, developed collaboratively in teams.",
      "stats_members": "Active Members", "stats_events": "Events", "stats_projects": "Projects", "stats_resources": "Shared Resources",
      "team_tag": "Our Team", "team_title": "Meet the members",
      "team_pres": "President", "team_vp": "Vice-President", "team_sec": "Secretary General",
        "team_collapse": "Réduire l'équipe", "team_meet_all": "Voir toute l'équipe",
      "team_skills": "SKILLS", "team_collapse": "Collapse Team", "team_meet_all": "Meet all the team", "team_mgt": "Management", "team_str": "Strategy", "team_ops": "Operations", "team_log": "Logistics", "team_out": "Outreach", "team_sup": "Support",
      "proj_tag": "Initiatives", "proj_title": "Current projects", "proj_explore": "Explore Project",
      
      // Page Headers
      "events_tag": "Agenda", "events_title": "All our events", "events_desc": "Workshops, hackathons, conferences - explore all upcoming and past MIRAI club meetups.",
      "gallery_tag": "Memoirs", "gallery_title": "Gallery", "gallery_desc": "Moments, workshops, hackathons, and community snapshots from our club activities.",
      "resources_tag": "Knowledge Base", "resources_title": "Resources & Supports", "resources_desc": "PDFs, course materials, tutorials, presentations and curated tool links shared by the club.",
      "contact_tag": "Get in Touch", "contact_title": "Contact Us", "contact_desc": "Have a question or a partnership idea? Reach out to our executive board.",
      "recruitment_tag": "Join Our AI Club", "recruitment_title": "Join MIRAI", "recruitment_desc": "Fill out the application below to become an active contributor, developer, or enthusiast in our community.",
      
      // Filters & Search
      "filter_all": "All", "filter_upcoming": "Upcoming", "filter_past": "Past",
      "filter_workshops": "Workshops", "filter_hackathons": "Hackathons", "filter_social": "Social",
      "filter_cheatsheets": "Cheat Sheets", "filter_tutorials": "Tutorials",
      "search_placeholder": "Search resources...", "btn_download": "Download", "btn_register": "Register",
      
      // Contact & Footer
      "address": "Address", "email": "Email", "follow_ig": "Follow on Instagram", "follow_fb": "Follow on Facebook", "follow_in": "Follow on LinkedIn",
      "address_val": "Département d'Informatique, Faculté de Génie Électrique et d'Informatique, Université Mouloud Mammeri, Tizi Ouzou, Algérie",
      "contact_msg_title": "Send us a direct message",
      "form_name": "Name *",
      "form_type": "Application Type *",
      "form_type_adherent": "Adherent",
      "form_type_actif": "Active Member",
        "form_note_adherent": "Less commitment than an active member. You can attend our events and participate in our public activities.",
        "form_note_actif": "Requires more commitment. You will be meeting and discussing with the members, planning projects, sharing your thoughts, and gaining full access to internal club operations.",
      "form_telephone": "Phone Number *",
      "form_github": "GitHub URL *",
      "form_linkedin": "LinkedIn URL",
      "form_portfolio": "Portfolio URL",
      "form_competences": "Technical Skills *",
      "form_experience": "Experience Level *",
      "form_experience_beginner": "Beginner",
      "form_experience_intermediate": "Intermediate",
      "form_experience_advanced": "Advanced",
      "form_email": "Personal Email *", "form_uni_email": "University Email *", "form_msg": "Message *", "form_send": "Send Message",
      "footer_slogan": "Heritage • Intelligence • Future", "footer_email_ph": "Enter your email", "footer_copy": "© 2026 MIRAI Club - All Rights Reserved. Mouloud Mammeri University · Tizi Ouzou · Algeria.",
      
      "home_cta_title": "See <nowrap>AI <pill1/></nowrap> <brDesktop/> From a different <brDesktop/> <nowrap>lens <pill2/></nowrap>", "home_cta_desc": "",
      "proj_in_process": "In process",
      "home_join_circle": "Join Mirai Club *",

      // Recruitment Form
      "form_major": "Major / Field of Study *", "form_year": "Academic Year *", "form_why": "Why do you want to join MIRAI Club? *", "form_warning_title": "Take this seriously!", "form_warning_desc": "Once your application is submitted, you will not have another chance to apply again. Please ensure all information is accurate and your motivation is clear before proceeding.", "form_submit": "Submit Application",
      "app_closed_tag": "Applications Closed", "app_closed_title": "Applications are currently closed", "app_closed_desc": "MIRAI Club is not currently accepting new members. Follow our announcement channels to be notified when the next recruitment cohort opens.",
      
      // Chatbot
      "ai_title": "MIRAI Assistant", "ai_hello": "Hello! I'm the MIRAI Club AI assistant. How can I help you today?", "ai_placeholder": "Ask a question...",
      
      // Events
      "event_loading": "Fetching events...", "event_empty": "No events found.", "event_ended": "Ended", "event_register": "Register Now", "event_closed": "Registration Closed", "event_details": "Event Details",
      
      // 404
      "404_title": "Page not found", "404_subtitle": "Sorry, the page you’re looking for doesn’t exist", "404_go_back": "Go back", "404_take_home": "Take me home",
      
      // Admin
      "admin_portal": "Backoffice Portal", "admin_title": "Admin Page", "admin_desc": "Manage executive members, calendar events, media galleries, and public learning resources.", "admin_recruit_status": "Registration Status", "admin_recruit_desc": "Toggle whether the student recruitment application form is open or closed for public applicants.", "admin_recruit_close": "Close Registration", "admin_recruit_open": "Open Registration", "admin_members_title": "Manage members", "admin_member_add": "Add Member", "admin_member_name": "Member Name", "admin_member_modify": "Modify", "admin_member_delete": "Delete", "admin_events_title": "Manage Events", "admin_event_name": "Event Name", "admin_event_name_ph": "Enter event name", "admin_event_date": "Date", "admin_event_snippet": "Short Snippet", "admin_event_snippet_ph": "Brief summary for the event card...", "admin_event_details": "Full Details", "admin_event_details_ph": "Enter full event information for the details window...", "admin_event_location": "Location", "admin_event_location_ph": "Enter location", "admin_event_deadline": "Deadline Date", "admin_event_add": "Add Event", "admin_events_existing": "Existing Events", "admin_event_edit": "Edit", "admin_gallery_title": "Manage Gallery", "admin_gallery_group": "Group Title", "admin_gallery_group_ph": "Enter group title (e.g. Workshop 2024)", "admin_gallery_upload": "Upload Images", "admin_gallery_drag": "Click or drag to upload multiple images", "admin_gallery_add": "Add to Gallery", "admin_galleries_existing": "Existing Galleries", "admin_gallery_images": "images", "admin_gallery_edit": "Edit Album", "admin_resources_title": "Manage Resources", "admin_resource_title": "Resource Title", "admin_resource_title_ph": "Enter resource title (e.g. ML Cheat Sheet)", "admin_resource_desc": "Description", "admin_resource_desc_ph": "Enter resource description...", "admin_resource_pdf": "Upload PDF", "admin_resource_pdf_hint": "Click to upload PDF...", "admin_resource_link": "Resource Link", "admin_resource_add": "Add to Resources", "admin_modal_edit_event": "Edit Event", "admin_modal_delete_event": "Delete Event", "admin_modal_save": "Save Changes", "admin_modal_edit_gallery": "Edit Gallery", "admin_modal_gallery_images": "Images", "admin_modal_delete_album": "Delete Entire Album", "admin_modal_done": "Done"
    }
  },
  fr: {
    translation: {
      "home": "accueil", "events": "événements",
      "events_eyebrow": "Nos Événements",
      "events_title": "Événements à Venir",
      "events_desc": "Rejoignez-nous pour des ateliers passionnants, des séminaires et des sessions de réseautage.", "gallery": "galerie", "resources": "ressources", "contact": "contact", "recruitment": "Inscription",
      
      "home_subtitle": "CLUB IA • UNIVERSITÉ MOULOUD MAMMERI • TIZI OUZOU",
      "home_build": "Construisez le Futur avec",
      "home_desc": "Rejoignez la communauté IA étudiante de Tizi Ouzou. Ateliers pratiques, projets concrets, hackathons et conférences inspirantes.",
      "home_hero_desc": "Rejoignez la communauté étudiante d'IA de Tizi Ouzou,<br> où vous participerez à des ateliers pratiques, <br> des projets concrets.",
      "home_join": "REJOINDRE MIRAI",
      "home_explore": "EXPLORER LES ACTIVITÉS",
      "marquee_heritage": "Héritage", "marquee_intelligence": "Intelligence", "marquee_future": "Futur",
      "mission_tag": "Valeurs Fondamentales", "mission_title": "Mission & objectifs",
      "mission_ed_title": "Éduquer", "mission_ed_desc": "Ateliers pratiques et formations sur le machine learning, le deep learning et les outils essentiels.",
      "mission_in_title": "Inspirer", "mission_in_desc": "Représenter Tizi Ouzou dans les hackathons nationaux et compétitions IA.",
      "mission_co_title": "Connecter", "mission_co_desc": "Une communauté active d'étudiants passionnés, ouverte à tous les niveaux.",
      "mission_ex_title": "Expérimenter", "mission_ex_desc": "Des projets concrets, du prototypage au déploiement, développés en équipe.",
      "stats_members": "Membres Actifs", "stats_events": "Événements", "stats_projects": "Projets", "stats_resources": "Ressources Partagées",
      "team_tag": "Notre Équipe", "team_title": "Rencontrez les membres",
      "team_pres": "Président", "team_vp": "Vice-Présidente", "team_sec": "Secrétaire Général",
      "team_skills": "COMPÉTENCES", "team_collapse": "Réduire l'équipe", "team_meet_all": "Voir toute l'équipe", "team_mgt": "Gestion", "team_str": "Stratégie", "team_ops": "Opérations", "team_log": "Logistique", "team_out": "Sensibilisation", "team_sup": "Support",
      "proj_tag": "Initiatives", "proj_title": "Projets actuels", "proj_explore": "Explorer le Projet",
      
      "events_tag": "Agenda", "events_title": "Tous nos événements", "events_desc": "Ateliers, hackathons, conférences - explorez toutes les rencontres à venir et passées du club MIRAI.",
      "gallery_tag": "Mémoires", "gallery_title": "Galerie", "gallery_desc": "Moments, ateliers, hackathons et aperçus de nos activités communautaires.",
      "resources_tag": "Base de Connaissances", "resources_title": "Ressources & Supports", "resources_desc": "PDFs, supports de cours, tutoriels, présentations et liens utiles partagés par le club.",
      "contact_tag": "Restons en Contact", "contact_title": "Contactez-nous", "contact_desc": "Vous avez une question ou une idée de partenariat ? Contactez notre bureau exécutif.",
      "recruitment_tag": "Rejoignez Notre Club IA", "recruitment_title": "Rejoignez MIRAI", "recruitment_desc": "Remplissez le formulaire ci-dessous pour devenir un contributeur actif.",
      
      "filter_all": "Tout", "filter_upcoming": "À venir", "filter_past": "Passés",
      "filter_workshops": "Ateliers", "filter_hackathons": "Hackathons", "filter_social": "Social",
      "filter_cheatsheets": "Aide-mémoire", "filter_tutorials": "Tutoriels",
      "search_placeholder": "Rechercher des ressources...", "btn_download": "Télécharger", "btn_register": "S'inscrire",
      
      "address": "Adresse", "email": "Email", "follow_ig": "Suivre sur Instagram", "follow_fb": "Suivre sur Facebook", "follow_in": "Suivre sur LinkedIn",
      "address_val": "Département d'Informatique, Faculté de Génie Électrique et d'Informatique, Université Mouloud Mammeri, Tizi Ouzou, Algérie",
      "contact_msg_title": "Envoyez-nous un message direct",
      "form_name": "Nom complet *",
      "form_type": "Type de Candidature *",
      "form_type_adherent": "Adhérent",
      "form_type_actif": "Membre Actif",
        "form_note_adherent": "Moins d'engagement qu'un membre actif. Vous pouvez assister à nos événements et participer à nos activités publiques.",
        "form_note_actif": "Nécessite plus d'engagement. Vous rencontrerez et discuterez avec les membres, planifierez des projets, partagerez vos idées et aurez un accès complet aux opérations internes du club.",
      "form_telephone": "Numéro de Téléphone *",
      "form_github": "Lien GitHub *",
      "form_linkedin": "Lien LinkedIn",
      "form_portfolio": "Lien Portfolio",
      "form_competences": "Compétences Techniques *",
      "form_experience": "Niveau d'Expérience *",
      "form_experience_beginner": "Débutant",
      "form_experience_intermediate": "Intermédiaire",
      "form_experience_advanced": "Avancé",
      "form_email": "Email *", "form_uni_email": "Email Universitaire *", "form_msg": "Message *", "form_send": "Envoyer le Message",
      "footer_slogan": "Héritage • Intelligence • Futur", "footer_email_ph": "Entrez votre email", "footer_copy": "© 2026 Club MIRAI - Tous droits réservés. Université Mouloud Mammeri · Tizi Ouzou · Algérie.",
      
      "home_cta_title": "Voir <nowrap>l'IA <pill1/></nowrap> <brDesktop/> Sous un autre <brDesktop/> <nowrap>angle <pill2/></nowrap>", "home_cta_desc": "",
      "proj_in_process": "En cours",
      "home_join_circle": "Rejoindre MIRAI *"     ,

      "form_major": "Spécialité / Domaine d'étude *", "form_year": "Année Universitaire *", "form_why": "Pourquoi voulez-vous rejoindre le CLUB MIRAI ? *", "form_warning_title": "Prenez ceci au sérieux !", "form_warning_desc": "Une fois votre candidature soumise, vous n'aurez pas d'autre chance de postuler à nouveau. Veuillez vous assurer que toutes les informations sont exactes et que votre motivation est claire avant de continuer.", "form_submit": "Soumettre la Candidature",
      "app_closed_tag": "Candidatures Fermées", "app_closed_title": "Les candidatures sont actuellement fermées", "app_closed_desc": "Le Club MIRAI n'accepte pas de nouveaux membres pour le moment. Suivez-nous pour être notifié de la prochaine session.",
      
      "ai_title": "Assistant MIRAI", "ai_hello": "Bonjour ! Je suis l'assistant IA du Club MIRAI. Comment puis-je vous aider aujourd'hui ?", "ai_placeholder": "Posez une question...",
      
      "event_loading": "Chargement des événements...", "event_empty": "Aucun événement trouvé.", "event_ended": "Terminé", "event_register": "S'inscrire", "event_closed": "Inscriptions Fermées", "event_details": "Détails de l'événement",
      
      "404_title": "Page introuvable", "404_subtitle": "Désolé, la page que vous recherchez n'existe pas", "404_go_back": "Retour", "404_take_home": "Accueil",
      
      // Admin
      "admin_portal": "Portail d'administration", "admin_title": "Page d'administration", "admin_desc": "Gérez les membres exécutifs, les événements, les galeries et les ressources.", "admin_recruit_status": "Statut d'Inscription", "admin_recruit_desc": "Ouvrez ou fermez le formulaire d'inscription pour les candidats.", "admin_recruit_close": "Fermer l'Inscription", "admin_recruit_open": "Ouvrir l'Inscription", "admin_members_title": "Gérer les membres", "admin_member_add": "Ajouter un Membre", "admin_member_name": "Nom du Membre", "admin_member_modify": "Modifier", "admin_member_delete": "Supprimer", "admin_events_title": "Gérer les Événements", "admin_event_name": "Nom de l'événement", "admin_event_name_ph": "Entrez le nom", "admin_event_date": "Date", "admin_event_snippet": "Extrait", "admin_event_snippet_ph": "Bref résumé...", "admin_event_details": "Détails", "admin_event_details_ph": "Entrez les détails complets...", "admin_event_location": "Lieu", "admin_event_location_ph": "Entrez le lieu", "admin_event_deadline": "Date Limite", "admin_event_add": "Ajouter l'événement", "admin_events_existing": "Événements Existants", "admin_event_edit": "Modifier", "admin_gallery_title": "Gérer la Galerie", "admin_gallery_group": "Titre du Groupe", "admin_gallery_group_ph": "Ex. Workshop 2024", "admin_gallery_upload": "Téléverser", "admin_gallery_drag": "Cliquez ou glissez pour téléverser", "admin_gallery_add": "Ajouter", "admin_galleries_existing": "Galeries Existantes", "admin_gallery_images": "images", "admin_gallery_edit": "Modifier l'Album", "admin_resources_title": "Gérer les Ressources", "admin_resource_title": "Titre de la Ressource", "admin_resource_title_ph": "Entrez le titre", "admin_resource_desc": "Description", "admin_resource_desc_ph": "Entrez la description...", "admin_resource_pdf": "Téléverser le PDF", "admin_resource_pdf_hint": "Cliquez pour téléverser...", "admin_resource_link": "Lien de la Ressource", "admin_resource_add": "Ajouter", "admin_modal_edit_event": "Modifier l'événement", "admin_modal_delete_event": "Supprimer l'événement", "admin_modal_save": "Enregistrer", "admin_modal_edit_gallery": "Modifier la Galerie", "admin_modal_gallery_images": "Images", "admin_modal_delete_album": "Supprimer l'Album", "admin_modal_done": "Terminé"
    }
  },
  ar: {
    translation: {
      "home": "الرئيسية", "events": "الأحداث", "gallery": "المعرض", "resources": "الموارد", "contact": "اتصل بنا", "recruitment": "تسجيل",
      
      "home_subtitle": "نادي الذكاء الاصطناعي • جامعة مولود معمري • تيزي وزو",
      "home_build": "ابني المستقبل مع",
      "home_desc": "انضم إلى مجتمع الذكاء الاصطناعي الطلابي في تيزي وزو. ورش عمل عملية، مشاريع حقيقية، هاكاثون ومحادثات ملهمة مع خبراء الصناعة.",
        "home_hero_desc": "كن جزءًا من مجتمع طلاب الذكاء الاصطناعي في تيزي وزو،<br/> حيث ستشارك في ورش عمل عملية<br/> ومشاريع واقعية",
      "home_join": "انضم إلى <span style=\"font-family: 'Sora', sans-serif !important\">Mirai</span>",
      "home_explore": "اكتشف الأنشطة",
      "marquee_heritage": "تراث", "marquee_intelligence": "ذكاء", "marquee_future": "مستقبل",
      "mission_tag": "القيم الأساسية", "mission_title": "المهمة والأهداف",
      "mission_ed_title": "تعليم", "mission_ed_desc": "ورش عمل عملية وتدريب على التعلم الآلي، التعلم العميق، والأدوات الأساسية.",
      "mission_in_title": "إلهام", "mission_in_desc": "تمثيل تيزي وزو في مسابقات الهاكاثون الوطنية ومسابقات الذكاء الاصطناعي.",
      "mission_co_title": "تواصل", "mission_co_desc": "مجتمع نشط من طلاب الجامعات المتحمسين، مفتوح لجميع مستويات المهارة.",
      "mission_ex_title": "تجربة", "mission_ex_desc": "مشاريع ملموسة، من النمذجة إلى النشر، يتم تطويرها بشكل تعاوني.",
      "stats_members": "أعضاء نشطون", "stats_events": "فعاليات", "stats_projects": "مشاريع", "stats_resources": "موارد مشتركة",
      "team_tag": "فريقنا", "team_title": "تعرف على الأعضاء",
      "team_pres": "الرئيس", "team_vp": "نائب الرئيس", "team_sec": "الأمين العام",
      "team_skills": "المهارات", "team_collapse": "طي قائمة الفريق", "team_meet_all": "تعرف على كل الفريق", "team_mgt": "إدارة", "team_str": "استراتيجية", "team_ops": "عمليات", "team_log": "لوجستيات", "team_out": "توعية", "team_sup": "دعم",
      "proj_tag": "مبادرات", "proj_title": "المشاريع الحالية", "proj_explore": "استكشف المشروع",
      
      "events_tag": "جدول الأعمال", "events_title": "جميع فعالياتنا", "events_desc": "ورش عمل، هاكاثون، مؤتمرات - اكتشف جميع لقاءات نادي MIRAI القادمة والسابقة.",
      "gallery_tag": "ذكريات", "gallery_title": "المعرض", "gallery_desc": "لحظات، ورش عمل، هاكاثون، ولقطات من أنشطة مجتمعنا.",
      "resources_tag": "قاعدة المعرفة", "resources_title": "الموارد والدعم", "resources_desc": "ملفات PDF، مواد دراسية، دروس، عروض تقديمية وروابط أدوات مفيدة يشاركها النادي.",
      "contact_tag": "ابقى على تواصل", "contact_title": "اتصل بنا", "contact_desc": "هل لديك سؤال أو فكرة شراكة؟ تواصل مع مجلسنا التنفيذي.",
      "recruitment_tag": "انضم إلى نادي الذكاء الاصطناعي", "recruitment_title": "انضم إلى MIRAI", "recruitment_desc": "املأ الاستمارة أدناه لتصبح مساهمًا نشطًا أو مطورًا أو عضوًا شغوفًا في مجتمعنا.",
      
      "filter_all": "الكل", "filter_upcoming": "قادم", "filter_past": "سابق",
      "filter_workshops": "ورش عمل", "filter_hackathons": "هاكاثون", "filter_social": "اجتماعي",
      "filter_cheatsheets": "أوراق غش", "filter_tutorials": "دروس",
      "search_placeholder": "ابحث عن الموارد...", "btn_download": "تحميل", "btn_register": "تسجيل",
      
      "address": "العنوان", "email": "البريد الإلكتروني", "follow_ig": "تابعنا على إنستغرام", "follow_fb": "تابعنا على فيسبوك", "follow_in": "تابعنا على لينكد إن",
      "address_val": "قسم الإعلام الآلي، كلية الهندسة الكهربائية والإعلام الآلي، جامعة مولود معمري، تيزي وزو، الجزائر",
      "contact_msg_title": "أرسل لنا رسالة مباشرة",
      "form_name": "الاسم الكامل *",
        "form_type": "نوع التسجيل *",
        "form_type_adherent": "منخرط",
        "form_type_actif": "عضو نشط",
        "form_note_adherent": "التزام أقل من العضو النشط. يمكنك حضور فعالياتنا والمشاركة في أنشطتنا العامة.",
        "form_note_actif": "يتطلب التزاما أكبر. ستلتقي وتناقش مع الأعضاء، وتخطط للمشاريع، وتشارك أفكارك، وستحصل على وصول كامل للعمليات الداخلية للنادي.",
        "form_telephone": "رقم الهاتف *",
        "form_github": "GitHub URL *",
        "form_linkedin": "LinkedIn URL",
        "form_portfolio": "رابط معرض الأعمال",
        "form_competences": "المهارات التقنية *",
        "form_experience": "مستوى الخبرة *",
        "form_experience_beginner": "مبتدئ",
        "form_experience_intermediate": "متوسط",
        "form_experience_advanced": "متقدم",
 "form_email": "البريد الإلكتروني *", "form_uni_email": "البريد الجامعي *", "form_msg": "الرسالة *", "form_send": "إرسال الرسالة",
      "footer_slogan": "تراث • ذكاء • مستقبل", "footer_email_ph": "أدخل بريدك الإلكتروني", "footer_copy": "© 2026 نادي MIRAI - جميع الحقوق محفوظة. جامعة مولود معمري · تيزي وزو · الجزائر.",
      
      "home_cta_title": "رؤية جديدة <pill2/> <brDesktop/> للذكاء <nowrap>الاصطناعي <pill1/></nowrap>", "home_cta_desc": "",
      "proj_in_process": "??? ???????",
      "home_join_circle": "Join Mirai Club *",

      "form_major": "التخصص / مجال الدراسة *", "form_year": "السنة الدراسية *", "form_why": "لماذا تريد الانضمام إلى نادي MIRAI؟ *", "form_warning_title": "خذ هذا الأمر بجدية!", "form_warning_desc": "بمجرد تقديم طلبك، لن يكون لديك فرصة أخرى للتقديم مرة أخرى. يرجى التأكد من دقة جميع المعلومات ووضوح دافعك قبل المتابعة.", "form_submit": "تقديم الطلب",
      "app_closed_tag": "التسجيل مغلق", "app_closed_title": "التطبيقات مغلقة حاليا", "app_closed_desc": "نادي MIRAI لا يقبل أعضاء جدد حاليا. تابع قنواتنا ليتم إعلامك عند فتح الدورة القادمة.",
      
      "ai_title": "مساعد MIRAI", "ai_hello": "مرحبًا! أنا المساعد الذكي لنادي MIRAI. كيف يمكنني مساعدتك اليوم؟", "ai_placeholder": "اطرح سؤالاً...",
      
      "event_loading": "جاري تحميل الأحداث...", "event_empty": "لم يتم العثور على أحداث.", "event_ended": "انتهى", "event_register": "سجل الآن", "event_closed": "التسجيل مغلق", "event_details": "تفاصيل الحدث",
      
      "404_title": "الصفحة غير موجودة", "404_subtitle": "عذراً، الصفحة التي تبحث عنها غير موجودة", "404_go_back": "العودة", "404_take_home": "الرئيسية",
      
      // Admin
      "admin_portal": "بوابة الإدارة", "admin_title": "صفحة الإدارة", "admin_desc": "إدارة الأعضاء التنفيذيين، الفعاليات، المعارض والموارد.", "admin_recruit_status": "حالة التسجيل", "admin_recruit_desc": "افتح أو أغلق نموذج التسجيل للطلاب.", "admin_recruit_close": "إغلاق التسجيل", "admin_recruit_open": "فتح التسجيل", "admin_members_title": "إدارة الأعضاء", "admin_member_add": "إضافة عضو", "admin_member_name": "اسم العضو", "admin_member_modify": "تعديل", "admin_member_delete": "حذف", "admin_events_title": "إدارة الفعاليات", "admin_event_name": "اسم الفعالية", "admin_event_name_ph": "أدخل الاسم", "admin_event_date": "التاريخ", "admin_event_snippet": "مقتطف", "admin_event_snippet_ph": "ملخص قصير...", "admin_event_details": "التفاصيل", "admin_event_details_ph": "أدخل التفاصيل الكاملة...", "admin_event_location": "المكان", "admin_event_location_ph": "أدخل المكان", "admin_event_deadline": "الموعد النهائي", "admin_event_add": "إضافة فعالية", "admin_events_existing": "الفعاليات الحالية", "admin_event_edit": "تعديل", "admin_gallery_title": "إدارة المعرض", "admin_gallery_group": "عنوان المجموعة", "admin_gallery_group_ph": "مثل ورشة عمل 2024", "admin_gallery_upload": "رفع الصور", "admin_gallery_drag": "انقر أو اسحب لرفع الصور", "admin_gallery_add": "إضافة للمعرض", "admin_galleries_existing": "المعارض الحالية", "admin_gallery_images": "صور", "admin_gallery_edit": "تعديل الألبوم", "admin_resources_title": "إدارة الموارد", "admin_resource_title": "عنوان المورد", "admin_resource_title_ph": "أدخل العنوان", "admin_resource_desc": "وصف", "admin_resource_desc_ph": "أدخل الوصف...", "admin_resource_pdf": "رفع ملف PDF", "admin_resource_pdf_hint": "انقر لرفع ملف...", "admin_resource_link": "رابط المورد", "admin_resource_add": "إضافة", "admin_modal_edit_event": "تعديل الفعالية", "admin_modal_delete_event": "حذف الفعالية", "admin_modal_save": "حفظ التغييرات", "admin_modal_edit_gallery": "تعديل المعرض", "admin_modal_gallery_images": "صور", "admin_modal_delete_album": "حذف الألبوم كاملاً",
      "admin_modal_done": "تم",
      
      "empty_events": "لا توجد أحداث مجدولة بعد. تحقق مرة أخرى قريباً!",
      "empty_gallery": "لا توجد صور في هذا الألبوم بعد.",
      "empty_resources": "لا توجد موارد متاحة بعد. تحقق مرة أخرى قريباً!"
    }
  }
};

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('mirai-lang') : null;
const defaultLang = savedLang || "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mirai-lang', lng);
  }
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
});

// Set initial attributes
document.documentElement.lang = i18n.language || 'en';
document.documentElement.dir = (i18n.language || 'en') === 'ar' ? 'rtl' : 'ltr';

export default i18n;
