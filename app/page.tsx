import { Button } from "../components/ui/button"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-3xl">
      Your Ai Studymate
      <Button className="cursor-pointer" variant="outline" size={"lg"}>Hello</Button>
    </div>
  );
}
