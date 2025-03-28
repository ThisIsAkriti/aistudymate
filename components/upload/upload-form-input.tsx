'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps{
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}
export default function UploadFormInput( {onSubmit, isLoading} : UploadFormInputProps) {
    return (
        <div>
            <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="flex justify-end items-center gap-1.5">
                    <Input id="file" type="file" name="file" accept="application/pdf" required className={cn(isLoading && 'opacity-50 cursor-not-allowed')} disabled={isLoading} />
                    <Button disabled= {isLoading}>{isLoading? <><Loader2/></> : 'Upload your PDF'}</Button>
                </div>
            </form>
        </div>
    )
}