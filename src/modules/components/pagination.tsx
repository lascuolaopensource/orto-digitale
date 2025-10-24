import type { PaginatedDocs } from 'payload'

import { PageProps } from '#/utils/server'
import {
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as RootPagination,
} from '$/components/ui/pagination'
import { Array } from 'Effect'

//

const PAGE_PARAM = 'page'

type PaginationProps = {
	docs: PaginatedDocs
	basePath: string
}

export async function Pagination(props: PaginationProps) {
	const { hasNextPage, hasPrevPage, totalPages, page: currentPage = 1 } = props.docs

	const hasMultiplePages = totalPages > 1
	if (!hasMultiplePages) return null

	const range = Array.range(1, totalPages)

	function getPageUrl(page: number) {
		return `${props.basePath}?${PAGE_PARAM}=${page}`
	}

	return (
		<RootPagination>
			<PaginationContent>
				{hasPrevPage && (
					<PaginationItem>
						<PaginationPrevious href={getPageUrl(currentPage - 1)} />
					</PaginationItem>
				)}

				{range.map((page) => (
					<PaginationItem key={page}>
						<PaginationLink href={getPageUrl(page)} isActive={page === currentPage}>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				{hasNextPage && (
					<PaginationItem>
						<PaginationNext href={getPageUrl(currentPage + 1)} />
					</PaginationItem>
				)}
			</PaginationContent>
		</RootPagination>
	)
}

export async function getPageParam(pageProps: PageProps) {
	const searchParams = await pageProps.searchParams
	if (!(searchParams && PAGE_PARAM in searchParams)) return 1
	const page = searchParams[PAGE_PARAM]
	if (!page || Array.isArray(page)) return 1
	return parseInt(page)
}
