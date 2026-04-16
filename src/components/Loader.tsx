type LoaderProps = {
    label?: string;
    className?: string;
};

export default function Loader({label = "Loading recipes", className = ""}: LoaderProps) {
    return (
        <div className={`flex min-h-[220px] w-full items-center justify-center px-4 py-10 ${className}`.trim()}>
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute h-16 w-16 rounded-full border border-orange-200 bg-orange-50/70" />
                    <div className="absolute h-16 w-16 animate-ping rounded-full border border-orange-300/60" />
                    <div className="h-7 w-7 rounded-full bg-linear-to-br from-orange-500 to-amber-400 shadow-[0_10px_24px_-10px_rgba(249,115,22,0.9)]" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                        Loading
                    </p>
                    <p className="text-sm text-stone-600">{label}</p>
                </div>
            </div>
        </div>
    );
}
