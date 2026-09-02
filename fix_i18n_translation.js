const fs = require('fs');
let content = fs.readFileSync('src/i18n.js', 'utf8');

// EN Updates
content = content.replace(/nav_recruitment:\s*['"]Recruitment['"]/g, "nav_recruitment: 'Registration'");
content = content.replace(/nav_recruitment:\s*['"]Recrutement['"]/g, "nav_recruitment: 'Inscription'");
content = content.replace(/nav_recruitment:\s*['"]???????['"]/g, "nav_recruitment: '???????'");

// Admin EN Updates
content = content.replace(/admin_recruit_status:\s*['"]Recruitment Status['"]/g, "admin_recruit_status: 'Registration Status'");
content = content.replace(/admin_recruit_desc:\s*['"]Toggle whether the student recruitment application form is open or closed for public applicants\.['"]/g, "admin_recruit_desc: 'Toggle whether the registration form is open or closed for public applicants.'");
content = content.replace(/admin_recruit_close:\s*['"]Close Recruitment['"]/g, "admin_recruit_close: 'Close Registration'");
content = content.replace(/admin_recruit_open:\s*['"]Open Recruitment['"]/g, "admin_recruit_open: 'Open Registration'");
content = content.replace(/hero_cta_secondary:\s*['"]Join the Club['"]/g, "hero_cta_secondary: 'Register Now'");

// Admin FR Updates
content = content.replace(/admin_recruit_status:\s*['"]Statut du Recrutement['"]/g, "admin_recruit_status: 'Statut de l\\'Inscription'");
content = content.replace(/admin_recruit_desc:\s*['"]Ouvrir ou fermer le formulaire de recrutement pour les candidats\.['"]/g, "admin_recruit_desc: 'Ouvrir ou fermer le formulaire d\\'inscription pour les candidats.'");
content = content.replace(/admin_recruit_close:\s*['"]Fermer le Recrutement['"]/g, "admin_recruit_close: 'Fermer l\\'Inscription'");
content = content.replace(/admin_recruit_open:\s*['"]Ouvrir le Recrutement['"]/g, "admin_recruit_open: 'Ouvrir l\\'Inscription'");

// Admin AR Updates
content = content.replace(/admin_recruit_status:\s*['"]???? ???????['"]/g, "admin_recruit_status: '???? ???????'");
content = content.replace(/admin_recruit_desc:\s*['"]????? ?? ??? ??? ????? ??? ????? ?????? ??????? ?? ?????? ?????????\.['"]/g, "admin_recruit_desc: '????? ?? ??? ??? ????? ??????? ??????? ?? ?????? ?????????.'");
content = content.replace(/admin_recruit_close:\s*['"]????? ???????['"]/g, "admin_recruit_close: '????? ???????'");
content = content.replace(/admin_recruit_open:\s*['"]??? ???????['"]/g, "admin_recruit_open: '??? ???????'");

// Append proj_in_process 
content = content.replace(
  /proj_explore:\s*['"]Explore Project['"],/g,
  "proj_explore: 'Explore Project',\n      proj_in_process: 'In process',"
);
content = content.replace(
  /proj_explore:\s*['"]Explorer le projet['"],/g,
  "proj_explore: 'Explorer le projet',\n      proj_in_process: 'En cours',"
);
content = content.replace(
  /proj_explore:\s*['"]?????? ???????['"],/g,
  "proj_explore: '?????? ???????',\n      proj_in_process: '??? ???????',"
);

fs.writeFileSync('src/i18n.js', content, 'utf8');
