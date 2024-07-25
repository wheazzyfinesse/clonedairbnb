/* eslint-disable @next/next/no-img-element */
import { createReservation } from "@/app/actions";
import CategoryShowcase from "@/app/components/CategoryShowcase";
import { ReservationButton } from "@/app/components/CreateSubmitButton";
import HomeMap from "@/app/components/HomeMap";
import SelectedCalender from "@/app/components/SelectedCalender";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

import { unstable_noStore as noStore } from "next/cache";
const getData = async (homeId: string) => {
	noStore();

	const data = await prisma.home.findUnique({
		where: {
			id: homeId,
		},
		select: {
			photo: true,
			price: true,
			description: true,
			country: true,
			guests: true,
			bedrooms: true,
			bathrooms: true,
			title: true,
			categoryName: true,
			Reservation: {
				where: {
					homeId: homeId,
				},
			},
			User: {
				select: {
					profileImage: true,
					firstName: true,
				},
			},
		},
	});
	return data;
};

async function Listing({ params }: { params: { id: string } }) {
	const data = await getData(params.id);
	const { getCountryByValue } = useCountries();
	const country = getCountryByValue(data?.country as string);

	const { getUser } = getKindeServerSession();
	const user = await getUser();

	return (
		<div className="w-[75%] mx-auto mt-5  mb-20">
			<h1 className="font-medium text-3xl mb-5">{data?.title}</h1>
			<div className="relative h-[550px]">
				<Image
					alt="Listing Image"
					src={`https://igmtkcfparrontuwpwwu.supabase.co/storage/v1/object/public/images/${data?.photo}`}
					fill
					className="rounded-lg h-full w-full object-cover"
				/>
			</div>
			<div className="flex lg:justify-between  flex-col lg:flex-row justify-center gap-x-24 mt-8">
				<div className="lg:w-2/3 w-full">
					<h3 className="text-xl font-medium">
						{country?.flag} {country?.label} - {country?.region}
					</h3>
					<div className="flex gap-x-2 text-muted-foreground">
						<p>{data?.guests} Guests</p>*<p>{data?.bedrooms} Bedrooms</p>*
						<p>{data?.bathrooms} Bathrooms</p>
					</div>
					<div className="flex items-center mt-6 ">
						<img
							src={
								data?.User?.profileImage ??
								"data:image/jpeg;base64,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"
							}
							alt="user image"
						/>
						<div className="flex flex-col ml-4">
							<h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
							<p className="text-sm text-muted-foreground"> Host Since 2020</p>
						</div>
					</div>

					<Separator className="my-7" />
					<CategoryShowcase categoryName={data?.categoryName as string} />

					<Separator className="my-7" />
					<p className="text-muted-foreground">{data?.description}</p>

					<Separator className="my-7" />
					<HomeMap locationValue={country?.label as string} />
				</div>
				<form action={createReservation}>
					<input type="hidden" name="userId" value={user?.id} />
					<input type="hidden" name="homeId" value={params.id} />

					<SelectedCalender reservation={data?.Reservation} />

					{user?.id ? (
						<ReservationButton />
					) : (
						<Button className="p-5 w-full" asChild>
							<Link href="/api/auth/login">Make a Reservation</Link>
						</Button>
					)}
				</form>
			</div>
		</div>
	);
}

export default Listing;
