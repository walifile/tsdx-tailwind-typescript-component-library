import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CustomButton, ButtonProps } from '../src/components';

export default {
  title: 'Components/CustomButton',
  component: CustomButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <CustomButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
  type: 'button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Button',
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  label: 'Loading Button',
  loading: true,
};
