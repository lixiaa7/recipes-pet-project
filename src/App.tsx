import './App.css'
import {Outlet} from 'react-router-dom'
import Header from './components/header/Header.tsx'
import { useSearchParams } from 'react-router-dom';
import {useCallback} from "react";

function App() {
    const [searchParams, setSearchParams] = useSearchParams();


    const isModalOpen = searchParams.get('add') === 'recipe';


    const openModal = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.set('add', 'recipe');
        setSearchParams(params);
    }, [searchParams, setSearchParams]);

    const closeModal = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('add');
        setSearchParams(params);
    };

    return (
        <>
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
