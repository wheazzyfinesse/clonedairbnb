import { File } from "lucide-react";

interface NoItemsProps {
	description?: string;
	title?: string;
}

function NoItems({ description, title }: NoItemsProps) {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
			<div className="flex w-20 h-20 rounded-full items-center justify-center bg-primary/20">
				<File className="h-10 w-10 text-primary" />
			</div>
			<h2 className="mt-6 text-xl font-semibold">{title}</h2>
			<p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
				{description}
			</p>
		</div>
	);
}

export default NoItems;
