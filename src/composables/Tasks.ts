export type Task = {
  description: string;
  tags: string[]; // Tags for filtering/sorting
  steps: number; // How many steps/requirements this task has (to keep track of subtasks)
  completed: number; // Number of steps that are finished
  lastCompletion: number; // Timestamp for the last completed step
};

export type Timer = {
  startedAt: number; // Timestamp when the timer started
  description: string;
};

export const DefaultTasks: Task[] = [
  {
    description: "Complete daily guild tasks for up to 50GP",
    steps: 5,
  },
  {
    description: "Complete daily world tasks for unlock points",
    steps: 3,
  },
  {
    description:
      "Alchemy: spend liquids, buy from the shop, or level up Grind Time/other bubbles",
    steps: 1,
  },
  {
    description: "Post Office: Complete daily post office orders",
    steps: 3,
  },
  {
    description:
      "Construction: Collect cogs, optimize cog layout, and upgrade your buildings",
    steps: 1,
  },
  {
    description:
      "Shop: Visit each shop to buy talent reset points, statues, pickles, Dootjat Eyes, or anything else you need",
    steps: 5,
  },
  {
    description:
      "Complete Picnic Stowaway's quest(s) to collect a Picnic Token",
    steps: 1,
  },
  {
    description: "Kill Dr. Defecaus and Boops in the secret area",
    steps: 1,
  },
  {
    description: "Collect boss keys from every world's boss NPC",
    steps: 2,
  },
  {
    description: "Collect colosseum entry tickets every world's colosseum NPC",
    steps: 3,
  },
  {
    description:
      "Check all your characters to ensure they have inventory space, deposit anvil items, spend talent points, and leave them AFK",
    steps: 1,
  },
].map((task) => {
  return { ...task, tags: ["Default"], completed: 0, lastCompletion: 0 };
});
