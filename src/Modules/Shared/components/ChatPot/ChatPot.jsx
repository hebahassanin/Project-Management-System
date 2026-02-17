import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { BsChatDotsFill, BsX } from "react-icons/bs";


function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "hi 👋، How Can I help You" }
  ]);
  const [input, setInput] = useState("");

  const botResponses = [
    {
      keywords: ["website", "web", "pms"],
      answer: (
        <>
          This is a PMS website <br />
          that shows users, tasks,<br />
          and projects for employees.
        </>
      )
    },
    {
      keywords: ["access", "account", "another"],
      answer: (
        <>
          No, users cannot access other accounts.<br />
          Only the Manager can.
        </>
      )
    },
    {
      keywords: ["team", "who", "built", "developer"],
      answer: (
        <>
          A7la Team Kda Kda 😎 <br />
          (Mayada 💜, Heba 😻, Lamiaa, Eqbal)
        </>
      )
    }
  ];

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const lowerInput = input.toLowerCase();

    let botAnswer = "Sorry, I didn't understand your question 🤔";

    for (let item of botResponses) {
      if (item.keywords.some(k => lowerInput.includes(k))) {
        botAnswer = item.answer;
        break;
      }
    }

    setMessages([...messages, userMessage, { sender: "bot", text: botAnswer }]);
    setInput("");
  };

  return (
    <>
      {/* Floating Icon */}
      {!open && (
        <button className="chat-float-btn" onClick={() => setOpen(true)}>
          <BsChatDotsFill size={24} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="chat-window">
          <Card className="h-100 bg-dark text-white">
            <Card.Header className="bg-secondary d-flex justify-content-between align-items-center">
              <span>ChatBot</span>
              <BsX
                size={22}
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(false)}
              />
            </Card.Header>

            <Card.Body className="chat-body">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 text-${
                    msg.sender === "user" ? "end" : "start"
                  }`}
                >
                  <span
                    className={`badge ${
                      msg.sender === "user"
                        ? "bg-info"
                        : "bg-primary"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </Card.Body>

            <Card.Footer>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="Send your message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button
                  variant="secondary"
                  className="mt-2 w-100"
                  onClick={sendMessage}
                >
                  Send
                </Button>
              </Form>
            </Card.Footer>
          </Card>
        </div>
      )}
    </>
  );
}

export default ChatBot;
