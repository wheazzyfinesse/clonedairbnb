"use client";
import { createLocation } from "@/app/actions";
import CreateBottomBar from "@/app/components/CreateBottomBar";
import { useCountries } from "@/app/lib/getCountries";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import React, { useState } from "react";

function LocationPage({ params }: { params: { id: string } }) {
	const [locationValue, setLocationValue] = useState("");
	const LazyMap = dynamic(() => import("@/app/components/Map"), {
		ssr: false,
		loading: () => <Skeleton className="h-[50vh] w-full" />,
	});
	const { getAllCountries } = useCountries();
	return (
		<>
			<div className="w-3/5 mx-auto">
				<h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
					Where is your home located?
				</h2>
			</div>

			<form action={createLocation}>
				<input type="hidden" name="country" value={locationValue} />
				<input type="hidden" name="homeId" value={params.id} />
				<div className="w-3/5 mx-auto">
					<div className="mb-5">
						<Select required onValueChange={(value) => setLocationValue(value)}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a country" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Countries</SelectLabel>
									{getAllCountries.map((country) => (
										<SelectItem key={country.value} value={country.label}>
											{country.flag} {country.label} | {country.region}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<LazyMap locationValue={locationValue} />
				</div>
				<div>
					<CreateBottomBar />
				</div>
			</form>
		</>
	);
}

export default LocationPage;
