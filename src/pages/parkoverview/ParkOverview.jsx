import './ParkOverview.css';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import ParkCard from '../../components/parkcard/ParkCard.jsx';
import Button from '../../components/button/Button.jsx';
import stateAbbreviations from '../../constants/stateAbbreviations.jsx';

function ParkOverview() {
    const [parks, setParks] = useState([]);
    const apiKey = 'roL3fF3OPDvIsDg5Wrj190JFA4XOUV3OQLGfvifs';
    const parksPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedState, setSelectedState] = useState('');
    const [states, setStates] = useState([]);
    const topRef = useRef();
    const indexOfLastPark = currentPage * parksPerPage;
    const indexOfFirstPark = indexOfLastPark - parksPerPage;
    const currentParks = parks.filter(park => !selectedState || park.states.split(',')[0] === selectedState).slice(indexOfFirstPark, indexOfLastPark);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        // const controller = new AbortController();

        async function fetchParks() {
            toggleLoading(true);
            toggleError(false);

            try {
                const response = await axios.get('https://developer.nps.gov/api/v1/parks?limit=500', {
                    headers: {
                        'X-Api-Key': apiKey,
                    },
                    // signal: controller.signal,
                });

                // Map door de parken en controleer of een afbeeldings-URL beschikbaar is
                const updatedParks = response.data.data.map((park) => {
                    const imageUrl = park.images && park.images.length > 0 ? park.images[0].url : null;
                    return {...park, imageUrl};
                });

                setParks(updatedParks);
                console.log(response);

                const uniqueStates = Array.from(new Set(updatedParks.map((park) => park.states.split(',')[0]))).sort();
                setStates(uniqueStates);


            } catch (e) {
                // if (axios.isCancel(e)) {
                //     console.error('Request is canceled...');
                // } else {
                    console.error(e);
                    toggleError(true);
                // }
                // console.error('Error fetching park data:', error);
            } finally {
                toggleLoading(false);
            }
        }

        fetchParks();

        return () => {
            console.log('unmount effect is triggered');
            // controller.abort();
        }
    }, []); // Dependency leeg laten omdat het effect alleen plaats vind bij mounten

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);

        // Scroll naar boven wanneer naar de volgende pagina wordt genavigeerd
        if (topRef.current) {
            topRef.current.scrollIntoView({behavior: 'auto'});
        }
    }

    // Functie om de geselecteerde staat te wijzigen en de pagina terug te zetten naar de eerste pagina
    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setCurrentPage(1);  // Reset de pagina naar de eerste pagina
    };

    return (
        <main className='parkoverview-outer-container'>
            <section className='parkoverview-header'>
                <div className='parkoverview-header-content'>
                    <h1>De Nationale Parken van de Verenigde Staten</h1>
                </div>
            </section>

            <section className='parkoverview-text-section' ref={topRef} >
                <div className='parkoverview-text-section-content'>
                    <h3>
                        Op zoek naar een "mooi pareltje".
                    </h3>
                    <h5>
                        In de Verenigde Staten zijn honderden verschillende locaties geregistreerd als National Park.
                        Het zijn echter niet allemaal die enorme natuurgebieden, zoals bv. een Yellowstone, maar er
                        staan ook historische monumenten op de lijst en zelfs een paar van de mooiste hiking trails.
                    </h5>
                    <h5>
                        Op deze pagina vind je de complete lijst en kan je filteren op locaties die gelegen zijn in
                        een van de Verenigde Staten of op een van de eilanden die behoren tot de territoriale gebieden
                        van de Verenigde Staten.
                    </h5>
                </div>
            </section>

            <section className='filter-and-buttons' >
                {/*Dropdown filter om per state te filteren*/}
                <select onChange={handleStateChange} className='style-filter-menu'>
                    <option value="">Alle gebieden</option>
                    {states.map(state => (
                        <option key={state} value={state}>{stateAbbreviations[state] || 'Unknown'}</option>
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
            </section>

            <section className='park-cards-outer-container'>

                {Object.keys(currentParks).length > 0 &&

                    <div className='park-cards-inner-container'>
                        {currentParks.map((park) => (
                            <ParkCard
                                key={park.id}
                                park={park}
                                linkUrl='/profile'
                                className='park-card'
                            />
                        ))}
                    </div>
                }
                {loading && <p>Loading...</p>}
                {Object.keys(currentParks).length === 0 && error &&
                    <p>Er ging iets mis bij het ophalen van dit park...</p>}

            </section>

            <section className='filter-and-buttons'>
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
            </section>
        </main>
    );
}

export default ParkOverview;