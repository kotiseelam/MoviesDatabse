import Link from "next/link";
export default function HomePage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Movie Database</h1>
        <nav>
          <Link to="/" className="text-gray-400 hover:text-white px-4">Home</Link>
          <Link to="/movies" className="text-gray-400 hover:text-white px-4">Movies</Link>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Movie Database</h2>
        <p className="text-lg text-gray-300 mb-6">
          Manage your favorite movies with ease! Add, edit, and delete movie entries to build your own personalized database.
        </p>
        <div className="mt-6">
          <Link
            to="/movies"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-md"
          >
            Explore Movies
          </Link>
        </div>
      </div>

      <footer className="mt-16 text-center text-gray-500">
        <p>© 2023 Movie Database | Contact: <a href="mailto:support@moviedatabase.com" className="underline">support@moviedatabase.com</a></p>
      </footer>
    </div>
  );
}
