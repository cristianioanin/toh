export interface PowerStats {
    combat: number;
    speed: number;
    intelligence: number;
    strength: number;
}

export interface Hero {
    id: number;
    name: string;
    powerStats: PowerStats;
    overallRating?: number;
}
