import {useState} from "react";

const FilteredList = ({ items }) => {
    const [filter, setFilter] = useState('');

    // Functie om de lijst te filteren op basis van de ingevoerde tekst
    const filteredItems = items.filter(item => item.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            {/* Filterveld */}
            <input
                type="text"
                placeholder="Filter items"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            {/* Lijst met maximaal 10 zichtbare items en scrollen voor de rest */}
            <div className="filtered-list">
                <ul>
                    {filteredItems.slice(0, 10).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FilteredList;
