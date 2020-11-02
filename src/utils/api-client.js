function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  };

  const API_URL = 'https://api.tvmaze.com/search';
  const requestUrl = `${API_URL}/shows?q=${endpoint}`;

  return window.fetch(requestUrl, config).then(async response => {
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export {client};
