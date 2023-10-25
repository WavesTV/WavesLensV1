import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


import {
  FollowPolicyType,
  ProfileOwnedByMe,
  useUpdateProfileDetails,
  useUpdateProfileImage,
  useUpdateFollowPolicy,
  Amount,
  useCurrencies,
} from "@lens-protocol/react-web";
import useUpload from "@/lib/useUpload";
import { useRouter } from "next/router";
import { useState } from "react";
import { Separator } from "./ui/separator";

import Link from "next/link";
import { IconUserPlus, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { Center, Paper, Space, Divider, Text, Button, Input, Container, Checkbox, Group } from "@mantine/core";

const FormSchema = z.object({
  name: z.string().min(3).max(20).optional(),
  bio: z.string().max(1000).optional(),
  profilePicture: z.any().optional(),
  coverPicture: z.any().optional(),
  followPolicy: z
    .object({
      type: z
        .enum([FollowPolicyType.ANYONE, FollowPolicyType.CHARGE])
        .optional(),
      price: z.string().optional(),
    })
    .optional(),
});

type Props = {
  profile: ProfileOwnedByMe;
};

export default function ProfileForm({ profile }: Props) {
  const router = useRouter();
  const upload = useUpload();

  const currencies = useCurrencies();
  console.log(currencies?.data);

  const updateProfile = useUpdateProfileDetails({
    profile: profile,
    upload: upload,
  });

  const updateProfileImage = useUpdateProfileImage({
    profile: profile,
  });

  const updateFollowerPolicy = useUpdateFollowPolicy({
    profile: profile,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: profile.name || "",
      bio: profile.bio || "",
    },
  });

  const [profilePictureNew, setProfilePicture] = useState<File | undefined>();
  const [coverPictureNew, setCoverPicture] = useState<File | undefined>();

  const [newFollowerPolicy, setNewFollowerPolicy] = useState<FollowPolicyType>(
    profile.followPolicy.type
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    console.log(newFollowerPolicy);

    try {
      let profilePicture: string | undefined;
      let coverPicture: string | undefined;

      if (coverPictureNew) {
        coverPicture = await upload(coverPictureNew);
      }

      if (profilePictureNew) {
        profilePicture = await upload(profilePictureNew);
      }

      // If any profile data got updated...
      if (
        coverPicture ||
        data.name !== profile.name ||
        data.bio !== profile.bio
      ) {
        // 1. Profile info
        const updateProfileResult = await updateProfile?.execute({
          name: data.name || profile.name || "",
          bio: data.bio || profile.bio || "",
          // @ts-ignore
          coverPicture: coverPicture || profile?.coverPicture?.original?.url || "",
        });

        if (updateProfileResult?.isFailure()) {
          throw new Error(updateProfileResult.error.message);
        }
      }

      // 2. Profile picture
      if (profilePicture) {
        const updateImageResult = await updateProfileImage?.execute(
          profilePicture
        );

        if (updateImageResult?.isFailure()) {
          throw new Error(updateImageResult.error.message);
        }
      }

      // 3. Follower policy
      if (
        newFollowerPolicy !== profile.followPolicy.type ||
        (newFollowerPolicy === FollowPolicyType.CHARGE &&
          data.followPolicy?.price)
      ) {
        const erc20 = currencies?.data?.find((c) => c.symbol === "WMATIC")!;
        const amount = data.followPolicy?.price || "0";
        const fee = Amount.erc20(erc20, amount);

        const followerUpdateResult = await updateFollowerPolicy?.execute({
          followPolicy:
            newFollowerPolicy === FollowPolicyType.CHARGE
              ? {
                  type: FollowPolicyType.CHARGE,
                  amount: fee,
                  recipient: profile.ownedBy,
                }
              : {
                  type: FollowPolicyType.ANYONE,
                },
        });

        if (followerUpdateResult?.isFailure()) {
          throw new Error(followerUpdateResult.error.message);
        }
      }
      notifications.show({
      title: "Success",
      icon: <IconUserPlus size="1.1rem" />,
      color: "green",
      message: "Profile updated Successfully.",
    });
     

      router.push(`/profile/${profile.handle}`);
    } catch (error) {
      console.error(error);
       notifications.show({
      title: "Error",
      icon: <IconX size="1.1rem" />,
      color: "red",
      message: "Something went wrong. Please try again later.",
    });
     
    }
  }

  return (
    <Container>
    <Paper shadow="md" radius="md" withBorder p="xl">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
       
          <Text ta="center" fw={700} size="xl">Edit Profile</Text>
        
        <Divider my="sm" />
        <Space h="xl"/>


          
        <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                      <Text ta="left" fw={700} size="sm">Display Name</Text>
                      </FormLabel>
                      <Space h="xs"/>
                      <FormControl>
                        <Input placeholder="Your Mom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

        <Space h="xl"/>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel><Text ta="left" fw={700} size="sm">Bio</Text></FormLabel>
              <Space h="xs"/>
              <FormControl>
                <Input
                  placeholder="A short Italian plumber that likes to jump on turtles."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Space h="xl"/>

        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem>
              <FormLabel><Text ta="left" fw={700} size="sm">Profile Picture</Text></FormLabel>
              <Space h="xs"/>
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => {
                    if (e.target.files) {
                      setProfilePicture(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Space h="xl"/>
        <FormField
          control={form.control}
          name="coverPicture"
          render={({ field }) => (
            <FormItem>
              <FormLabel><Text ta="left" fw={700} size="sm">Cover Picture</Text></FormLabel>
              <Space h="xs"/>
              <FormControl>
                <Input
                  {...field}
                
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => {
                    if (e.target.files) {
                      setCoverPicture(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<Space h="xl"/>
        <Text ta="center" fw={700} size="xl">Subscription Settings</Text>
        
        <Divider my="sm" />
        <Space h="xl"/>

        <FormField
          control={form.control}
          name="followPolicy.type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
  label="Enable paid subscriptions"
  size="md"
  {...field}
  checked={newFollowerPolicy === FollowPolicyType.CHARGE}
  onChange={(checked) => {
    if (checked) {
      field.value = FollowPolicyType.CHARGE;
      setNewFollowerPolicy(FollowPolicyType.CHARGE);
    } else {
      field.value = FollowPolicyType.ANYONE;
      setNewFollowerPolicy(FollowPolicyType.ANYONE);
    }
  }}
/>

              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
<Space h="xl"/>
        <FormField
          control={form.control}
          name="followPolicy.price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Follow Price</FormLabel>
              <FormDescription>
                This is the price that followers pay to follow you. It uses{" "}
                <Link
                  href="https://polygonscan.com/token/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
                  target="_blank"
                  className="underline font-semibold"
                >
                  Wrapped MATIC ($MATIC)
                </Link>
                .
              </FormDescription>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  // allow 4 decimals
                  step="0.0001"
                  defaultValue={
                    profile.followPolicy.type === FollowPolicyType.CHARGE
                      ? profile.followPolicy.amount.toNumber()
                      : 0
                  }
                  disabled={newFollowerPolicy === FollowPolicyType.ANYONE}
                  placeholder="0.00"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<Space h="xl"/>
        <Group justify="right">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Form>
    </Paper>
    </Container>
  );
}
