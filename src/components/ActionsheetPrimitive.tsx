import { Actionsheet } from 'native-base';
import { getIcon } from '../utils/getIcon';

interface ActionsheetProps extends React.ComponentProps<typeof Actionsheet> {}
export function ActionsheetPrimitive({ ...rest }: ActionsheetProps) {
  return (
    <Actionsheet {...rest}>
      <Actionsheet.Content bg="trueGray.900">
        {Item('Enchente', 'flood')}
        {Item('Incêndio', 'fire')}
        {Item('Erupção', 'eruption')}
        {Item('Ventos', 'winds')}
        {Item('Tornado', 'tornado')}
        {Item('Tempestade', 'storm')}
        {Item('Terremoto', 'earthquake')}
        {Item('Desmoronamento', 'cave-in')}
        {Item('Queda de árvore', 'tree-fall')}
      </Actionsheet.Content>
    </Actionsheet>
  );
}

function Item(label: string, category: string) {
  return (
    <Actionsheet.Item
      bg="trueGray.900"
      _stack={{
        alignItems: 'center',
      }}
      _text={{
        color: 'white',
      }}
      startIcon={getIcon({ category })}
      _pressed={{
        bg: 'violet.400',
        rounded: 'md',
      }}
    >
      {label}
    </Actionsheet.Item>
  );
}
