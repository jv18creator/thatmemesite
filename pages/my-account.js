import React from "react";
import GlobalNavigation from "../components/Globals/Navbar/GlobalNavigation";
import useNavigateUserBack from "../hooks/auth/useNavigateUserBack";

const MyAccountPage = () => {
  const { isMounted } = useNavigateUserBack();

  if (!isMounted) return;

  return (
    <>
      <GlobalNavigation />
    </>
  );
};

export default MyAccountPage;
