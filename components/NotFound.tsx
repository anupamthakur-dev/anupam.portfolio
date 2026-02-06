import { NavLink } from "react-router";

export default function NotFound(){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <NavLink to="/" className="text-primary hover:underline">
            Return Home
          </NavLink>
        </div>
      </div>
    );
}