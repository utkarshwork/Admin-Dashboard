"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export async function getData<T>(url: string): Promise<T | null> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await axios.get<T>(
      `${process.env.NEXT_PUBLIC_API_PATH}${url}`,
      { headers },
    );
    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError;
    if (typeof window !== "undefined") {
      if (axiosError.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/";
      } else {
        throw new Error(axiosError.message);
      }
    }
    return null;
  }
}

export async function createData<RequestType, ResponseType>(
  url: string,
  data: RequestType,
): Promise<ResponseType | null> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await axios.post<ResponseType>(
      `${process.env.NEXT_PUBLIC_API_PATH}${url}`,
      data,
      { headers },
    );
    return response.data;
  } catch (err) {
    console.log("Error creating data:", err);
    return null;
  }
}

export async function patchData<T, R = unknown>(
  url: string,
  data: T,
): Promise<R | null> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response: AxiosResponse<R> = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_PATH}${url}`,
      data,
      { headers },
    );

    return response.data;
  } catch (err) {
    console.log("Error patching data:", err);
    return null;
  }
}

export async function userData<T>(): Promise<T | null> {
  try {
    const response = await axios.get<T>(
      `${process.env.NEXT_PUBLIC_API_PATH}/user`,
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError;

    if (axiosError.response?.status === 401) {
      console.log("Unauthorized - clearing session");
      localStorage.clear();
    } else {
      console.log("Error fetching user data:", axiosError.message);
    }

    return null;
  }
}

export function useCheckLogin() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      localStorage.clear();
      if (pathname.startsWith("/admin")) {
        return router.push("/admin/login");
      } else {
        router.push(`/`);
      }
    }
  }, [router, pathname]);
}

export async function exportData(
  url: string,
  payload: Record<string, string>,
): Promise<Blob | null> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const params = new URLSearchParams(
      Object.entries(payload).reduce(
        (acc, [key, value]) => {
          acc[key] = value.toString();
          return acc;
        },
        {} as Record<string, string>,
      ),
    );

    const response = await axios.get<Blob>(
      `${process.env.NEXT_PUBLIC_API_PATH}${url}`,
      {
        headers,
        params,
        responseType: "blob",
      },
    );
    return response.data;
  } catch (err) {
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.href = "/";
    }
    console.log("Error fetching data:", err);
    return null;
  }
}

export async function deleteData<T, R = unknown>(
  url: string,
  data: T | T[],
): Promise<R | null> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response: AxiosResponse<R> = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_PATH}${url}`,
      {
        headers,
        data,
      },
    );
    console.log(response);
    return {
      success: true,
    } as R;
  } catch (err) {
    console.log("Error deleting data:", err);
    return null;
  }
}
