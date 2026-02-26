"use client"

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="page-transition-right flex-1 flex flex-col">
            {children}
        </div>
    )
}
