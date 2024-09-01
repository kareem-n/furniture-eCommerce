
import { MdArrowForwardIos } from "react-icons/md";


function NextArrow({ style, className, onClick }) {


    return (
        <div
            style={{ ...style }}
            className={className }
            onClick={onClick}
        >
            <MdArrowForwardIos  className="text-2xl md:text-3xl text-theme opacity-50 hover:opacity-100 -translate-y-1/2 hover:translate-x-0 transition-all -translate-x-3" />
        </div>
    )
}

export default NextArrow