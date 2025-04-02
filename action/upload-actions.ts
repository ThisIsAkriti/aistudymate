'use server'

import { getDbConnection } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/fetchAndExtractPdfText";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import PdfSummary from "@/models/PdfSummary";
import User from "@/models/User";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType{
    userId?: string,
    fileUrl: string,
    summary: string,
    title: string,
    fileName: string
}

export async function generatePdfSummary(
    uploadResponse: {
        serverData: {
            userId: string;
            file: {
                name: string;
                url: string;
            }
        }
    }[]
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
        let summary;
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log(pdfText);
        try{
            summary = await generateSummaryFromGemini(pdfText);
            console.log({ summary });
        } catch (err) {
            console.error(
                'Gemini API failed', err
            );
            throw new Error(
                'Failed to genrate summary with available AI providers'
            )
        
        }
        if (!summary) {
            return {
                success: true,
                message: 'Failed to generated summary!',
                data:null,
            }
        }
        const formattedFileName = formatFileNameAsTitle(fileName);
        return {
            success: true,
            message: 'Summary generated Successfully!',
            data: {
                title:formattedFileName,
                summary
            },
        };   
    } catch (err) {
        
        return {
            success: false,
            message: 'File upload failed',
            data: null
        }
        
    }
}

async function savePdfSummary(
    {
        userId,
        fileUrl,
        summary,
        title,
        fileName
    }:PdfSummaryType) {
    try {
        
        await getDbConnection();
        console.log(`Searching for user with ID: ${userId}`);

        const user = await User.findOne({ _id: userId }).lean(); 
        console.log(user + ' user')
        if (!user) {
        console.error("❌ Error: User not found in the database.");
        return null; // Exit without creating a summary
            }
        
        const newSummary = new PdfSummary({
            user_id: userId, // Store user reference
            original_file_url: fileUrl,
            summary_text: summary,
            title,
            file_name: fileName,
        });
        
        await newSummary.save();
        console.log("✅ PDF summary saved successfully!");

    } catch (err) {
        console.error('Error saving PDF summary!', err)
    }
}

export async function storePdfSummaryAction({
    fileUrl,
    summary,
    title,
    fileName
}: PdfSummaryType) {
    //user is logged in and has a userId
    // savePdfSummary
    // savePdfSummary()

    let savedSummary: any;
    try {
        
        const { userId } = await auth(); // come from clerk;
        if (!userId) {
            return {
                success: false,
                message: 'User not found',
            };
        }
        savedSummary = await savePdfSummary({
                userId,
                fileUrl,
                summary,
                title,
                fileName
        });
        if (!savedSummary) {
            return {
                success: false,
                message: 'Failed to save PDF summaries, please try again ...',
                data:null
            }
        };
        
    } catch (err) {
        return {
            success: false,
            message: err instanceof Error ? err.message : 'File upload failed',
            data:null
        }
    }

    //Revalidate our cache

    revalidatePath(`/summaries/${savedSummary.id}`);
    return {
        success: true,
        message: 'PDF summary saved successfully!',
        data: {
            id: savedSummary.id
        }
    };
}