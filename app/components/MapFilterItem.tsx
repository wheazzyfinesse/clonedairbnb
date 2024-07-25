"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { categoryItems } from "../lib/categoryItem";
import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

function MapFilterItem() {
	const searchParams = useSearchParams();
	const search = searchParams.get("filter");
	const pathname = usePathname();

	const createQueyString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());

			params.set(name, value);
			return params.toString();
		},
		[searchParams],
	);
	return (
		<div className="flex justify-around gap-x-10 w-full overflow-x-scroll mt-5 no-scrollbar">
			{categoryItems.map((item) => (
				<Link
					href={
						item.name === "all"
							? pathname + ""
							: pathname + "?" + createQueyString("filter", item.name)
					}
					key={item.id}
					className={cn(
						search === item.name
							? "border-b-2 border-black pb-2 flex-shrink-0"
							: "opacity-70 flex-shrink-0",
						"flex flex-col gap-y-3 items-center",
					)}
				>
					<div className="relative w-6 h-6">
						<Image
							src={item.imageUrl}
							alt="Category image"
							className="w-6 h-6"
							width={24}
							height={24}
						/>
					</div>
					<p className="text-xs font-medium">{item.title}</p>
				</Link>
			))}
		</div>
	);
}

export default MapFilterItem;
