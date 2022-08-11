import { isEmpty } from "lodash";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { useRouter } from "next/router";

const useNavigateUserBack = () => {
  const navigate = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { user, isLoading } = useContext(UserContext);


  useEffect(() => {
    if (isEmpty(user) && !isLoading) {
      navigate.push("/sign-up");
    }
    setIsMounted(true);

    return function cleanup() {
      setIsMounted(false);
    };
  }, [navigate, user, isLoading]);

  return {
    isMounted,
  };
};

export default useNavigateUserBack;
