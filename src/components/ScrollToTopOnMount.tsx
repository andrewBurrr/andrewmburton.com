import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopOnMount = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, [pathname]); // Trigger the effect whenever the pathname changes

    return null; // This component doesn't render anything
};

export {ScrollToTopOnMount};
