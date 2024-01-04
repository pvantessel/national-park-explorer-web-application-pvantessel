import './ParkOverview.css';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import ParkCard from '../../components/parkcard/ParkCard.jsx';
import Button from '../../components/button/Button.jsx';
import stateAbbreviations from '../../constants/stateAbbreviations.jsx';

function ParkOverview() {
    const apiKey = 'roL3fF3OPDvIsDg5Wrj190JFA4XOUV3OQLGfvifs';
    const [parks, setParks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [parksPerPage, setParksPerPage] = useState(20);
    const [selectedState, setSelectedState] = useState('');
    const [states, setStates] = useState([]);
    const indexOfLastPark = currentPage * parksPerPage;
    const indexOfFirstPark = indexOfLastPark - parksPerPage;
    const currentParks = parks.filter(park => !selectedState || park.states.split(',')[0] === selectedState).slice(indexOfFirstPark, indexOfLastPark);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const topRef = useRef();

    useEffect(() => {
        const controller = new AbortController();

        async function fetchParks() {
            toggleLoading(true);
            toggleError(false);

            try {
                // Haal data op vanuit het parks endpoint
                const response = await axios.get('https://developer.nps.gov/api/v1/parks?limit=500', {
                    headers: {
                        'X-Api-Key': apiKey,
                    },
                    signal: controller.signal,
                });

                // Map door de parken en controleer of een afbeeldings-URL beschikbaar is
                const updatedParks = response.data.data.map((park) => {
                    const imageUrl = park.images && park.images.length > 0 ? park.images[0].url : null;
                    return {...park, imageUrl};
                });

                setParks(updatedParks);

                //Update de states state met een geordende lijst van unieke staten die we halen uit de parkgegevens.
                const uniqueStates = Array.from(new Set(updatedParks.map((park) => park.states.split(',')[0]))).sort();
                setStates(uniqueStates);

            } catch (e) {
                console.error(e);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        void fetchParks();

        return function cleanup() {
            controller.abort(); // <--- request annuleren
            console.log('unmount effect is triggered');
        }
    }, []); // Dependency leeg laten omdat het effect alleen plaats vind bij mounten

    // Deze functie wordt gebruikt om de huidige pagina bij te werken in de state en ook om het scherm automatisch
    // naar een bepaalde plek (topRef) te laten scrollen wanneer naar een pagina wordt genavigeerd.
    function paginate(pageNumber) {
        setCurrentPage(pageNumber);

        if (topRef.current) {
            topRef.current.scrollIntoView({behavior: 'auto'});
        }
    }

    // Deze functie wordt gebruikt om het aantal parken per pagina aan te kunnen passen (20 of 50)
    function handleParksPerPageChange(event) {
        setParksPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    }

    // Functie om de geselecteerde staat te wijzigen en de pagina terug te zetten naar de eerste pagina
    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setCurrentPage(1);
    };

    return (
        <main className='parkoverview-outer-container'>
            <section className='parkoverview-header'>
                <div className='parkoverview-header-content'>
                    <h1>De Nationale Parken van de Verenigde Staten</h1>
                </div>
            </section>

            <section className='parkoverview-text-section' ref={topRef}>
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

            <section className='parkoverview-filter-and-buttons'>
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
                {/*Dropdown filter om per state te filteren*/}
                <select onChange={handleStateChange} className='parkoverview-style-filter-menu'>
                    <option value="">Alle gebieden</option>
                    {states.map(state => (
                        <option key={state} value={state}>{stateAbbreviations[state] || 'Unknown'}</option>
                    ))}
                </select>
            </section>

            <section className='park-cards-outer-container'>

                {Object.keys(currentParks).length > 0 &&

                    <div className='park-cards-inner-container'>
                        {currentParks.map((park) => (
                            <ParkCard
                                key={park.id}
                                park={park}
                                linkUrl={`/parkdetails/${park.id}`}
                                className='park-card'
                                classNameCard='park-card'
                                classNameText='park-card-text'
                            />
                        ))}
                    </div>
                }
                {loading && <p>Loading...</p>}
                {Object.keys(currentParks).length === 0 && error &&
                    <p>Er ging iets mis bij het ophalen van dit park...</p>}

            </section>

            <section className='parkoverview-filter-and-buttons'>
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
                <div className='select-parks-page'>
                    <label htmlFor="parksPerPage">Aantal parken per pagina: </label>
                    <select
                        id="parksPerPage"
                        onChange={handleParksPerPageChange}
                        value={parksPerPage}
                    >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </section>
        </main>
    );
}

export default ParkOverview;