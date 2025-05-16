import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"

export default async function handler(req, res) {
  const dbPath = "/home/mxz-11/Desktop/robotica/data_treatment/ddbb/winery.db"

  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    const result = await db.get("SELECT * FROM winery_data ORDER BY date DESC LIMIT 1")

    if (result) {
      res.status(200).json(result)
    } else {
      res.status(404).json({ error: "No data found" })
    }

    await db.close()
  } catch (error) {
    console.error("❌ Error al acceder a la base de datos:", error)
    res.status(500).json({ error: "Internal server error", details: error.message })
  }
}
