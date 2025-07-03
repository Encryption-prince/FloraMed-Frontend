import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { CheckCircle } from "lucide-react";
"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyA8_1LBdhfFkzEXqq4rOtfTvEjkejzR06k",
});
const star = "*";

const herbalFacts = [
  "Aloe Vera gel contains over 75 active ingredients including vitamins, enzymes, and amino acids.",
  "Turmeric contains curcumin, a powerful anti-inflammatory compound.",
  "Peppermint is not just refreshing but also helps relieve indigestion and headaches.",
  "Ashwagandha is known as Indian Ginseng and is used to manage stress and anxiety.",
  "Neem leaves are used in Ayurvedic medicine for their anti-bacterial and skin-healing properties.",
  "Holy Basil (Tulsi) emits ozone and purifies the air around it—revered as a sacred plant in India.",
  "Ginger contains gingerol, a bioactive compound with powerful antioxidant and anti-inflammatory effects.",
  "Moringa leaves have 7 times more vitamin C than oranges and 15 times more potassium than bananas.",
  "Licorice root can soothe the stomach and is used to treat ulcers and respiratory problems.",
  "Echinacea is widely used to boost the immune system and reduce the duration of colds.",
  "Fenugreek seeds can help regulate blood sugar and increase breast milk production in lactating mothers.",
  "Ginseng boosts brain function, fights fatigue, and may improve sexual performance.",
  "Lavender not only promotes relaxation but also has antimicrobial properties for skin health.",
  "Cinnamon contains cinnamaldehyde, which may reduce the risk of heart disease and has anti-diabetic effects.",
  "Gotu Kola is called the 'herb of longevity' in Chinese and Ayurvedic medicine for enhancing memory and healing wounds.",
  "Brahmi (Bacopa monnieri) is traditionally used to enhance cognitive performance and reduce anxiety.",
  "Calendula flowers are edible and their extract promotes wound healing and reduces inflammation.",
  "Dandelion is a natural diuretic and detoxifier that supports liver and kidney function.",
  "Milk Thistle protects the liver and is often used to treat liver cirrhosis and hepatitis.",
  "Hibiscus tea is rich in antioxidants and can help lower blood pressure naturally.",
];

const steps = [
  "Capture or upload a clear image of the herb showing leaves, flowers, or distinctive features",
  "Our botanical AI analyzes the plant morphology against thousands of species",
  "Get detailed information including scientific name, medicinal properties, and growing conditions",
  "Learn about traditional uses and fascinating folklore surrounding the plant",
];

