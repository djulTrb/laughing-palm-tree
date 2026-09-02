const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const oldProjectLink = <a href={proj.link || proj.lien || '#'} className="mt-auto flex items-center gap-1 text-[#9D4EDD] font-body font-semibold text-xs uppercase tracking-wider w-fit hover:opacity-80">
                            {t('proj_explore')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </a>;

const newProjectLink = {(proj.link || proj.lien) ? (
                            <a href={proj.link || proj.lien} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center gap-1 text-[#9D4EDD] font-body font-semibold text-xs uppercase tracking-wider w-fit hover:opacity-80">
                              {t('proj_explore')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                          ) : (
                            <span className="mt-auto flex items-center gap-1 text-on-surface-variant/60 font-body font-semibold text-xs uppercase tracking-wider w-fit">
                              {t('proj_in_process', 'In process')} <span className="material-symbols-outlined text-sm">pending</span>
                            </span>
                          )};

content = content.replace(oldProjectLink, newProjectLink);
fs.writeFileSync('src/pages/Home.jsx', content, 'utf8');
