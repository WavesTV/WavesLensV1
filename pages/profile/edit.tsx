
import { Button, Space, Center, Loader, Paper } from "@mantine/core";
import { useActiveProfile } from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import ProfileForm from "@/components/ProfileForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "lucide-react";

const ProfilePage = () => {
  const router = useRouter();
  const activeProfile = useActiveProfile();

  if (activeProfile?.error) {
    return (
      <>
       <Container>
 <Paper shadow="xl" radius="md" withBorder p="xl">
        <Center>
          <h1>
            Profile not found
          </h1>
          <Space h="lg"/>
          </Center>
          <Center>
          <Button onClick={() => router.push("/")}>
            Back Home
          </Button>
        </Center>
        </Paper>
        </Container>
      </>
    );
  }

  return (
    <>
          {activeProfile?.loading ? (
            <Loader color="blue"/>
          ) : (
            activeProfile &&
            activeProfile.data && <ProfileForm profile={activeProfile?.data} />
          )}
      
    </>
  );
};

export default ProfilePage;
