import {
  FollowPolicyType,
  Profile,
  ProfileOwnedByMe,
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
  followee: Profile;
  follower: ProfileOwnedByMe;
};

export default function FollowButton({ followee, follower }: Props) {
  const router = useRouter();
  const sdk = useSDK();
  const approveModule = useApproveModule();

  const follow = useFollow({
    followee,
    follower,
  });

  const unfollow = useUnfollow({
    followee,
    follower,
  });

  async function handleFollow() {
    if (followee?.ownedByMe) {
      router.push("/profile/edit");
      return;
    }

    if (!followee.followStatus?.canFollow && !followee.isFollowedByMe) {
      notifications.show({
      title: "Error: You can't follow this profile.",
      icon: <IconX size="1.1rem" />,
      color: "red",
      message: "You may have already followed this profile, or it may be private.",
    });
      return;
    }

    try {
      if (followee?.isFollowedByMe && followee.followStatus?.canUnfollow) {
        await unfollow?.execute();
        notifications.show({
        title: "Unfollowed!",
        icon: <IconUserX size="1.1rem" />,
        color: "red",
        message: `Unfollowed ${followee?.name || followee?.handle}`,
    });
        
      } else {
        // If charge, approve funds first
        if (followee.followPolicy.type === FollowPolicyType.CHARGE) {
          // const approveFundsResult = await approveModule.execute({
          //   amount: followee.followPolicy.amount,
          //   limit: TokenAllowanceLimit.INFINITE,
          //   spender: followee.followPolicy.contractAddress,
          // });

          // console.log("Approval:", approveModule);

          // Get WMATIC
          const contract = await sdk?.getContract(
            "0x9c3c9283d3e44854697cd22d3faa240cfb032889"
          );

          const approveFundsResult = await contract?.erc20.setAllowance(
            followee.followPolicy.contractAddress,
            followee.followPolicy.amount.toNumber()
          );

          console.log("Approval:", approveFundsResult);
        }

        const result = await follow?.execute();

        console.log(result);

        if (result.isFailure()) {
          notifications.show({
        title: "Error",
        icon: <IconX size="1.1rem" />,
        color: "red",
        message: `Failed to follow ${followee?.name || followee?.handle}`,
    });
          return;
        }
        notifications.show({
      title: "Success",
      icon: <IconUserPlus size="1.1rem" />,
      color: "green",
      message: `Followed ${followee?.name || followee?.handle}`,
    });
        
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        icon: <IconX size="1.1rem" />,
        color: "red",
        message: `Something went wrong!`,
    });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center absolute top-0 right-0 gap-2">
      <Button fullWidth variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }} onClick={handleFollow}>
        {followee?.ownedByMe
          ? "Edit Profile"
          : followee?.isFollowedByMe
          ? "Unfollow"
          : "Follow"}
      </Button>

      {!followee?.ownedByMe &&
        (followee?.followPolicy.type === FollowPolicyType.CHARGE ? (
          <Center>
          <Text fw={500} size="xl">
            {followee.followPolicy.amount.toNumber().toString()} $
            {followee.followPolicy.amount.asset.symbol} to follow
          </Text>
          </Center>
        ) : (
          <>
          </>
        ))}
    </div>
  );
}
