import React, { useContext } from "react";
import { Theme } from "./ContextDemo";

const ChildB = () => {
  const theme = useContext(Theme);
  return (
    <div>
      <h3>ChildB</h3>
      <p>Current theme is {theme}</p>
    </div>
  );
};

export default ChildB;

// React context allows us to pass down and use (consume) data in whatever component we need in our React app without using props.

// React context is great when you are passing data that can be used in any component in your application.

// These types of data include:
// * Theme data (like dark or light mode)
// * User data (the currently authenticated user)
// * Location-specific data (like user language or locale)

// Data should be placed on React context that does not need to be updated often.

// Why? Because context was not made as an entire state management system. It was made to make consuming data easier.

// Context is an API that is built into React, starting from React version 16.
// This means that we can create and use context directly by importing React in any React project.
// 1. Create context using the createContext method.
// 2. Take your created context and wrap the context provider around your component tree.
// 3. Put any value you like on your context provider using the value prop.
// 4. Read that value within any component by using the context consumer.
