import Image from "next/image";
import { useCountries } from "../lib/getCountries";
import Link from "next/link";
import {
	AddToFavoriteButton,
	DeleteFromFavoriteButton,
} from "./CreateSubmitButton";
import { addToFavorite, deleteFromFavorite } from "../actions";

interface ListingProps {
	photo: string;
	description: string;
	location: string;
	price: number;
	userId: string | undefined;
	isInFavoriteList: boolean;
	favoriteId: string;
	homeId: string;
	pathName: string;
}
function ListingCard({
	photo,
	description,
	location,
	price,
	userId,
	favoriteId,
	isInFavoriteList,
	homeId,
	pathName,
}: ListingProps) {
	const { getCountryByValue } = useCountries();
	const country = getCountryByValue(location);
	return (
		<div className="flex flex-col">
			<div className="relative h-72">
				<Image
					src={`https://igmtkcfparrontuwpwwu.supabase.co/storage/v1/object/public/images/${photo}`}
					alt="Home Photo"
					className="rounded-lg h-full object-cover mb-3"
					fill
				/>
				{userId && (
					<div className="z-10 absolute top-2 right-2">
						{isInFavoriteList ? (
							<form action={deleteFromFavorite}>
								<input type="hidden" name="favoriteId" value={favoriteId} />
								<input type="hidden" name="userId" value={userId} />
								<input type="hidden" name="pathName" value={pathName} />
								<DeleteFromFavoriteButton />
							</form>
						) : (
							<form action={addToFavorite}>
								<input type="hidden" name="userId" value={userId} />
								<input type="hidden" name="homeId" value={homeId} />
								<input type="hidden" name="pathName" value={pathName} />
								<AddToFavoriteButton />
							</form>
						)}
					</div>
				)}
			</div>

			<Link href={`/home/${homeId}`}>
				<h3 className="font-medium text-base mt-5">
					{country?.flag} {country?.label} - {country?.region}
				</h3>
				<p className="text-muted-foreground line-clamp-2">{description}</p>
				<p className="pt-2 to-muted-foreground">
					<span className="font-medium">${price}</span> Night
				</p>
			</Link>
		</div>
	);
}

export default ListingCard;
