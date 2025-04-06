import { type NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const correlationId = params.id

    if (!correlationId) {
      return NextResponse.json({ error: "Correlation ID is required" }, { status: 400 })
    }

    const resultsPath = join(process.cwd(), "results", `correlation_${correlationId}.json`)

    if (!existsSync(resultsPath)) {
      return NextResponse.json({ error: "Correlation results not found" }, { status: 404 })
    }

    const resultsData = await readFile(resultsPath, "utf-8")
    const results = JSON.parse(resultsData)

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error retrieving correlation:", error)
    return NextResponse.json({ error: "Error retrieving correlation results" }, { status: 500 })
  }
}

