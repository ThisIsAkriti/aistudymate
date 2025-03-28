'use server'

import { fetchAndExtractPdfText } from "@/lib/fetchAndExtractPdfText";
import { generateSummaryFromGemini } from "@/lib/geminiai";

export async function generatePdfSummary(
    uploadResponse: [{
        serverData: {
            userId: string;
            file: {
                name: string;
                url: string;
            }
        }
    }]
) {
    if (!uploadResponse) {
        return {
            success: false,
            message: 'File upload failed',
            data: null,
        }
    }

    const { serverData: {
        userId,
        file: {
            name: fileName, url: pdfUrl
        },
    },
    } = uploadResponse[0];

    if (!pdfUrl) {
        return {
            success: false,
            message: 'File upload failed',
            data: null,
        }
    };

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log(pdfText);

        let summary;
        summary = await generateSummaryFromGemini(pdfText);
        console.log({ summary });
    } catch (err) {
        return {
            success: false,
            message: 'File upload failed',
            data: null,
        }
    }
}