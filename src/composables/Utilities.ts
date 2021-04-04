
/*
export enum GrowthFunction {
    Add = "add",
    Decay = "decay",
    IntervalAdd = "intervalAdd",
    DecayMulti = "decayMulti",
    BigBase = "bigBase",
}
*/

export function calculateGrowth(func : string, level : number, par1: number, par2:number) {
    let result = 0;
    switch (func) {
        case 'add':
        if (par2 != 0) {
            result = (((par1 + par2) / par2 + 0.5 * (level - 1)) / (par1 / par2)) * level * par1;
        } else {
            result = level * par1;
        }
        break;
        case 'decay':
        result = (level * par1) / (
            level + par2);
        break;
        case 'intervalAdd':
        result = par1 + Math.floor(level / par2);
        break;
        case 'decayMulti':
        result = 1 + (level * par1) / (level + par2);
        break;
        case 'bigBase':
        result = par1 + par2 * level;
        break;
        default:
        result = 0;
    }
    return Math.round(result);
}