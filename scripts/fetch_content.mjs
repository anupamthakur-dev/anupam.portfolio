import fs from 'fs';
const BASE = "https://raw.githubusercontent.com/anupamthakur-dev/my.portfolio.content/main/content";


async function fetchJson(path) {
  const res = await fetch(`${BASE}/${path}`)
  if (!res.ok) {
  throw new Error(`Failed to fetch ${path}`)
}
  return res.json();
}


const personal_info = await fetchJson('profile/personal.json');
const about = await fetchJson('profile/about.json');
const skills = await fetchJson('skill/skills.json');
const category = await fetchJson('project_category.json');

const projectsIndex = await fetchJson('project_index.json');
const experienceIndex = await fetchJson('exp_index.json');

const projects = await Promise.all(projectsIndex.map((id)=> fetchJson(`projects/${id}.json`)));
const experiences = await Promise.all(experienceIndex.map((id)=> fetchJson(`experience/${id}.json`)));

if(experienceIndex.length > 0){

}

fs.mkdirSync("db", { recursive: true });

fs.writeFileSync('db/profile.json', JSON.stringify({ personal_info,about,skills }, null, 2));
fs.writeFileSync('db/projects.json',JSON.stringify(projects,null,2))
fs.writeFileSync('db/category.json',JSON.stringify(category,null,2))
fs.writeFileSync('db/experiences.json',JSON.stringify(experiences,null,2))