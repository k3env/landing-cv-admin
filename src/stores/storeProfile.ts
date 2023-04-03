import { createEffect, restore } from "effector";
import { Profile } from "~models";
import { retryAsync } from "../helpers/interceptor";

const fx_getProfile = createEffect<void, Profile>(() =>
  fetch(`${import.meta.env.VITE_API_URL}/profile/`)
    .then((v) => v.json())
    .then((p) => p.data)
);

const fx_updateProfile = createEffect<Partial<Profile>, any>(
  (profile: Partial<Profile>) =>
    retryAsync(
      "POST",
      `${import.meta.env.VITE_API_URL}/profile/`,
      profile
    ).then((r) => r.data)
);

const $profile = restore(fx_getProfile, null);
$profile.on(fx_getProfile.doneData, (s, p) => {
  return p;
});

export { $profile as store, fx_getProfile as get, fx_updateProfile as update };
