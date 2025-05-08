class APIManager {
    constructor(baseURL, cacheTime = 5000) {
      this.baseURL = baseURL;
      this.cache = new Map();
      this.pendingRequests = new Map();
      this.cacheTime = cacheTime; // Cache expiry time in ms
    }
  
    async request(method, endpoint, { query, body, headers, formData, file } = {}) {
      let url = `${this.baseURL}/${endpoint}`;
      // Handle query parameters 
      console.log("in the request:",this.baseURL, body,query, method);
      if (query && typeof query === "object") {
        const queryString = new URLSearchParams(query).toString();
        url += `?${queryString}`;
      }
  
      const cacheKey = `${method}:${url}:${JSON.stringify(body)}`;
      
      // Return cached response if available and valid
      if (method === "GET" && this.cache.has(cacheKey)) {
        const { data, timestamp } = this.cache.get(cacheKey);
        if (Date.now() - timestamp < this.cacheTime) {
          return Promise.resolve(data);
        }
        this.cache.delete(cacheKey);
      }
  
      // Return pending request if already in progress
      if (this.pendingRequests.has(cacheKey)) {
        return this.pendingRequests.get(cacheKey);
      }
  
      // Define request options
      let fetchOptions = {
        method,
        headers: { ...headers },
      };
  
      if (body) {
        fetchOptions.headers["Content-Type"] = "application/json";
        fetchOptions.body = JSON.stringify(body);
      }
  
      // Handle form data
      if (formData) {
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
          form.append(key, formData[key]);
        });
        fetchOptions.body = form;
        delete fetchOptions.headers["Content-Type"]; // Let browser set multipart/form-data
      }
  
      // Handle file upload
      if (file) {
        const form = new FormData();
        form.append("file", file);
        fetchOptions.body = form;
        delete fetchOptions.headers["Content-Type"];
      }
  
      // Fetch and store the request promise
      const fetchPromise = fetch(url, fetchOptions)
        .then(async (response) => {
          if (!response.ok) throw new Error(`API Error: ${response.status}`);
          const data = await response.json();
  
          // Cache only GET responses
          if (method === "GET") {
            this.cache.set(cacheKey, { data, timestamp: Date.now() });
          }
          return data;
        })
        .finally(() => {
          this.pendingRequests.delete(cacheKey);
        });
  
      this.pendingRequests.set(cacheKey, fetchPromise);
      return fetchPromise;
    }
  
    get(endpoint, options = {}) {
      return this.request("GET", endpoint, options);
    }
  
    post(endpoint, options = {}) {
      return this.request("POST", endpoint, options);
    }
  
    put(endpoint, options = {}) {
      return this.request("PUT", endpoint, options);
    }
  
    patch(endpoint, options = {}) {
      return this.request("PATCH", endpoint, options);
    }
  
    delete(endpoint, options = {}) {
      return this.request("DELETE", endpoint, options);
    }
  
    clearCache() {
      this.cache.clear();
    }
  }
  

  export {APIManager}