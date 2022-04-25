/**
 * Created by KongSa on 2022/4/20-2:15 PM.
 * as const string => 字面量
 */

function handleRequest(url: string, method: "GET" | "POST"): void {
  return;
}

//const req = { url: "https://example.com", method: "GET" };
//Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
//handleRequest(req.url, req.method);

const req1 = { url: "https://example.com", method: "GET" } as const;
handleRequest(req1.url, req1.method);
// as const 把get转化为了字面量 而不是string

export {};
