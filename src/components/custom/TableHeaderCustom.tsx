
import { flexRender } from "@tanstack/react-table"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TableHeaderCustom({ table }) {

	return (
		<>
			<TableHeader>
				{
					table.getHeaderGroups().map((headerGroup) => (

						<TableRow key={headerGroup.id}>

							{
								headerGroup.headers.map((header) => {
									return (

										<TableHead key={header.id} className="text-center">
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>

									)
								})
							}

						</TableRow>

					))
				}
			</TableHeader>
		</>
	)

}