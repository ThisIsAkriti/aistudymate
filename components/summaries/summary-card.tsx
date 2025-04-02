import Link from "next/link";
import { Card } from "../ui/card";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteButton from "./delete-button";

const SummaryHeader = ({
    fileUrl, title, createdAt
} : {
    fileUrl: string;
    title: string | null;
    createdAt: string;
}) => {
    return (
        <div className="flex items-start gap-2 sm:gap-4">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mt-1"/>
            <div className="flex-1 min-w-0">
                <h3 className="text-base xl:text-lg font-semibold text-gray-800 truncate ">{title}</h3>
                <p className="text-sm text-gray-500">{new Date (createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

const StatusBadge = ({status} : {status : string}) => {
    return (
        <span className={cn('text-xs text-blue-400 font-bold w-fit py-1 px-3 rounded-full', status==='completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')}>{status}</span>
    )
}
export default function SummaryCard({summary} : {summary:any}){
    return (
        <div>
            <Card className="h-full relative">
                <div className="mx-6">
                    <div className="flex justify-between mb-4">
                        <div className="flex space-center items-center gap-4">
                            <Link href={`summaries/${summary.id}`}>
                                <div className="flex flex-col gap-3 sm:gap-4">
                                    <SummaryHeader
                                        fileUrl={summary.original_file_url}
                                        title={summary.title}
                                        createdAt={summary.created_at}
                                    />
                                </div>
                            </Link>
                        </div>
                        <DeleteButton/>
                    </div>

                    <div className="mb-8">
                        <p className="text-gray-600 text-md">
                        {summary.summary_text}
                        </p>
                    </div>

                    <div className="flex justify-between items-center mt-2 sm:mt-4 ">
                        <StatusBadge status={ summary.status } />
                    </div>
                </div>
            </Card>
        </div>
    )
}