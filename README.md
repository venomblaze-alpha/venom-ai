# 🚀 Next.js + Groq AI Chat Application

A lightning-fast ⚡ chat interface powered by Groq's API and built with Next.js

![Next Groq](app/opengraph-image.png)

## ✨ Features

- 🧠 Access to powerful LLMs through Groq's API
- 🔄 Real-time chat with multiple model options
- ⏱️ Response time tracking for performance insights
- 📱 Fully responsive design for all devices
- 🌙 Dark mode support for comfortable viewing
- 🤔 "Thinking" states to see model reasoning
- 📋 Easy text copying functionality
- 🔌 Simple integration with Next.js applications

## 🤖 Available Models

- 🦙 Llama 4 Scout (17B 16e)
- 🦙 Llama 3.3 (70B Versatile)
- 🦙 Llama 3.1 (8B Instant)
- 🔮 Llama 3.2 (1B & 3B Preview)
- 🦙 Llama 3 (70B & 8B 8192)
- 🐦 Qwen QWQ (32B)
- 🐦 Qwen 2.5 (32B)
- 👨‍💻 Qwen 2.5 Coder (32B)
- 🌪️ Mistral Saba (24B)
- 🔄 Mixtral (8x7B 32768)
- 💎 Gemma 2 (9B IT)
- 🔍 Deepseek R1 (Qwen 32B & Llama 70B)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- A Groq API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/xeven777/next-groq.git
cd next-groq
```

2. Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:

```
GROQ_API_KEY=your_groq_api_key
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Usage

1. 🔤 Type your message in the input field
2. 🔄 Select your preferred model from the dropdown
3. 🚀 Hit "Send" or press Enter
4. ⏱️ Watch as the AI responds with timing information

## 🧩 Project Structure

```
next-groq/
├── assets/           # Static assets like icons
├── components/       # React components
│   └── Chatbox.tsx   # Main chat interface
├── pages/            # Next.js pages
├── public/           # Public assets
├── styles/           # CSS styles
└── app/              # Next.js App Router
    └── api/          # API routes for Groq integration
```

## 🔧 Customization

You can customize the application by:

- Adding new models to the `models` array in `Chatbox.tsx`
- Modifying the UI theme in your Tailwind configuration
- Adding new prompt suggestions for quick user interactions

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- [Groq](https://groq.com/) for their powerful API
- [Next.js](https://nextjs.org/) for the React framework
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming capabilities
