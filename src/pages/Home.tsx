import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "../components/Button";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 text-gray-800 font-sans">
      <main className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] text-center px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight mb-6">
          Organize, Showcase, and Manage Your Items
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-10">
          A simple and elegant platform to keep track of all your items with
          ease. Start by adding a new item or explore your existing collection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/add">
            <Button
              text={"Add New Item"}
              variant={"primary"}
              icon={<ArrowRight size={20} />}
            />
          </Link>
          <Link to="/view">
            <Button
              text={"View Items"}
              variant={"secondary"}
              icon={<ArrowRight size={20} />}
            ></Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
