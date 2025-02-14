'use client'

import * as React from 'react'
import type { Giardino } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'

type AreaData = SerializedEditorState | null

interface DescriptionDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  areaData: AreaData
}

export function DescriptionDrawer({ isOpen, onOpenChange, areaData }: DescriptionDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[40rem]">
        <SheetHeader>
          <VisuallyHidden asChild>
            <SheetTitle>Descrizione area</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>

        <div className="h-full pr-6">
          <ScrollArea className="h-full w-full rounded-md">
            <div className="p-4">
              {areaData ? <RichText data={areaData} /> : <p>Nessuna descrizione disponibile</p>}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
