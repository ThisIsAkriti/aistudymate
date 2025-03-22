import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
export default function HeroSection() {
    return (
        <section>
            <div className="flex relative mx-auto flex-col z-0 items-center justify-center py-16 sm:pt-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl ">
                
                <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-purple-200 via-purple-500 to-purple-800  animate-gradient-x group">
                    <Badge variant={"secondary"} className="bg-white relative px-6 py-2 font-medium text-base rounded-full group-hover:bg-purple-100 cursor-pointer transition-colors duration-200">
                        <Sparkles className=" mr-2 text-purple-600 animate-pulse" width={20} height={20} />
                        <p className="text-base text-purple-600">Powered by AI</p>
                    </Badge>
                
                </div>
                
                <h1 className="text-center py-6 font-bold mx-4">Turn PDFs into{' '}
                    <span className="relative inline-block">
                        <span className="relative z-10 px-2">Smart</span>
                        <span className="absolute inset-0 bg-purple-200/40 -rotate-2 rounded-lg transform -skew-y-1"></span>
                    </span>{" "}
                    
                Notes Instantly</h1>
                <h2 className="text-center text-lg sm:text-xl lg:text-2xl px-4 lg:px-0 lg:max-w-4xl text-gray-600">Get Instant Notes, Flashcards & Quizzes.</h2>
                <Button variant={'link'} className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-800 to-purple-600 hover:from-purple-600 hover:to-slate-800 transition-all duration-200 hover:no-underline shadow-lg">
                    <Link href="/#pricing" className="flex items-center gap-2">
                        <span>
                            Try AiStudyMate
                        </span>
                        <ArrowRight/>
                    </Link>
                </Button>
            </div>
        </section>
    )
}