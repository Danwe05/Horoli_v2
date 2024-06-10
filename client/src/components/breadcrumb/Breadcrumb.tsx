import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Breadcrumb = ({ links }) => {
  return (
    <nav aria-label="breadcrumb" className="flex items-center py-4">
      <ol className="breadcrumb flex flex-wrap list-none pl-0 mb-0 text-[15px] font-[500] text-[#878c9f] ">
        {links.map((link, index) => (
          <li
            key={index}
            className="breadcrumb-item flex justify-center items-center px-1"
          >
            {index > 0 && <MdOutlineKeyboardArrowRight />}
            {index === links.length - 1 ? (
              <div className="flex justify-center items-center">
                <span className="text-gray-600 px-1">{link.title}</span>
              </div>
            ) : (
              <Link
                to={link.href}
                className="text-[15px] font-[500] px-1 text-[#878c9f] hover:text-blue-900"
              >
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;