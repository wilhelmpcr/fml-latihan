import { ImSpinner2 } from "react-icons/im";
import { MdRestaurantMenu } from "react-icons/md";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-green-500 p-4 rounded-2xl shadow-lg">
          <MdRestaurantMenu className="text-white text-3xl" />
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <ImSpinner2 className="animate-spin text-hijau text-xl" />
          <span className="text-sm font-medium">Loading NusaCater...</span>
        </div>
      </div>
    </div>
  );
}
