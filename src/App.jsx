import { useState } from "react";
// ShadCN Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
// Lucide Icons
import { ChevronRight, Paperclip, Mic, BotMessageSquare, Moon, Sun } from "lucide-react";
import "./App.css";

function App() {
  // Variable for check app start for remove first dialog
  let [isStarted, setStart] = useState(false);

  // Messages Object
  let [messages, setMessage] = useState([
    {
      id: 1,
      order: 0,
      message: "Hello I'm Armin, How can I help you?",
      fromAI: true,
    },
  ]);

  // Send new message and update state
  function sendMessage(e) {
    e.preventDefault();
    if (!isStarted) setStart(true);
    let AiPromptinput = document.querySelector("#aiprompt");

    setMessage([
      ...messages,
      {
        id: messages[messages.length - 1].id + 1,
        order: messages[messages.length - 1].order + 1,
        message: AiPromptinput.value,
        fromAI: false,
      },
    ]);
    AiPromptinput.value = "";
  }

  // Dark Mode Handler
  let [darkMode, setMode] = useState(false);
  function toggleDarkMode() {
    darkMode == false ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    setMode(!darkMode);
  }

  return (
    <main className="flex items-center justify-center h-[90dvh] drop-shadow-xl">
      <div className=" w-full  h-fit lg:w-1/2 bg-background rounded-xl border border-2 p-4 ">
        <div className="border flex flex-col mb-4 h-96 rounded p-4">
          <ScrollArea className="flex flex-col">
            {!isStarted ? (
              <>
                <div className="flex flex-col items-center space-y-5 h-full">
                  <BotMessageSquare className="w-20 h-20 my-4 text-[hsl(var(--primary))]" />
                  <h1 className="font-bold text-3xl mt-10">Armin.AI Chat Bot</h1>
                  <p className="text-sm px-5 leading-7">This is a user-friendly chatbot application developed with ReactJS, utilizing the ShadCN UI library for a sleek and modern interface.</p>
                  <Button onClick={() => setStart(true)}>Start Chat</Button>
                  <p className="text-zinc-500 text-xs">This project was developed before the Nowruz 1404 holiday :)</p>
                </div>
              </>
            ) : (
              messages.map((message, index) => {
                if (message.fromAI) {
                  return (
                    <div className="w-full">
                      <p key={index} className="p-2 my-2 px-5 text-sm rounded-xl rounded-tl-none w-fit bg-[hsl(var(--muted))]">
                        {message.message}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div className="flex justify-end w-100">
                      <p className="p-2 px-5 my-2 text-sm rounded-xl rounded-br-none self-end text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))]">{message.message}</p>
                    </div>
                  );
                }
              })
            )}
          </ScrollArea>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={toggleDarkMode} className=" px-2" variant="outline">
            {darkMode ? <Sun /> : <Moon />}
          </Button>
          <Button className="px-2" variant="ghost">
            <Mic />
          </Button>
          <Button className="px-2" variant="ghost">
            <Paperclip />
          </Button>
          <form onSubmit={sendMessage} className="flex w-full items-center space-x-3">
            <Input id="aiprompt" required placeholder="Type your message here." />
            <Button>
              <ChevronRight />
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default App;
