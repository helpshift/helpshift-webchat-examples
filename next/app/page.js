import WebChatOptions from "./webChatOptions";

export default function Home() {
  return (
    <main className="max-w-3xl mt-5">
      <h1 className="text-5xl pl-3">Web Chat</h1>
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-2 my-4 rounded">
        <p>
          This page is created purely for demo purposes and does not contain all
          the Web Chat APIs, options, or events. Please check the
          <a
            href="https://developers.helpshift.com/web-chat/"
            className="text-blue-500 "
            target="_blank"
          > Developer documentation </a>
          for the complete details.
        </p>
      </div>

      {/* @NOTE: By default, component are rendered server-side,
        but to write interactive UI we need to use client components,
        the way we have used below in <WebChatOptions>

        Client Components can use state, effects, and event listeners, meaning they can provide
        immediate feedback to the user and update the UI.
      */}

      <WebChatOptions></WebChatOptions>
    </main>
  );
}
