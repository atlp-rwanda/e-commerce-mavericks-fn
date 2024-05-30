import { Meta, StoryFn } from '@storybook/react';
import SampleComponent from '../components/SampleComponent';

export default {
  title: 'Components/SampleComponent',
  component: SampleComponent,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
} as Meta;

const Template: StoryFn = (args: any) => <SampleComponent {...args} />;
export const Default = Template.bind({});
Default.args = {};
