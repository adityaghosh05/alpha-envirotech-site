export function GET(request: Request) {
  return Response.redirect(new URL('/about/#leadership', request.url), 301);
}

export const HEAD = GET;
