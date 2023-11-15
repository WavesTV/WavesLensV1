import { useState } from "react";
import { useCreatePost } from "@lens-protocol/react-web";
import { useSDK } from "@thirdweb-dev/react";
import fileToMimeType from "@/lib/fileToMimeType";
import fileToContentFocus from "@/lib/fileToContentFocus";
import useUpload from "@/lib/useUpload";
import { useRouter } from "next/router";
import {
  Avatar,
  Paper,
  Text,
  Button,
  Textarea,
  Space,
  Group,
  Container,
  Checkbox,
  ActionIcon,
  FileInput,
  Center,
} from "@mantine/core";
import SignInWithLensButton from "@/components/SignInWithLensButton";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { BiTimer } from "react-icons/bi";

export function Create() {
  const router = useRouter();
  const sdk = useSDK();
  const upload = useUpload();

  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [isFollowersOnly, setIsFollowersOnly] = useState<boolean>(false);

  return (
    <>
      <Paper shadow="xl" withBorder p="xl">
        <Group>
          <Avatar
            src={
              // @ts-ignore
              activeProfile?.data?.picture?.original?.url || "/user.png"
            }
            size="lg"
          />

          <Text c="dimmed" fw={500} size="lg">
            anon
          </Text>
        </Group>
        <Space h="md" />

        <Space h="md" />

        <Group justify="apart">
          <Button
            disabled
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 205 }}
          >
            Create
          </Button>
          <Checkbox
            label="Followers Only"
            description="Only your followers will be able to see this post."
            id="followers-only"
            size="sm"
            disabled
          />
        </Group>
      </Paper>
    </>
  );
}
