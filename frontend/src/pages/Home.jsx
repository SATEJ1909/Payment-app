import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="bg-gray-900 h-screen flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-96 text-center p-6 h-max px-6 shadow-lg">
              <h1 className="text-3xl font-semibold text-black mb-2">Welcome to PayMate</h1>
              <p className="text-gray-700 text-sm mb-6">
                Send money instantly and securely. Start now!
              </p>
    
              <div className="flex flex-col gap-4">
                <Link to="/signin">
                  <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-full bg-white text-black border border-black py-2 rounded-md hover:bg-gray-100 transition">
                    Sign Up
                  </button>
                </Link>
              </div>
    
              <div className="mt-6 text-sm text-gray-500">
                Trusted. Simple. Secure.
              </div>
            </div>
          </div>
        </div>
      );
};


