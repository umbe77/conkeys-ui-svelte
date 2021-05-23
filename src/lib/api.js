import { jwtSign } from "./utils";

export const checkToken = async (secret) => {
  const token = await jwtSign(secret);
  try {
    const resp = await fetch("/api/checktoken", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      token,
      ...(await resp.json()),
    };
  } catch (error) {
    return {
      status: "KO",
    };
  }
};

export const getKeys = async (searchTerm) => {
  try {
    let uri = "/api/keys";
    if (searchTerm) {
      uri = `${uri}/${encodeURIComponent(searchTerm)}`;
    }
    const resp = await fetch(uri, {
      method: "get",
    });
    return await resp.json();
  } catch (error) {
    return {
      error,
    };
  }
};

export const saveKey = async ({ key, value, type }, token) => {
  try {
    await fetch(`/api/key/${encodeURIComponent(key)}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        T: type,
        V: value,
      }),
    });
    return {};
  } catch (error) {
    return {
      error,
    };
  }
};

export const deleteKey = async (key, token) => {
  try {
    await fetch(`/api/key/${encodeURIComponent(key)}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return {};
  } catch (error) {
    return {
      error,
    };
  }
};
