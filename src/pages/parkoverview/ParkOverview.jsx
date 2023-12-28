import './ParkOverview.css';
import {useEffect, useState} from "react";
import axios from "axios";
import ParkCard from "../../components/parkcard/ParkCard.jsx";
import Button from "../../components/button/Button.jsx";

function ParkOverview() {

    const [parks, setParks] = useState([]);
    const apiKey = 'roL3fF3OPDvIsDg5Wrj190JFA4XOUV3OQLGfvifs';
    const parksPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedState, setSelectedState] = useState('');
    const [states, setStates] = useState([]);

    const indexOfLastPark = currentPage * parksPerPage;
    const indexOfFirstPark = indexOfLastPark - parksPerPage;
    const currentParks = parks.filter(park => !selectedState || park.states.split(',')[0] === selectedState).slice(indexOfFirstPark, indexOfLastPark);

    useEffect(() => {
        async function fetchParks() {
            try {
                const response = await axios.get('https://developer.nps.gov/api/v1/parks?limit=500', {
                    headers: {
                        'X-Api-Key': apiKey,
                    },
                });
                setParks(response.data.data);
                console.log(response);

                const uniqueStates = Array.from(new Set(response.data.data.map(park => park.states.split(',')[0]))).sort();
                setStates(uniqueStates);


            } catch (error) {
                console.error('Error fetching park data:', error);
            }
        }

        fetchParks();
    }, []); // Dependency leeg laten omdat het effect alleen plaats vind bij mounten


    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }


    return (

        <main className='outer-container-parkoverview'>
            <section className="parkoverview-header">
                <div className="parkoverview-header-content">
                    <h1>De Nationale Parken van de Verenigde Staten</h1>
                </div>
            </section>

            <section className='park-cards-outer-container'>
                <div className='filter-and-buttons'>
                    {/*Dropdown filter om per state te filteren*/}
                    <select onChange={(e) => setSelectedState(e.target.value)} className='style-filter-menu'>
                        <option value="">Alle Staten</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>

                    <div>
                        <Button
                            buttonType='button'
                            clickHandler={() => paginate(currentPage - 1)}
                            buttonState={currentPage === 1}
                            buttonClass='styleButton'
                        >
                            Vorige
                        </Button>

                        <Button
                            buttonType='button'
                            clickHandler={() => paginate(currentPage + 1)}
                            buttonState={indexOfLastPark >= parks.length}
                            buttonClass='styleButton'
                        >
                            Volgende
                        </Button>
                    </div>
                </div>

                    <div className="park-cards-inner-container">
                        {currentParks.map((park) => (
                            <ParkCard
                                key={park.id}
                                park={park}
                                linkUrl='/profile'
                                className='park-card'
                            />
                        ))}
                    </div>

            </section>
        </main>

    );
}

export default ParkOverview;