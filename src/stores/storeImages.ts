import { createEffect, restore, forward } from "effector";
import { File } from "~models";
const fx_getImages = createEffect<void, File[]>(() =>
  fetch(`${import.meta.env.VITE_API_URL}/files`)
    .then((v) => v.json())
    .then((v) => v.data)
);
const fx_deleteImage = createEffect<string, void>((id: string) =>
  fetch(`${import.meta.env.VITE_API_URL}/files/${id}`, {
    method: "DELETE",
  }).then((v) => console.log())
);
const fx_addImage = createEffect<
  FormData,
  { acknowledged: boolean; insertedId: string }
>((data: FormData) =>
  fetch(`${import.meta.env.VITE_API_URL}/files/`, {
    method: "POST",
    body: data,
    redirect: "follow",
  })
    .then((r) => r.json())
    .then((v) => v.data)
);

const $images = restore(fx_getImages, []);

$images.on(fx_getImages.doneData, (s, p) => p);
forward({ from: fx_deleteImage.done, to: fx_getImages });
forward({ from: fx_addImage.done, to: fx_getImages });

export {
  $images as store,
  fx_getImages as list,
  fx_deleteImage as delete,
  fx_addImage as add,
};
