import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import SignInWithLensButton from "@/components/SignInWithLensButton";
import { useSession } from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import {
  Center,
  Container,
  Paper,
  Text,
  Loader,
  Space,
  Group,
} from "@mantine/core";

const Login: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Use the useRouter hook to programmatically navigate to the dashboard
    if (session && session.type === "WITH_PROFILE") {
      router.push("/dashboard");
    }
  }, [session, router, session?.type]);

  return (
    <>
      <Space h="xl" />
      <Container>
        <Center>
          <Text
            size="xl"
            fw={900}
            fs="italic"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            Welcome to Waves
          </Text>
        </Center>

        <Space h="md" />
        <Group justify="center">
          {/* Wallet connected, has profile on Lens. */}
          {session?.authenticated ? (
            // Render content when both walletInfo and activeProfile data are available
            <>
              <Loader size={28} />
            </>
          ) : (
            // Render content when either walletInfo or activeProfile data is missing
            <>
              <Center>
                <SignInWithLensButton />
              </Center>
            </>
          )}
        </Group>

        <Space h="md" />
      </Container>
    </>
  );
};

export default Login;
