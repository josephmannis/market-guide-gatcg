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
  const { cards, box, pack, totalCards } = useProducts({ setId: selectedGroup, filter });

  return (
    <HStack width="80%" alignItems="flex-start">
      <VStack w="100%" alignItems="flex-start">
        <Heading size="sm">{totalCards} cards</Heading>
        <Grid templateColumns="repeat(4, 1fr)" gap={6} w="100%">
          {cards.map((c) => {
            return (
              <GridItem key={c.name}>
                <Card card={c} />
              </GridItem>
            );
          })}
        </Grid>
      </VStack>

      <VStack w="30%" alignItems="flex-start" position="sticky">
        <Heading size="sm">Product</Heading>
        <Select value={selectedGroup} mb={3} onChange={(e) => setSelected(e.target.value)}>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </Select>

        <Heading size="sm">Filter</Heading>
        <InputGroup w="100%" mb={3}>
          <Input placeholder="Search for a card" value={filter} onChange={(e) => setFilter(e.target.value)} />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>

        <Heading mb={1} size="sm">
          Stats
        </Heading>

        <AverageCardPrices cards={cards} />

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
