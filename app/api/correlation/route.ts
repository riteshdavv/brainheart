import { type NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import { join } from "path"
import { writeFile, readFile } from "fs/promises"
import { v4 as uuidv4 } from "uuid"

const execPromise = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ecgAnalysisId, eegAnalysisId } = body

    if (!ecgAnalysisId || !eegAnalysisId) {
      return NextResponse.json({ error: "Both ECG and EEG analysis IDs are required" }, { status: 400 })
    }

    // Check if both analysis results exist
    const ecgPath = join(process.cwd(), "results", `${ecgAnalysisId}.json`)
    const eegPath = join(process.cwd(), "results", `${eegAnalysisId}.json`)

    try {
      await readFile(ecgPath, "utf-8")
      await readFile(eegPath, "utf-8")
    } catch (error) {
      return NextResponse.json({ error: "One or both analysis files not found" }, { status: 404 })
    }

    // Generate correlation ID
    const correlationId = uuidv4()
    const configPath = join(process.cwd(), "uploads", `correlation_${correlationId}.json`)
    const outputPath = join(process.cwd(), "results", `correlation_${correlationId}.json`)

    // Create config file for correlation script
    const config = {
      ecgAnalysisId,
      eegAnalysisId,
      outputPath,
    }

    await writeFile(configPath, JSON.stringify(config))

    // Run correlation script
    const scriptPath = join(process.cwd(), "scripts", "correlate_signals.py")
    const command = `python ${scriptPath} --config "${configPath}"`

    const { stdout, stderr } = await execPromise(command)

    if (stderr) {
      console.error("Python script error:", stderr)
      return NextResponse.json({ error: "Error processing correlation" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      correlationId,
      message: "Correlation analysis completed successfully",
    })
  } catch (error) {
    console.error("Correlation error:", error)
    return NextResponse.json({ error: "Error performing correlation analysis" }, { status: 500 })
  }
}

