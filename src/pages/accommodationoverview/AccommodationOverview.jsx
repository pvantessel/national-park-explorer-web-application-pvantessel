
import './AccommodationOverview.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import AccommodationCard from "../../components/accommodationcard/AccommodationCard.jsx";
import ScrollToTopOnMount from "../../components/scrolltotoponmount/ScrollToTopOnMount.jsx";

function AccommodationOverview() {
    const apiKey = 'roL3fF3OPDvIsDg5Wrj190JFA4XOUV3OQLGfvifs';
    const [campgrounds, setCampgrounds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [campgroundsPerPage, setCampgroundsPerPage] = useState(20);
    const indexOfLastCampground = currentPage * campgroundsPerPage;
    const indexOfFirstCampground = indexOfLastCampground - campgroundsPerPage;
    const currentCampgrounds = campgrounds.slice(indexOfFirstCampground, indexOfLastCampground);
    const topRef = useRef();
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCampgrounds() {
            toggleLoading(true);
            toggleError(false);

            try {
                const parksRequest = await axios.get(
                    'https://developer.nps.gov/api/v1/parks',
                    {
                        params: {
                            limit: 500,
                            api_key: apiKey,
                        },
                        signal: controller.signal,
                    }
                );
                const campgroundsRequest = await axios.get(
                    'https://developer.nps.gov/api/v1/campgrounds',
                    {
                        params: {
                            limit: 1000,
                            api_key: apiKey,
                        },
                        signal: controller.signal,
                    }
                );

                console.log('log1');
                console.log(parksRequest);
                console.log('log2');
                console.log(campgroundsRequest);

                const [parksResponse, campgroundsResponse] = await Promise.all([parksRequest, campgroundsRequest]);

                console.log('log3');
                console.log(parksResponse);
                console.log('log4');
                console.log(campgroundsResponse);

                const parksData = parksResponse.data.data || [];
                const campgroundsData = campgroundsResponse.data.data || [];

                console.log('log5');
                console.log(parksData);
                console.log('log6');
                console.log(campgroundsData);

                // Hieronder de info verzamelen van de parken met campgrounds. Toon alle campgrounds per park.
                // Soort join op beide tabellen.
                const combinedData = parksData
                    .map((park) => {
                        const matchingCampgrounds = campgroundsData.filter((campground) => campground.parkCode === park.parkCode);

                        console.log('log7');
                        console.log(matchingCampgrounds);

                        if (matchingCampgrounds.length > 0) {
                            return {
                                parkCode: park.parkCode,
                                states: park.states,
                                fullname: park.fullName,
                                campgrounds: matchingCampgrounds.map((campground) => ({
                                    name: campground.name,
                                })),
                            };
                        } else {
                            // Geen campgrounds gevonden, dus over slaan
                            return null;
                        }
                    })
                    // Haal parken eruit waar geen campgrounds zijn gevonden
                    .filter((item) => item !== null);

                console.log('log5');
                console.log(combinedData);


                // Map door de parken en controleer of een afbeeldings-URL beschikbaar is
                const updatedCampgrounds = campgroundsResponse.data.data.map((campground) => {
                    const imageUrl = campground.images && campground.images.length > 0 ? campground.images[0].url : null;
                    return {...campground, imageUrl};
                });

                setCampgrounds(updatedCampgrounds);
                console.log('log6');
                console.log(campgroundsResponse.data);

            } catch (error) {
                toggleError(true);
                console.error('Error fetching campgrounds:', error);
            } finally {
                toggleLoading(false);
            }
        }

        void fetchCampgrounds();

        return function cleanup() {
            controller.abort(); // <--- request annuleren
            console.log('unmount effect is triggered');
        }
    }, []);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);

        if (topRef.current) {
            topRef.current.scrollIntoView({behavior: 'auto'});
        }
    }

    function handleCampgroundsPerPageChange(event) {
        setCampgroundsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    }

    return (
        <main className='accommodation-outer-container'>
            <ScrollToTopOnMount />

            <section className='accommodation-header'>
                <div className='accommodation-header-content'>
                    <h1>Campings & Lodges</h1>
                </div>
            </section>

            <section className='accommodation-text-section' ref={topRef}>
                <div className='accommodation-text-section-content'>
                    <h3>
                        Op zoek naar een plek om te overnachten?
                    </h3>
                    <h5>
                        Nog wat text.
                    </h5>
                </div>
            </section>

            <section className='accommodation-cards-outer-container'>

                {Object.keys(currentCampgrounds).length > 0 &&

                    <div className='accommodation-cards-inner-container'>

                        {currentCampgrounds.sort((a, b) => a.name.localeCompare(b.name)).map((campground) => (
                            <AccommodationCard
                                key={campground.id}
                                campground={campground}
                                linkUrl='/'
                                classNameCard='accommodation-card'
                                classNameText='accommodation-card-text'
                            />
                        ))}
                    </div>

                }
                {loading && <p>Loading...</p>}
                {Object.keys(currentCampgrounds).length === 0 && error &&
                    <p>Er ging iets mis bij het ophalen van deze accommodatie...</p>}

            </section>

            <section className='accommodation-filter-and-buttons'>
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
                        buttonClass='styleButton'
                    >
                        Volgende
                    </Button>
                </div>
                <div className='select-campgrounds-page'>
                    <label htmlFor="campgroundsPerPage">Aantal accommodaties per pagina: </label>
                    <select
                        id="campgroundsPerPage"
                        onChange={handleCampgroundsPerPageChange}
                        value={campgroundsPerPage}
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

export default AccommodationOverview;
