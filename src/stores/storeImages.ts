import { createEffect, restore, forward } from "effector";
import { File } from "../models/File.model";
const fx_getImages = createEffect<void, File[]>(() =>
  fetch(`http://localhost:3000/api/v1/files`)
    .then((v) => v.json())
    .then((v) => v.data)
);
const fx_deleteImage = createEffect<string, void>((id: string) =>
  fetch(`http://localhost:3000/api/v1/files/${id}`, { method: "DELETE" }).then(
    (v) => console.log()
  )
);
const fx_addImage = createEffect<
  FormData,
  { acknowledged: boolean; insertedId: string }
>((data: FormData) => {
  var requestOptions: RequestInit = {
    method: "POST",
    body: data,
    redirect: "follow",
  };

  return fetch("http://localhost:3000/api/v1/files/", requestOptions)
    .then((r) => r.json())
    .then((v) => v.data);
});

const $images = restore(fx_getImages, []);

$images.on(fx_getImages.doneData, (s, p) => p);
// $images.on(fx_deleteImage.done, (s, p) => s.filter((v) => v._id !== p.params));
// $images.on(fx_addImage.done, (s, p) => {});
forward({ from: fx_deleteImage.done, to: fx_getImages });
forward({ from: fx_addImage.done, to: fx_getImages });

export { $images, fx_getImages, fx_deleteImage, fx_addImage };
