export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4">
          Welcome to Trello Clone
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Organize tasks, collaborate with your team, and boost productivity —
          all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-50 transition"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}
