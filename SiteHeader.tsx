import React from 'react';

const SiteHeader = () => {
    return (
        <header>
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo.png`} alt="Logo" />
            {/* Other header content */}
        </header>
    );
};

export default SiteHeader;