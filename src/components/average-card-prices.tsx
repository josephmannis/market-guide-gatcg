import { Heading, HStack, Tag, VStack } from '@chakra-ui/react';
import { CardT } from '../hooks/use-products.tsx';
import { useAveragePrices } from '../hooks/use-average-prices.tsx';

export function AverageCardPrices({ cards }: { cards: CardT[] }) {
  const prices = useAveragePrices(cards);
  return (
    <VStack border="1px" p={4} borderRadius="md" alignItems="flex-start" borderColor="rgba(255, 255, 255, 0.16)">
      <Heading mb={1} size="sm">
        Average Card Price:
      </Heading>
      <HStack flexWrap="wrap">
        <Tag color="black" bgColor="white">
          C: {prices.C}
        </Tag>
        <Tag color="black" bgColor="green.400">
          UC: {prices.UC}
        </Tag>
        <Tag color="black" bgColor="cyan.400">
          R: {prices.R}
        </Tag>
        <Tag color="black" bgColor="pink.200">
          PR: {prices.PR}
        </Tag>
        <Tag color="black" bgColor="purple.400">
          SR: {prices.SR}
        </Tag>
        <Tag color="black" bgColor="yellow.300">
          UR: {prices.UR}
        </Tag>
        <Tag borderWidth={2} borderColor="purple.400">
          CSR: {prices.CSR}
        </Tag>
        <Tag borderWidth={2} borderColor="yellow.300">
          CUR: {prices.CUR}
        </Tag>
        <Tag borderWidth={2} borderColor="pink.200">
          CPR: {prices.CPR}
        </Tag>
      </HStack>
    </VStack>
  );
}
