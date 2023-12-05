import { ActionIcon, Group, Modal } from "@mantine/core";
import {
  IconBellRinging,
  IconHome2,
  IconLayoutDashboard,
  IconReceipt2,
} from "@tabler/icons-react";
import { FiPlus } from "react-icons/fi";
import { Create } from "@/components/create";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useSession } from "@lens-protocol/react-web";
import classes from "../../styles/RecommendedWaves.module.css";
import { useRouter } from "next/router";
export function MantineFooter() {
  const [openedCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [active, setActive] = useState("Home");
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <Modal
        opened={openedCreate}
        onClose={closeCreate}
        title="Create Post"
        centered
      >
        <Create />
      </Modal>

      <Group position="center" spacing="lg" grow noWrap>
        <ActionIcon
          className={classes.link}
          data-active={active === "/" || undefined}
          variant="subtle"
          size="xl"
          radius="md"
          onClick={() => {
            setActive("/");
            router.push("/");
          }}
        >
          <IconHome2 size="1.4rem" />
        </ActionIcon>

        <ActionIcon
          variant="subtle"
          className={classes.link}
          data-active={active === "/dashboard" || undefined}
          size="xl"
          radius="md"
          onClick={() => {
            setActive("/dashboard");
            router.push("/dashboard");
          }}
        >
          <IconLayoutDashboard size="1.4rem" />
        </ActionIcon>

        {session?.type === "WITH_PROFILE" && (
          <ActionIcon
            onClick={openCreate}
            color="blue"
            size="lg"
            radius="xl"
            variant="filled"
          >
            <FiPlus size="1.7rem" />
          </ActionIcon>
        )}

        <ActionIcon
          variant="subtle"
          data-active={active === "/wallet" || undefined}
          size="xl"
          radius="md"
          className={classes.link}
          onClick={() => {
            setActive("/wallet");
            router.push("/wallet");
          }}
        >
          <IconReceipt2 size="1.4rem" />
        </ActionIcon>

        <ActionIcon
          variant="subtle"
          className={classes.link}
          data-active={active === "/notifications" || undefined}
          size="xl"
          radius="md"
          onClick={() => {
            setActive("/notifications");
            router.push("/notifications");
          }}
        >
          <IconBellRinging size="1.4rem" />
        </ActionIcon>
      </Group>
    </>
  );
}
