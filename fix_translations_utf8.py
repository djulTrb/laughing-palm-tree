# -*- coding: utf-8 -*-
import os
import re

filepath = 'src/i18n.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# EN Updates
content = content.replace("nav_recruitment: 'Recruitment'", "nav_recruitment: 'Registration'")
content = content.replace("nav_recruitment: 'Recrutement'", "nav_recruitment: 'Inscription'")
content = content.replace("nav_recruitment: '???????'", "nav_recruitment: '???????'")

# Admin EN Updates
content = content.replace("admin_recruit_status: 'Recruitment Status'", "admin_recruit_status: 'Registration Status'")
content = content.replace("admin_recruit_desc: 'Toggle whether the student recruitment application form is open or closed for public applicants.'", "admin_recruit_desc: 'Toggle whether the registration form is open or closed for public applicants.'")
content = content.replace("admin_recruit_close: 'Close Recruitment'", "admin_recruit_close: 'Close Registration'")
content = content.replace("admin_recruit_open: 'Open Recruitment'", "admin_recruit_open: 'Open Registration'")

# Admin FR Updates
content = content.replace("admin_recruit_status: 'Statut du Recrutement'", "admin_recruit_status: 'Statut de l\\'Inscription'")
content = content.replace("admin_recruit_desc: 'Ouvrir ou fermer le formulaire de recrutement pour les candidats.'", "admin_recruit_desc: 'Ouvrir ou fermer le formulaire d\\'inscription pour les candidats.'")
content = content.replace("admin_recruit_close: 'Fermer le Recrutement'", "admin_recruit_close: 'Fermer l\\'Inscription'")
content = content.replace("admin_recruit_open: 'Ouvrir le Recrutement'", "admin_recruit_open: 'Ouvrir l\\'Inscription'")

# Admin AR Updates
content = content.replace("admin_recruit_status: '???? ???????'", "admin_recruit_status: '???? ???????'")
content = content.replace("admin_recruit_desc: '????? ?? ??? ??? ????? ??? ????? ?????? ??????? ?? ?????? ?????????.'", "admin_recruit_desc: '????? ?? ??? ??? ????? ??????? ??????? ?? ?????? ?????????.'")
content = content.replace("admin_recruit_close: '????? ???????'", "admin_recruit_close: '????? ???????'")
content = content.replace("admin_recruit_open: '??? ???????'", "admin_recruit_open: '??? ???????'")

# Append proj_in_process correctly
content = content.replace("proj_explore: 'Explore Project',", "proj_explore: 'Explore Project',\n      proj_in_process: 'In process',")
content = content.replace("proj_explore: 'Explorer le projet',", "proj_explore: 'Explorer le projet',\n      proj_in_process: 'En cours',")
content = content.replace("proj_explore: '?????? ???????',", "proj_explore: '?????? ???????',\n      proj_in_process: '??? ???????',")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
