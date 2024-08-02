import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface ProjectTable {
    id: Generated<number>;
    name: string;
    ticker: string;
    description: string;
    image: string;
    initialMarketCap: string;
    initialSupply: string;
    status?: string;
    userId?: number;
    user?: { id: number; username: string, wallet: string };
    createdAt?: Date;
}

export type Project = Selectable<Omit<ProjectTable, 'userId'>>;

export type NewProject = Insertable<Omit<ProjectTable, 'user'>>;

export type ProjectUpdate = Updateable<ProjectTable>;
