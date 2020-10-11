import {
  deleteFromStorage,
  useLocalStorage,
  writeStorage,
} from "@rehooks/local-storage";

export const TOKEN_HEADER = "x-test-app-jwt-token";

export const login = async (
  username: string,
  password: string
): Promise<{ status: string } | undefined> => {
  for (let retries = 2; retries >= 0; retries--) {
    console.log(`attempting login, retries left: ${retries}`);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).catch((e) => e);

    console.log(`status: ${res.status}`);
    const token = res.headers.get(TOKEN_HEADER);
    if (res.status === 200 && token) {
      console.log(`token received: ${token}`);
      writeStorage("token", token);
      return res.json();
    }

    if (res.status === 400 || res.status === 401 || retries === 0) {
      console.log("throwing error");
      throw await res.json();
    }

    console.log("timeout");
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log("timeout over");
  }
};
export const logout = () => {
  deleteFromStorage("token");
};
export const useToken = () => useLocalStorage("token")[0];
