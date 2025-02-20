import Nav from "./Components/Nav";
import ChatArea from "./Components/ChatArea";
import TextProvider from "./context/TextContext"; // Import the provider

function App() {
  return (
    <TextProvider>
      {/* Wrap the app in TextProvider */}
      <div className="flex flex-col md:flex-row justify-between h-screen bg-gray-600">
        <Nav />
        <ChatArea />
      </div>
    </TextProvider>
  );
}

export default App;
