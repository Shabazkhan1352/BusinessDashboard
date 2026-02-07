export async function generateInsights({ revenue, orders, products }) {
  if (!process.env.GROQ_API_KEY) {
    return `This month shows ${orders} total orders with revenue of $${revenue}. Top recommendation: review stock levels for your ${products} products and optimize the best selling categories.`;
  }

  const prompt = `You are a business analyst. Use this dashboard data and write 3 concise insights:\n- Orders: ${orders}\n- Revenue: ${revenue}\n- Products: ${products}`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate insights from Groq");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No insights generated";
}
