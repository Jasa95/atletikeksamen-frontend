import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-6">
      <ul className="flex justify-between">
        <li>
          <NavLink to="/" className="text-white text-lg hover:text-gray-300">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/participants" className="text-white text-lg hover:text-gray-300">
            Participants
          </NavLink>
        </li>
        <li>
          <NavLink to="/disciplines" className="text-white text-lg hover:text-gray-300">
            Disciplines
          </NavLink>
        </li>
        <li>
          <NavLink to="/results" className="text-white text-lg hover:text-gray-300">
            Results
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
