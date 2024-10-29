import { CardT } from '../hooks/use-products.tsx';
import { Box, HStack, Tag, Text, VStack } from '@chakra-ui/react';
import { formatUsd } from '../utils/currency.ts';

export function Card({ card }: { card: CardT }) {
  return (
    <VStack>
      <a href={card.tcgPlayerUrl} target="_blank">
        <Box
          w={{ base: '300px', md: '200px' }}
          h={{ base: '420px', md: '280px' }}
          backgroundImage={card.imageUrl}
          backgroundSize="contain"
          borderRadius={{ base: '2xl', md: 'xl' }}
          backgroundColor="gray"
          mb={{ base: 4, md: 0 }}
        >
          <span role="img" aria-label={card.name} />
        </Box>
      </a>

      <Text textAlign="center" textTransform="capitalize">
        {card.name}
      </Text>
      <HStack>
        <Tag>Normal: {formatUsd(card.normalPrices.midPrice ?? card.normalPrices.midPrice ?? 0)}</Tag>
        <Tag>Foil: {formatUsd(card.foilPrices.marketPrice ?? card.foilPrices.midPrice ?? 0)}</Tag>
      </HStack>
    </VStack>
  );
}
