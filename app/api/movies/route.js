import { prisma } from '../../../lib/prisma';

// Handle GET, POST, PUT, DELETE requests
export async function GET() {
  try {
    const movies = await prisma.movie.findMany();
    return new Response(JSON.stringify(movies), { status: 200 });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return new Response('Error fetching movies', { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const movie = await prisma.movie.create({ data });
    return new Response(JSON.stringify(movie), { status: 201 });
  } catch (error) {
    console.error('Error adding movie:', error);
    return new Response('Error adding movie', { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const data = await req.json();
    const movie = await prisma.movie.update({
      where: { id: data.id },
      data: {
        title: data.title,
        actors: data.actors,
        releaseYear: data.releaseYear,
      },
    });
    return new Response(JSON.stringify(movie), { status: 200 });
  } catch (error) {
    console.error('Error updating movie:', error);
    return new Response('Error updating movie', { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await prisma.movie.delete({ where: { id } });
    return new Response('Movie deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Error deleting movie:', error);
    return new Response('Error deleting movie', { status: 500 });
  }
}
