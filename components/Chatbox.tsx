"use client";
import { useChat } from "ai/react";
import Image from "next/image";
import sparkles from "@/assets/Sparkle.svg";
import send from "@/assets/send.svg";
import robo from "@/assets/Robo.svg";
import copy from "@/assets/copy.svg";
import groqpic from "@/assets/groq.jpg";
import Markdown from "react-markdown";
import { memo, useCallback, useEffect, useRef, useState } from "react";

const parseContent = (content: string) => {
  const thinkRegex = /<think>([\s\S]*?)<\/think>/;
  const match = content.match(thinkRegex);
  if (!match) return { think: null, rest: content.trim() };

  const thinkContent = match[1].trim();
  const restContent = content.replace(thinkRegex, "").trim();
  return { think: thinkContent, rest: restContent };
};

const models = [
  {
    value: "meta-llama/llama-4-scout-17b-16e-instruct",
    label: "🦙 Llama 4 Scout - 17B 16e",
  },
  { value: "qwen-qwq-32b", label: "🐦 Qwen QWQ - 32B" },
  { value: "mistral-saba-24b", label: "🌪️ Mistral Saba - 24B" },
  { value: "qwen-2.5-32b", label: "🐦 Qwen 2.5 - 32B" },
  { value: "qwen-2.5-coder-32b", label: "👨‍💻 Qwen 2.5 Coder - 32B" },
  { value: "deepseek-r1-distill-qwen-32b", label: "🔍 Deepseek R1 Qwen - 32B" },
  {
    value: "deepseek-r1-distill-llama-70b",
    label: "🔍 Deepseek R1 Llama - 70B",
  },
  { value: "llama-3.3-70b-versatile", label: "🦙 Llama 3.3 - 70B Versatile" },
  { value: "gemma2-9b-it", label: "💎 Gemma 2 - 9B IT" },
  { value: "llama-3.1-8b-instant", label: "⚡ Llama 3.1 - 8B Instant" },
  { value: "llama-3.2-1b-preview", label: "🔮 Llama 3.2 - 1B Preview" },
  { value: "llama-3.2-3b-preview", label: "🔮 Llama 3.2 - 3B Preview" },
  { value: "llama3-70b-8192", label: "🦙 Llama 3 - 70B 8192" },
  { value: "llama3-8b-8192", label: "🦙 Llama 3 - 8B 8192" },
  { value: "mixtral-8x7b-32768", label: "🔄 Mixtral - 8x7B 32768" },
];

