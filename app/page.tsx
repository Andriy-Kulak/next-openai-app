"use client";

import { useChat, Message } from "ai/react";
import { useEffect, useState } from "react";

export default function Chat() {
  const [initialMessages, setInitalMessages] = useState<Message[]>([]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages,
  });

  const getAllMessages = async () => {
    const resp = await fetch("/api/chat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
    const jsonResp = (await resp.json()) as Message[];

    setInitalMessages(jsonResp);
  };

  const clearHistory = async () => {
    // fetch request for
    await fetch("/api/clear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
    setInitalMessages([]);

    // refershing the page so we clear `messages` history
    window.location.reload();
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <>
      <div className="fixed top-0 right-0 m-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          onClick={clearHistory}
        >
          Clear Data
        </button>
      </div>

      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {messages.length > 0
          ? messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? "User: " : "AI: "}
                {m.content}
              </div>
            ))
          : null}

        <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </>
  );
}
