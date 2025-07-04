import React, { useState } from "react";

const HerbalTreatment = () => {
  const [symptom, setSymptom] = useState("");
  const [herbs, setHerbs] = useState([]);

  // Symptom-to-Herb mapping
  const treatmentData = {
    fever: [
      {
        name: "🌿 Neem",
         
        usedFor: "Reduces body temperature and fights infection",
        preparation: "Boil neem leaves in water and drink as tea",
        dosage: "Twice daily after meals",
      },
      {
        name: "🍃 Tulsi",
        usedFor: "Boosts immunity and relieves fever symptoms",
        preparation: "Boil with ginger and black pepper",
        dosage: "Once in the morning",
      },
      {
        name: "🌱 Giloy",
        usedFor: "Boosts immunity and helps with fever",
        preparation: "Boil stem and drink water",
        dosage: "Once in morning",
      },
    ],
    cough: [
      {
        name: "🍯 Honey",
        usedFor: "Soothes throat and reduces coughing",
        preparation: "Take with warm water or ginger juice",
        dosage: "One teaspoon, 2–3 times a day",
      },
      {
        name: "🍃 Tulsi",
        usedFor: "Clears mucus and eases breathing",
        preparation: "Boil leaves and inhale steam or drink as tea",
        dosage: "Twice daily",
      },
    ],
    headache: [
      {
        name: "🌿 Peppermint",
        usedFor: "Relieves tension and migraine headaches",
        preparation: "Apply peppermint oil to temples",
        dosage: "As needed (topical)",
      },
      {
        name: "🫚 Ginger",
        usedFor: "Reduces inflammation and pain",
        preparation: "Boil ginger slices in water and drink",
        dosage: "Twice daily",
      },
    ],
    cold: [
      {
        name: "🌬️ Eucalyptus",
        usedFor: "Clears nasal congestion and eases breathing",
        preparation: "Inhale steam with eucalyptus oil",
        dosage: "2–3 times daily",
      },
      {
        name: "🌿 Basil",
        usedFor: "Boosts immunity and reduces cold symptoms",
        preparation: "Boil leaves in water and drink",
        dosage: "Twice daily",
      },
      {
        name: " 🍃 Tulsi",
        usedFor: "Clears mucus and eases breathing",
        preparation: "Boil leaves and inhale steam or drink as tea",
        dosage: "Twice daily",
      },
    ],
    stress: [
      {
        name: "🧘🌿Ashwagandha",
        usedFor: "Reduces stress and anxiety",
        preparation: "Take as capsule or powder with milk",
        dosage: "One capsule/powder daily",
      },
      {
        name: "🌼 Chamomile",
        usedFor: "Promotes calmness and sleep",
        preparation: "Drink chamomile tea before bed",
        dosage: "Once at night",
      },
    ],
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedHerbs = treatmentData[symptom.toLowerCase()];
    setHerbs(matchedHerbs || []);
  };

  return (
    <div className="p-8 text-green-800">
      <h1 className="text-3xl font-bold mb-6">Herbal Treatment</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col sm:flex-row items-center">
        <input
          type="text"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          placeholder="Enter your symptom (e.g., fever)"
          className="border border-green-500 rounded p-2 w-full sm:w-64 mb-4 sm:mb-0 sm:mr-4"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </form>

      {herbs.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Suggested Herbs</h2>
          {herbs.map((herb, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-green-300 rounded shadow-sm bg-green-50"
            >
              <h3 className="text-xl font-semibold text-green-700">{herb.name}</h3>
              <p><strong>Used for:</strong> {herb.usedFor}</p>
              <p><strong>Preparation:</strong> {herb.preparation}</p>
              <p><strong>Dosage:</strong> {herb.dosage}</p>
            </div>
          ))}
        </div>
      ) : (
        symptom && (
          <p className="text-red-600">No herbs found for symptom: "{symptom}"</p>
        )
      )}
    </div>
  );
};

export default HerbalTreatment;