const Chatbox = memo(({ userIp }: { userIp: string }) => {
  const [selectedModel, setSelectedModel] = useState("llama-3.3-70b-versatile");
  const [responseTimes, setResponseTimes] = useState<Record<string, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    error,
  } = useChat({
    body: {
      selectedModel,
    },
    onFinish: (message) => {
      const endTime = Date.now();
      const duration = (endTime - startTimeRef.current) / 1000;
      setResponseTimes((prev) => ({
        ...prev,
        [message.id]: duration,
      }));
    },
  });

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      startTimeRef.current = Date.now();
      originalHandleSubmit(e);
    },
    [originalHandleSubmit]
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      const event = {
        target: { value: suggestion },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      handleInputChange(event);
    },
    [handleInputChange]
  );

  const handleModelChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedModel(event.target.value);
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="flex pb-0.5 h-svh w-full flex-col max-w-5xl mx-auto">
      <div className="flex-1 overflow-y-auto rounded-xl bg-neutral-200 p-4 text-sm leading-6 text-neutral-900 dark:bg-neutral-800/60 dark:text-neutral-300 sm:text-base sm:leading-7 border border-orange-600/20 h-full">
        {messages.length > 0 ? (
          messages.map((m) => {
            const { think, rest } = parseContent(m.content);
            return (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? (
                  <div className="flex flex-row px-2 py-4 sm:px-4">
                    <img
                      alt="user"
                      className="mr-2 flex size-6 md:size-8 rounded-full sm:mr-4"
                      src={getAvatarUrl(userIp)}
                      width={32}
                      height={32}
                    />
                    <div className="flex max-w-3xl items-center">
                      <p>{m.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 flex rounded-xl bg-neutral-50 px-2 py-6 dark:bg-neutral-900 sm:px-4 relative">
                    <Image
                      alt="venom"
                      className="mr-2 flex size-6 md:size-8 rounded-full sm:mr-4"
                      src={groqpic}
                      placeholder="blur"
                      width={32}
                      height={32}
                    />
                    <div className="max-w-3xl rounded-xl markdown-body w-full overflow-x-auto">
                      {think && (
                        <div className="text-sm mb-3 p-3 border rounded-lg bg-stone-100 text-stone-600 dark:bg-stone-900 dark:text-stone-400 border-none">
                          <p className="text-orange-500 animate-pulse p-1">
                            Thinking...
                          </p>
                          <Markdown>{think}</Markdown>
                        </div>
                      )}
                      <Markdown>{rest}</Markdown>
                      {responseTimes[m.id] && (
                        <div className="text-xs text-neutral-500 mt-2">
                          Response time: {responseTimes[m.id].toFixed(3)}s
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      title="copy"
                      className="absolute top-2 right-2 p-1 rounded-full bg-orange-500 dark:bg-neutral-800 transition-all active:scale-95 opacity-50 hover:opacity-75"
                      onClick={() => {
                        navigator.clipboard.writeText(m.content);
                        alert("Copied to clipboard");
                      }}
                    >
                      <Image src={copy} alt="copy" width={19} className="" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-xl md:text-2xl px-2 font-semibold text-center mx-auto text-stone-500 dark:text-stone-400 tracking-wide">
              Start Chatting with
              <br />
              <span className="text-orange-500 text-2xl md:text-4xl">Venom</span>
              .AI Now!
            </p>
            <Image
              src={robo}
              id="pic"
              alt="ROBO"
              width={300}
              className="hover:scale-110 mt-6 transition-all duration-500 active:scale-95"
            />
          </div>
        )}
        {isLoading && (
          <div className="flex items-center gap-2 px-10">
            <Image
              src={sparkles}
              alt="Loading"
              width={22}
              className="animate-pulse"
            />
            <span className="bg-linear-to-r bg-[length:200%_200%] animate-bg-pan from-gray-700/40 to-gray-700/40 via-gray-200 bg-clip-text text-transparent">
              Generating...
            </span>
          </div>
        )}
        {error && (
          <p className="text-red-500">Something went wrong! Try Again</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Prompt suggestions */}
      <div className="mt-2 flex w-full gap-x-2 overflow-x-auto whitespace-nowrap text-xs text-neutral-600 dark:text-neutral-300 sm:text-sm scrollbar-hide shrink-0">
        <label htmlFor="model-select" className="sr-only">
          Select Model
        </label>
        <select
          id="model-select"
          className="block w-full min-w-44 rounded-xl border-none bg-neutral-200 p-4 text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:ring-orange-500 sm:text-base"
          value={selectedModel}
          onChange={handleModelChange}
        >
          {models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>

        <button
          title="btn"
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg hover:bg-linear-to-br from-orange-600 to-rose-600 p-2 hover:text-white transition-all active:scale-105 border border-orange-600 font-semibold"
        >
          Generate Image ✨
        </button>

        <button
          title="btn"
          type="button"
          onClick={() => handleSuggestionClick("Make it Shorter and simpler.")}
          className="rounded-lg bg-neutral-200 p-2 hover:bg-orange-600 hover:text-neutral-200 dark:bg-neutral-800 dark:hover:bg-orange-600 dark:hover:text-neutral-50 transition-all active:scale-105"
        >
          Make Shorter
        </button>
        <button
          type="button"
          title="btn"
          onClick={() =>
            handleSuggestionClick("Make it longer. explain it nicely")
          }
          className="rounded-lg bg-neutral-200 p-2 hover:bg-orange-600 hover:text-neutral-200 dark:bg-neutral-800 dark:hover:bg-orange-600 dark:hover:text-neutral-50 transition-all active:scale-105"
        >
          Make longer
        </button>
        <button
          type="button"
          title="btn"
          onClick={() =>
            handleSuggestionClick("Write it in a more professional tone.")
          }
          className="rounded-lg bg-neutral-200 p-2 hover:bg-orange-600 hover:text-neutral-200 dark:bg-neutral-800 dark:hover:bg-orange-600 dark:hover:text-neutral-50 transition-all active:scale-105"
        >
          More professional
        </button>
        <button
          type="button"
          title="btn"
          onClick={() =>
            handleSuggestionClick("Write it in a more casual and light tone.")
          }
          className="rounded-lg bg-neutral-200 p-2 hover:bg-orange-600 hover:text-neutral-200 dark:bg-neutral-800 dark:hover:bg-orange-600 dark:hover:text-neutral-50 transition-all active:scale-105"
        >
          More casual
        </button>
        <button
          title="btn"
          type="button"
          onClick={() => handleSuggestionClick("Paraphrase it")}
          className="rounded-lg bg-neutral-200 p-2 hover:bg-orange-600 hover:text-neutral-200 dark:bg-neutral-800 dark:hover:bg-orange-600 dark:hover:text-neutral-50 transition-all active:scale-105"
        >
          Paraphrase
        </button>
      </div>

      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            id="chat-input"
            className="block caret-orange-600 w-full rounded-xl border-none bg-neutral-200 p-4 pl-2 pr-20 text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500 dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-orange-500 sm:text-base resize-y"
            placeholder="Enter your prompt"
            rows={1}
            value={input}
            required
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            title="submit"
            type="submit"
            disabled={isLoading}
            className="absolute bottom-2 right-2.5 rounded-lg px-4 py-2 text-sm font-medium text-neutral-200 focus:outline-hidden focus:ring-4 focus:ring-orange-300 bg-orange-600 hover:bg-orange-700 dark:focus:ring-orange-800 sm:text-base flex items-center gap-2 active:scale-95 transition-all"
          >
            {isLoading ? (
              <>
                Generating
                <Image src={sparkles} alt="#" width={22} className="animate-pulse" />
              </>
            ) : (
              <>
                Send <Image src={send} alt="" width={20} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* COMING SOON MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 transition-all">
          <div className="relative w-[90%] max-w-md rounded-2xl bg-neutral-800 text-white shadow-2xl p-8 border border-orange-600 text-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-orange-400 hover:text-orange-200 text-xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-orange-400 animate-pulse mb-2">
              🚧 Coming Soon 🚧
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base">
              The Image Generator is cooking up something awesome.<br />
              Hang tight, magic is on the way! ✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

function getAvatarUrl(ip: string): string {
  const encodedIp = encodeURIComponent(ip);
  return `https://xvatar.vercel.app/api/avatar/${encodedIp}?rounded=120&size=240&userLogo=true`;
}

export default Chatbox;
