
import { Button, Space, Center } from "@mantine/core";
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
        <Center>
          <h1>
            Profile not found
          </h1>
          <Space h="lg"/>
          <Button onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </Center>
      </>
    );
  }

  return (
    <>

      <Container>
        <Center>
          {activeProfile?.loading ? (
            <Skeleton className="h-96" />
          ) : (
            activeProfile &&
            activeProfile.data && <ProfileForm profile={activeProfile?.data} />
          )}
        </Center>
      </Container>
    </>
  );
};

export default ProfilePage;
