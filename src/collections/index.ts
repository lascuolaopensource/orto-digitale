import { formatSlugHook } from '@/fields/slug/formatSlug'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { CheckboxField, Field, TextField } from 'payload'

// Return a Tab object directly to use within tabs array
export const area = (nome: string): any => {
  return {
    name: nome,
    label: nome.replace('-', ' '),
    fields: [
      {
        type: 'group',
        name: 'informazioni',
        fields: [
          {
            name: 'nome',
            label: 'nome',
            type: 'text',
            localized: true,
          },
          {
            name: 'short_description',
            label: 'descrizione breve',
            type: 'text',
            localized: true,
          },
        ],
      },
      {
        type: 'group',
        name: 'contenuto',
        fields: [
          {
            name: 'descrizione',
            label: 'descrizione',
            type: 'richText',
            localized: true,
          },

          {
            name: 'piante',
            label: 'piante',
            type: 'relationship',
            relationTo: 'piante',
            hasMany: true,
          },
        ],
      },
    ],
  }
}

type Overrides = {
  slugOverrides?: Partial<TextField>
  checkboxOverrides?: Partial<CheckboxField>
  localized?: boolean
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { slugOverrides, checkboxOverrides, localized = false } = overrides

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    ...checkboxOverrides,
  } as CheckboxField

  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    localized,
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: 'sidebar',
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: '@/fields/slug/SlugComponent#SlugComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
    ...(slugOverrides || {}),
  } as TextField

  return [slugField, checkBoxField]
}

const createRequiredField = <T extends Field>(field: T): T => ({
  ...field,
  required: true,
})

const createTextField = (name: string, options: Partial<TextField> = {}): TextField =>
  ({
    name,
    type: 'text',
    ...options,
  }) as TextField

export const nomeField = createRequiredField(createTextField('nome'))
