import { GlobalProviders } from '../src/components/GlobalProviders'

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <GlobalProviders>
        <Story />
      </GlobalProviders>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
