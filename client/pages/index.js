
import Head from 'next/head';
// Assuming you have ChatComponent in components directory
import TextToPromptLogoMaker from '../components/TextToPromptLogoMaker'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-50">
    <Head>
      <title>Chatbot Home</title>
      <meta name="description" content="Interactive AI Chatbot" />
    </Head>
  
    <header className="text-center mb-8">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Six Paths Designs Logo Maker</h1>
      <p className="text-xl text-gray-600">Create your Logo with just a Prompt</p>
    </header>
  
    <main className="w-full max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
      <TextToPromptLogoMaker />
    </main>
  </div>
  );
}
