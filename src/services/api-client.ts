import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://example-data.draftbit.com",
});

export { CanceledError };
