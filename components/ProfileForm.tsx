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
} from "@/components/form";
import {
  FollowPolicyType,
  Session,
  useUpdateFollowPolicy,
  useSetProfileMetadata,
  Profile,
  useCurrencies,
} from "@lens-protocol/react-web";
import useUpload from "@/lib/useUpload";
import { useRouter } from "next/router";
import { useState } from "react";

import Link from "next/link";
import { IconUserPlus, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import {
  Center,
  Paper,
  Space,
  Divider,
  Text,
  Button,
  Input,
  Container,
  Checkbox,
  Group,
} from "@mantine/core";
import { profile } from "@lens-protocol/metadata";
import { IconExclamationMark } from "@tabler/icons-react";

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
  Profile: Profile;
};

export default function ProfileForm({ Profile }: Props) {
  const router = useRouter();
  const upload = useUpload();

  const currencies = useCurrencies();
  
  const updateProfile = useSetProfileMetadata();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: Profile?.metadata?.displayName || "",
      bio: Profile?.metadata?.bio || "",
    },
  });

  const [profilePictureNew, setProfilePicture] = useState<File | undefined>();
  const [coverPictureNew, setCoverPicture] = useState<File | undefined>();

  async function onSubmit(data: z.infer<typeof FormSchema>) {


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
        profilePicture ||
        data.name !== Profile?.metadata?.displayName ||
        data.bio !== Profile?.metadata?.bio
      ) {
        const metadata = profile({
          name: Profile?.metadata?.displayName || "",
          bio: Profile?.metadata?.bio || "",
          // @ts-ignore
          coverPicture:
            // @ts-ignore
            coverPicture || Profile?.metadata.coverPicture || "",
          picture: profilePicture || "",
        });

        const metadataURI = await upload(metadata);
        // 1. Profile info
        const updateProfileResult = await updateProfile?.execute({
          metadataURI,
        });

        if (updateProfileResult?.isFailure()) {
          throw new Error(updateProfileResult.error.message);
        }
      }
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
            <Text ta="center" fw={700} size="xl">
              Edit Profile
            </Text>

            <Divider my="sm" />
            <Space h="xl" />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Text ta="left" fw={700} size="sm">
                      Display Name
                    </Text>
                  </FormLabel>
                  <Space h="xs" />
                  <FormControl>
                    <Input radius="xl" placeholder="Your Mom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Space h="xl" />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Text ta="left" fw={700} size="sm">
                      Bio
                    </Text>
                  </FormLabel>
                  <Space h="xs" />
                  <FormControl>
                    <Input
                      radius="xl"
                      placeholder="A short Italian plumber that likes to jump on turtles."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Space h="xl" />

            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Text ta="left" fw={700} size="sm">
                      Profile Picture
                    </Text>
                  </FormLabel>
                  <Space h="xs" />
                  <FormControl>
                    <Input
                      radius="xl"
                      {...field}
                      type="file"
                      accept="image/*"
                      multiple={false}
                      onChange={(e: any) => {
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
            <Space h="xl" />
            <FormField
              control={form.control}
              name="coverPicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Text ta="left" fw={700} size="sm">
                      Cover Picture
                    </Text>
                  </FormLabel>
                  <Space h="xs" />
                  <FormControl>
                    <Input
                      radius="xl"
                      {...field}
                      type="file"
                      accept="image/*"
                      multiple={false}
                      onChange={(e: any) => {
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

            <Space h="xl" />
            <Group justify="right">
              <Button
                onClick={() =>
                  notifications.show({
                    title: "Lens V2 Upgrade",
                    icon: <IconExclamationMark size="1.1rem" />,
                    color: "blue",
                    message:
                      "Waves is upgrading to Lens v2. This will work soon... hopefully. ",
                  })
                }
              >
                Submit
              </Button>
            </Group>
          </form>
        </Form>
      </Paper>
    </Container>
  );
}
