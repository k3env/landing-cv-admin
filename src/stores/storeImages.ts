import { createEffect, restore, forward } from "effector";
import { File } from "~models";
import { retryAsync } from "../helpers/interceptor";
const fx_getImages = createEffect<void, File[]>(() =>
  fetch(`${import.meta.env.VITE_API_URL}/files`)
    .then((v) => v.json())
    .then((v) => v.data)
);
const fx_deleteImage = createEffect<string, void>((id: string) =>
  retryAsync(
    "DELETE",
    `${import.meta.env.VITE_API_URL}/files/${id}`,
    undefined
  ).then((r) => r.data)
);
const fx_addImage = createEffect<
  FormData,
  { acknowledged: boolean; insertedId: string }
>((data: FormData) =>
  retryAsync<{ acknowledged: boolean; insertedId: string }>(
    "POST",
    `${import.meta.env.VITE_API_URL}/files/`,
    data
  ).then((r) => r.data)
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
