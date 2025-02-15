import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);  // start loading before req
  
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
  
      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
  
      setTimeout(() => {
        setLoading(false); // Stop loading just before navigating
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error("Logout failed", { autoClose: 5000 });
      setLoading(false); // Stop loading if there's an error
    }
  };
  
  

  return (
    <div>
      <Button
        className="px-4 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
        onClick={handleLogout}
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin flex items-center justify-center" />
        ) : (
          "Logout"
        )}
      </Button>
    </div>
  );
};

export default Logout;
