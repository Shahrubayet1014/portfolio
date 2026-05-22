type HeaderValue = string | string[] | undefined;
type SessionCookieRequest = {
  protocol?: string;
  headers?: Record<string, HeaderValue>;
};

export type SessionCookieOptions = {
  httpOnly: boolean;
  path: string;
  sameSite: "lax" | "none";
  secure: boolean;
};

function isSecureRequest(req: SessionCookieRequest) {
  if (req.protocol === "https") return true;

  const forwardedProto = req.headers?.["x-forwarded-proto"];
  if (!forwardedProto) return false;

  const protoList = Array.isArray(forwardedProto)
    ? forwardedProto
    : forwardedProto.split(",");

  return protoList.some(proto => proto.trim().toLowerCase() === "https");
}

export function getSessionCookieOptions(
  req: SessionCookieRequest
): SessionCookieOptions {
  const secure = isSecureRequest(req);
  return {
    httpOnly: true,
    path: "/",
    sameSite: secure ? "none" : "lax",
    secure,
  };
}
