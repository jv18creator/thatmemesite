import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../lib/realm/constants";

// Creating a Realm App Instance
const app = new App(APP_ID);

// Creating a user context to manage and access all the user related functions
// across different component and pages.
export const UserContext = createContext({
  user: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
      // Now if we have a user we are setting it to our user context
      // so that we can use it in our app across different components.
      setUser(app.currentUser);
      localStorage.setItem("user", JSON.stringify(app.currentUser));
      return app.currentUser;
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
