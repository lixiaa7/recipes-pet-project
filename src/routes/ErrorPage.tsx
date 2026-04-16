import {isRouteErrorResponse, Link, useRouteError} from 'react-router-dom';

import Header from '../components/header/Header.tsx';
import {PageTitle} from '../components/PageTitle.tsx';

export default function ErrorPage() {
    const error = useRouteError();

    const status = isRouteErrorResponse(error) ? error.status : 404;
    const title = status === 404 ? 'Page not found' : 'Something went wrong';
    const description = status === 404
        ? 'The page you requested does not exist or has been moved. Return to the main recipe feed and keep exploring what to cook next.'
        : 'An unexpected routing error occurred. Return to the main page and continue browsing recipes.';

    return (
        <>
            <PageTitle title={title}/>
            <div className="min-h-screen bg-stone-100">
                <Header/>
                <main className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl items-center px-4 py-8 min-[930px]:px-6 min-[930px]:py-12">
                    <section className="relative w-full overflow-hidden rounded-[28px] border border-stone-200 bg-white px-6 py-10 shadow-[0_18px_50px_rgba(28,25,23,0.08)] min-[930px]:px-12 min-[930px]:py-14">
                        <div className="pointer-events-none absolute right-6 top-4 text-[88px] font-black leading-none tracking-[-0.08em] text-orange-100 min-[930px]:right-10 min-[930px]:top-6 min-[930px]:text-[180px]">
                            {status}
                        </div>
                        <div className="relative mx-auto flex max-w-3xl flex-col items-start gap-8">
                            <div className="space-y-6">
                                <span className="inline-flex w-fit rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-600">
                                    Error {status}
                                </span>
                                <div className="space-y-4">
                                    <h1 className="max-w-2xl text-4xl font-bold tracking-[-0.04em] text-stone-900 min-[930px]:text-6xl">
                                        {title}
                                    </h1>
                                    <p className="max-w-xl text-base leading-7 text-stone-600 min-[930px]:text-lg">
                                        {description}
                                    </p>
                                </div>
                            </div>
                            <div className="h-px w-full bg-stone-200"/>
                            <div className="flex flex-col gap-3 min-[560px]:flex-row">
                                <Link
                                    to="/"
                                    className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                                >
                                    Browse recipes
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
