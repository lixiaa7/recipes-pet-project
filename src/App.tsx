import './App.css'
import {Outlet} from 'react-router-dom'
import Header from './components/header/Header.tsx'

function App() {

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
