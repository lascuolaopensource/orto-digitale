import type { GlobalConfig } from 'payload'

export const AdminTools: GlobalConfig = {
  slug: 'admin-tools',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Admin',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Database Seeding',
          fields: [
            {
              name: 'seedButton',
              type: 'ui',
              admin: {
                components: {
                  Field: '/components/admin/GlobalSeedButton',
                },
              },
            },
          ],
        },
      ],
    },
  ],
}
