import { translateProductCondition } from '@utils/translateProductCondition';
import { Badge, IBadgeProps, Text } from 'native-base';

// import { IBadgeComponentType } from 'native-base/lib/typescript/components/composites/Badge';

type AdBadgeProps = IBadgeProps & {
  isNew: boolean;
};
export const AdBadge = ({ isNew, ...rest }: AdBadgeProps) => (
  <Badge
    bg={isNew ? 'bluelight' : 'gray.5'}
    rounded="full"
    maxWidth={100}
    {...rest}
  >
    <Text
      fontFamily="heading"
      color={isNew ? 'white' : 'gray.3'}
    >
      {translateProductCondition(isNew)}
    </Text>
  </Badge>
);
