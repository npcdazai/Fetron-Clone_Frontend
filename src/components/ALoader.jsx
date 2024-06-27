export default function ALoader({ isLoading }) {
    return (
        <>
            {isLoading &&
                <div className='loading-full-bg'>
                    <div className='loader'></div>
                </div>
            }
        </>
    )
}