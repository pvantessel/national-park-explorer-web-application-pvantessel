import './ActivitiesOverview.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import ActivitiesCard from "../../components/activitiescard/ActivitiesCard.jsx";
import Button from "../../components/button/Button.jsx";
import stateAbbreviations from "../../constants/stateAbbreviations.jsx";

function ActivitiesOverview() {
    const apiKey = 'roL3fF3OPDvIsDg5Wrj190JFA4XOUV3OQLGfvifs';
    const [thingsToDo, setThingsToDo] = useState([]);
    const [activityTitles, setActivityTitles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activitiesPerPage, setActivitiesPerPage] = useState(10);
    const indexOfLastActivity = currentPage * activitiesPerPage;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const topRef = useRef();
    const [selectedActivityGroup, setSelectedActivityGroup] = useState('');
    const [selectedParkName, setSelectedParkName] = useState('');
    const [selectedStateName, setSelectedStateName] = useState('');
    const [filteredParkNames, setFilteredParkNames] = useState([]);
    const [filteredActivityGroups, setFilteredActivityGroups] = useState([]);
    const [filteredStateNames, setFilteredStateNames] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchActivities() {
            setLoading(true);
            setError(null);

            try {
                const requestThingsToDo = await axios.get('https://developer.nps.gov/api/v1/thingstodo', {
                    params: {
                        limit: 5000,
                        api_key: apiKey,
                    },
                    signal: controller.signal,
                });

                console.log('log0 requestThingsToDo');
                console.log(requestThingsToDo);

                // Voeg een aantal zaken toe aan activity
                const updatedActivities = requestThingsToDo.data.data.map(activity => {
                    const imageUrl =
                        activity.images && activity.images.length > 0 ? activity.images[0].url : null;
                    const activityGroup =
                        activity.activities && activity.activities.length > 0 ? activity.activities[0].name : '';
                    const parkName =
                        activity.relatedParks && activity.relatedParks.length > 0 ? activity.relatedParks[0].fullName : '';
                    const stateName =
                        activity.relatedParks && activity.relatedParks.length > 0 ? activity.relatedParks[0].states : '';
                    return { ...activity, imageUrl, activityGroup, parkName, stateName };
                });

                console.log('log1 updatedActivities');
                console.log(updatedActivities);

                setThingsToDo(updatedActivities);

                // Haal de titels eruit en sorteer de lijst op alfabet
                const titles = requestThingsToDo.data.data.map((activityData) => activityData.title).sort();

                setActivityTitles(titles);

                // Genereer een unieke lijst van parkNames gebaseerd op de geselecteerde activityGroup of stateName
                const parkNamesFilter = Array.from(
                    new Set(
                        updatedActivities
                            .filter((activity) => selectedActivityGroup ? activity.activityGroup === selectedActivityGroup : true)
                            .filter((activity) => selectedStateName ? activity.stateName === selectedStateName : true)
                            .map((activity) => activity.parkName))
                ).sort();

                setFilteredParkNames(parkNamesFilter);

                console.log('log2 parkNamesFilter');
                console.log(parkNamesFilter);

                // Genereer een unieke lijst van activityGroups gebaseerd op de geselecteerde parkName of stateName
                const activityGroupsFilter = Array.from(
                    new Set(
                        updatedActivities
                            .filter((activity) => selectedParkName ? activity.parkName === selectedParkName : true)
                            .filter((activity) => selectedStateName ? activity.stateName === selectedStateName : true)
                            .map((activity) => activity.activityGroup)
                    )
                ).sort();
                setFilteredActivityGroups(activityGroupsFilter);

                console.log('log3 activityGroupsFilter');
                console.log(activityGroupsFilter);

                // Genereer een unieke lijst van stateNames gebaseerd op de geselecteerde parkName of activityGroup
                const stateNameFilter = Array.from(
                    new Set(
                        updatedActivities
                            .filter((activity) => selectedParkName ? activity.parkName === selectedParkName : true)
                            .filter((activity) => selectedActivityGroup ? activity.activityGroup === selectedActivityGroup : true)
                            .flatMap((activity) => activity.stateName.split(',')) // Splits staatscodes gescheiden door komma's
                            .map((stateCode) => stateCode.trim().toUpperCase())  // Gebruik trim() en toUpperCase()
                    )
                ).filter(Boolean).sort();
                setFilteredStateNames(stateNameFilter);

                console.log('log4 stateNameFilter');
                console.log(stateNameFilter);

            } catch (e) {
                console.error(e);
                setError("Er is een fout opgetreden bij het ophalen van activiteiten.");
            } finally {
                setLoading(false);
            }
        }

        void fetchActivities();

        return function cleanup() {
            controller.abort(); // <--- request annuleren
            console.log('unmount effect is triggered');
        }
    }, [selectedActivityGroup, selectedParkName, selectedStateName]);


    // Deze functie wordt gebruikt om de huidige pagina bij te werken in de state en ook om het scherm automatisch
    // naar een bepaalde plek (topRef) te laten scrollen wanneer naar een pagina wordt genavigeerd.
    function paginate(pageNumber) {
        setCurrentPage(pageNumber);

        if (topRef.current) {
            topRef.current.scrollIntoView({behavior: 'auto'});
        }
    }

    // Deze functie wordt gebruikt om het aantal parken per pagina aan te kunnen passen (20 of 50)
    function handleActivitiesPerPageChange(event) {
        setActivitiesPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    }

    // Pas de state aan met de geselecteerde activityGroup waarde
    function handleActivityGroupChange(event) {
        setSelectedActivityGroup(event.target.value);
    }

    // Pas de state aan met de geselecteerde parkName waarde
    function handleParkNameChange(event) {
        setSelectedParkName(event.target.value);
        setCurrentPage(1); // Reset de pagina wanneer parknaam verandert
    }

    function handleStateNameChange(event) {
        const selectedStateCode = event.target.value;
        console.log('Selected State Code:', selectedStateCode);

        setSelectedStateName(selectedStateCode);
        setCurrentPage(1);
    }

    return (

    <main className='activitiesoverview-outer-container'>
        <section className='activitiesoverview-header'>
            <div className='activitiesoverview-header-content'>
                <h1>Activiteiten</h1>
            </div>
        </section>

        <section className='activitiesoverview-text-section' ref={topRef}>
            <div className='activitiesoverview-text-section-content'>
                <h3>
                    Op zoek naar een leuke activiteit?
                </h3>
                <h5>
                    Op deze pagina vind je een compleet overzicht van de meer dan 3000 !! activiteiten die
                    in de Nationale Parken te ondernemen zijn. Dus ben je op zoek naar iets sportiefs of juist
                    iets cultureels of wil je gewoon lekker genieten van de prachtige natuur die de Verenigde Staten
                    ons te bieden heeft, ga hieronder dan vooral op zoek naar jouw favoriete activiteit(en).
                </h5>
            </div>
        </section>

        <section className='activitiesoverview-filter-and-buttons'>

            {/* Dropdown-filter voor activityGroup */}
            <select
                id='activityGroup'
                onChange={handleActivityGroupChange}
                value={selectedActivityGroup}
                className='activitiesoverview-style-filter-menu'
            >
                <option value="">Alle activiteiten</option>
                {filteredActivityGroups.map((activityGroup, index) => (
                    <option key={index} value={activityGroup}>
                        {activityGroup}
                    </option>
                ))}
            </select>

            {/* Dropdown-filter voor parkName */}
            <select
                id='parkName'
                onChange={handleParkNameChange}
                value={selectedParkName}
                className='activitiesoverview-style-filter-menu'
            >
                <option value=''>Alle parken</option>
                {filteredParkNames.map((parkName, index) => (
                    <option key={index} value={parkName}>
                        {parkName}
                    </option>
                ))}
            </select>

            {/* Dropdown-filter voor stateName */}
            <select
                id='stateName'
                onChange={handleStateNameChange}
                value={selectedStateName}
                className='activitiesoverview-style-filter-menu'
            >
                <option value=''>Alle gebieden</option>
                {filteredStateNames.map((stateName, index) => (
                    <option key={index} value={stateName}>
                        {stateName}
                    </option>
                ))}
            </select>

        </section>

        <section className='activities-cards-outer-container'>

            {loading && <p>Loading...</p>}
            {activityTitles.length === 0 && !loading && error &&
                <p>Er ging iets mis bij het ophalen van deze activiteit...</p>}

            {activityTitles.length > 0 && (
                <div className='activities-cards-inner-container'>
                    {activityTitles
                        .filter(title =>
                            selectedActivityGroup
                                ? thingsToDo.find(activity => activity.title === title)?.activityGroup ===
                                selectedActivityGroup
                                : true
                        )
                        .filter((title) =>
                            selectedParkName
                                ? thingsToDo.find((activity) => activity.title === title)?.parkName ===
                                selectedParkName
                                : true
                        )
                        .filter((title) =>
                            selectedStateName
                                ? thingsToDo.find((activity) => activity.title === title)?.stateName ===
                                selectedStateName
                                : true
                        )
                        .slice((currentPage - 1) * activitiesPerPage, indexOfLastActivity)
                        .map((title, index) => (
                            <ActivitiesCard
                                key={index}
                                activity={title}
                                linkUrl='/'
                                imageUrl={
                                    thingsToDo.find(activity => activity.title === title)?.imageUrl
                                }
                                classNameCard='activities-card'
                            />
                        ))}
                </div>
            )}
        </section>

        <section className='activitiesoverview-filter-and-buttons'>
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
                    buttonState={indexOfLastActivity >= activityTitles.length}
                    buttonClass='styleButton'
                >
                    Volgende
                </Button>
            </div>
            <div className='select-activities-page'>
                <label htmlFor="activitiesPerPage">Aantal activiteiten per pagina: </label>
                <select
                    id="activitiesPerPage"
                    onChange={handleActivitiesPerPageChange}
                    value={activitiesPerPage}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </section>

    </main>
);
}
export default ActivitiesOverview;