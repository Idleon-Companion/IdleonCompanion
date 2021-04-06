export type GrowthFunc = (a: number, b: number, c: number) => number; 

export const Growth: Record<string, GrowthFunc> = { 
    Add: (level, par1, par2) => { 
        if (par2 != 0) {
            return (((par1 + par2) / par2 + 0.5 * (level - 1)) / 
                     (par1 / par2)) * level * par1;
        } else {
            return level * par1;
        }
    },
    Decay: (level, par1, par2) => { 
        return (level * par1) / (level + par2);
    },
    IntervalAdd: (level, par1, par2) => { 
        return par1 + Math.floor(level / par2);
    },
    DecayMulti: (level, par1, par2) => { 
        return 1 + (level * par1) / (level + par2); 
    },
    BigBase: (level, par1, par2) => { 
        return par1 + par2 * level;
    }
} 
    
