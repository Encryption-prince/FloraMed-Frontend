import React, { useState } from "react";
import { FaLeaf, FaExclamationTriangle, FaSearch, FaSpinner } from "react-icons/fa";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Loaded from .env
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const HerbalTreatment = () => {
  const [symptom, setSymptom] = useState("");
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Gemini API call
  const fetchHerbalRemedies = async (symptom) => {
    setLoading(true);
    setError("");
    setHerbs([]);
    try {
      const prompt = `Suggest herbal remedies for the symptom: "${symptom}". For each herb, provide a JSON array with the following fields: name, usedFor, preparation, dosage, and caution (if any). Example output: [{\"name\":\"Neem\",\"usedFor\":\"Reduces fever\",\"preparation\":\"Boil leaves\",\"dosage\":\"Twice daily\",\"caution\":\"Avoid if pregnant\"}]`;
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch from Gemini API");
      }
      const data = await response.json();
      // Try to extract JSON from the response
      let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      // Find the first JSON array in the text
      const match = text.match(/\[.*\]/s);
      if (!match) throw new Error("No herbal remedies found in response");
      const herbsArr = JSON.parse(match[0]);
      setHerbs(Array.isArray(herbsArr) ? herbsArr : []);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symptom.trim()) return;
    setHasSearched(true);
    fetchHerbalRemedies(symptom.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center drop-shadow-lg tracking-tight">
          <FaLeaf className="inline-block mr-2 text-green-600" /> Herbal Treatment
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col sm:flex-row items-center justify-center bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-6 gap-4 border border-green-200"
        >
          <input
            type="text"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder="Enter your symptom (e.g., fever)"
            className="border border-green-400 rounded-lg p-3 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/80 text-green-900 placeholder:text-green-400 text-lg shadow-sm"
            autoFocus
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-7 py-3 rounded-lg font-semibold text-lg shadow-md hover:from-green-600 hover:to-green-800 transition-all duration-200 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaSearch />
            )}
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <div className="flex items-center justify-center mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 font-semibold gap-2">
            <FaExclamationTriangle className="text-xl" /> {error}
          </div>
        )}

        {herbs.length > 0 ? (
          <div className="flex flex-col items-center gap-8 w-full">
            {herbs.map((herb, index) => (
              <div
                key={index}
                className="relative w-full max-w-xl mx-auto p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-green-50 via-white to-green-100 border border-green-100 hover:scale-[1.025] hover:shadow-green-200 transition-all duration-200 group"
                style={{ minWidth: '280px' }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-200 shadow-md rounded-full w-16 h-16 flex items-center justify-center text-4xl text-green-700 border-4 border-white group-hover:bg-green-300 transition-all duration-200">
                  <FaLeaf />
                </div>
                <div className="mt-10">
                  <h3 className="text-2xl font-extrabold text-green-800 mb-4 text-center tracking-tight">
                    {herb.name}
                  </h3>
                  <div className="space-y-3 text-base text-green-900">
                    <p><span className="font-semibold text-green-700">Used for:</span> {herb.usedFor}</p>
                    <p><span className="font-semibold text-green-700">Preparation:</span> {herb.preparation}</p>
                    <p><span className="font-semibold text-green-700">Dosage:</span> {herb.dosage}</p>
                    {herb.caution && (
                      <p className="mt-2 text-yellow-800 font-semibold flex items-center gap-1">
                        <FaExclamationTriangle className="inline-block text-yellow-600" />
                        <span>Caution: {herb.caution}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          hasSearched && symptom && !loading && !error && (
            <div className="flex flex-col items-center justify-center mt-8">
              <FaExclamationTriangle className="text-3xl text-yellow-500 mb-2" />
              <p className="text-lg text-yellow-800 font-semibold">No herbs found for symptom: "{symptom}"</p>
            </div>
          )
        )}
      </div>
      <div className="w-full flex justify-center mt-10">
        <div className="max-w-xl text-center text-sm text-gray-600 bg-white/70 border border-yellow-200 rounded-lg px-6 py-4 shadow-sm">
          <strong>Disclaimer:</strong> These herbal remedies are mere suggestions and are not a substitute for professional medical advice. For serious or persistent conditions, please consult a qualified healthcare provider.
        </div>
      </div>
    </div>
  );
};

export default HerbalTreatment;
