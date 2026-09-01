export function GET(request: Request) {
  return Response.redirect(new URL('/experience/', request.url), 301);
}

export const HEAD = GET;
