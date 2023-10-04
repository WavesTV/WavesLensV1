import { useState } from "react";
import {
  CollectPolicyType,
  ContentFocus,
  DecryptionCriteriaType,
  MediaObject,
  ReferencePolicyType,
  useActiveProfile,
  useActiveWallet,
  useCreateEncryptedPost,
  useCreatePost,
} from "@lens-protocol/react-web";
import { useSDK } from "@thirdweb-dev/react";
import fileToMimeType from "@/lib/fileToMimeType";
import fileToContentFocus from "@/lib/fileToContentFocus";
import useUpload from "@/lib/useUpload";
import { useRouter } from "next/router";
import { Avatar, Paper, Text, Button, Textarea, Space, Group, Container, Checkbox , ActionIcon, FileInput, Center} from "@mantine/core";
import SignInWithLensButton from "@/components/SignInWithLensButton";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export function Create() {
  const router = useRouter();
  const sdk = useSDK();
  const upload = useUpload();

  // Form state
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [isFollowersOnly, setIsFollowersOnly] = useState<boolean>(false);

  const walletInfo = useActiveWallet();
  const activeProfile = useActiveProfile();

// Check if the user is signed in before creating posts
const createEncrypted = useCreateEncryptedPost({
  publisher: activeProfile?.data!, // Pass null or some default value if the user is not signed in
  upload: async (data: unknown) => upload(data),
});

const createUnencrypted = useCreatePost({
  publisher: activeProfile?.data!, // Pass null or some default value if the user is not signed in
  upload: async (data: unknown) => upload(data),
});

  async function handleCreatePost() {
    if (!sdk || !activeProfile?.data) return;

    let result;

    try {
      if (file) {
        const mediaUrl = await upload(file);

        const mediaAttachment: MediaObject = {
          url: mediaUrl,
          mimeType: fileToMimeType(file),
        };

        // 1/4 File + Followers Only
        if (isFollowersOnly) {
          result = await createEncrypted?.execute({
            locale: "en-us",
            content: content,
            media: [mediaAttachment],
            animationUrl: "", // wat?
            contentFocus: fileToContentFocus(file),
            decryptionCriteria: {
              type: DecryptionCriteriaType.FOLLOW_PROFILE,
              profileId: activeProfile?.data?.id,
            },
            collect: {
              type: CollectPolicyType.NO_COLLECT,
            },
            reference: {
              type: ReferencePolicyType.ANYONE,
            },
          });
        }
        // 2/4 File + Public
        else {
          result = await createUnencrypted?.execute({
            locale: "en-us",
            content: content,
            media: [mediaAttachment],
            animationUrl: "", // wat?
            contentFocus: fileToContentFocus(file),
            collect: {
              type: CollectPolicyType.NO_COLLECT,
            },
            reference: {
              type: ReferencePolicyType.ANYONE,
            },
          });
        }
      } else {
        // 3/4 No File + Followers Only
        if (isFollowersOnly) {
          result = await createEncrypted?.execute({
            locale: "en-us",
            content: content,
            contentFocus: ContentFocus.TEXT_ONLY,
            decryptionCriteria: {
              type: DecryptionCriteriaType.FOLLOW_PROFILE,
              profileId: activeProfile?.data?.id,
            },
            collect: {
              type: CollectPolicyType.NO_COLLECT,
            },
            reference: {
              type: ReferencePolicyType.ANYONE,
            },
          });
        }
        // 4/4 No File + Public
        else {
          result = await createUnencrypted?.execute({
            locale: "en-us",
            content: content,
            contentFocus: ContentFocus.TEXT_ONLY,
            collect: {
              type: CollectPolicyType.NO_COLLECT,
            },
            reference: {
              type: ReferencePolicyType.ANYONE,
            },
          });
        }
      }

      if (result?.isFailure()) {
        throw new Error(result.error.message);
      } else {
        notifications.show({
      title: "Success",
      icon: <IconCheck size="1.1rem" />,
      color: "green",
      message: "Allow a few seconds for your post to appear.",
    });


        router.push(`/profile/${activeProfile.data.handle}`);
      }
    } catch (error) {
      console.error(error);
      notifications.show({
      title: "Error creating post.",
      icon: <IconX size="1.1rem" />,
      color: "red",
      message: "Something went wrong creating your post. Please try again later.",
    });

    }
  }


  return (
    
    <>
      <Container>

        
                {walletInfo?.data && activeProfile?.data ? (
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
                    {activeProfile?.data?.handle || "anon"} 
                  </Text>
</Group>
        <Space h="md"/>
            <Textarea
              id="content"
      variant="filled"
      size="md"
      radius="md"
      placeholder="Announce your next Stream!"
      onChange={(e) => setContent(e.target.value)}
    />

    
          
         <Space h="md"/>

<Group justify="apart">
<Button variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 205 }} onClick={handleCreatePost}>
            Create Post
          </Button>
<Checkbox
      defaultChecked
      label="Followers Only"
      description="Only your followers will be able to see this post."
      id="followers-only"
      size="sm"
      checked={isFollowersOnly}
      onChange={() => setIsFollowersOnly(!isFollowersOnly)}
    />
          


          
    </Group>    
      </Paper>
                ) : (
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
                    {activeProfile?.data?.handle || "anon"} 
                  </Text>
</Group>
        <Space h="md"/>
            <Textarea
              id="content"
      variant="filled"
      size="md"
      radius="md"
      placeholder="You must Connect your Wallet and have a valid Lens Profile NFT to post!"
      onChange={(e) => setContent(e.target.value)}
    />

    
          
         <Space h="md"/>

<Group justify="apart">
<Button disabled variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 205}} >
            Create Post
          </Button>
<Checkbox
      defaultChecked
      label="Followers Only"
      description="Only your followers will be able to see this post."
      id="followers-only"
      size="sm"
disabled
    />
          


          
    </Group>    
      </Paper>
                )}
       
      </Container>
    </>
  );
};

export default Create;
