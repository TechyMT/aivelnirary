import { faker } from '@faker-js/faker';

export const generateFakeMarkdown = (i: number): string => {
  const destination = faker.address.city();
  const travelDate = faker.date.future().toDateString();
  const description = faker.lorem.paragraph();
  const activities = Array.from(
    { length: 4 },
    () => `- ${faker.lorem.sentence()}`
  ).join('\n');

  return `
# Travel Itinerary: ${destination}

![${destination} Nature](https://picsum.photos/1200/600?random=${i}&category=nature)

**Date:** ${travelDate}

## Description
${description}


## Planned Activities
${activities}

![Architecture in ${destination}](https://picsum.photos/1200/600?random=${Math.random() * i}&category=architecture)

Happy Travels!
`;
};
