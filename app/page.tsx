"use client";

// import { seed } from "@/lib/seed";
// import { sql } from "@vercel/postgres";
import { useChat, Message } from "ai/react";
import { useEffect, useState } from "react";

export default function Chat() {
  // let data;
  // let startTime = Date.now();
  // try {
  //   data = await sql`SELECT * FROM users`;
  // } catch (e: any) {
  //   if (e.message === `relation "users" does not exist`) {
  //     console.log(
  //       "Table does not exist, creating and seeding it with dummy data now..."
  //     );
  //     // Table is not created yet
  //     await seed();
  //     startTime = Date.now();
  //     data = await sql`SELECT * FROM users`;
  //   } else {
  //     throw e;
  //   }
  //  }

  const [initialMessages, setInitalMessages] = useState<Message[]>([]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages,
  });

  // console.log("data --->", data);
  console.log("messages ===>", JSON.stringify(messages));
  console.log("messages 2 ===>", JSON.stringify(messages, null, 2));

  useEffect(() => {
    setTimeout(() => {
      setInitalMessages([
        {
          content: "where does the word emerging come from?",
          role: "user",
          id: "eudc3Qh",
        },
        {
          id: "dCq3JPi",
          content:
            'The word "emerging" comes from the Old French word "emerger" which means "to rise up, emerge." It is derived from the Latin word "emergere" which means "to rise out or up."',
          role: "assistant",
        },
        {
          content: "what century would that come from?",
          role: "user",
          id: "4sk2zmK",
        },
        {
          id: "zBSUKZD",

          content:
            'The word "emerging" comes from the Old French word "emerger," which was in use from the 12th to the 15th century. The Latin word from which it is derived, "emergere," dates back to ancient times.',
          role: "assistant",
        },
        {
          content: "gracias amigo~",
          role: "user",

          id: "6aC6f2T",
        },
        {
          id: "idrwElv",

          content: "¡De nada!",
          role: "assistant",
        },
      ]);
    }, 1_000);
  }, []);

  return (
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
  );
}
