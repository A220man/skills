import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const teachSkillPath = path.join(repoRoot, "skills/productivity/teach/SKILL.md");

test("teach skill instructs wiring JS components via script tags before </body>", () => {
  const content = fs.readFileSync(teachSkillPath, "utf8");

  // Verify that the Assets section explicitly instructs including script tags for JS components
  assert.match(
    content,
    /<script src="\.\.\/assets\/.*\.js"><\/script>/,
    "SKILL.md should provide explicit <script src='../assets/...'> completion criterion for JS components",
  );

  // Verify that quiz.js script wiring is explicitly instructed
  assert.match(
    content,
    /<script src="\.\.\/assets\/quiz\.js"><\/script>/,
    "SKILL.md should instruct wiring interactive quizzes to assets/quiz.js via a script tag before </body>",
  );

  // Verify that lessons must include the script tag before </body>
  assert.match(
    content,
    /before `?<\/body>`?/,
    "SKILL.md should specify placing script tags before </body>",
  );
});

test("teach skill does not contain em-dashes", () => {
  const content = fs.readFileSync(teachSkillPath, "utf8");
  assert.doesNotMatch(
    content,
    /\u2014/,
    "SKILL.md must not contain em-dashes per AGENTS.md / CLAUDE.md guidelines",
  );
});
