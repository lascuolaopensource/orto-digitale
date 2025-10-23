import { PaginatedDocs } from 'payload'

import { BoxedHeading } from './boxed-heading'
import { PageContainer } from './page-container'
import { PageGrid } from './page-grid'
import { Pagination } from './pagination'

//

type Props<Docs extends PaginatedDocs> = {
	docs: Docs
	basePath: string
	title: string
	item: (item: Docs['docs'][number]) => React.ReactNode
}

export function CollectionPage<Docs extends PaginatedDocs>(props: Props<Docs>) {
	const { docs, basePath, title, item } = props

	return (
		<PageContainer className="space-y-8">
			<div className="py-5 flex items-center justify-center">
				<BoxedHeading tag="h1" className="text-center px-12!">
					{title}
				</BoxedHeading>
			</div>

			<PageGrid>{docs.docs.map(item)}</PageGrid>

			<Pagination docs={docs} basePath={basePath} />
		</PageContainer>
	)
}
