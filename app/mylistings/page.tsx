import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoItems from "../components/NoItems";
import ListingCard from "../components/ListingCard";
import { unstable_noStore as noStore } from "next/cache";

const getData = async (userId: string) => {
	noStore();

	const data = await prisma.home.findMany({
		where: {
			userId: userId,
			addedCategory: true,
			addedDescription: true,
			addedLocation: true,
		},
		select: {
			photo: true,
			id: true,
			price: true,
			description: true,
			country: true,
			favorite: {
				where: {
					userId: userId ?? undefined,
				},
			},
		},
		orderBy: { createdAt: "desc" },
	});
	return data;
};

async function MyListings() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user) {
		return redirect("/");
	}
	const data = await getData(user.id);
	return (
		<section className="container mx-auto py-5 lg:px-10 mt-10">
			<h2 className="text-3xl font-semibold tracking-tight">My Listings</h2>
			{data.length === 0 ? (
				<NoItems
					title="Hey, you don't have any homes listed"
					description="Please list a home on airbnb and you will see them here..."
				/>
			) : (
				<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
					{data.map((item) => (
						<ListingCard
							key={item.id}
							description={item.description as string}
							homeId={item.id}
							location={item.country as string}
							photo={item.photo as string}
							price={item.price as number}
							userId={user.id}
							pathName="/mylistings"
							favoriteId={item.favorite[0]?.id as string}
							isInFavoriteList={
								(item.favorite.length as number) > 0 ? true : false
							}
						/>
					))}
				</div>
			)}
		</section>
	);
}

export default MyListings;
