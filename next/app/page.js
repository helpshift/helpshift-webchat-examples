import Image from "next/image";
import WebChatOptions from "./webChatOptions";

export default function Home() {
  return (
    <main className="max-w-3xl mt-5">
      <h1 className="text-5xl text-center">Web Chat</h1>
      <WebChatOptions></WebChatOptions>
    </main>
  );
}
