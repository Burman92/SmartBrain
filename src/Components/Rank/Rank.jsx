

const Rank = ({name, entries}) =>{
    return (
        <div>
            <div className="white f3 center">
                {`Hello, ${name}, the smart brain wants to analize more faces. Your current entry count is...`}
            </div>
            <div className="white f1 center">
                {entries}
            </div>
        </div>
    )
}

export default Rank