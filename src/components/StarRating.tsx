const StarRating = ({ rating = 4.7, max = 5 }) => {
    const percent = Math.max(0, Math.min((rating / max) * 100, 100));

    return (
        <div className="relative inline-block text-2xl leading-none">
            <div className="text-gray-300 whitespace-nowrap">★★★★★</div>

            <div
                className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-yellow-400"
                style={{ width: `${percent}%` }}
            >
                ★★★★★
            </div>
        </div>
    );
};
 export default StarRating