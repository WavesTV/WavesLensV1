import {
  Text,
  Space,
  Group,
  UnstyledButton,
  Avatar,
  Center,
} from "@mantine/core";
import classes from "../../styles/RecommendedWaves.module.css";

export function MantineAside() {
  return (
    <>
      <Space h={40} />
      <Text fw={700} ta="center" fs="italic">
        Powered By
      </Text>
      <Space h="sm" />
      <UnstyledButton
        component="a"
        href="https://www.lens.xyz/"
        target="_blank"
        rel="noreferrer"
        className={classes.user}
      >
        <Group>
          <Avatar
            src="https://gw.ipfs-lens.dev/ipfs/Qmb4XppdMDCsS7KCL8nCJo8pukEWeqL4bTghURYwYiG83i/cropped_image.png"
            radius="xl"
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Lens Protocol
            </Text>
          </div>
        </Group>
      </UnstyledButton>

      <UnstyledButton
        component="a"
        href="https://livepeer.org/"
        target="_blank"
        rel="noreferrer"
        className={classes.user}
      >
        <Group>
          <Avatar
            src="https://gw.ipfs-lens.dev/ipfs/bafkreieqprlwmiawdkfzlvxjsaldlctrgxq6ccjhizriqhspedb5k2imyy"
            radius="xl"
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Livepeer
            </Text>
          </div>
        </Group>
      </UnstyledButton>

      <UnstyledButton
        component="a"
        href="https://thirdweb.com/"
        target="_blank"
        rel="noreferrer"
        className={classes.user}
      >
        <Group>
          <Avatar
            src="https://pbs.twimg.com/profile_images/1580649916686286848/vdNCao2e_400x400.jpg"
            radius="xl"
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              ThirdWeb
            </Text>
          </div>
        </Group>
      </UnstyledButton>

      <Space h="md" />
      <Text fw={700} ta="center" fs="italic">
        Promoted Artist
      </Text>
      <Space h="md" />
      <Group ml={5} mr={5}>
        <iframe
          style={{
            borderRadius: "14px",
          }}
          src="https://open.spotify.com/embed/album/4m1SepLgm4jLLnNIKK8D5v?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </Group>
    </>
  );
}
