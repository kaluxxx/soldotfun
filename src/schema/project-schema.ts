import z from 'zod';

export const projectSchema = z.object({
    name: z.string(),
    ticker: z.string(),
    image: z.string(),
    description: z.string(),
    initialMarketCap: z.string(),
    initialSupply: z.string(),
    userId: z.number().describe("Dev"),
});
