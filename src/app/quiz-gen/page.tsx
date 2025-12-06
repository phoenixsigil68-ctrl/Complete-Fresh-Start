"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import remarkgfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { AiMessage } from "@/components/AiMessage";

const page = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState("");

  async function getData() {
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: value }),
      });
      const data = await res.json();
      console.log(data);
      setData(data);
    } catch (error) {
      alert("Something went wrong");
      console.error(Error);
    } finally {
      setValue("");
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-dvh p-15 flex-col">
      <AiMessage content={data} />
      <div className="flex justify-center items-center gap-10 w-auto">
        <Input
          placeholder="type topic..."
          value={value}
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
        />
        <Button
          className="w-[300px] rounded-sm bg-black text-white font-bold text-xl"
          onClick={getData}
        >
          Get Info
        </Button>
      </div>
    </div>
  );
};

export default page;
