import { Projects } from "@/types";

export  function nextProject(project:Projects,currentProjectSlug:string):string{
    const length = project.length;
    const currentProject = project.find((p) => p.slug === currentProjectSlug);
    const indexOfCurrent = project.indexOf(currentProject);
    
    const nextProject =  project[(((indexOfCurrent + 1) % length) + length) % length].slug;

    return `/project/${nextProject}`;
}