import axios from "axios";

const fetchAppUser = async (user, fetchedUser) => {
  if (!user) {
    // const fetchedUser = await fetchUser();
    if (fetchedUser) {
      const response = await axios.post(`/api/user`, {
        user: fetchedUser,
      });
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      // Redirecting them once fetched.
      // redirectNow();

      return response.data.user;
    }
  }
};

export default fetchAppUser;
