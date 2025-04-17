import facebookLogo from "@/assets/svg/facebook.svg";
import instagramLogo from "@/assets/svg/instagram.svg";
import youtubeLogo from "@/assets/svg/youtube.svg";
import Image from "next/image";
import PaddingContainer from "../PaddingContainer";
const TopBar = () => {
  return (
    <div className="hidden md:block w-full h-12 bg-[#F8FAFB] drop-shadow-sm">
      <PaddingContainer className=" px-8     flex justify-end items-center h-full mx-auto">
        <ul className="flex items-center gap-4 ">
          <li>
            <Image
              src={facebookLogo}
              alt="Facebook"
              className="h-7 w-7 inline-block mr-2"
            />
          </li>
          <li>
            <Image
              src={instagramLogo}
              alt="Instagram"
              className="h-7 w-7 inline-block mr-2"
            />
          </li>
          <li>
            <Image
              src={youtubeLogo}
              alt="Youtube"
              className="h-7 w-7 inline-block mr-2"
            />
          </li>
        </ul>
      </PaddingContainer>
    </div>
  );
};

export default TopBar;
