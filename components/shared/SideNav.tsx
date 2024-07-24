import Link from "next/link";
import DashNavLinks from "./DashNavLinks";

export default function SideNav () {
  return (
    <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      <DashNavLinks />
    </div>
  )
}

