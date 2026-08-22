import client from "@/services/http/client";
import type { AppQueryArg } from "@/shared/types";

type ExecuteClientRequestParams = {
  method: string;
  path: string;
  params?: AppQueryArg["params"];
  body?: unknown;
};

export async function executeClientRequest({
  method,
  path,
  params,
  body,
}: ExecuteClientRequestParams): Promise<unknown> {
  switch (method) {
    case "GET":
      return client.get(path, { params });
    case "POST":
      return client.post(path, { body });
    case "PUT":
      return client.put(path, { body });
    case "DELETE":
      return client.delete(path, { body, params });
    default:
      return client.post(path, { body, params });
  }
}
