import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "@/public/airbnb-desktop.png";
import MobileLogo from "@/public/airbnb-mobile.webp";
import UserNav from "./UserNav";
import SearchComponent from "./SearchComponent";

export default function Navbar() {
	return (
		<nav className="w-full border-b">
			<div className="flex items-center container justify-between mx-auto px-5 lg:px-10 py-5">
				<Link href="/">
					<Image
						className="w-32 hidden lg:block"
						src={DesktopLogo}
						alt="Desktop Logo"
					/>
					<Image
						className="w-32 block lg:hidden"
						src={MobileLogo}
						alt="Mobile Logo"
					/>
				</Link>

				<SearchComponent />

				<UserNav />
			</div>
		</nav>
	);
}
