import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import clientAuth from "../firebase/clientAuth";

export default function useUser() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    return onAuthStateChanged(clientAuth, (user) => {
      setUser(user);
    });
  }, []);

  return user;
}
