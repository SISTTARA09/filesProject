import prompts from "prompts";
import { log } from "node:console";
import fs, { readFile, writeFile, unlink } from "node:fs";
import path from "node:path";

const list = [
	{
		type: "select",
		name: "operation",
		message: "wich operation you want to do?",
		choices: [
			{ title: "create", value: "create" },
			{ title: "read", value: "read" },
			{ title: "update", value: "update" },
			{ title: "delete", value: "delete" },
		],
	},
	{
		type: (p) => (p === "update" ? "text" : null),
		name: "fileContent",
		message: "you will update it with ...",
	},
	{
		type: "text",
		name: "fileName",
		message: "file name you want to work with?",
	},
];

(async () => {
	const { operation, fileName, fileContent } = await prompts(list);
	if ((operation === "update") | (operation === "create")) {
		writeFile(fileName, fileContent || `this is ${fileName}, file.`, (err) => {
			if (err) throw err;
		});
		return;
	}
	if (operation === "read") {
		readFile(fileName, "utf-8", (err, data) => {
			if (err) throw err;
			console.log(data);
		});
		return;
	}
	if (operation === "delete") {
		unlink(fileName, (err) => {
			if (err) throw err;
			console.log(`${fileName} successfully deleted.`);
		});
	}
	return;
})();
