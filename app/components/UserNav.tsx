/* eslint-disable @next/next/no-img-element */
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	LoginLink,
	LogoutLink,
	RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

import { createAirbnbHome } from "../actions";

async function UserNav() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	const createHomeWithIdHandler = createAirbnbHome.bind(null, {
		userId: user?.id as string,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="rounded-full border px-2 py-2 lg:py-2 flex items-center gap-x-3">
					<MenuIcon className="w-6 h-6 lg:h-5 lg:w-5" />
					<img
						src={
							user?.picture ??
							"data:image/jpeg;base64,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"
						}
						alt="User Image"
						className="rounded-full w-8 h-8 hidden lg:block"
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[200px]">
				{user ? (
					<>
						<DropdownMenuItem>
							<form action={createHomeWithIdHandler} className="w-full">
								<button type="submit" className="w-full text-start">
									Airbnb your Home
								</button>
							</form>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/mylistings" className="w-full">
								My Listings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/favourites" className="w-full">
								My Favourites
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/reservations" className="w-full">
								My Reservations
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogoutLink className="w-full">Logout</LogoutLink>
						</DropdownMenuItem>
					</>
				) : (
					<>
						<DropdownMenuItem>
							<RegisterLink className="w-full">Register</RegisterLink>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<LoginLink className="w-full">Login</LoginLink>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserNav;
