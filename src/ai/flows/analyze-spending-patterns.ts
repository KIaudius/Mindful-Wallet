// 'use server';
/**
 * @fileOverview AI-powered tool that analyzes spending patterns to provide personalized insights and recommendations.
 *
 * - analyzeSpendingPatterns - A function that handles the spending analysis process.
 * - AnalyzeSpendingPatternsInput - The input type for the analyzeSpendingPatterns function.
 * - AnalyzeSpendingPatternsOutput - The return type for the analyzeSpendingPatterns function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSpendingPatternsInputSchema = z.object({
  spendingData: z
    .string()
    .describe(
      'A JSON string containing the user spending data. Each entry should have category, amount, and date fields.'
    ),
  userGoals: z.string().describe('A description of the user\u0027s financial goals.'),
});
export type AnalyzeSpendingPatternsInput = z.infer<typeof AnalyzeSpendingPatternsInputSchema>;

const AnalyzeSpendingPatternsOutputSchema = z.object({
  summary: z.string().describe('A summary of the user\u0027s spending patterns.'),
  insights: z.array(z.string()).describe('Personalized insights based on spending data.'),
  recommendations: z
    .array(z.string())
    .describe('Specific recommendations to improve mindful spending habits.'),
});
export type AnalyzeSpendingPatternsOutput = z.infer<typeof AnalyzeSpendingPatternsOutputSchema>;

export async function analyzeSpendingPatterns(input: AnalyzeSpendingPatternsInput): Promise<AnalyzeSpendingPatternsOutput> {
  return analyzeSpendingPatternsFlow(input);
}

const analyzeSpendingPatternsPrompt = ai.definePrompt({
  name: 'analyzeSpendingPatternsPrompt',
  input: {schema: AnalyzeSpendingPatternsInputSchema},
  output: {schema: AnalyzeSpendingPatternsOutputSchema},
  prompt: `You are a financial advisor specializing in mindful spending.

Analyze the user's spending data and provide a summary, personalized insights, and recommendations to improve their mindful spending habits.

User Goals: {{{userGoals}}}

Spending Data: {{{spendingData}}}

Respond in JSON format.`,
});

const analyzeSpendingPatternsFlow = ai.defineFlow(
  {
    name: 'analyzeSpendingPatternsFlow',
    inputSchema: AnalyzeSpendingPatternsInputSchema,
    outputSchema: AnalyzeSpendingPatternsOutputSchema,
  },
  async input => {
    try {
      const {output} = await analyzeSpendingPatternsPrompt(input);
      return output!;
    } catch (error) {
      console.error('Error in analyzeSpendingPatternsFlow:', error);
      throw error;
    }
  }
);
