import './App.css'
import {Outlet} from 'react-router-dom'
import Header from './components/header/Header.tsx'
import {useMatches} from 'react-router-dom';
import {PageTitle} from './components/PageTitle.tsx'
import {useSelector} from 'react-redux';
import type {RootState} from './store/store.ts';
import {AddRecipeModal} from './routes/AddRecipeModal.tsx';

function App() {
    const matches = useMatches();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);

    const current = matches[matches.length - 1];
    const title = (current?.handle as {title?: string} | undefined)?.title ?? 'App';

    return (
        <>
            <PageTitle title={title}/>
            {isOpen && <AddRecipeModal/>}
            <div className="min-h-screen bg-gray-50">
                <Header/>
                <div className="w-full flex justify-center items-start text-left">
                    <Outlet/>
                </div>
            </div>

        </>
    )
}

export default App
