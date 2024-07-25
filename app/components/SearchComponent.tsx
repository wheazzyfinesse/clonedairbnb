"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useCountries } from "../lib/getCountries";
import HomeMap from "./HomeMap";
import { Button } from "@/components/ui/button";
import CreateSubmitButton from "./CreateSubmitButton";
import { Card, CardHeader } from "@/components/ui/card";
import Counter from "./Counter";

function SearchComponent() {
	const [step, setStep] = useState(1);
	const [locationValue, setLocationValue] = useState("");
	const { getAllCountries } = useCountries();

	const SubmitButtonLocal = () => {
		if (step === 1) {
			return <Button onClick={() => setStep(step + 1)}>Next</Button>;
		} else if (step === 2) {
			return <CreateSubmitButton />;
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="rounded-full py-4 border flex items-center cursor-pointer">
					<div className="flex h-full divide-x font-medium">
						<p className="px-4">Anywhere</p>
						<p className="px-4">Any Week</p>
						<p className="px-4">Add Guests</p>
					</div>
					<Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form className="flex flex-col gap-4">
					<input type="hidden" name="country" value={locationValue} />
					{step === 1 ? (
						<>
							<DialogHeader>
								<DialogTitle>Select a country</DialogTitle>
								<DialogDescription>Please choose a country</DialogDescription>
							</DialogHeader>

							<Select
								required
								onValueChange={(value) => setLocationValue(value)}
							>
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
							<HomeMap locationValue={locationValue} />
							<DialogFooter>
								<SubmitButtonLocal />
							</DialogFooter>
						</>
					) : (
						<>
							<DialogHeader>
								<DialogTitle>Describe your search</DialogTitle>
								<DialogDescription>
									Select as it suits your desire
								</DialogDescription>
							</DialogHeader>
							<Card>
								<CardHeader className="flex flex-col gap-y-5">
									<div className="flex items-center justify-between">
										<div className="flex flex-col">
											<h3 className="underline font-medium">Guests</h3>
											<p className="text-muted-foreground text-sm">
												How many guests do you want?
											</p>
										</div>
										<Counter name="guests" />
									</div>

									<div className="flex items-center justify-between">
										<div className="flex flex-col">
											<h3 className="underline font-medium">Bedrooms</h3>
											<p className="text-muted-foreground text-sm">
												How many bedrooms do you want?
											</p>
										</div>
										<Counter name="bedrooms" />
									</div>

									<div className="flex items-center justify-between">
										<div className="flex flex-col">
											<h3 className="underline font-medium">Bathrooms</h3>
											<p className="text-muted-foreground text-sm">
												How many bathrooms do you want?
											</p>
										</div>
										<Counter name="bathrooms" />
									</div>
								</CardHeader>
							</Card>
							<DialogFooter>
								<SubmitButtonLocal />
							</DialogFooter>
						</>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default SearchComponent;
