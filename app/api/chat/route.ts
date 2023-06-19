// ./app/api/chat/route.ts
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { createTable, getAll, insert } from "@/lib/queries";
import { RoleType } from "@/ts-types";
import { NextResponse } from "next/server";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  console.log("create table");
  await createTable();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: messages.map((message: any) => ({
      content: message.content,
      role: message.role,
    })),
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onStart: async () => {
      // This callback is called when the stream starts
      // You can use this to save the prompt to your database
      if (messages.length > 0) {
        let lastMessageContent = messages[messages.length - 1].content;
        const resp = await insert({
          role: RoleType.user,
          text: lastMessageContent,
        });
      }
    },
    onCompletion: async (asistantResponse: string) => {
      // This callback is called when the stream completes
      // You can use this to save the final completion to your database
      const resp = await insert({
        role: RoleType.assistant,
        text: asistantResponse,
      });
    },
  });

  return new StreamingTextResponse(stream);
}

export async function GET(req: Request) {
  const resp = await getAll();

  return NextResponse.json(resp?.rows || [], { status: 200 });
}
