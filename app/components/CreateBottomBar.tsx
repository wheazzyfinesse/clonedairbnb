import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import CreateSubmitButton from "./CreateSubmitButton";

function CreateBottomBar() {
	return (
		<div className="fixed w-full bottom-0 bg-white border-t h-24">
			<div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
				<Button variant="secondary" size="lg" asChild>
					<Link href="/"> Cancel</Link>
				</Button>
				<CreateSubmitButton />
			</div>
		</div>
	);
}

export default CreateBottomBar;
