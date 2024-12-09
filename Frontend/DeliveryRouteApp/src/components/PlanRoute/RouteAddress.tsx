import { FaRegTrashAlt } from "react-icons/fa";
import { useRouteStore } from "../../stores/useRouteStore";

export const RouteAddress: React.FC<{
  guid: string;
  label: string;
  index?: number;
  isStartLoc?: boolean;
}> = ({ guid, label, index, isStartLoc }) => {
  const { removeLocation } = useRouteStore();

  return (
    <div
      className={
        " border-2  flex p-3 rounded-lg " +
        (isStartLoc ? "mb-5 border-gray-200" : "border-gray-200")
      }
    >
      <div className=" flex flex-row gap-2.5 items-center">
        {!isStartLoc && (
          <div className=" bg-blue-200 rounded-full w-7 h-7 flex items-center justify-center">
            <div className=" font-semibold text-sm">{index}</div>
          </div>
        )}
        <div className=" font-semibold">{label}</div>
      </div>
      <div
        className="bg-red-500 rounded-lg ml-auto p-2.5 text-white flex items-center justify-center hover:cursor-pointer"
        onClick={() => {
          removeLocation(guid);
        }}
      >
        <FaRegTrashAlt size={13} />
      </div>
    </div>
  );
};
