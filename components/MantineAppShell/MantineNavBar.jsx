import { useRouter } from "next/router";
import { Text, Space, Group, UnstyledButton, Avatar } from "@mantine/core";
import classes from "../../styles/RecommendedWaves.module.css";
import { useSession } from '@lens-protocol/react-web';
import { RecommendedWaves } from "@/components/RecommendedWaves";

export function MantineNavBar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
    
      <Text ta="center" fs="italic" fw={700} size="md">
        Recommended Waves
      </Text>
      <Space h="md" />


{session?.authenticated && session.type === "WITH_PROFILE" ? (
  <>
    <RecommendedWaves />
  </>
) : (
  <>
  <UnstyledButton
        onClick={() => router.push("/wave/titannode")}
        className={classes.user}
      >
        <Group>
          <Avatar
            src="https://ik.imagekit.io/lens/media-snapshot/4a06ebbbd900102ba392ff8f63f4b1562ccf999a865ebc7bf8b26efdfcb14532.png"
            radius="xl"
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Titan Node
            </Text>

            <Text c="dimmed" size="xs">
              @titannode
            </Text>
          </div>
        </Group>
      </UnstyledButton>

      <UnstyledButton
        onClick={() => router.push("/wave/jarrodwatts")}
        className={classes.user}
      >
        <Group>
          <Avatar
            src="https://ik.imagekit.io/lens/media-snapshot/tr:w-300,h-300/f19080249d7eb5457b9a8a3204f63672e8a827d2b59f23cb758fa2fce9de1b68.png"
            radius="xl"
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Jarrod Watts
            </Text>

            <Text c="dimmed" size="xs">
              @jarrodwatts
            </Text>
          </div>
        </Group>
      </UnstyledButton>

      <UnstyledButton
        onClick={() => router.push("/wave/foundnone")}
        className={classes.user}
      >
        <Group>
          <Avatar
            src="https://ik.imagekit.io/lens/media-snapshot/tr:w-300,h-300/c0a499a325343e16ac4c096906e33f111b5f6f3190b17445917b2491dc74c507.png"
            radius="xl"
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Transmental
            </Text>

            <Text c="dimmed" size="xs">
              @foundnone
            </Text>
          </div>
        </Group>
      </UnstyledButton>

      <UnstyledButton
        onClick={() => router.push("/wave/rehash")}
        className={classes.user}
      >
        <Group>
          <Avatar
            src="https://ik.imagekit.io/lens/media-snapshot/tr:w-300,h-300/bf425afca090edab12dbc16dbf0b56c08d1c3ef1555deddf09bf9c6633ed6976.jpg"
            radius="xl"
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Rehash: A Web3 Podcast
            </Text>

            <Text c="dimmed" size="xs">
              @rehash
            </Text>
          </div>
        </Group>
      </UnstyledButton>

      <UnstyledButton
        onClick={() => router.push("/wave/krassenstein")}
        className={classes.user}
      >
        <Group>
          <Avatar
            src="https://ik.imagekit.io/lens/media-snapshot/tr:w-300,h-300/b0ee1bc9613628d9668693825a59c5f55b099adb6b91a6f52a95933670e071a4.jpg"
            radius="xl"
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Krassenstein
            </Text>

            <Text c="dimmed" size="xs">
              @krassenstein
            </Text>
          </div>
        </Group>
      </UnstyledButton>
  </>
)
}
    </>
  );
}
