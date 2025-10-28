import { Flex } from '@orioro/react-ui-core'

export function SimpleSelect({ value, onSetValue, options, label, ...props }) {
  return (
    <Flex direction="column" gap="4px">
      {label && (
        <label
          style={{
            fontWeight: 'bold',
            fontSize: '.8rem',
          }}
        >
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onSetValue(e.target.value)}
        {...props}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </Flex>
  )
}
