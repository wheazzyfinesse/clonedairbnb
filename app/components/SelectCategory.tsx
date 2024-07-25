"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { categoryItems } from "../lib/categoryItem";
import Image from "next/image";
import { useState } from "react";

function SelectCategory() {
	const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
		undefined,
	);
	return (
		<div className="grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
			<input
				type="hidden"
				name="categoryName"
				value={selectedCategory as string}
			/>
			{categoryItems.map((item) => (
				<div className="cursor-pointer" key={item.id}>
					<Card
						className={
							selectedCategory === item.name
								? "border-primary "
								: "hover:border-primary"
						}
						onClick={() => setSelectedCategory(item.name)}
					>
						<CardHeader>
							<Image
								src={item.imageUrl}
								alt={item.name}
								height={32}
								width={32}
								className="h-8 w-8"
							/>
							<div className="font-medium">{item.title}</div>
						</CardHeader>
					</Card>
				</div>
			))}
		</div>
	);
}

export default SelectCategory;
