
import BgGradient from "@/components/common/bg-gradient"
import UploadForm from "@/components/upload/upload-form"
import UploadHeader from "@/components/upload/upload-header"

export default function Page() {
    return (
        <section>
            <div className="min-h-screen">
                <BgGradient />
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 flex flex-col items-center gap-y-10">
                    <UploadHeader />
                    <UploadForm/>
                </div>
             </div>
        </section>
    )
}