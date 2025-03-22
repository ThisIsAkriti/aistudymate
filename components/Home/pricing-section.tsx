import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link"

type Pricetype = {
    name: string;
    price: number;
    description: string;
    items: string[];
    id: string;
    paymentLink:string;
    priceId:string;
}
const plans = [
    {
        name: 'Basic',
        price: 0,
        description: 'For students and individuals',
        items: [
            '10 PDF summaries per month',
            'Standard processing speed',
            'Email support'
        ],
        id: 'basic',
        paymentLink: '',
        priceId:''
    },
    {
        name: 'Pro',
        price: 19,
        description: 'For professionals and teams',
        items: [
            'Unlimited PDF summaries',
            'Priority processing',
            '24/7 Priority support',
            'Markdown export'
        ],
        id: 'pro',
        paymentLink: '',
        priceId:''
    }
]

const PricingCard = ({id, name, description, price, items, paymentLink}:Pricetype) => {
    return (
        <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300 px-4 sm:px-0">
            <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border border-gray-500/20 rounded-2xl", id === 'pro' && 'border-purple-700 gap-5 border-2')}>
                <div className="flex items-center gap-4">
                    <div>
                        <p className="font-bold text-lg lg:text-xl capitalize">{name}</p>
                        <p className="text-base-content/80 mt-2">{description}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <p className="text-5xl font-extrabold tracking-tight">${price}</p>
                    <div className="flex flex-col justify-end mb-[4px]">
                        <p className="text-xs font-semibold">USD</p>
                        <p className="text-xs text-gray-500">/month</p>
                    </div>
                </div>
                <div className="space-x-2.5 leading-relaxed text-base flex-1">
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-center  gap-2">
                            <CheckIcon className="text-green-700" size={18}/>    
                            {item}
                        </li>
                    ))}
                </div>
                <div className="space-y-2 flex justify-center w-full">
                    <Link href={paymentLink} className={cn("w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-800 to-purple-500 py-2 text-white font-semibold hover:from-purple-500 hover:to-purple-800 transition transform-all duration-200" , id === 'pro'? 'border-2 border-purple-800':'from-purple-700 to-purple-400 hover:from-purple-400 hover:to-purple-700 border-2 border-purple-500')}>Get Started
                    <ArrowRight size={18}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default function Pricing() {
    return (
        <section className="relative overflow-hidden" id='pricing'>
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
                <div><h2 className="text-purple-700 text-center font-bold text-xl mb-8">PRICING</h2></div>
                <div className="relative flex justify-center items-center flex-col lg:flex-row lg:items-stretch gap-8">
                    {plans.map((plan) => (
                        <PricingCard key={plan.id} {...plan} />
                    ))}

                </div>
            </div>
        </section>
    )
}