import {useState} from "react";

import HeaderInput from "./HeaderInput.tsx";
import HeaderMenu from "./HeaderMenu.tsx";
import {AddRecipeButton} from "./AddRecipeButton.tsx";

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCompactSearchOpen, setIsCompactSearchOpen] = useState(false);

    return (
        <header className="mb-2.5 bg-stone-800 px-3 py-3 text-white min-[640px]:px-4 min-[640px]:py-4 min-[930px]:h-20 min-[930px]:px-6 min-[930px]:py-0">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 min-[640px]:gap-4 min-[930px]:h-full min-[930px]:flex-row min-[930px]:items-center min-[930px]:justify-center min-[930px]:gap-5">
                <div className="hidden min-[930px]:block">
                    <HeaderMenu />
                </div>

                <div className="flex w-full items-center justify-between gap-2.5 rounded-[22px] border border-white/10 bg-white/[0.04] px-2.5 py-2 min-[450px]:justify-start min-[640px]:gap-3 min-[640px]:px-3 min-[640px]:py-3 min-[930px]:hidden">
                    <div className="shrink-0 min-[450px]:hidden">
                        <button
                            type="button"
                            aria-label="Open menu"
                            onClick={() => setIsSidebarOpen(true)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/6 transition hover:border-orange-300/60"
                        >
                            <span className="flex flex-col gap-1.5">
                                <span className="block h-0.5 w-4 rounded-full bg-white"/>
                                <span className="block h-0.5 w-4 rounded-full bg-white"/>
                                <span className="block h-0.5 w-4 rounded-full bg-white"/>
                            </span>
                        </button>
                    </div>

                    <div className={`min-w-0 flex-1 max-[449px]:hidden ${isCompactSearchOpen ? "min-[450px]:max-[559px]:hidden" : ""}`}>
                        <HeaderMenu mobile />
                    </div>

                    <div className={`min-[560px]:hidden max-[449px]:min-w-0 max-[449px]:flex-1 ${isCompactSearchOpen ? "min-[450px]:flex-1 min-[450px]:min-w-0" : "min-[450px]:shrink-0"}`}>
                        <HeaderInput compact onCompactOpenChange={setIsCompactSearchOpen} />
                    </div>

                    <div className="hidden shrink-0 min-[560px]:block">
                        <AddRecipeButton />
                    </div>
                </div>

                <div className="hidden min-[450px]:block min-[560px]:hidden min-[930px]:hidden">
                    <AddRecipeButton />
                </div>

                <div className="hidden min-[560px]:block min-[930px]:hidden">
                    <HeaderInput/>
                </div>

                <div className="hidden min-[930px]:block">
                    <AddRecipeButton />
                </div>

                <div className="hidden min-[930px]:shrink-0 min-[930px]:block">
                    <HeaderInput/>
                </div>
            </div>

            {isSidebarOpen && (
                <div className="fixed inset-0 z-[60] min-[450px]:hidden">
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setIsSidebarOpen(false)}
                        className="absolute inset-0 bg-stone-950/60"
                    />

                    <aside className="absolute left-0 top-0 flex h-full w-[280px] max-w-[82vw] flex-col gap-8 border-r border-white/10 bg-stone-900 px-5 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-400">Recipes</p>
                            <button
                                type="button"
                                aria-label="Close sidebar"
                                onClick={() => setIsSidebarOpen(false)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-xl leading-none text-white transition hover:border-orange-300/60 hover:text-orange-200"
                            >
                                x
                            </button>
                        </div>

                        <HeaderMenu mobile drawer onItemClick={() => setIsSidebarOpen(false)} />

                        <AddRecipeButton className="w-full justify-center" onClick={() => setIsSidebarOpen(false)} />
                    </aside>
                </div>
            )}
        </header>
    )
}
