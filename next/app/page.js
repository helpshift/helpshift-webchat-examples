import WebChatOptions from "./webChatOptions";

export default function Home() {
  return (
    <main className="max-w-3xl mt-5">
      <h1 className="text-5xl text-center">Web Chat</h1>

      {/* @NOTE: By default it is a server component,
        but to write interactive UI we have to use client component,
        as we have used below <WebChatOptions>

        Client Components can use state, effects, and event listeners, meaning they can provide
        immediate feedback to the user and update the UI.
      */}

      <WebChatOptions></WebChatOptions>
    </main>
  );
}
