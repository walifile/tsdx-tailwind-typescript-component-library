import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CustomInput, InputProps } from '../src/index';

const defaultProps: InputProps = {
  label: 'Input Label',
  value: '',
  placeholder: 'Input Placeholder',
  setValue: action('Value changed'),
};

const Template: Story<InputProps> = (args) => <CustomInput {...args} />;

export default {
  title: 'Components/CustomInput',
  component: CustomInput,
  args: { ...defaultProps },
  argTypes: {
    setValue: { control: { disable: true } }, // Disable the control for setValue prop
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '1rem' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default = Template.bind({});
