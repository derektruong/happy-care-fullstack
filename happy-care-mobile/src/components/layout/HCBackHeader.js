import React from 'react';
import { HStack, IconButton, Icon, Heading } from 'native-base';
import { Entypo } from '@expo/vector-icons';

export const HCBackHeader = (props) => {
    const { onBackScreenHandler } = props;

    return (
        <HStack w="100%" h="50px" alignItems="center">
            <IconButton
                icon={<Icon as={Entypo} name="chevron-left" />}
                borderRadius="full"
                onPress={onBackScreenHandler}
                _icon={{
                    color: 'black',
                    size: 'md',
                }}
                _pressed={{
                    bg: 'blue.200:alpha.20',
                    _ios: {
                        _icon: {
                            size: '2xl',
                        },
                    },
                }}
            />
        </HStack>
    );
};
