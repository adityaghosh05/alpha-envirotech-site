export function GET(request: Request) {
  return Response.redirect(
    new URL('/contact/#project-inquiry', request.url),
    301,
  );
}

export const HEAD = GET;
