import { roles } from "@/constants";
import useQueryParam from "@/hooks/useQueryParam";
import { useGetUSerMeQuery } from "@/integration";
import { ProfileUI } from "@/page-ui";
import { useStorage } from "@/utils";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { data: user, refetch, isError } = useGetUSerMeQuery({});

  const [token] = useQueryParam("token", "");

  useEffect(() => {
    if (token) {
      useStorage.setCredentials({ token });
      refetch();
      console.log("referetch");
    }

    if (!useStorage.getTokens().accessToken || isError) {
      useStorage.removeCredentials();
      localStorage.removeItem("userId");
      localStorage.removeItem("bakerRoom");
      navigate("/login");
      return;
    }

    if (user && user?.role !== roles.PARKASH) {
      toast.error("bu ilova siz uchun emas");
      useStorage.removeCredentials();
      localStorage.removeItem("userId");
      localStorage.removeItem("bakerRoom");
      navigate("/login");
    } else if (user?.bakerRoom) {
      navigate("/");
    }
  }, [isError, user, token, navigate, refetch]);

  return (
    <div>
      <Toaster />

      <ProfileUI />
    </div>
  );
};

export default Profile;
