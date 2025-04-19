import type { Setting } from "@/types/Settings";

async function getAllSettings(
  db: PouchDB.Database
): Promise<{ [key: string]: any }> {
  if (!db) {
    console.error("Database is not initialized.");
    return {};
  }

  try {
    const result = await db.allDocs<Setting>({
      include_docs: true,
      attachments: false,
    });

    const settingsObject: { [key: string]: any } = {};

    result.rows
      .filter((row) => row.doc && !row.id.startsWith("_design/"))
      .forEach((row) => {
        if (row.doc && row.doc.name && row.doc.value) {
          try {
            settingsObject[row.doc.name] = JSON.parse(row.doc.value);
          } catch (error) {
            console.error(
              `Error parsing JSON for setting "${row.doc.name}":`,
              error
            );
            settingsObject[row.doc.name] = row.doc.value;
          }
        }
      });

    return settingsObject;
  } catch (error: unknown) {
    console.error("Error getting all settings:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (typeof error === "string") {
      throw new Error(error);
    } else {
      throw new Error("An unknown error occurred while retrieving settings.");
    }
  }
}

export default getAllSettings;
