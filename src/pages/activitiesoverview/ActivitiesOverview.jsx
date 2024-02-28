import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';

import './ActivitiesOverview.css';
import ScrollToTopOnMount from "../../components/scrolltotoponmount/ScrollToTopOnMount.jsx";
import stateAbbreviations from "../../constants/stateAbbreviations.jsx";

function ActivitiesOverview() {
    const apiKey = 'roL3fF3OPDvIsDg5Wrj190JFA4XOUV3OQLGfvifs';

    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const parkListRef = useRef(null);

    const [uniqueStates, setUniqueStates] = useState([]);
    const [filteredParks, setFilteredParks] = useState([]);
    const [selectedState, setSelectedState] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchActivities() {
            setLoading(true);
            setError(null);

            try {
                const requestActivities = await axios.get('https://developer.nps.gov/api/v1/activities/parks', {
                    params: {
                        limit: 100,
                        api_key: apiKey,
                    },
                    signal: controller.signal,
                });

                console.log('log 1: requestActivities');
                console.log(requestActivities);

                const activityList = requestActivities.data.data.map((activityItem) => ({
                    id: activityItem.id,
                    name: activityItem.name,
                    parks: activityItem.parks,
                }));

                console.log('log 2: activityList');
                console.log(activityList);

                setActivities(activityList);
                console.log('log 3: activities');
                console.log(activities);

            } catch (e) {
                console.error(e);
                setError('Er is een fout opgetreden bij het ophalen van de activiteiten.');
            } finally {
                setLoading(false);
            }
        }

        void fetchActivities();

        return function cleanup() {
            controller.abort();
            console.log('unmount effect is triggered');
        };
    }, []);

    const handleActivityClick = (selectedActivity) => {
        setSelectedActivity(selectedActivity);
        setSelectedState('');
        const states = selectedActivity.parks.reduce((acc, park) => {
            if (park.states) {
                acc.push(...park.states.split(','));
            }
            return acc;
        }, []);
        const uniqueStates = Array.from(new Set(states)).filter(Boolean).sort();
        setUniqueStates(uniqueStates);
        setFilteredParks(selectedActivity.parks);

        // Scroll naar de lijst met parken wanneer een activiteit wordt geselecteerd
        if (parkListRef.current) {
            setTimeout(() => {
                parkListRef.current.scrollIntoView({behavior: 'smooth'});
            }, 0);
        }
    };

    // Utility function to get the full state name from abbreviation
    function getFullStateName(abbreviation) {
        return stateAbbreviations[abbreviation] || abbreviation;
    }

    const handleStateChange = (e) => {
        const newState = e.target.value;
        setSelectedState(newState);

        // const fullStateName = getFullStateName(newState);

        if (newState) {
            const parksInSelectedState = selectedActivity.parks.filter((park) =>
                park.states.split(',').includes(newState)
            );
            setFilteredParks(parksInSelectedState);
        } else {
            setFilteredParks(selectedActivity.parks);
        }
    };

    return (
        <main className='activitiesoverview-outer-container'>
            <ScrollToTopOnMount/>

            <section className='activitiesoverview-header'>
                <div className='activitiesoverview-header-content'>
                    <h1>Activiteiten</h1>
                </div>
            </section>

            <section className='activitiesoverview-text-section'>
                <div className='activitiesoverview-text-section-content'>
                    <h3>Op zoek naar een leuke activiteit?</h3>
                    <h5>Als je op bezoek bent in een van de mooie parken wil je natuurlijk ook wel wat doen of zien.
                        Of het nou iets actiefs is, zoals hiking of canyoneering of juist iets heel relaxed zoals een
                        museum bezoek of kijken naar de aanwezige wildlife. Alles is mogelijk. Hieronder vind je een
                        overzicht van alle activiteiten. Kies er een uit en je krijgt een lijst van parken waar deze
                        activiteit beschikbaar is.
                    </h5>
                </div>
            </section>

            <section className='activityGroupListView-outer' ref={parkListRef}>

                {activities.length > 0 && (
                    <div className='activityGroupListView-inner'>
                        {activities.map((activity) => (
                            <div
                                className={`activityGroupListItem ${selectedActivity === activity ? 'active' : ''}`}
                                key={activity.id}
                                onClick={() => handleActivityClick(activity)}
                            >
                                <h4>
                                    <a href='#'>{activity.name}</a>
                                </h4>
                            </div>
                        ))}
                    </div>
                )}

                {loading && <p>Loading...</p>}
                {activities.length === 0 && !loading && error &&
                    <p>Er ging iets mis bij het ophalen van de activiteiten...</p>}

            </section>

            {selectedActivity && (
                <section className='activityParkList'>
                    <div className='activityParkList-header'>
                        <div className='activityParkList-header-content'>
                            <h3>{selectedActivity.name}</h3>
                            <h5>Je vindt activiteit <span style={{color: '#3CBE6B'}}>{selectedActivity.name}</span> in
                                de onderstaande Nationale Parken. Gebruik onderstaand filter om de parken weer te geven
                                per geselecteerde staat. Meer informatie over de activiteit vind je op de website van het park.
                            </h5>
                        </div>
                    </div>

                    <div>
                        <select
                            id="stateFilter"
                            value={selectedState}
                            onChange={(e) => handleStateChange(e)}
                            className='activityParkList-style-filter-menu'
                        >
                            <option value="">Alle gebieden</option>
                            {uniqueStates.map((stateAbbreviation) => (
                                <option key={stateAbbreviation} value={stateAbbreviation}>
                                    {getFullStateName(stateAbbreviation)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {filteredParks.length > 0 && (
                        <div className="activityParkList-items">
                            <h5 className="activityParkList-link">
                                <ul className="activityParkList-StyleUl">
                                    {filteredParks.map((park) => (
                                        <li key={park.fullName}>
                                            <a
                                                className="activityParkList-StyleLi"
                                                href={park.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {park.fullName}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </h5>
                        </div>
                    )}

                    {loading && <p>Loading...</p>}
                    {filteredParks.length === 0 && !loading && error &&
                        <p>Er ging iets mis bij het ophalen van de parken...</p>}

                </section>
            )}

        </main>
    );
}

export default ActivitiesOverview;
