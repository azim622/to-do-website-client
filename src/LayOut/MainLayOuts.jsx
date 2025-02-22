import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayOuts = () => {
    return (
        <div>
        <header>
            {/* <Header /> */}
        </header>
        <main>
            {/* Render child routes here */}
            <Outlet />
        </main>
        <footer>
            {/* <Footer /> */}
        </footer>
    </div>
    );
};

export default MainLayOuts;