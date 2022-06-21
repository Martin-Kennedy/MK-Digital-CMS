import React, {useState, useEffect, useRef} from 'react';


const observeElement = (options) => {

    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const callBackFunction = (entries) => {
        
        const [ entry ] = entries;
        setIsVisible(entry.isIntersecting);
    }
    

    useEffect(()=> {
        const observer = new IntersectionObserver(callBackFunction, options)
        if(containerRef.current) observer.observe(containerRef.current)
        
        
    }, [containerRef, options])

    return [containerRef, isVisible]; 
}

export default observeElement;
