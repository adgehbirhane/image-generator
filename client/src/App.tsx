import { useState, ChangeEvent, FormEvent } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setImageUrl(data[0].url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Adgeh Image Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a description"
          value={prompt}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrompt(e.target.value)
          }
        />
        <button type="submit">Generate Image</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
}

export default App;
