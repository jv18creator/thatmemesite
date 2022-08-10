import { createContext, useEffect, useState } from "react";
import { App, Credentials } from "realm-web";
import fetchAppUser from "../helpers/fetchAppUser";
import { APP_ID } from "../lib/realm/constants";

// Creating a Realm App Instance
const app = new App(APP_ID);

// fetching user from localStorage
const localUser = null;
// typeof window !== "undefined" && localStorage?.getItem("user");
// typeof window != "undefined" && localStorage?.getItem("user") throw hydration error
// Creating a user context to manage and access all the user related functions
// across different component and pages.

export const UserContext = createContext({
  user: localUser ? JSON.parse(localUser) : null,
});

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
    setIsLoading(false);
  }, []);

  // Function to login user into our Realm using their email & password
  const emailPasswordLogin = async (email, password) => {
    const credentials = Credentials.emailPassword(email, password);
    const authedUser = await app.logIn(credentials);
    setUser(authedUser);
    return authedUser;
  };

  // Function to signup user into our Realm using their email & password
  const emailPasswordSignup = async (email, password) => {
    try {
      await app.emailPasswordAuth.registerUser(email, password);
      // Since we are automatically confirming our users we are going to login
      // the user using the same credentials once the signup is complete.
      return emailPasswordLogin(email, password);
    } catch (error) {
      throw error;
    }
  };

  // Function to fetch-user(if the user is already logged in) from local storage
  const fetchUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.refreshCustomData();
      const user = await fetchAppUser(user, app.currentUser);
      // Now if we have a user we are setting it to our user context
      // so that we can use it in our app across different components.
      // setUser(app.currentUser);
      // localStorage.setItem("user", JSON.stringify(app.currentUser));
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  // Function to logout user from our Realm
  const logOutUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.logOut();
      // Setting the user to null once loggedOut.
      setUser(null);
      localStorage.removeItem("user");
      return true;
    } catch (error) {
      throw error;
    }
  };

  // Reset User's Password
  const resetUserPassword = async (email) => {
    const response = await app.emailPasswordAuth.sendResetPasswordEmail({
      email,
    });
    return response;
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser,
        fetchUser,
        emailPasswordLogin,
        emailPasswordSignup,
        logOutUser,
        resetUserPassword,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
