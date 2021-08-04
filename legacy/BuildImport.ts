// Generates the build data
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { Build } from "../src/data/builds";

export enum Class {
  All = "All",
  Beginner = "Beginner",
  Warrior = "Warrior",
  Archer = "Archer",
  Mage = "Mage",
  Journeyman = "Journeyman",
}

export enum Subclass {
  Maestro = "Maestro",
  Barbarian = "Barbarian",
  Squire = "Squire",
  Bowman = "Bowman",
  Hunter = "Hunter",
  Wizard = "Wizard",
  Shaman = "Shaman",
}


function mapStringToClass(className: string): Class {
  switch (className) {
    case "all":
      return Class.All;
    case "war":
      return Class.Warrior;
    case "arc":
      return Class.Archer;
    case "mag":
      return Class.Mage;
  }
  return Class.All
}

function mapStringToSubclass(className: string): Subclass | undefined {
  switch (className) {
    case "bar":
        return Subclass.Barbarian
    case "bow":
        return Subclass.Bowman
    case "hun":
        return Subclass.Hunter
    case "mae":
        return Subclass.Maestro
    case "sha":
        return Subclass.Shaman
    case "sqr":
        return Subclass.Squire
    case "wiz":
        return Subclass.Wizard
  }
}

const baseClassImport = `import { Class } from "~/composables/Characters";\n`;
const subClassImport = `import { Class, Subclass } from "~/composables/Characters";\n`;
const types = `
export type BuildTab = {
    skills: Record<number, string>; // Skill index -> points
    comment: string;
};
export type Build = {
    title: string; // Build name
    version: string; // Version of Idleon for the build
    class: Class;
    subclass?: Subclass;
    tabs: BuildTab[];
    notes: string;
};`

export function portOldBuilts() {
  const basePath = "./src";
  let imports = `import { Class, Subclass } from "~/composables/Characters";\n`;
  let buildCodes = "export const builds: Build[] = [];\n"
  
  const builds: Record<string, any> = {};
  readdirSync(`${basePath}/builds`).forEach((path) => {
    let bytes = readFileSync(`${basePath}/builds/${path}`);
    const buildName = path.split(".json")[0];
    builds[buildName] = JSON.parse(bytes.toString());
  });
  
  for (let buildName in builds) {
    const oldBuild = builds[buildName];
    let newBuild: Build = {
      title: oldBuild.title,
      notes: oldBuild.notes,
      version: "1.21",
      tabs: [],
      class: mapStringToClass(oldBuild.class)
    }
    let buildFile = "";
    if (oldBuild.subclass) {
      buildFile += subClassImport;
      newBuild.subclass = mapStringToSubclass(oldBuild.subclass);
    } else {
      delete oldBuild.subclass;
      buildFile += baseClassImport;
    }
  
    if (oldBuild.comment_one) {
      newBuild.tabs.push({
        skills: oldBuild.tab_one,
        comment: oldBuild.comment_one
      });
    }
  
    if (oldBuild.comment_two) {
      newBuild.tabs.push({
        skills: oldBuild.tab_two,
        comment: oldBuild.comment_two
      });
    }
  
    if (oldBuild.comment_three) {
      newBuild.tabs.push({
        skills: oldBuild.tab_three,
        comment: oldBuild.comment_three
      });
    }
  
    buildFile += `\n\n export const build = ` + JSON.stringify(newBuild, null, 2);
  
    buildFile = buildFile.replace(/"class": "(\w*)"/gi, "\"class\": Class.$1");
    buildFile = buildFile.replace(/"subclass": "(\w*)"/gi, "\"subclass\": Subclass.$1");
    
    writeFileSync(`${basePath}/data/builds/${buildName}.ts`, buildFile);
  }
  readdirSync(`${basePath}/data/builds`).forEach((path) => {
    if (path.startsWith("index")) {
      return;
    }
    const buildName = path.split(".ts")[0];
    imports += `import { build as build_${buildName} } from "./${buildName}"\n`;
    buildCodes += `builds.push(build_${buildName});\n`;
  });
  
  writeFileSync(`${basePath}/data/builds/index.ts`, imports + "\n\n" + types + "\n\n" + buildCodes);
}


portOldBuilts();