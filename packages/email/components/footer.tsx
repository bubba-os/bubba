import { getEmailUrl } from "@bubba-beta/utils/envs";
import {
  Column,
  Hr,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = getEmailUrl();

export function Footer() {
  return (
    <Section className="w-full">
      <Hr />

      <br />

      <Text className="text-[21px] font-regular">Compliance made easy.</Text>

      <br />
      <br />

      <Row>
        <Column className="align-middle w-[40px]">
          <Link href="https://go.midday.ai/lS72Toq">
            <Img
              src={`${baseUrl}/email/x.png`}
              width="22"
              height="22"
              alt="Midday on X"
            />
          </Link>
        </Column>
        <Column className="align-middle w-[40px]">
          <Link href="https://go.midday.ai/7rhA3rz">
            <Img
              src={`${baseUrl}/email/producthunt.png`}
              width="22"
              height="22"
              alt="Midday on Producthunt"
            />
          </Link>
        </Column>

        <Column className="align-middle w-[40px]">
          <Link href="https://go.midday.ai/anPiuRx">
            <Img
              src={`${baseUrl}/email/discord.png`}
              width="22"
              height="22"
              alt="Midday on Discord"
            />
          </Link>
        </Column>

        <Column className="align-middle">
          <Link href="https://go.midday.ai/Ct3xybK">
            <Img
              src={`${baseUrl}/email/linkedin.png`}
              width="22"
              height="22"
              alt="Midday on LinkedIn"
            />
          </Link>
        </Column>
      </Row>

      <br />
      <br />

      <Row>
        <Text className="text-[#B8B8B8] text-xs">
          Bubba AI, Inc. - 2261 Market Street, San Francisco, CA 94114
        </Text>
      </Row>

      <Row>
        <Link
          className="text-[#707070] text-[12px]"
          href="https://app.midday.ai/settings/notifications"
          title="Unsubscribe"
        >
          Notification preferences
        </Link>
      </Row>

      <br />
      <br />

      <Row>
        <Link href="https://go.midday.ai/FZwOHud">
          <Img
            src={`${baseUrl}/email/logo-footer.png`}
            width="100"
            alt="Midday"
            className="block"
          />
        </Link>
      </Row>
    </Section>
  );
}
