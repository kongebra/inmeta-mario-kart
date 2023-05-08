import { NextResponse } from "next/server";

export const HTTP = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export function BadRequest(obj: Record<string, unknown>) {
  // cannot overwrite statusCode
  const { statusCode: _, ...rest } = obj;

  return NextResponse.json(
    {
      statusCode: HTTP.BAD_REQUEST,
      ...rest,
    },
    {
      status: HTTP.BAD_REQUEST,
      statusText: "Bad request",
    }
  );
}

export function InternalServerError() {
  return NextResponse.json(
    {
      statusCode: HTTP.INTERNAL_SERVER_ERROR,
    },
    {
      status: HTTP.INTERNAL_SERVER_ERROR,
      statusText: "Internal server error",
    }
  );
}

// Creates a response for a "Not Found" error (404 status code)
export function NotFound() {
  return NextResponse.json(
    {
      statusCode: HTTP.NOT_FOUND,
    },
    {
      status: HTTP.NOT_FOUND,
      statusText: "Not found",
    }
  );
}

// Creates a response for an "Unauthorized" error (401 status code)
export function Unauthorized() {
  return NextResponse.json(
    {
      statusCode: HTTP.UNAUTHORIZED,
    },
    {
      status: HTTP.UNAUTHORIZED,
      statusText: "Unauthorized",
    }
  );
}

// Creates a response for a "Forbidden" error (403 status code)
export function Forbidden() {
  return NextResponse.json(
    {
      statusCode: HTTP.FORBIDDEN,
    },
    {
      status: HTTP.FORBIDDEN,
      statusText: "Forbidden",
    }
  );
}

// Creates a response for a "Method Not Allowed" error (405 status code)
export function MethodNotAllowed() {
  return NextResponse.json(
    {
      statusCode: HTTP.METHOD_NOT_ALLOWED,
    },
    {
      status: HTTP.METHOD_NOT_ALLOWED,
      statusText: "Method not allowed",
    }
  );
}

// Creates a response for a "Conflict" error (409 status code)
export function Conflict(obj: Record<string, unknown>) {
  // cannot overwrite statusCode
  const { statusCode: _, ...rest } = obj;

  return NextResponse.json(
    {
      statusCode: HTTP.CONFLICT,
      ...rest,
    },
    {
      status: HTTP.CONFLICT,
      statusText: "Conflict",
    }
  );
}

// Creates a response for a "Service Unavailable" error (503 status code)
export function ServiceUnavailable() {
  return NextResponse.json(
    {
      statusCode: HTTP.SERVICE_UNAVAILABLE,
    },
    {
      status: HTTP.SERVICE_UNAVAILABLE,
      statusText: "Service unavailable",
    }
  );
}
