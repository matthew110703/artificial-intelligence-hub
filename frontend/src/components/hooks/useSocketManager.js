import { useState, useEffect, useRef } from "react";
import { Manager } from "socket.io-client";

export default function useSocketManager() {
  const [manager, setManager] = useState(null);
  const managerRef = useRef(null);

  useEffect(() => {
    if (managerRef.current) {
      return;
    }

    let manager;
    manager = new Manager(
      import.meta.env.VITE_SERVER_API || "http://localhost:3000",
      {
        reconnectionDelayMax: 10000,
        reconnectionAttempts: 10,
      },
    );

    managerRef.current = manager;
    setManager(manager);

    return () => {
      if (managerRef.current) {
        managerRef.current = null;
      }
    };
  }, []);

  return manager;
}
