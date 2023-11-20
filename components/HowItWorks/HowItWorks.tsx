import { Container, Text } from '@mantine/core';
import classes from './HowItWorks.module.css';
import { Zoom } from "react-awesome-reveal";

const data = [
  {
    title: 'Go Live',
    description: 'Once you have a Lens Handle you can Livestream and Post onchain, making your content available across all Lens Apps.',
  },
  {
    title: 'Earn',
    description: 'Earn via Subcriptions, Tips, and NFT Sales.',
  },
  {
    title: 'Grow',
    description: 'Waves is a place for Streamers to maximize their visibility and earnings. Start growing your Wave today!',
  },
];

export function HowItWorks() {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
        <Zoom>
      <Text className={classes.count}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
      </Zoom>
    </div>
  ));
  return <Container className={classes.root}>{stats}</Container>;
}