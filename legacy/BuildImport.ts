// Generates the build data
import { Build } from "../src/composables/Builds";
import { Class } from "../src/composables/Characters";
import { readFileSync, readdirSync, writeFileSync } from "fs";


function mapStringToClass(className: string): Class {
  switch (className) {
    case "all":
      return Class.Beginner;
    case "war":
      return Class.Warrior;
    case "arc":
      return Class.Archer;
    case "mag":
      return Class.Mage;
  }
  return Class.Beginner;
}

function mapStringToSubclass(className: string): Class | undefined {
  switch (className) {
    case "bar":
      return Class.Barbarian;
    case "bow":
      return Class.Bowman;
    case "hun":
      return Class.Hunter;
    case "mae":
      return Class.Maestro;
    case "sha":
      return Class.Shaman;
    case "sqr":
      return Class.Squire;
    case "wiz":
      return Class.Wizard;
  }
}

const baseClassImport = `import { Class } from "~/composables/Characters";\n`;

export function portOldBuilts() {
  const basePath = "./src";
  let imports = `import { Class } from "~/composables/Characters";\n`;
  imports += `import { Build } from "~/composables/Builds";\n`
  let buildCodes = "export const builds: Build[] = [];\n";

  const builds: Record<string, any> = {};
  readdirSync(`${basePath}/builds`).forEach((path) => {
    const bytes = readFileSync(`${basePath}/builds/${path}`);
    const buildName = path.split(".json")[0];
    builds[buildName] = JSON.parse(bytes.toString());
  });

  for (const buildName in builds) {
    const oldBuild = builds[buildName];
    const newBuild: Build = {
      title: oldBuild.title,
      notes: oldBuild.notes,
      version: "1.21",
      tabs: [],
      class: mapStringToClass(oldBuild.class),
    };
    let buildFile = "";
    if (oldBuild.subclass) {
      newBuild.class = mapStringToSubclass(oldBuild.subclass) ?? newBuild.class;
    } else {
      delete oldBuild.subclass;
      buildFile += baseClassImport;
    }

    if (oldBuild.comment_one) {
      newBuild.tabs.push({
        skills: oldBuild.tab_one,
        comment: oldBuild.comment_one,
      });
    }

    if (oldBuild.comment_two) {
      newBuild.tabs.push({
        skills: oldBuild.tab_two,
        comment: oldBuild.comment_two,
      });
    }

    if (oldBuild.comment_three) {
      newBuild.tabs.push({
        skills: oldBuild.tab_three,
        comment: oldBuild.comment_three,
      });
    }

    buildFile +=
      `\n\n export const build: Build = ` + JSON.stringify(newBuild, null, 2);

    buildFile = buildFile.replace(/"class": "(\w*)"/gi, '"class": Class.$1');
    buildFile = buildFile.replace(
      /"subclass": "(\w*)"/gi,
      '"subclass": Subclass.$1'
    );

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

  writeFileSync(
    `${basePath}/data/builds/index.ts`,
    imports + "\n\n" + buildCodes
  );
}

portOldBuilts();
