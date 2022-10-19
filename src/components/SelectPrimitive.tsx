import { CheckIcon, Select, ISelectProps } from 'native-base';

interface SelectProps extends ISelectProps {
  onValueChange: (value: string) => void;
  selectedValue: string;
}
export function SelectPrimitive({
  onValueChange,
  selectedValue,
  ...rest
}: SelectProps) {
  return (
    <Select
      onValueChange={onValueChange}
      selectedValue={selectedValue}
      accessibilityLabel="Escolha uma categoria"
      placeholder="Escolha uma categoria"
      minH="40px"
      color="white"
      fontSize="xl"
      _selectedItem={{
        endIcon: <CheckIcon size="5" {...rest} />,
        bg: 'violet.800',
        rounded: 'md',
      }}
      _actionSheetContent={{
        bg: 'trueGray.900',
      }}
      _item={{
        bg: 'trueGray.900',
        _text: {
          color: 'white',
        },
        _pressed: {
          bg: 'violet.400',
          rounded: 'md',
        },
      }}
      mt={1}
    >
      <Select.Item label="Enchente" value="flood" />

      <Select.Item label="Incêndio" value="fire" />
      <Select.Item label="Erupção" value="eruption" />

      <Select.Item label="Ventos" value="winds" />
      <Select.Item label="Tornado" value="tornado" />
      <Select.Item label="Tempestade" value="storm" />

      <Select.Item label="Terremoto" value="earthquake" />
      <Select.Item label="Desmoronamento" value="cave-in" />

      <Select.Item label="Queda de árvore" value="tree-fall" />
    </Select>
  );
}
