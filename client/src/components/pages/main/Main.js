import './main.scss';

const Main = (props) => {
    return (
        <div className="main">
            {props.children()}
            <h1>Main page</h1>
        </div>
    )
}

export default Main;