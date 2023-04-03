import axios, { AxiosError, AxiosResponse } from "axios";

export function retry<R = any, E = any>(
  method: "GET" | "POST" | "DELETE",
  url: string,
  body: Object | FormData | undefined,
  onSuccess: (res: AxiosResponse<R>) => void,
  onError: (err: AxiosError<E>) => void
) {
  axios
    .request({ url: url, method: method, withCredentials: true, data: body })
    .then(
      (res: AxiosResponse<R>) => onSuccess(res),
      (err: AxiosError<E>) => {
        if (err.response?.status === 401) {
          axios
            .post(
              `${import.meta.env.VITE_AUTH_URL}/auth/refresh`,
              {},
              { withCredentials: true }
            )
            .then(
              () => {
                axios
                  .request({ url: url, method: method, withCredentials: true })
                  .then(
                    (res: AxiosResponse<R>) => onSuccess(res),
                    (err: AxiosError<E>) => onError(err)
                  );
              },
              (err: AxiosError<E>) => onError(err)
            );
        } else {
          onError(err);
        }
      }
    );
}

export async function retryAsync<R = any, E = any>(
  method: "GET" | "POST" | "DELETE",
  url: string,
  body: Object | FormData | undefined
) {
  try {
    const res = await axios.request<R>({
      url: url,
      method: method,
      withCredentials: true,
      data: body,
    });
    return res;
  } catch (e) {
    const err = e as AxiosError<E>;
    try {
      if (err.response?.status === 401) {
        axios.post(
          `${import.meta.env.VITE_AUTH_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const res2 = await axios.request<R>({
          url: url,
          method: method,
          withCredentials: true,
          data: body,
        });
        return res2;
      } else {
        throw err;
      }
    } catch (e) {
      const err = e as AxiosError<E>;
      throw err;
    }
  }
}
