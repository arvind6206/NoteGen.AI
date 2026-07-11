import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-6">

      <h1 className="text-2xl font-bold text-blue-600 mb-8">
        NoteGen AI
      </h1>

      <div className="space-y-4">

        <Link
          to="/dashboard"
          className="block rounded-lg p-3 hover:bg-blue-100"
        >
          Home
        </Link>

        <Link
          to="/dashboard/notes"
          className="block rounded-lg p-3 hover:bg-blue-100"
        >
          My Notes
        </Link>

      </div>

    </div>
  );
}