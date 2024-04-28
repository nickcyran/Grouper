import '../styles/page.css'
import { useEffect, useState } from 'react';

const RightSideBar = ({content}) => {
    return (
        <div className="rightSideBar">
            {content}
        </div>
    )
}

const PageContent = ({Left, Main, Right}) => {
    const [showRightSidebar, setShowRightSidebar] = useState(true);

    const LeftSideBar = ({content}) => { return (
        <div className={`leftSideBar ${!showRightSidebar ? 'expanded' : ''}`}>
            {content}
        </div>)}

    const MainContent = ({content}) => { return (
        <div className={`mainContent ${!showRightSidebar ? 'expanded' : ''}`}>
            {content}
        </div>)}

    const handleResize = () => {
        setShowRightSidebar(window.innerWidth > 768);
    };

    // Add event listener for window resize
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className="page">
            <LeftSideBar content={<Left/>}/>
            <MainContent content={<Main />}/>
           
            {showRightSidebar && <RightSideBar content={<Right/>}/>}
        </div>
    )
}

export default PageContent;