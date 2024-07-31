import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [res, setRes] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8000/").then((response) => {
      console.log("success");
      console.log(response.data);
      setRes(response.data);
    });
  }, []);

  return (
    <main className="flex justify-center items-center">
      <Button variant="outline">{res}</Button>
    </main>
  );
}
