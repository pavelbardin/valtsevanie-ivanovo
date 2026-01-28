const DEFAULT_ENDPOINT = "https://api.web3forms.com/submit";

const resolveEndpoint = () => import.meta.env.VITE_FORMS_ENDPOINT || DEFAULT_ENDPOINT;

const resolveKey = () => import.meta.env.VITE_WEB3FORMS_KEY;

export const sendForm = async (formData) => {
  const accessKey = resolveKey();
  if (!accessKey) {
    return {
      ok: false,
      error: "missing_key",
      message: "VITE_WEB3FORMS_KEY не найден в .env (перезапусти dev-сервер)",
    };
  }

  if (!formData.has("access_key")) {
    formData.append("access_key", accessKey);
  }

  const endpoint = resolveEndpoint();

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  const success = response.ok && (data.success === true || data.ok === true);

  return {
    ok: success,
    response,
    data,
    error: success ? undefined : data?.message || data?.error || `HTTP ${response.status}`,
  };
};
