import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { ImCross } from "react-icons/im";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default function Navbar() {
  return (
    <div className="bg-primary">
      <div>
        <Menu
          pageWrapId={"page-wrap"}
          outerContainerId={"body"}
          right
          customCrossIcon={<ImCross className="text-primary" />}
          customBurgerIcon={<HiOutlineMenuAlt3 className="text-white" />}
        >
          <Link href="/">
            <a className="bm-item text-primary">Home</a>
          </Link>
          <Link href="/map">
            <a className="bm-item text-primary">Map</a>
          </Link>
          <Link href="/list">
            <a className="bm-item text-primary">Places</a>
          </Link>
          <Link href="/submit">
            <a className="bm-item text-primary">Submit</a>
          </Link>
          <Link href="/contact">
            <a className="bm-item text-primary">Contact</a>
          </Link>
        </Menu>
      </div>
      <div id="page-wrap">
        <Link href="/">
          <a className="text-white normal-case text-2xl md:text-3xl px-0 m-1 md:m-4 float-left">
            Wailuku Walking Tour
          </a>
        </Link>
      </div>
    </div>
  );
}
