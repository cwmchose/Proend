import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";

const APP_ID = "data-wlxyk";

// Creating a Realm App Instance
const app = new App(APP_ID);

// Creating a user context to manage and access all the user related functions
// across different component and pages.
export const UserContext = createContext();

// Create an anonymous credential

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = async () => {
    const credentials = Credentials.anonymous();
    const u = await app.logIn(credentials);
    setUser(u);
  };

  // Function to fetch-user(if the user is already logged in) from local storage
  const fetchUser = async () => {
    if (!app.currentUser) return false;
    await app.currentUser.refreshCustomData();
    // Now if we have a user we are setting it to our user context
    // so that we can use it in our app across different components.
    setUser(app.currentUser);
    return app.currentUser;
  };

  // Function to logout user from our Realm
  const logOutUser = async () => {
    if (!app.currentUser) return false;
    await app.currentUser.logOut();
    // Setting the user to null once loggedOut.
    setUser(null);
    return true;
  };

  if (!fetchUser()) {
    createUser();
  }

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        setUser,
        fetchUser,
        logOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
