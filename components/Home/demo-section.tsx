import { WandSparkles } from "lucide-react";

export default function DemoSection() {
    return (
        <section className="relative">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
                <div
                aria-hidden='true'
                className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30
                "
            >
                <div
                    style={{
                    clipPath:'polygon(50% 0% , 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                }}
                className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-purple-500 via-purple-200 to-purple-800 opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72rem]"/>
                </div>

                <div className="flex flex-col text-center items-center max-w-5xl space-y-4 ">
                    <div className=" rounded-full p-2 border border-gray-200 hover:bg-gray-200/50">
                        <WandSparkles className="w-6 h-6 text-purple-500 animate-pulse" />
                    </div>
                    <h3 className=" font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6 ">See AIStudyMate <span className=" bg-linear-to-r from-purple-500 to-purple-800 bg-clip-text text-transparent">in Action: Smart Notes</span> in Seconds!</h3>
                </div>

                <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
                    {/* {summary of our web} */}
                </div>
            </div>
        </section>
    )
}