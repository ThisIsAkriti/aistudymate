import BgGradient from "@/components/common/bg-gradient";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import getSummaries from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SummaryType {
    id: string;
    title: string;
    original_file_url: string;
    created_at: string;
    summary_text: string;
    status: string;
}
  
export default async function DashboardPage() {
    const user = await currentUser(); // from clerk
    const userId = user?.id;

    if (!userId) return redirect('/sign-in');

    const uploadLimit = 5;
    const summaries = await getSummaries(userId);
    return (
        <main className="min-h-screen">
            <BgGradient />
            <div className="container mx-auto flex flex-col gap-4">
                <div className="px-4 py-12 sm:py-24 z-20">
                    <div className="flex gap-4 mb-8 justify-between items-center">

                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-bold trackiing-tight ">Your Summaries</h1>
                            <p className="text-gray-600 ">Transform Your PDFs into consice, actionalbe insights</p>
                        </div>
                        
                       
                        <Button variant={'link'} className="bg-linear-to-r from-purple-600 to-purple-900 hover:from-purple-900 hover:to-purple-600 transition-all duration-200 hover:no-underline shadow-lg hover:scale-105">
                            <Link href="/upload" className="text-white flex items-center gap-1"><Plus/> New Summary</Link>
                        </Button>
                      
                    </div>

                    <div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm text-purple-800">
                            <p>
                                You've reached the limit of ${ uploadLimit } uploads on the Basic Plan.{ " " } 

                                <Link href={'/#pricing'} className="text-red-600 underline-offset-4 underline inline-flex items-center "> Click to upgrade to Pro{' '} <ArrowRight className="inline-block" size={14} /></Link>{ " " }for unlimited uploads.  
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
                    {summaries.map((summary:SummaryType, index:number) => (
                        <SummaryCard key={index} summary = {summary} />
                   ))}
                </div>
            </div>
        </main>
    )
}