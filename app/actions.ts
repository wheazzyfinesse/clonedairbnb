"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

export async function createAirbnbHome({ userId }: { userId: string }) {
	const data = await prisma.home.findFirst({
		where: {
			userId: userId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	if (data === null) {
		const data = await prisma.home.create({
			data: {
				userId: userId,
			},
		});

		return redirect(`/create/${data.id}/structure`);
	}

	if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
		return redirect(`/create/${data.id}/structure`);
	} else if (data.addedCategory && !data.addedDescription) {
		return redirect(`/create/${data.id}/description`);
	} else if (
		data.addedCategory &&
		data.addedDescription &&
		!data.addedLocation
	) {
		return redirect(`/create/${data.id}/location`);
	} else if (
		data.addedCategory &&
		data.addedDescription &&
		data.addedLocation
	) {
		const data = await prisma.home.create({
			data: {
				userId: userId,
			},
		});
		return redirect(`/create/${data.id}/structure`);
	}
}

export const createCategory = async (formData: FormData) => {
	const categoryName = formData.get("categoryName") as string;
	const homeId = formData.get("homeId") as string;

	await prisma.home.update({
		where: { id: homeId },
		data: {
			categoryName: categoryName,
			addedCategory: true,
		},
	});
	return redirect(`/create/${homeId}/description`);
};

export const createDescription = async (formData: FormData) => {
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const price = formData.get("price");
	const imageFile = formData.get("image") as File;

	const guestNumber = formData.get("guests") as string;
	const bedroomNumber = formData.get("bedrooms") as string;
	const bathroomNumber = formData.get("bathrooms") as string;
	const homeId = formData.get("homeId") as string;

	const { data: imageData } = await supabase.storage
		.from("images")
		.upload(`${imageFile.name}-${new Date()}`, imageFile, {
			cacheControl: "2592000",
			contentType: "image/png",
		});
	const homeData = await prisma.home.update({
		where: { id: homeId },
		data: {
			title: title,
			description: description,
			price: Number(price),
			guests: guestNumber,
			bedrooms: bedroomNumber,
			bathrooms: bathroomNumber,
			photo: imageData?.path,
			addedDescription: true,
		},
	});

	return redirect(`/create/${homeId}/location`);
};

export const createLocation = async (formData: FormData) => {
	const homeId = formData.get("homeId") as string;
	const countryValue = formData.get("country") as string;
	const data = await prisma.home.update({
		where: { id: homeId },
		data: {
			country: countryValue,
			addedLocation: true,
		},
	});
	return redirect("/");
};

export const addToFavorite = async (formData: FormData) => {
	const homeId = formData.get("homeId") as string;
	const userId = formData.get("userId") as string;
	const pathName = formData.get("pathName") as string;

	const data = await prisma.favorite.create({
		data: {
			homeId: homeId,
			userId: userId,
		},
	});
	revalidatePath(pathName);
};
export const deleteFromFavorite = async (formData: FormData) => {
	const favoriteId = formData.get("favoriteId") as string;
	const userId = formData.get("userId") as string;
	const pathName = formData.get("pathName") as string;
	const data = await prisma.favorite.delete({
		where: {
			id: favoriteId,
			userId: userId,
		},
	});
	revalidatePath(pathName);
};

export const createReservation = async (formData: FormData) => {
	const homeId = formData.get("homeId") as string;
	const userId = formData.get("userId") as string;
	const startDate = formData.get("startDate") as string;
	const endDate = formData.get("endDate") as string;
	if (!startDate || !endDate) {
		alert("Please select a date");
	}
	const data = await prisma.reservation.create({
		data: {
			homeId: homeId,
			userId: userId,
			startDate: startDate,
			endDate: endDate,
		},
	});
	return redirect("/");
};
