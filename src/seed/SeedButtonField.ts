import { Field } from 'payload'

export const seedButtonField: Field = {
  type: 'ui',
  name: 'seedButton',
  label: {
    it: 'Popola descrizioni aree',
    en: 'Seed area descriptions',
  },
  admin: {
    position: 'sidebar',
    components: {
      Field: '/components/admin/SeedButton',
    },
  },
}
