-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Schedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("date", "id", "name", "phone") SELECT "date", "id", "name", "phone" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
