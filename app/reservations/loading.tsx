import React from "react";
import SkeletonCard from "../components/SkeletonCard";

function ReservationsLoading() {
	return (
		<div className="container mx-auto px-5 lg:px-10 mt-10">
			<h2 className="text-3xl font-semibold tracking-tight">My Reservations</h2>
			<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</div>
		</div>
	);
}

export default ReservationsLoading;
