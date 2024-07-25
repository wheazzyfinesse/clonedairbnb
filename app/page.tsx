import MapFilterItem from "./components/MapFilterItem";
import prisma from "./lib/db";
import ListingCard from "./components/ListingCard";
import { Suspense } from "react";
import SkeletonCard from "./components/SkeletonCard";
import NoItems from "./components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

const getData = async ({
	searchParams,
	userId,
}: {
	userId: string | undefined;
	searchParams?: {
		filter?: string;
		country?: string;
		bedrooms?: string;
		bathrooms?: string;
	};
}) => {
	noStore();
	const data = await prisma.home.findMany({
		where: {
			addedCategory: true,
			addedDescription: true,
			addedLocation: true,
			categoryName: searchParams?.filter ?? undefined,
			country: searchParams?.country ?? undefined,
			bedrooms: searchParams?.bedrooms ?? undefined,
			bathrooms: searchParams?.bathrooms ?? undefined,
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
	});
	return data;
};
export default function Home({
	searchParams,
}: {
	searchParams?: {
		filter?: string;
		country?: string;
		bedrooms?: string;
		bathrooms?: string;
	};
}) {
	return (
		<div className="container mx-auto px-5 lg:px-10">
			<MapFilterItem />
			<Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
				<ShowItems searchParams={searchParams} />
			</Suspense>
		</div>
	);
}

const ShowItems = async ({
	searchParams,
}: {
	searchParams?: {
		filter?: string;
		country?: string;
		bedrooms?: string;
		bathrooms?: string;
	};
}) => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	const data = await getData({ searchParams: searchParams, userId: user?.id });
	return (
		<>
			{data.length === 0 ? (
				<NoItems
					description="Please try a different category or create your own listing!."
					title="Sorry no listings found for this category"
				/>
			) : (
				<div className="grid  lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
					{data.map((item) => (
						<ListingCard
							key={item.id}
							photo={item.photo as string}
							price={item.price as number}
							description={item.description as string}
							location={item.country as string}
							userId={user?.id as string}
							favoriteId={item.favorite[0]?.id}
							isInFavoriteList={item.favorite.length > 0 ? true : false}
							homeId={item.id}
							pathName="/"
						/>
					))}
				</div>
			)}
		</>
	);
};

const SkeletonLoading = () => {
	return (
		<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8 mb-8">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</div>
	);
};
