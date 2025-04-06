import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import { mkdir } from "fs/promises"
import { exec } from "child_process"
import { promisify } from "util"

const execPromise = promisify(exec)

// Ensure upload directories exist
async function ensureDirectories() {
  const uploadDir = join(process.cwd(), "uploads")
  const resultsDir = join(process.cwd(), "results")

  try {
    await mkdir(uploadDir, { recursive: true })
    await mkdir(resultsDir, { recursive: true })
  } catch (error) {
    console.error("Error creating directories:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDirectories()

    const formData = await request.formData()
    const signalType = formData.get("signalType") as string
    const file = formData.get("file") as File

    if (!file || !signalType) {
      return NextResponse.json({ error: "File and signal type are required" }, { status: 400 })
    }

    // Validate file type
    const validTypes = ["text/csv", "application/octet-stream", "application/vnd.ms-excel"]
    if (!validTypes.includes(file.type) && !file.name.endsWith(".edf")) {
      return NextResponse.json({ error: "Invalid file type. Please upload CSV or EDF files." }, { status: 400 })
    }

    // Generate unique ID for this analysis
    const analysisId = uuidv4()
    const fileExtension = file.name.split(".").pop()
    const fileName = `${signalType}_${analysisId}.${fileExtension}`
    const filePath = join(process.cwd(), "uploads", fileName)

    // Save the file
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, fileBuffer)

    // Process the file with Python script
    const scriptPath = join(process.cwd(), "scripts", "process_signal.py")
    const outputPath = join(process.cwd(), "results", `${analysisId}.json`)

    const command = `python ${scriptPath} --file "${filePath}" --type "${signalType}" --output "${outputPath}"`

    // Execute Python script
    const { stdout, stderr } = await execPromise(command)

    try {
      const { stdout } = await execPromise(command)
      return NextResponse.json({
        success: true,
        message: "File uploaded and processed successfully",
        analysisId,
        details: stdout,
      })
    } catch (execError: any) {
      console.error("Python script failed:", execError.stderr || execError.message)
      return NextResponse.json({ error: "Signal processing failed" }, { status: 500 })
    }
    

    return NextResponse.json({
      success: true,
      message: "File uploaded and processed successfully",
      analysisId,
      details: stdout,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 })
  }
}

