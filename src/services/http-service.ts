import apiClient from "./api-client";
import { BookProps } from "./book-service";

interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }

  getSingle = (param: string | undefined) => {
    const controller = new AbortController();
    const request = apiClient.get(this.endpoint + "/" + param, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
    // return apiClient.get(this.endpoint + "/" + id).then((res) => res.data);
  };
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
