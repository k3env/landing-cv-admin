import { createEffect, forward, restore } from "effector";
import { Project } from "~models";
import { retryAsync } from "../helpers/interceptor";

const fx_getProjects = createEffect<void, Project[]>(() =>
  fetch(`${import.meta.env.VITE_API_URL}/projects`)
    .then((r) => r.json())
    .then((td) => td.data)
);

const fx_getProject = createEffect<string, Project>((id: string) =>
  fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`)
    .then((r) => r.json())
    .then((td) => td.data)
);
const fx_updateProject = createEffect<Project, {}>((formData: Project) =>
  retryAsync("POST", `${import.meta.env.VITE_API_URL}/projects`, formData).then(
    (v) => v.data
  )
);
const fx_deleteProject = createEffect<string, {}>((id: string) =>
  retryAsync(
    "DELETE",
    `${import.meta.env.VITE_API_URL}/projects/${id}`,
    {}
  ).then((d) => d.data)
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
