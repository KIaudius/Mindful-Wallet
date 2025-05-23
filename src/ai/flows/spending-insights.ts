// 'use server';
/**
 * @fileOverview AI-powered tool that analyzes spending patterns to provide personalized insights and recommendations.
 *
 * - getSpendingInsights - A function that handles the spending insights process.
 * - SpendingInsightsInput - The input type for the getSpendingInsights function.
 * - SpendingInsightsOutput - The return type for the getSpendingInsights function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpendingInsightsInputSchema = z.object({
  spendingData: z
    .string()
    .describe(
      'A JSON string containing the user spending data. Each entry should have category, amount, and date fields.'
    ),
  userGoals: z.string().describe('A description of the user\u0027s financial goals.'),
});
export type SpendingInsightsInput = z.infer<typeof SpendingInsightsInputSchema>;

const SpendingInsightsOutputSchema = z.object({
  summary: z.string().describe('A summary of the user\u0027s spending patterns.'),
  insights: z.array(z.string()).describe('Personalized insights based on spending data.'),
  recommendations: z
    .array(z.string())
    .describe('Specific recommendations to improve mindful spending habits.'),
});
export type SpendingInsightsOutput = z.infer<typeof SpendingInsightsOutputSchema>;

export async function getSpendingInsights(input: SpendingInsightsInput): Promise<SpendingInsightsOutput> {
  return spendingInsightsFlow(input);
}

const spendingInsightsPrompt = ai.definePrompt({
  name: 'spendingInsightsPrompt',
  input: {schema: SpendingInsightsInputSchema},
  output: {schema: SpendingInsightsOutputSchema},
  prompt: `You are a financial advisor specializing in mindful spending.

Analyze the user's spending data and provide a summary, personalized insights, and recommendations to improve their mindful spending habits.

User Goals: {{{userGoals}}}

Spending Data: {{{spendingData}}}

Respond in JSON format.`,
});

const spendingInsightsFlow = ai.defineFlow(
  {
    name: 'spendingInsightsFlow',
    inputSchema: SpendingInsightsInputSchema,
    outputSchema: SpendingInsightsOutputSchema,
  },
  async input => {
    try {
      const {output} = await spendingInsightsPrompt(input);
      return output!;
    } catch (error) {
      console.error('Error in spendingInsightsFlow:', error);
      throw error;
    }
  }
);
