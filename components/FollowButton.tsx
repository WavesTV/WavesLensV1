import {
  FollowPolicyType,
  Profile,
  useApproveModule,
  useFollow,
  useUnfollow,
} from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import React from "react";
import { Button, Center, Text } from "@mantine/core";
import { useSDK } from "@thirdweb-dev/react";
import { notifications } from "@mantine/notifications";
import { IconUserPlus, IconUserX, IconX } from "@tabler/icons-react";

type Props = {
  profile: Profile;
};

export default function FollowButton({ profile }: Props) {
 

  const {
    execute: unfollow,
    error: errorUnfollow,
    loading: loadingUnfollow,
  } = useUnfollow();

  const { execute: follow } = useFollow();

  return (
    <div className="flex flex-col items-center justify-center absolute top-0 right-0 gap-2">
      <Button
        fullWidth
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        onClick={() => (profile ? follow({ profile: profile }) : null)}
      >
        Follow
      </Button>
    </div>
  );
}
