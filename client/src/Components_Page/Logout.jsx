import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import useAuthStore from "../store/authStore"; // Import auth store

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { logout } = useAuthStore(); // Correctly extract logout function

  const handleLogout = async () => {
    setLoading(true); // Show spinner immediately
  
    try {
      await logout(); // Call logout function
  
      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
  
      // Keep spinner visible for at least 1.5 seconds before navigating
      setTimeout(() => {
        navigate("/login");
        setLoading(false);
      }, 1500);
    } catch (error) {
      toast.error(`Logout failed. Please try again. ${error.message}`, { autoClose: 5000 });
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Button
        className="px-4 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
        onClick={handleLogout}
        disabled={loading}
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
