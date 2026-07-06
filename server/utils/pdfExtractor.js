import fs from "fs";
import pdfParse from "pdf-parse";

export const extractPdfText = async (path) => {

    const buffer = fs.readFileSync(path);

    const data = await pdfParse(buffer);

    return data.text;

}