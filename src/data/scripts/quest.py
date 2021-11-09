import json

with open('./quest-raw.json') as f:
  raw_data = json.load(f)
  
quests = {
  1: [],
  2: [],
  3: [],
}

worlds = {
  'Blunder Hills': 1,
  'Blunder Hills}}': 1,
  'Yum-Yum Desert': 2,
  'Yum Yum Desert': 2,
  'Yum-Yum Desert}}': 2,
  'Frostbite Tundra': 3,
}

for npc, data in raw_data.items():
  for name, quest_data in data['quests'].items():
    quest = {
      "id": quest_data['QuestName'],
      "npc": npc,
      "world": worlds.get(data['head']['world'], -1),
      "name": name,
    }
    if quest["world"] == -1:
      print(data['head']['world'])
    else:
      quests[quest['world']].append(quest)

output = ""
for world, quests_ in quests.items():
  output += f"const QuestsW{world}: Array<Quest> = [\n"
  for q in quests_:
    output += "\t{\n"
    for key, val in q.items():
      val = val if type(val) == int else '\"' + val + '\"'
      output += f"\t\t{key}: {val},\n"
    output += "\t},\n"
  output += "]\n\n"
with open('./quests-gen.ts', 'w') as f:
  f.write(output)
