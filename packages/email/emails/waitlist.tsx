import { getAppUrl, getEmailUrl } from "@bubba-beta/utils/envs";
import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Footer } from "../components/footer";
import { Logo } from "../components/logo";

interface Props {
  email?: string;
}

const baseAppUrl = getEmailUrl();

export const WaitlistEmail = ({ email }: Props) => {
  const confirmationUrl = `https://bubba.ai/api/waitlist?email=${encodeURIComponent(email || "")}`;

  return (
    <Html>
      <Tailwind>
        <head>
          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-400-normal.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />

          <Font
            fontFamily="Geist"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-500-normal.woff2",
              format: "woff2",
            }}
            fontWeight={500}
            fontStyle="normal"
          />
        </head>

        <Preview>Confirm your email to join the Bubba AI waitlist</Preview>

        <Body className="bg-[#fff] my-auto mx-auto font-sans">
          <Container
            className="border-transparent md:border-[#E8E7E1] my-[40px] mx-auto p-[20px] max-w-[600px]"
            style={{ borderStyle: "solid", borderWidth: 1 }}
          >
            <Logo />
            <Heading className="mx-0 my-[30px] p-0 text-[24px] font-normal text-[#121212] text-center">
              Just one more step
            </Heading>

            <Text className="text-[14px] leading-[24px] text-[#121212]">
              To claim your spot on the Bubba AI waitlist, please confirm your
              email.
            </Text>
            <Section className="mb-[42px] mt-[32px] text-center">
              <Button
                className="bg-transparent text-primary text-[14px] text-[#121212] font-medium no-underline text-center px-6 py-3 border border-solid border-[#121212]"
                href={confirmationUrl}
              >
                Confirm email
              </Button>
            </Section>

            <Text className="text-[14px] leading-[24px] text-[#707070] break-all">
              or copy and paste this URL into your browser{" "}
              <Link href={confirmationUrl} className="text-[#707070] underline">
                {confirmationUrl}
              </Link>
            </Text>

            <br />
            <Section>
              <Text className="text-[12px] leading-[24px] text-[#666666]">
                This email was intended for{" "}
                <span className="text-[#121212] font-medium">{email}</span>. If
                you did not request this, please ignore this email.
              </Text>
            </Section>

            <br />

            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WaitlistEmail;
