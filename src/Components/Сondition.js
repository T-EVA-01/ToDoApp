export default function Condition(props) {

    const type = props.type

    switch(type) {
        case 1:
            return(    
                props.isActive && props.children
            );
        case 2:
            return(
                props.isActive ? props.children : props.defaultElement
            ); 
        default:
            console.log("Передайте в компонент Condition проп type со значениями 1 или 2");
            break
    }

}