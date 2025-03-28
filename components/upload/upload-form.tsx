'use client'
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { generatePdfSummary } from "@/action/upload-actions";
import { useState } from "react";

const schema = z.object({
    file: z
        .instanceof(File, { message: 'Invalid file' })//Checks if the value is actually a File object
        .refine((file) => file.size <= 20 * 1024 * 1024, {// custom validation (.refine)
            message: 'File size must be less than 20MB',
        })
        .refine((file) => file.type.startsWith('application/pdf'),
        'File must be a PDf')
})
export default function UploadForm() {
    const [isLoading, setIsLoading] = useState(false);

    const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
            onClientUploadComplete: () => {
                console.log("uploaded successfully!");
            },
            onUploadError: (err) => {
                console.error("error occurred while uploading", err);
                toast('Error Occoured while uploading', {
                    description: err.message
                });
            },
            onUploadBegin: ({ file }) => {
                console.log("upload has begun for", file);
            },
    })
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try
        {
            setIsLoading(true);
            const formData = new FormData(e.currentTarget);
            const file = formData.get('file') as File;

            // validating the fields
            const validatedFields = schema.safeParse({ file });
            console.log(validatedFields);
            if (!validatedFields.success) {
                let validateError = (
                    validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file'
                );
                toast('❌Something went wrong! ', {
                    description:validateError
                });
                setIsLoading(false);
                return;
            }
                toast('Uploading PDF...', {
                description: 'We ae uploading your PDF!'
            })
                
            // create schema with zod
            // upload file to UploadThings
            
            const resp = await startUpload([file]);
                if (!resp) {
                    toast('❌Something went Wrong', {
                        description: 'Please use different file!',
                    });
                    setIsLoading(false);
                return;
            }
                
            toast('📄Processing PDF', {
            description:'Hang tight! Our AI is reading through your document!✨'
            })
            
            // parse the pdf using langchain
                
            const summary = await generatePdfSummary(resp);
            console.log(summary);
        } catch (err) {
            setIsLoading(false);
            console.error('Error occurred', err);
        }
        // summarise the pdf using ai
        // save summary to database 
        // redirect to the [id] summary page
        
    }
    return (
        <div className="flex flex-col w-full gap-8 max-w-2xl mx-auto">
            <UploadFormInput isLoading={isLoading} onSubmit={handleSubmit} />
        </div>
    )
}