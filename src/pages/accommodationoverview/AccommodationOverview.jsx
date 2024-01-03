import './AccommodationOverview.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import AccommodationCard from "../../components/accommodationcard/AccommodationCard.jsx";

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
        async function fetchCampgrounds() {
            toggleLoading(true);
            toggleError(false);

            try {
                const parksResponse = await axios.get(
                    'https://developer.nps.gov/api/v1/parks?limit=500',
                    {
                        headers: {
                            'X-Api-Key': apiKey,
                        },
                    }
                );
                const campgroundsResponse = await axios.get(
                    'https://developer.nps.gov/api/v1/campgrounds?limit=1000',
                    {
                        headers: {
                            'X-Api-Key': apiKey,
                        },
                    }
                );

                // Sla alleen de dataset op
                const dataParksResponse = parksResponse.data;
                const dataCampgroundsResponse = campgroundsResponse.data;

                // Combineer de datasets tot één object
                const combinedData = {
                    dataFromEndpointParks: dataParksResponse,
                    dataFromEndpointCampgrounds: dataCampgroundsResponse,
                };

                console.log(combinedData);

                // Map door de parken en controleer of een afbeeldings-URL beschikbaar is
                const updatedCampgrounds = campgroundsResponse.data.data.map((campground) => {
                    const imageUrl = campground.images && campground.images.length > 0 ? campground.images[0].url : null;
                    return {...campground, imageUrl};
                });

                setCampgrounds(updatedCampgrounds);
                console.log(campgroundsResponse.data);

            } catch (error) {
                toggleError(true);
                console.error('Error fetching campgrounds:', error);
            } finally {
                toggleLoading(false);
            }
        }

        fetchCampgrounds();

        return () => {
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
            <section className='accommodation-header'>
                <div className='accommodation-header-content'>
                    <h1>Accommodaties</h1>
                </div>
            </section>

            <section className='accommodation-text-section' ref={topRef}>
                <div className='accommodation-text-section-content'>
                    <h3>Ben je van plan om ook te blijven slapen?</h3>
                    <h5>Nog wat text.</h5>
                </div>
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

            </section>

            <section className='accommodation-cards-outer-container'>

                {Object.keys(currentCampgrounds).length > 0 &&

                    <div className='accommodation-cards-inner-container'>

                        {currentCampgrounds.sort((a, b) => a.name.localeCompare(b.name)).map((campground) => (
                            <AccommodationCard
                                key={campground.id}
                                campground={campground}
                                linkUrl='/profile'
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
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </section>

        </main>
    );
}

export default AccommodationOverview;
