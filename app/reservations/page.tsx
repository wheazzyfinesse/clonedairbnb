import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoItems from "../components/NoItems";
import ListingCard from "../components/ListingCard";
import { unstable_noStore as noStore } from "next/cache";

const getData = async (userId: string) => {
	noStore();

	const data = await prisma.reservation.findMany({
		where: {
			userId: userId,
		},
		select: {
			Home: {
				select: {
					photo: true,
					id: true,
					title: true,
					price: true,
					country: true,
					description: true,
					favorite: {
						where: {
							userId: userId,
						},
					},
				},
			},
		},
	});

	return data;
};

async function Reservationspage() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user) redirect("/");
	const data = await getData(user.id);
	return (
		<section className="container mx-auto py-5 lg:px-10 mt-10">
			<h2 className="text-3xl font-semibold tracking-tight">My Reservations</h2>
			{data.length === 0 ? (
				<NoItems
					title="Hey, you don't have any favorites"
					description="Please add your favorites to see them here..."
				/>
			) : (
				<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
					{data.map((item) => (
						<ListingCard
							key={item.Home?.id}
							description={item.Home?.description as string}
							homeId={item.Home?.id as string}
							location={item.Home?.country as string}
							photo={item.Home?.photo as string}
							price={item.Home?.price as number}
							userId={user.id}
							pathName="/favourites"
							favoriteId={item.Home?.favorite[0]?.id as string}
							isInFavoriteList={
								(item.Home?.favorite.length as number) > 0 ? true : false
							}
						/>
					))}
				</div>
			)}
		</section>
	);
}

export default Reservationspage;
