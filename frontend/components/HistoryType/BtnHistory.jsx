function BtnHistory({text, isActive, onClick}){
        return (
            <button
                className={`btn-bleue ${isActive ? 'active' : ''}`}
                onClick={onClick}
            >
                {text}
            </button>
        );
}






export default BtnHistory;