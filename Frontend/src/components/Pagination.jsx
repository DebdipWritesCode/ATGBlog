import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Pagination = ({ setPageNumber, totalPosts, currentPage }) => {
    const totalPages = Math.ceil(totalPosts / 6)
    let activePage = currentPage

    function handleActivePage(page) {
        setPageNumber(page)
        activePage = page
    }

    function handleNextPage() {
        if(activePage < totalPages) {
            setPageNumber(activePage + 1)
            activePage++
        }
    }

    function handlePreviousPage() {
        if(activePage > 1) {
            setPageNumber(activePage - 1)
            activePage--
        }
    }

    return (
        <div className="font-inter flex items-center justify-between mb-10">
            <div onClick={() => handlePreviousPage()} className=" flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-2">
                <GoArrowLeft size={20} color="#667085" />
                <p className="text-sm text-[#667085] font-medium">Previous</p>
            </div>
            <div className=" flex gap-6">
                {
                    totalPages > 6 ? (
                        <>
                            {[1, 2, 3].map(page => (
                                <span onClick={() => handleActivePage(page)} key={page} className={`text-sm text-[#667085] font-medium p-2 cursor-pointer hover:bg-slate-100 ${activePage === page ? 'bg-[#F9F5FF] text-[#7F56D9]' : ''}`}>
                                    {page}
                                </span>
                            ))}
                            <span className="text-sm text-[#667085] font-medium p-2">...</span>
                            {[8, 9, 10].map(page => (
                                <span onClick={() => handleActivePage(page)} key={page}className={`text-sm text-[#667085] font-medium p-2 cursor-pointer hover:bg-slate-100 ${activePage === page ? 'bg-[#F9F5FF] text-[#7F56D9]' : ''}`}>
                                    {page}
                                </span>
                            ))}
                        </>
                    ) : (
                        Array.from({ length: totalPages }, (_, index) => (
                            <span onClick={() => handleActivePage(index + 1)} key={index + 1} className={`text-sm text-[#667085] font-medium p-2 cursor-pointer hover:bg-slate-100 ${activePage === index + 1 ? 'bg-[#F9F5FF] text-[#7F56D9]' : ''}`}>{index + 1}</span>
                        ))
                    )
                }
            </div>
            <div onClick={() => handleNextPage()} className=" flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-2">
                <p className="text-sm text-[#667085] font-medium">Next</p>
                <GoArrowRight size={20} color="#667085" />
            </div>
        </div>
    )
}

export default Pagination