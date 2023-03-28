import { createEffect, restore } from "effector";
import { Profile } from "../models/Profile.model";

const fx_getProfile = createEffect<void, Profile>(() =>
  fetch("http://localhost:3000/api/v1/profile/")
    .then((v) => v.json())
    .then((p) => p.data)
);

const fx_updateProfile = createEffect<Partial<Profile>, any>(
  (profile: Partial<Profile>) =>
    fetch("http://localhost:3000/api/v1/profile/", {
      method: "POST",
      body: JSON.stringify(profile),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((v) => v.json())
);

const $profile = restore(fx_getProfile, null);
// $profile.on(fx_updateProfile.doneData, (s, p) => {
//   console.log(p);
// });
$profile.on(fx_getProfile.doneData, (s, p) => {
  return p;
});

export { $profile, fx_getProfile, fx_updateProfile };
