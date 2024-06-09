"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [time, setTime] = useState(5);
  const [count, setCount] = useState(0);
  const [crash, setCrash] = useState(0);
  const [isCrashed, setIsCrashed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCrashValue();
    };
    fetchData();
  }, []);

  const fetchCrashValue = async () => {
    try {
      const response = await axios.get("http://localhost:3001/crash/newRound");
      setCrash(response.data);
    } catch (error) {
      console.error("Error fetching crash value:", error);
    }
  };

  useEffect(() => {
    console.log(crash)
    if (count < crash) {
      const interval = setInterval(() => {
        setCount(prevCount => {
          const newCount = prevCount + 0.01;
          if (newCount >= crash) {
            clearInterval(interval);
            setIsCrashed(true);
            return crash;
          }
          return newCount;
        });
      }, 10);
  
      return () => clearInterval(interval);
    }
  }, [count, crash]);
  

  return (
    <main className="flex items-center place-content-center w-full h-screen">
      <div className="flex text-4xl">
        <p className={isCrashed ? "text-red-500" : ""}>{count.toFixed(2)}</p>
      </div>
    </main>
  );
}
