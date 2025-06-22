"use client";
import { useRouter } from "next/navigation";

const Cta = ({
  children,
  className = "",
  href,
  type,
  ctaType = "default", 
  black,
  white,
  target,
  onClick,
  ...rest
}) => {
  const router = useRouter();

  const ctaStyles = {
    primary: "border-white border rounded px-6 py-3 text-white hover:bg-white hover:text-black duration-300 leading-[150%] font-medium capitalize",
    default:
      "p-4 font-inter font-medium text-lg text-white leading-[100%] bg-light-green shadow-[0px_4px_20.8px_0px_#05720382] rounded-[50px] w-full h-[54px] flex items-center justify-center cursor-pointer hover:bg-transparent hover:border-light-green hover:text-light-green transition-all duration-300",
 none:"",
    };

  const handleLinkClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
    if (href) {
      router.push(href); 
    }
  };

  return (
    <>
      {href ? (
        <a
          {...rest}
          target={target}
          href={href}
          className={`${className} ${ctaStyles[ctaType]}`}
          onClick={handleLinkClick}
        >
          {children}
        </a>
      ) : (
        <button
          {...rest}
          onClick={onClick}
          type={type || "button"}
          className={`${ctaStyles[ctaType]} ${className}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Cta;
