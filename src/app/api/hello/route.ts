export async function GET() {
  const greeting = 'Hello, world!'
  return Response.json(greeting)
}