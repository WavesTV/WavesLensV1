
import React, { useEffect, useMemo, useState } from "react";
import { Icons } from "./icons";
import formatDate from "@/lib/formatDate";
import Link from "next/link";
import {
  useCreateMirror,
  useCollect,
  useReaction,
  Post,
  Comment,
  ReactionTypes,
  CollectState,
  useEncryptedPublication,
  ProfileOwnedByMe,
} from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "./ui/skeleton";

import { Paper, ActionIcon, Group, Tooltip, Avatar, Space, UnstyledButton, Text, Spoiler, Image} from "@mantine/core";
import { IconHeart, IconHeartFilled, IconMessageCircle, IconMessageShare, IconScriptMinus, IconScriptPlus, IconStack3 } from "@tabler/icons-react";


type Props = {
  post: Post | Comment;
  activeProfile: ProfileOwnedByMe;
  className?: string;
};

// Currently only handle upvote
const reactionType = ReactionTypes.Upvote;

export default function Post({ post, className, activeProfile }: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const mirror = useCreateMirror({
    publisher: activeProfile,
  });

  const collect = useCollect({
    collector: activeProfile,
    publication: post,
  });

  const react = useReaction({
    profileId: activeProfile.id,
  });

  const [hasDecrypted, setHasDecrypted] = useState<boolean>(false);

  const encryptedPublication = useEncryptedPublication({
    publication: post,
  });

  // Either use the post, or if it has been decrypted, use the decrypted post
  const postToUse = useMemo(() => {
    if (hasDecrypted) {
      if (!encryptedPublication?.data) {
        return post;
      }

      if (encryptedPublication.isPending) {
        return post;
      }

      return encryptedPublication?.data;
    } else {
      return post;
    }
  }, [hasDecrypted, encryptedPublication, post]);

  const hasReaction = useMemo(() => {
    return react?.hasReaction({
      publication: postToUse,
      reactionType,
    });
  }, [react, postToUse]);

  const postMedia = useMemo(() => {
    return (
      postToUse?.metadata?.image ||
      postToUse?.metadata?.media?.[0]?.original?.url ||
      null
    );
  }, [postToUse]);

  // If can be decrypted by observer, do so by default
  useEffect(() => {
    if (hasDecrypted) return;

    if (post.isGated && post.canObserverDecrypt.result) {
      void encryptedPublication?.decrypt();
    }
  }, [post, hasDecrypted, encryptedPublication]);

  // When "pending" changes on the encrypted publication, set the hasDecrypted state
  useEffect(() => {
    if (hasDecrypted) return;

    if (
      encryptedPublication?.data &&
      encryptedPublication.isPending === false &&
      post.isGated &&
      post.canObserverDecrypt.result
    ) {
      setHasDecrypted(true);
    }
  }, [
    encryptedPublication,
    hasDecrypted,
    post.canObserverDecrypt.result,
    post.isGated,
  ]);

  async function handleReaction() {
    if (!react) return;

    if (!hasReaction) {
      await react.addReaction({
        publication: post,
        reactionType,
      });
    } else {
      await react.removeReaction({
        publication: post,
        reactionType,
      });
    }
  }

    const replaceURLs = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const atSymbolRegex = /(\S*@+\S*)/g;

    return text
      .replace(urlRegex, (url: string) => `<a href="${url}" target="_blank">${url}</a>`)
      .replace(atSymbolRegex, (match: string) => ` ${match} `);
  };

  return (
    <>
      <Paper shadow="xl" radius="md" withBorder p="xl">
      <Group justify="apart">
         {postToUse.isGated && (
                  <Tooltip label={hasDecrypted
                        ? "Only followers can see this content."
                        : "This content is for followers only."}>
                      <Icons.gated
                        className="text-muted-foreground"
                        color={
                          hasDecrypted
                            ? "rgb(74 222 128)"
                            : "hsl(var(--muted-foreground))"
                        }
                      />
                  </Tooltip>
            )}
         
             <Text c="dimmed" size="xs" fw={500}>{formatDate(postToUse.createdAt)} ago</Text>
      
                  <Tooltip label="Go to Post">
                    <ActionIcon
                      color="blue"
                      size="sm"
                      variant="light"
                      onClick={() => {
                        router.push(`/post/${postToUse.id}`);
                      }}
                    >
                      <IconMessageShare />
                    </ActionIcon>
                  </Tooltip>
          </Group>

      <UnstyledButton component={Link} href={`/profile/${postToUse.profile.handle}`}>
        <Group justify="center">
        <Avatar
        // @ts-ignore
        src={postToUse.profile.picture?.original?.url || "/user.png"}
                  alt={`${
                    postToUse.profile.name || postToUse.profile.handle
                  }'s profile picture`}
        size="lg" 
        />

       
         <Text fw={500} c="dimmed" >{postToUse.profile.name || postToUse.profile.handle}</Text>
         </Group>
      </UnstyledButton>
      <Space h="xl" />
       
           <Group justify="center">
      <Spoiler
                  maxHeight={222}
                  showLabel={
                    <>
                      <Space h="xs" />
                      <Tooltip label="Show More">
                        <IconScriptPlus />
                      </Tooltip>
                    </>
                  }
                  hideLabel={
                    <>
                      <Space h="xs" />
                      <Tooltip label="Show Less">
                        <IconScriptMinus />
                      </Tooltip>
                    </>
                  }
                >
                   
                   <div
          style={{
            maxWidth: "100%", // Adjust this value to control the maximum width
            margin: "0 auto", // Center the content horizontally if needed
          }}
        >
 {/* Post content */}
            {encryptedPublication?.isPending && (
              <Skeleton className="w-full h-20 mt-2" />
            )}

            {post.isGated && post.canObserverDecrypt.result === false ? (
                <Text size="md" fw={500}>
                  {`This is a followers-only exclusive. Follow ${
                    post.profile.name || post.profile.handle
                  } to see this content.`}
                </Text>
            ) : (
              !encryptedPublication?.isPending && (
                <Text
                size="md"
               
                dangerouslySetInnerHTML={{
                  // @ts-ignore
                        __html: replaceURLs(postToUse.metadata.content.replace(/\n/g, "<br> ")),
                      }}
                />

              )
            )}
                
         </div>
             
                </Spoiler>
                </Group>
                <Space h="md"/>  
       

           

            {postMedia && (
              <Group justify="center">
                    <UnstyledButton
                      
                    >
                      <Image
                         src={postMedia}
                        alt={`A post by ${
                    postToUse.profile.name || postToUse.profile.handle
                  }`}
                        radius="md"
                       
                        fit="contain"
                      />
                    </UnstyledButton>
                  </Group>
                
            )}

            <Space h="xl" />

            {/* Post metadata */}
            <Group justify="center">
              {/* Comments - Take user to the post */}
              <ActionIcon
                variant="subtle"
                      radius="md"
                      size={36}
                onClick={(e) => {
                  router.push(`/post/${postToUse?.id}`);
                  e.stopPropagation();
                }}
              >
                <IconMessageCircle size={18} stroke={1.5} />
                
              </ActionIcon>
                <Text size="xs" c="dimmed">
                  {postToUse?.stats?.commentsCount}
                  </Text>


              {/* Mirrors */}
              <ActionIcon
               variant="subtle"
               radius="md"
                size={36}
               
                onClick={async (e) => {
                  try {
                    e.stopPropagation();
                    await mirror?.execute({
                      publication: postToUse,
                    });
                    toast({
                      title: "Post mirrored",
                      description: `Successfully mirrored ${
                        postToUse.profile.name || postToUse.profile.handle
                      }'s post.`,
                    });
                  } catch (error) {
                    console.error(error);
                    toast({
                      variant: "destructive",
                      title: "Failed to mirror post",
                      description: `This user has disabled mirroring for this post.`,
                    });
                  }
                }}
              >
                <Icons.mirror
                  className={
                    postToUse.isMirroredByMe
                      ? "text-green-400 text-sm"
                      : "text-muted-foreground text-sm"
                  }
                />
                <p
                  className={
                    postToUse.isMirroredByMe
                      ? "text-green-400 text-sm"
                      : "text-muted-foreground text-sm"
                  }
                >
                  {postToUse?.stats?.totalAmountOfMirrors}
                </p>
              </ActionIcon>

              {/* Hearts */}
              <ActionIcon
               variant="subtle"
                      radius="md"
                      size={36}
             
                onClick={(e) => {
                  e.stopPropagation();
                  try {
                    handleReaction();
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
               

                {hasReaction ? (
  <IconHeartFilled size={18} stroke={1.5} />
) : (
  <IconHeart size={18} stroke={1.5} />
)}
               
                   
              </ActionIcon>
                <Text size="xs" c="dimmed">
                  {postToUse?.stats?.totalUpvotes}
                  </Text>

              <ActionIcon
                      
                      variant="subtle"
                      radius="md"
                      size={36}
                
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    switch (postToUse.collectPolicy.state) {
                      case CollectState.COLLECT_TIME_EXPIRED:
                        toast({
                          variant: "destructive",
                          title: "Post cannot be collected!",
                          description: `The collection time has expired for this post.`,
                        });

                      case CollectState.COLLECT_LIMIT_REACHED:
                        toast({
                          variant: "destructive",
                          title: "Post cannot be collected!",
                          description: `The collection limit has been reached for this post.`,
                        });

                      case CollectState.NOT_A_FOLLOWER:
                        toast({
                          variant: "destructive",
                          title: "Post cannot be collected!",
                          description: `You need to follow ${post.profile.name} to collect this post.`,
                        });

                      case CollectState.CANNOT_BE_COLLECTED:
                        toast({
                          variant: "destructive",
                          title: "Post cannot be collected!",
                          description: `The creator of this post has disabled collections.`,
                        });

                      case CollectState.CAN_BE_COLLECTED:
                        try {
                          const result = await collect?.execute();

                          if (result?.isFailure()) {
                            throw new Error(result.error.message);
                          }

                          toast({
                            title: "Collected Post!",
                            description: `You have collected ${
                              postToUse.profile.name || postToUse.profile.handle
                            }'s post`,
                          });
                        } catch (error) {
                          console.error(error);
                          // TODO: Handle "InsufficientFundsError"
                          toast({
                            variant: "destructive",
                            title: "Post cannot be collected!",
                            description: `Something went wrong collecting this post. Please try again later.`,
                          });
                        }
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <IconStack3
                      size={18}
                      stroke={1.5}
                      />  
              </ActionIcon>
              <Text size="xs" c="dimmed">
                  {postToUse?.stats?.totalAmountOfCollects}
              </Text>
            </Group>
         
       
      </Paper>
    </>
  );
}
