"use client";
import { Button } from "@/components/ui/button";
import { divIcon } from "leaflet";
import { Heart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function CreateSubmitButton() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button disabled={pending} size="lg">
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Please wait...
				</Button>
			) : (
				<Button type="submit" size="lg">
					Next
				</Button>
			)}
		</>
	);
}

export default CreateSubmitButton;

export const AddToFavoriteButton = () => {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button
					variant="outline"
					size="icon"
					className="bg-primary-foreground"
					disabled
				>
					<Loader2 className="w-4 h-4 animate-spin text-primary" />
				</Button>
			) : (
				<Button
					variant="outline"
					size="icon"
					className="bg-primary-foreground"
					type="submit"
				>
					<Heart className="w-4 h-4 text-primary" />
				</Button>
			)}
		</>
	);
};
export const DeleteFromFavoriteButton = () => {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button
					variant="outline"
					size="icon"
					className="bg-primary-foreground"
					disabled
				>
					<Loader2 className="w-4 h-4 animate-spin text-primary" />
				</Button>
			) : (
				<Button
					variant="outline"
					size="icon"
					className="bg-primary-foreground"
					type="submit"
				>
					<Heart className="w-4 h-4 text-primary" fill="#E21C49" />
				</Button>
			)}
		</>
	);
};
export const ReservationButton = () => {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button className="w-full" disabled>
					<Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait...
				</Button>
			) : (
				<Button className="w-full" type="submit">
					Make a Reservation
				</Button>
			)}
		</>
	);
};
