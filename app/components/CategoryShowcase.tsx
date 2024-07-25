import React from "react";
import { categoryItems } from "../lib/categoryItem";
import Image from "next/image";

function CategoryShowcase({ categoryName }: { categoryName: string }) {
	const category = categoryItems.find((item) => item.name === categoryName);
	return (
		<div className="flex items-center">
			<Image
				alt="category image"
				src={category?.imageUrl as string}
				width={44}
				height={44}
				className="w-11 h-11 rounded-full"
			/>
			<div className="ml-3 text-lg font-semibold flex flex-col">
				<h3 className="font-medium">{category?.title}</h3>
				<p className="text-sm text-muted-foreground">{category?.description}</p>
			</div>
		</div>
	);
}

export default CategoryShowcase;
