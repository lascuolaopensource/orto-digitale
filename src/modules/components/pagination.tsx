import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as RootPagination,
} from '$/components/ui/pagination'

import type { PaginatedDocs } from 'payload'

//

type PaginationProps = {
	docs: PaginatedDocs
}

export function Pagination(props: PaginationProps) {
	const { hasNextPage, hasPrevPage, pagingCounter, totalDocs, totalPages } = props.docs

	return (
		<RootPagination>
			<PaginationContent>
				{hasPrevPage && (
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationLink href="#">1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>

				{hasNextPage && (
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				)}
			</PaginationContent>
		</RootPagination>
	)
}
