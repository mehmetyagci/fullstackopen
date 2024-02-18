const Filter = ({filter, setFilter}) => {
    console.log('Filter');

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            find countries <input value={filter} onChange={handleChange} />
        </div>
    )
}

export default Filter;
