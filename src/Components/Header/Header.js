import './Header.css'

export default function Header(props) {
    return(
        <header className="header">
            <h1 className="header__title">
                {props.title}
            </h1>
            {props.children}
        </header>
    )
}