const Filter = ({filter, setFilter}) => {
    console.log('Filter');

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            filter shown with <input value={filter} onChange={handleChange} />
        </div>
    )
}

export default Filter;
