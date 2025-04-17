import type { CollectionConfig } from 'payload'

export const User: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  labels: {
    singular: {
      en: 'User',
      it: 'Utente',
    },
    plural: {
      en: 'Users',
      it: 'Utenti',
    },
  },
  fields: [],
}
