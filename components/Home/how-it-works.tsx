
import { BrainCircuit, FileText, UploadCloud } from "lucide-react";
import { ReactNode } from "react"

type Step = {
    icon: ReactNode;
    label: string;
    description: string;
}
const steps : Step[] = [
    {
        icon: <FileText width={62} height={62} strokeWidth={1.5} />,
        label: 'Upload & Process',
        description:'Drag and drop PDFs, research papers, or textbooks. AIStudyMate handles the rest.'
    },
    {
        icon: < BrainCircuit width={62} height={62} strokeWidth={1.5}/>,
        label: 'Upload & Process',
        description:'Drag and drop PDFs, research papers, or textbooks. AIStudyMate handles the rest.'
    },
    {
        icon: <UploadCloud width={62} height={62} strokeWidth={1.5}/>,
        label: 'Upload & Process',
        description:'Drag and drop PDFs, research papers, or textbooks. AIStudyMate handles the rest.'
    }
]
export default function HowItWorks() {
    return (
        <section className="relative">
            <div className="max-w-5xl mx-auto py-12 lg:py-24 px-4 sm:px-6 lg:px-8 lg:pt-12">
                <div
                    aria-hidden='true'
                    className="pointer-events-none absolute inset-x-0 top-60 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30
                    "
                >
                    <div
                        style={{
                        clipPath:'polygon(50% 0% , 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                    }}
                    className="relative right-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-purple-500 via-purple-200 to-purple-800 opacity-50 sm:right-[calc(50%-30rem)] sm:w-[72rem]"/>
                </div>

                <div className="text-center mb-16">
                    <h2 className="font-bold text-purple-700 mb-4">HOW IT WORKS</h2>
                    <h3 className="font-bold mx-auto text-3xl max-w-2xl ">From PDFs to Powerful Study-Notes in just three steps!</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                    {steps.map((step , index) => (
                        <StepItems key={index}  {...step} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function StepItems({icon , label , description} : Step) {
    return (
        <div className="relative bg-white/5 p-6 rounded-2xl backdrop-blur-xs border border-white/10 hover:border-purple-500/40 transition-colors group w-full">
            <div className="flex items-center justify-center h-24 w-24 mb-4 mx-auto rounded-2xl bg-linear-to-br from-purple-500/10 to-transparent group-hover:from-purple-500/20 transition-colors">
                <div className="text-purple-500">{icon}</div>
            </div>
            <div className="flex flex-col justify-between gap-1 flex-1">
                <h4 className="text-center font-bold text-xl"> {label}</h4>
                <p className="text-center text-gray-600 text-sm">{description}</p>
            </div>
        </div>
    )    
}