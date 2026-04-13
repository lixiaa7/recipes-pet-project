import './App.css'
import {Outlet} from 'react-router-dom'
import Header from './components/header/Header.tsx'
import {useMatches} from 'react-router-dom';
import {PageTitle} from './components/PageTitle.tsx'

function App() {
    const matches = useMatches();

    const current = matches[matches.length - 1];
    const title = (current?.handle as {title?: string} | undefined)?.title ?? 'App';

    return (
        <>
            <PageTitle title={title}/>
            <div className="bg-gray-50">
                <Header/>
                <div className="w-full flex justify-center items-center text-left ">
                    <Outlet/>
                </div>
            </div>

        </>
    )
}

export default App
