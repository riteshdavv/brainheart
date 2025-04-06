import { type NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Fix #1: Use await to destructure params properly 
    const { id: analysisId } = await Promise.resolve(params)

    if (!analysisId) {
      return NextResponse.json({ error: "Analysis ID is required" }, { status: 400 })
    }

    const resultsPath = join(process.cwd(), "results", `${analysisId}.json`)

    if (!existsSync(resultsPath)) {
      return NextResponse.json({ error: "Analysis results not found" }, { status: 404 })
    }

    const resultsData = await readFile(resultsPath, "utf-8")
    
    // Better approach: Use a custom reviver function to handle NaN values
    try {
      // First, try to handle NaN with string replacement for common patterns
      const sanitizedData = resultsData
        .replace(/: NaN/g, ': null')
        .replace(/:"NaN"/g, ':null')
        .replace(/: "NaN"/g, ': null');
        
      // If that still doesn't work, we can try a more manual approach
      try {
        const results = JSON.parse(sanitizedData);
        return NextResponse.json(results);
      } catch (parseError) {
        // Last resort: Read the file and manually parse line by line
        console.log("Attempting manual sanitization of JSON data");
        
        // This handles extremely complex cases by allowing inspection of the raw file
        // For debugging purposes, log a segment of the problematic data
        const problemSegment = resultsData.substring(
          Math.max(0, resultsData.indexOf("entropy") - 50),
          Math.min(resultsData.length, resultsData.indexOf("entropy") + 50)
        );
        console.log("Problem area:", problemSegment);
        
        // Create a custom parser that can handle NaN values
        const customParsedData = resultsData.replace(/NaN/g, 'null');
        
        try {
          const results = JSON.parse(customParsedData);
          return NextResponse.json(results);
        } catch (finalError) {
          console.error("All parsing attempts failed:", finalError);
          return NextResponse.json({ 
            error: "Invalid JSON format in results file",
            suggestion: "Check for NaN values or other invalid JSON tokens" 
          }, { status: 500 });
        }
      }
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json({ error: "Invalid JSON format in results file" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error retrieving analysis:", error);
    return NextResponse.json({ error: "Error retrieving analysis results" }, { status: 500 });
  }
}