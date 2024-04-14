import { CardT } from '../hooks/use-products.tsx';
import { Box, HStack, Tag, Text, VStack } from '@chakra-ui/react';
import { formatUsd } from '../utils/currency.ts';

export function Card({ card }: { card: CardT }) {
  return (
    <VStack>
      <Box
        w="200px"
        h="280px"
        backgroundImage={card.imageUrl}
        backgroundSize="contain"
        borderRadius="xl"
        backgroundColor="gray"
      >
        <span role="img" aria-label={card.name} />
      </Box>
      <Text textAlign="center" textTransform="capitalize">
        {card.name}
      </Text>
      <HStack>
        <Tag>Normal: {formatUsd(card.normalPrices.midPrice ?? 0)}</Tag>
        <Tag>Foil: {formatUsd(card.foilPrices.midPrice ?? 0)}</Tag>
      </HStack>
    </VStack>
  );
}