export default function HerbIdentifier() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [fact, setFact] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setResult("");

    try {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64ImageFile = reader.result.split(",")[1];

        const contents = [
          {
            inlineData: {
              mimeType: selectedImage.type,
              data: base64ImageFile,
            },
          },
          {
            text: `Identify the herb or plant shown in the image. Provide the following details in a clean, bullet-point format:
• Common Name
• Scientific Name
• Brief Description
• Key Medicinal Uses (3 to 5 points)
Keep the total response within 200 words. Do not include any extra text outside the bullet points.Use | as delimeter to separate lines or bullets
If No herb or plant is visible in the image then just return the response as No herb or plant is visible in the image.`,
          },
        ];

      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_KEY,
      });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
        });

        const resultText = await response.text;
        setResult(resultText);

        const randomFact =
          herbalFacts[Math.floor(Math.random() * herbalFacts.length)];
        setFact(randomFact);

        setLoading(false);
      };

      reader.readAsDataURL(selectedImage);
    } catch (err) {
      console.error(err);
      setResult("Failed to identify the herb. Please try again.");
      setLoading(false);
    }
  };

  const resultModify = result.replaceAll(star, " ").split("|").join("\n");

  return (
    <>
      
      <div className="bg-[#f6f8ed] border border-[#d2e3c8] shadow rounded-3xl p-4 min-h-screen w-[96vw] mx-auto flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl mx-auto  rounded-2xl p-8 ">
          {/* Header */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#3b5d3b] mb-2 text-center">
            BotanIQ
          </h1>
          <p className="text-center text-[#7ca982] mb-4 italic font-semibold">
            <small>Your Pocket Herbalist, Powered by AI.</small>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-8">
            {/* Left Column: Info & Steps */}
            <div className="flex flex-col items-center text-[#3b5d3b] text-lg space-y-4 w-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5382/5382875.png"
                alt=""
                className="w-16 md:w-20 sm:w-14"
              />
              <p className="font-bold text-center text-3xl md:text-4xl text-[#7ca982] mb-6">
                "Let's Identify Your Herb"
              </p>
              <div className="flex flex-col rounded-lg bg-[#e6f4ea] p-6 shadow-md w-full">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="text-[#7ca982]" size={24} />
                  <h2 className="font-bold text-xl text-[#3b5d3b]">
                    The Identification Process
                  </h2>
                </div>
                <ol className="list-decimal list-inside space-y-3 text-[#3b5d3b] pl-5">
                  {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
              {fact && (
                <div className="mt-6 p-4 bg-[#fffbe6] border-l-4 border-[#ffe066] rounded">
                  <h2 className="font-semibold text-[#b7d7b0] mb-1">
                    🌱 Did you know?
                  </h2>
                  <p className="text-[#3b5d3b] text-sm">{fact}</p>
                </div>
              )}
            </div>

            {/* Right Column: Upload & Result */}
            <div>
              <div className="flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center w-full mb-2 border border-[#d2e3c8]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block text-sm cursor-pointer text-[#3b5d3b] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e6f4ea] file:text-[#7ca982] hover:file:bg-[#b7d7b0] mb-2"
                  />
                  {!previewImage && (
                    <div className="mb-2 rounded-xl w-64 h-72 border-2 border-[#d2e3c8] text-center pt-[10%] text-[#8a958a] bg-[#f6f8ed]">
                      No image selected. Please upload an image of a herb or
                      plant.
                    </div>
                  )}

                  {previewImage && (
                    <div className="mb-2">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="rounded-xl w-64 h-72 object-cover mx-auto border border-[#d2e3c8]"
                      />
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={loading || !selectedImage}
                    className="bg-[#7ca982] hover:bg-[#3b5d3b] text-white font-semibold py-2 px-6 rounded-lg mb-2 transition cursor-pointer"
                  >
                    {loading ? "Identifying..." : "Identify Herb"}
                  </button>
                </div>
              </div>

              {!result && (
                <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-8 min-h-70 font-semibold bg-[#f3f9f4] p-4 rounded-lg border border-[#d2e3c8] text-[#3b5d3b] whitespace-pre-wrap mt-4">
                  <div className="text-left flex flex-col">
                    💡 How to get the best result?
                    <ul className="list-disc list-inside mt-2">
                      <li>
                        Capture the herb in good lighting (preferably daylight).
                      </li>
                      <li>Avoid background clutter or multiple plants.</li>
                      <li>Ensure the image is not blurry or overexposed.</li>
                      <li>Leaf close-ups work better for identification.</li>
                    </ul>
                  </div>
                  <img
                    src="https://i.pinimg.com/originals/08/18/a2/0818a2dfa9859144ebd35dd885226576.gif"
                    alt=""
                    className="w-100 md:w-95 sm:w-80 h-70 md:h-70 sm:h-68"
                  />
                </div>
              )}

              {result && (
                <div className="text-left font-semibold bg-[#e6f4ea] p-4 rounded-lg border border-[#d2e3c8] text-[#3b5d3b] whitespace-pre-wrap mt-4">
                  {/* {result
                    .replaceAll("*", " ")
                    .split("|")
                    .map((line, index) => (
                      <p key={index}>{line}</p>
                    ))} */}

                    <TextGenerateEffect duration={0.2} words={resultModify} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
