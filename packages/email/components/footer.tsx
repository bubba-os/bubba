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
        <Text className="text-[#B8B8B8] text-xs">
          Bubba AI, Inc. - 2261 Market Street, San Francisco, CA 94114
        </Text>
      </Row>

      <Row>
        <Link
          className="text-[#707070] text-[12px]"
          href="https://app.bubba.ai/settings/notifications"
          title="Unsubscribe"
        >
          Notification preferences
        </Link>
      </Row>

      <br />
      <br />

      <Row>
        <Link href="https://app.bubba.ai">
          <Img
            src={`${baseUrl}/favicon-32x32.png`}
            width="32"
            height="32"
            alt="Bubba AI"
            className="block"
          />
        </Link>
      </Row>
    </Section>
  );
}
