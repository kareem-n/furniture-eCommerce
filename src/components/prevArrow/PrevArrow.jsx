import { MdArrowBackIos } from "react-icons/md";

function PrevArrow({ style, className, onClick }) {
  return (
    <div
            style={{ ...style }}
            className={className }
            onClick={onClick}
        >
            <MdArrowBackIos className="text-theme text-2xl md:text-3xl opacity-50 hover:opacity-100 -translate-y-1/2 hover:translate-x-0 transition-all translate-x-3" />
        </div>
  )
}

export default PrevArrow