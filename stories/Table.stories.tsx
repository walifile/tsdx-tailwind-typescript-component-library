import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Props, Table } from '../src/components';

export default {
  title: 'Components/Table',
  component: Table,
} as Meta;

const Template: Story<Props> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
  ],
  data: [
    { id: 0, name: 'John Doe', age: 30, email: 'john.doe@example.com' },
    { id: 1, name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
    { id: 2, name: 'Bob Johnson', age: 45, email: 'bob.johnson@example.com' },
  ],
  sort: false,
  actions: { edit: true, delete: true },
  paginationSettings: { enablePagination: true, pageSize: 1 },
  globalSearch: true,
  showRowSelect: true,
  isFilters: [],
};
