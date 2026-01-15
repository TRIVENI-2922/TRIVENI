import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Initialize Gemini
// Note: In a real production app, you would likely proxy this through your own backend 
// to avoid exposing the key, or use very strict quotas.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  /**
   * Generates a "Today's Market Analysis" or "Price Justification" 
   * based on the current list of products and their prices.
   */
  generateDailyMarketReport: async (products: Product[]): Promise<string> => {
    try {
      const productSummary = products.map(p => 
        `${p.name}: ${p.variants.map(v => `Rs.${v.price}/${v.unit}`).join(', ')}`
      ).join('\n');

      const prompt = `
        You are an expert fruit market analyst for "Triveni Renuka Wholesale Fruit Shop" in Khammam.
        Based on the following product list and prices, generate a short, engaging daily market update (max 100 words).
        Highlight seasonal specials (like Mangoes or Apples) and mention that wholesale prices are best in town.
        Use an enthusiastic tone suitable for shopkeepers and retail customers.

        Products:
        ${productSummary}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text || "Fresh fruits available daily at best prices!";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Welcome to Triveni Renuka Fruit Shop! Check out our fresh arrivals today.";
    }
  },

  /**
   * Generates a short, SEO-friendly description for a product.
   */
  generateProductDescription: async (productName: string): Promise<string> => {
    try {
      const prompt = `Write a 1-sentence mouth-watering description for "${productName}" to be used on a fruit shop website. Mention freshness and taste.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text || `Fresh and delicious ${productName}.`;
    } catch (error) {
      return `Fresh ${productName} available now.`;
    }
  }
};
