import { createCategory } from "@/app/actions";
import CreateBottomBar from "@/app/components/CreateBottomBar";
import SelectCategory from "@/app/components/SelectCategory";

function StructurePage({ params }: { params: { id: string } }) {
	return (
		<>
			<div className="w-3/5 mx-auto">
				<h2 className="text-3xl font-semibold tracking-tight transition-colors">
					Which of these best describes your home?
				</h2>
			</div>
			<form action={createCategory}>
				<input type="hidden" name="homeId" value={params.id} />

				<SelectCategory />
				<CreateBottomBar />
			</form>
		</>
	);
}

export default StructurePage;
