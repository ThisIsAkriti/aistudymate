import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
export default function UploadHeader() {
    return (
        <div className="flex mx-auto flex-col items-center justify-center gap-6 text-center">
            <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-purple-200 via-purple-500 to-purple-800  animate-gradient-x group">
                        <Badge variant={"secondary"} className="bg-white relative px-6 py-2 font-medium text-base rounded-full group-hover:bg-purple-100 cursor-pointer transition-colors duration-200">
                            <Sparkles className=" mr-2 text-purple-600 animate-pulse" width={20} height={20} />
                            <p className="text-base text-purple-600">AI-Powered Content Creation</p>
                        </Badge>
                    
            </div>

            <h1 className="text-center py-6 font-bold mx-4 z-40">Start Uploading {' '}
            <span className="relative inline-block">
                <span className="relative z-10 px-2">Your PDF's</span>
                <span className="absolute inset-0 bg-purple-200/40 -rotate-2 rounded-lg transform -skew-y-1"></span>
            </span>{" "}</h1>
            <p className="text-center text-lg sm:text-xl lg:text-2xl px-4 lg:px-0 lg:max-w-4xl text-gray-600">Upload your pdf and let ai do the magic!✨</p>
        </div>
    )
}