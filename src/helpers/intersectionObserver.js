import React, {useState, useEffect, useRef} from 'react';


const observeElement = (options) => {

    console.log('making it to the top');
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const callBackFunction = (entries) => {
        
        const [ entry ] = entries;
        console.log([entry]);
        setIsVisible(entry.isIntersecting);
    }
    

    useEffect(()=> {
        console.log('making it to the state change');
        const observer = new IntersectionObserver(callBackFunction, options)
        if(containerRef.current) observer.observe(containerRef.current)
        
        
    }, [containerRef, options])

    return [containerRef, isVisible]; 
}

export default observeElement;
