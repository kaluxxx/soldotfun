import z from 'zod';

export const createProjectSchema = z.object({
    name: z.string(),
    ticker: z.string(),
    image: z.string(),
    description: z.string(),
    initialMarketCap: z.string(),
    initialSupply: z.string(),
    userId: z.number().describe("Dev"),
});

export type CreateProjectType = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.extend({
    status: z.string(),
});

export type UpdateProjectType = z.infer<typeof updateProjectSchema>;