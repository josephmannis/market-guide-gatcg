import {
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useProductGroups } from '../hooks/use-product-groups.tsx';
import { useState } from 'react';
import { AverageCardPrices } from '../components/average-card-prices.tsx';
import { useProducts } from '../hooks/use-products.tsx';
import { Card } from '../components/card.tsx';
import { formatUsd } from '../utils/currency.ts';

export function Products() {
  const { groups } = useProductGroups();
  const [filter, setFilter] = useState('');
  const [selectedGroup, setSelected] = useState<string | undefined>(groups[0]?.id);
  const { cards, box, pack, totalCards } = useProducts({ setId: selectedGroup, filter, page: 0 });
  const cardsToShow = cards.slice(0, 50);

  return (
    <HStack width="80%" alignItems="flex-start">
      <VStack w="100%" alignItems="flex-start">
        <HStack w="100%" justifyContent="space-between">
          <InputGroup w="40%">
            <Input placeholder="Search for a card" value={filter} onChange={(e) => setFilter(e.target.value)} />
            <InputRightElement>
              <SearchIcon />
            </InputRightElement>
          </InputGroup>

          <HStack>
            <Select onChange={(e) => setSelected(e.target.value)} value={selectedGroup} placeholder="Select a Product">
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </Select>
          </HStack>
        </HStack>

        <Text>{totalCards} Cards</Text>
        <Grid templateColumns="repeat(4, 1fr)" gap={6} w="100%">
          {cardsToShow.map((c) => {
            return (
              <GridItem key={c.name}>
                <Card card={c} />
              </GridItem>
            );
          })}
        </Grid>
      </VStack>
      <VStack w="30%" alignItems="flex-start">
        <AverageCardPrices />
        <VStack
          w="100%"
          border="1px"
          p={4}
          borderRadius="md"
          alignItems="flex-start"
          borderColor="rgba(255, 255, 255, 0.16)"
        >
          <Heading mb={1} size="sm">
            Bulk Pricing:
          </Heading>
          <HStack>
            <Text>Box: {box?.normalPrices?.midPrice ? formatUsd(box.normalPrices.midPrice) : '--'}</Text>
            <Text>Pack: {pack?.normalPrices?.midPrice ? formatUsd(pack.normalPrices.midPrice) : '--'}</Text>
          </HStack>
        </VStack>
      </VStack>
    </HStack>
  );
}
