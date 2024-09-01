import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

function Rate({rating}) {

    const fullStars = Math.ceil(rating);

    const halfStar = rating % 1 >= 0.5;

    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    
    return (
        <div className="flex gap-x-1 text-theme">{/* Full Stars */}
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} />
        ))}
  
        {/* Half Star */}
        {halfStar && <FaStarHalfAlt />}
  
        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} />
        ))}

        </div>
    )
}

export default Rate