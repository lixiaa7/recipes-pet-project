import './App.css'
import {Outlet} from 'react-router-dom'
import Header from './components/Header'

function App() {

    return (
        <>
            <Header/>
            <div className="w-full flex justify-center items-center text-left bg-gray-50">
                <Outlet/>
            </div>

        </>
    )
}

export default App
