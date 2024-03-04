import PropTypes from 'prop-types';

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

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired
};

export default Filter;
