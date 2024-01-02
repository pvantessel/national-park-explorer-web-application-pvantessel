// ... (import statements blijven hetzelfde)

import Button from "../../components/button/Button.jsx";
import AccommodationCard from "../../components/accommodationcard/AccommodationCard.jsx";
import axios from "axios";
import {useEffect, useRef, useState} from "react";

function AccommodationOverview() {
    const apiKey = 'roL3fF3OPDvIsDg5Wrj190JFA4XOUV3OQLGfvifs';

    const [campgrounds, setCampgrounds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [campgroundsPerPage, setCampgroundsPerPage] = useState(20);
    const topRef = useRef();

    useEffect(() => {
        async function fetchCampgrounds() {
            try {
                const campgroundsResponse = await axios.get(
                    'https://developer.nps.gov/api/v1/campgrounds?limit=1000',
                    {
                        headers: {
                            'X-Api-Key': apiKey,
                        },
                    }
                );

                const sortedCampgrounds = campgroundsResponse.data.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                setCampgrounds(sortedCampgrounds);
            } catch (error) {
                console.error('Error fetching campgrounds:', error);
            }
        }

        fetchCampgrounds();
    }, []);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);

        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'auto' });
        }
    }

    function handleCampgroundsPerPageChange(event) {
        setCampgroundsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1); // Reset de pagina naar 1 bij wijziging van het aantal campgrounds per pagina.
    }

    const indexOfLastCampground = currentPage * campgroundsPerPage;
    const indexOfFirstCampground = indexOfLastCampground - campgroundsPerPage;
    const currentCampgrounds = campgrounds.slice(indexOfFirstCampground, indexOfLastCampground);

    return (
        <main className='accommodation-outer-container'>
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

            <AccommodationCard campgrounds={currentCampgrounds} />

            <section className='accommodation-filter-and-buttons'>
                <div>
                    <label htmlFor="campgroundsPerPage">Campgrounds per pagina:</label>
                    <select
                        id="campgroundsPerPage"
                        onChange={handleCampgroundsPerPageChange}
                        value={campgroundsPerPage}
                    >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
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

        </main>
    );
}

export default AccommodationOverview;
