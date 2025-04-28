import { DynamicFaIcon } from "@/components/common/DynamicFaIcon";
import PaddingContainer from "../PaddingContainer";
import { TSettings } from "@/interfaces";
const TopBar = ({ settings }: { settings: TSettings }) => {
  return (
    <div className="hidden md:block w-full h-12 bg-[#F8FAFB] drop-shadow-sm">
      <PaddingContainer className=" px-8     flex justify-end items-center h-full mx-auto">
        <ul className="flex items-center gap-4 ">
          {
            /* Social Media Icons */
            settings?.social_links?.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                className="text-white bg-red-600 p-2 rounded-full"
              >
                <DynamicFaIcon size={14} iconName={item.icon} />
              </a>
            ))
          }
        </ul>
      </PaddingContainer>
    </div>
  );
};

export default TopBar;
