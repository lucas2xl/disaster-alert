import {
  Button,
  FormControl,
  Input,
  Modal,
  WarningOutlineIcon,
} from 'native-base';
import { SelectPrimitive } from './SelectPrimitive';

interface ActionsheetProps extends React.ComponentProps<typeof Modal> {
  onPress: () => void;
  category: string;
  setCategory: (category: string) => void;
  description: string;
  setDescription: (description: string) => void;
  isLoading: boolean;
  isValid: boolean;
}
export function ModalPrimitive({
  onPress,
  category,
  setCategory,
  description,
  setDescription,
  isLoading,
  isValid,
  ...rest
}: ActionsheetProps) {
  return (
    <Modal
      avoidKeyboard
      justifyContent="center"
      size="xl"
      _backdrop={{
        bg: 'black',
      }}
      {...rest}
    >
      <Modal.Content bg="trueGray.900">
        <Modal.CloseButton
          _icon={{
            color: 'white',
          }}
          _pressed={{
            bg: 'violet.600',
          }}
        />
        <Modal.Header
          bg="trueGray.900"
          _text={{
            color: 'white',
          }}
          borderColor="transparent"
        >
          Criar alerta
        </Modal.Header>

        <Modal.Body
          _text={{
            color: 'white',
          }}
        >
          <FormControl isRequired isInvalid={!isValid}>
            <FormControl.Label
              _text={{
                color: 'white',
                fontSize: 'xl',
              }}
            >
              Categoria
            </FormControl.Label>
            <SelectPrimitive
              selectedValue={category}
              onValueChange={setCategory}
            />

            <FormControl.Label
              mt="4"
              _text={{
                color: 'white',
                fontSize: 'xl',
              }}
            >
              Descrição
            </FormControl.Label>
            <Input
              value={description}
              onChangeText={setDescription}
              multiline
              minH="100px"
              placeholder="Coloque uma descrição aqui!"
              fontSize="xl"
              color="white"
              _focus={{
                borderColor: 'violet.500',
                bg: 'trueGray.900',
              }}
            />

            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Por favor, preencha todos os campos!
            </FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>

        <Modal.Footer bg="trueGray.900" borderColor="transparent">
          <Button
            flex="1"
            isLoading={isLoading}
            onPress={onPress}
            bg="violet.600"
            _pressed={{
              bg: 'violet.800',
            }}
          >
            Enviar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
