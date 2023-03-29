import { createEffect, forward, restore } from "effector";
import { Project } from "~models";

const fx_getProjects = createEffect<void, Project[]>(() =>
  fetch(`http://localhost:3000/api/v1/projects`)
    .then((r) => r.json())
    .then((td) => td.data)
);

const fx_getProject = createEffect<string, Project>((id: string) =>
  fetch(`http://localhost:3000/api/v1/projects/${id}`)
    .then((r) => r.json())
    .then((td) => td.data)
);
const fx_updateProject = createEffect<Project, {}>((formData: Project) =>
  fetch(`http://localhost:3000/api/v1/projects`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((v) => v.json())
    .then((v) => v.data)
);
const fx_deleteProject = createEffect<string, {}>((id: string) =>
  fetch(`http://localhost:3000/api/v1/projects/${id}`, { method: "DELETE" })
    .then((r) => r.json())
    .then((td) => td.data)
);

const $project = restore(fx_getProject, null);

const $projects = restore(fx_getProjects, []);
$projects.on(fx_getProjects.doneData, (s, p) => p);
forward({ from: fx_updateProject.done, to: fx_getProjects });
forward({ from: fx_deleteProject.done, to: fx_getProjects });

export {
  $projects as store,
  $project as single,
  fx_getProjects as list,
  fx_updateProject as post,
  fx_getProject as get,
  fx_deleteProject as delete,
};
