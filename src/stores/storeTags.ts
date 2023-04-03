import { createEffect, restore, forward } from "effector";
import { Tag } from "~models";
import { retryAsync } from "../helpers/interceptor";

const fx_getTags = createEffect<void, Tag[]>(() =>
  fetch(`${import.meta.env.VITE_API_URL}/tags`)
    .then((r) => r.json())
    .then((td) => td.data)
);
const fx_addTag = createEffect<string, {}>((label: string) =>
  retryAsync("POST", `${import.meta.env.VITE_API_URL}/tags`, { label }).then(
    (r) => r.data
  )
);
const fx_deleteTag = createEffect<string, {}>((id: string) =>
  retryAsync(
    "DELETE",
    `${import.meta.env.VITE_API_URL}/tags/${id}`,
    undefined
  ).then((d) => d.data)
);

const $tags = restore(fx_getTags, []);
$tags.on(fx_getTags.doneData, (s, p) => p);
forward({ from: fx_addTag.done, to: fx_getTags });
forward({ from: fx_deleteTag.done, to: fx_getTags });

export {
  $tags as store,
  fx_getTags as list,
  fx_addTag as add,
  fx_deleteTag as delete,
};
