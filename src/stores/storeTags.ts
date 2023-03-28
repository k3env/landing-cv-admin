import { createEffect, restore, forward } from "effector";
import { Tag } from "../models";

const fx_getTags = createEffect<void, Tag[]>(() =>
  fetch("http://localhost:3000/api/v1/tags")
    .then((r) => r.json())
    .then((td) => td.data)
);
const fx_addTag = createEffect<string, {}>((label: string) =>
  fetch("http://localhost:3000/api/v1/tags", {
    body: JSON.stringify({ label: label }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((td) => td)
);
const fx_deleteTag = createEffect<string, {}>((id: string) =>
  fetch(`http://localhost:3000/api/v1/tags/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((td) => td)
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
