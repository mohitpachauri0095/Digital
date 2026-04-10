const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI();
async function run() {
  try {
    const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: "Hello",
    });
    console.log("Success:", res.text);
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
