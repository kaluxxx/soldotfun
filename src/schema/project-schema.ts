import z from 'zod';

export const projectSchema = z.object({
    userId: z.number().describe("Dev"),
    name: z.string(),
    ticker: z.string(),
    image: z.string(),
    description: z.string(),
    initialMarketCap: z.string(),
    initialSupply: z.string(),
});
